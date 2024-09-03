import { redirect } from "next/navigation";
import db from "./db";

export const fetchFeaturedModels = async () => {
  const models = await db.dlModel.findMany({
    where: {
      featured: true,
    },
  });
  return models;
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
