const { PrismaClient } = require("@prisma/client");
const dlModels = require("./dlModels.json");
const prisma = new PrismaClient();

async function main() {
  for (const dlModel of dlModels) {
    await prisma.dlModel.create({
      data: dlModel,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });