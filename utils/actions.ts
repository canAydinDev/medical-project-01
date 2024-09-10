"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  modelSchema,
  patientSchema,
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
    const myPrediction = await predictModel(file);
    const sonuc = myPrediction.prediction;
    const predict = sonuc === 1 ? "malign" : "benign";

    await db.patient.create({
      data: {
        name: name,
        clerkId: user.id,
        prediction: predict,
        modelId: modelId,
      },
    });

    revalidatePath("/patients");
  } catch (error) {
    return renderError(error);
  }
  redirect("/patients");
};

const predictModel = async (image: File) => {
  try {
    // FormData oluşturup dosyayı ekle
    const formData = new FormData();
    formData.append("img", image); // img olarak ekliyoruz çünkü Flask bunu bekliyor

    const response = await fetch(
      "https://flask-cances-app.onrender.com/predict",
      {
        method: "POST",
        body: formData, // FormData'yı body olarak gönderiyoruz
      }
    );

    if (!response.ok) {
      throw new Error("Tahmin API isteğinde hata oluştu");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return renderError(error);
  }
};
