import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ClientType, StorageType, UnitType, UserRole } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL não está configurada.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@house190.com.br" },
    update: {},
    create: {
      name: "Administrador House190",
      email: "admin@house190.com.br",
      role: UserRole.ADMIN,
    },
  });

  const clients = [
    { code: "HTF", name: "House190 Teixeira de Freitas", city: "Teixeira de Freitas" },
    { code: "HEU", name: "House190 Eunápolis", city: "Eunápolis" },
    { code: "HFP", name: "House Food Park", city: "Teixeira de Freitas" },
  ];

  for (const client of clients) {
    await prisma.client.upsert({
      where: { code: client.code },
      update: client,
      create: { ...client, type: ClientType.STORE, state: "BA" },
    });
  }

  const products = [
    {
      code: "MOL-MV-500",
      name: "Maionese Verde",
      category: "Molhos",
      unit: UnitType.KILOGRAM,
      shelfLifeDays: 5,
      storage: StorageType.REFRIGERATED,
      storageMinC: 1,
      storageMaxC: 5,
      defaultWeightG: 500,
      minStock: 8,
      allergens: ["Ovos"],
      instructions: "Manter refrigerado entre 1 °C e 5 °C.",
    },
    {
      code: "CAR-BLD-180",
      name: "Blend House 180 g",
      category: "Carnes",
      unit: UnitType.UNIT,
      shelfLifeDays: 30,
      storage: StorageType.FROZEN,
      storageMinC: -22,
      storageMaxC: -18,
      defaultWeightG: 180,
      minStock: 120,
      allergens: [],
      instructions: "Manter congelado. Não recongelar após descongelamento.",
    },
    {
      code: "FRI-BAC-040",
      name: "Bacon Crispy 40 g",
      category: "Frios",
      unit: UnitType.PACKAGE,
      shelfLifeDays: 5,
      storage: StorageType.REFRIGERATED,
      storageMinC: 1,
      storageMaxC: 5,
      defaultWeightG: 40,
      minStock: 80,
      allergens: [],
      instructions: "Manter refrigerado e utilizar utensílio higienizado.",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { code: product.code },
      update: product,
      create: product,
    });
  }

  console.log(`Seed concluído. Usuário administrador: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
