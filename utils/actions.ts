"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  modelSchema,
  patientSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

export const fetchFeaturedModels = async () => {
  const models = await db.dlModel.findMany({
    where: {
      featured: true,
    },
  });
  return models;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("Bu bolume erisim icin giris yapmalisiniz");
  }
  return user;
};
export const fetchAllModels = async ({ search = "" }: { search: string }) => {
  const models = await db.dlModel.findMany({
    where: {
      OR: [{ name: { contains: search, mode: "insensitive" } }],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return models;
};

export const fetchSingleModel = async (modelId: string) => {
  const model = db.dlModel.findUnique({
    where: {
      id: modelId,
    },
  });
  if (!model) {
    redirect("/models");
  }
  return model;
};

export const createModelAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(modelSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await db.dlModel.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/models");
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchAdminModels = async () => {
  await getAdminUser();
  const models = await db.dlModel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return models;
};

export const deleteModelAction = async (prevState: { modelId: string }) => {
  const { modelId } = prevState;
  await getAdminUser();

  try {
    await db.dlModel.delete({
      where: {
        id: modelId,
      },
    });
    await deleteImage(modelId);
    revalidatePath("/admin/models");
    return { message: "Model silindi" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminModelDetails = async (modelId: string) => {
  await getAdminUser();
  const model = db.dlModel.findUnique({
    where: {
      id: modelId,
    },
  });
  if (!model) redirect("/admin/models");
  return model;
};

export const updateModelAction = async (prevState: any, formData: FormData) => {
  await getAdminUser();
  try {
    const modelId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(modelSchema, rawData);
    await db.dlModel.update({
      where: { id: modelId },
      data: { ...validatedFields },
    });
    revalidatePath(`/admin/models/${modelId}/edit`);
    return { message: " Model guncellendi" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateModelImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const image = formData.get("image") as File;
    const modelId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.dlModel.update({
      where: {
        id: modelId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/models/${modelId}/edit`);
    return { message: "Model resmi güncellendi" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserPatients = async () => {
  const user = await getAuthUser();

  const patients = await db.patient.findMany({
    where: {
      clerkId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return patients;
};

export const deletePatientAction = async (prevState: { patientId: string }) => {
  const { patientId } = prevState;
  await getAuthUser();

  try {
    await db.patient.delete({
      where: {
        id: patientId,
      },
    });
    revalidatePath("/patients");
    return { message: "Hasta silindi" };
  } catch (error) {
    return renderError(error);
  }
};

export const createPatientAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const name = formData.get("name") as string;
    const file = formData.get("image") as File;
    const modelId = formData.get("modelId") as string;

    const validatedFields = validateWithZodSchema(patientSchema, { name });
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });

    // Flask API'ye tahmin işlemini başlatacak bir istek gönder
    const jobId = await startPrediction(file);

    // Kullanıcıya işlemin başladığını ve sonucun beklenmesi gerektiğini bildir
    await db.patient.create({
      data: {
        name: name,
        clerkId: user.id,
        prediction: jobId, // Tahmin sonuçlanmadan önce jobId saklanıyor
        modelId: modelId,
      },
    });

    revalidatePath("/patients");
  } catch (error) {
    return renderError(error);
  }
  redirect("/patients");
};

// Flask API'de tahmin işlemini başlatan işlev
const startPrediction = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("img", image);

    const response = await fetch(
      "https://flask-cances-app.onrender.com/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Tahmin API isteğinde hata oluştu");
    }

    const result = await response.json();
    return result.jobId; // İş kimliğini döndür
  } catch (error) {
    console.error("Hata oluştu:", error);
    return null;
  }
};

export const checkJobStatusAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const jobId = formData.get("jobId") as string; // formData'dan jobId'yi alıyoruz
  const patientId = formData.get("patientId") as string;

  try {
    const response = await fetch(
      `https://flask-cances-app.onrender.com/status/${jobId}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (result.status === "completed") {
      console.log("Tahmin sonucu:", result.prediction);
      const predictionResult = result.prediction === 1 ? "malign" : "benign";
      await db.patient.update({
        where: { id: patientId },
        data: { prediction: predictionResult },
      });
      revalidatePath("/patients");
      return { message: `Tahmin sonucu: ${predictionResult}` };
    } else {
      console.log("İşlem hala devam ediyor");
      revalidatePath("/patients");
      return {
        message: "İşlem hala devam ediyor. Lütfen daha sonra tekrar deneyin.",
      };
    }
  } catch (error) {
    revalidatePath("/patients");
    console.error("Hata oluştu:", error);
    return { message: "Bir hata oluştu." };
  }
};

export const fetchFavoriteId = async ({ modelId }: { modelId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      modelId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  modelId: string;
  favoriteId: string;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { modelId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          clerkId: user.id,
          modelId,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? "Favorilerden çıkarıldı" : "Favorilere eklendi",
    };
  } catch (error) {
    renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      dlModel: true,
    },
  });
  return favorites;
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedFields.modelId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchModelReviews = async (modelId: string) => {
  const reviews = await db.review.findMany({
    where: {
      modelId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const fetchModelReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      dlModel: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "Yorum başarıyla silindi." };
  } catch (error) {
    return renderError(error);
  }
};
export const findExistingReview = async (userId: string, modelId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      modelId,
    },
  });
};

export const fetchModelRating = async (modelId: string) => {
  const result = await db.review.groupBy({
    by: ["modelId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      modelId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchAllReviews = async () => {
  const reviews = await db.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3, // İlk 3 yorumu getir
    select: {
      comment: true,
      rating: true,
      clerkId: true,
      authorName: true,
      authorImageUrl: true,
      dlModel: {
        select: {
          name: true, // Model ismi
          image: true, // Model resmi
        },
      },
    },
  });

  return reviews;
};
