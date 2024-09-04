"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { imageSchema, modelSchema, validateWithZodSchema } from "./schemas";
import { uploadImage } from "./supabase";

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
  redirect("/admin/products");
};
