import db from "./db";

export const fetchFeaturedModels = async () => {
  const models = await db.dlModel.findMany({
    where: {
      featured: true,
    },
  });
  return models;
};

export const fetchAllModels = async () => {
  const models = await db.dlModel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return models;
};
