import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function seedCities() {
  const existing = await prisma.city.count();
  if (existing > 0) {
    console.log("ℹ️ Database already has cities. Skipping seed.");
    return;
  }

  const filePath = path.join(__dirname, "cities.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const citiesFromFile = JSON.parse(fileContent);

  const cities = citiesFromFile.map((entry: any) => ({
    cityName: entry.cityName,
    count: entry.count,
  }));

  await prisma.city.createMany({ data: cities });

  console.log("✅ Seeded cities (UUIDs generated automatically)");
}

seedCities().finally(() => prisma.$disconnect());
