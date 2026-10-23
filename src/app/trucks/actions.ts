
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function registerTruck(formData: FormData) {
  const truckNumber = String(
    formData.get("truckNumber") ?? ""
  ).trim().toUpperCase();

  const fleet = String(formData.get("fleet") ?? "");

  const trailerNumber = String(
    formData.get("trailerNumber") ?? ""
  ).trim().toUpperCase();

  const mileageInput = String(
    formData.get("currentMileageKm") ?? ""
  ).trim();

  if (!truckNumber) {
    throw new Error("Truck number is required.");
  }

  if (fleet !== "IMARA" && fleet !== "FASTER") {
    throw new Error("Invalid fleet.");
  }

  let currentMileageKm: number | null = null;

  if (mileageInput !== "") {
    const mileage = Number(mileageInput);

    if (
      !Number.isSafeInteger(mileage) ||
      mileage < 0 ||
      mileage > 2147483647
    ) {
      throw new Error("Enter a valid mileage.");
    }

    currentMileageKm = mileage;
  }

  const existingTruck = await prisma.truck.findUnique({
    where: { truckNumber },
  });

  if (existingTruck) {
    throw new Error("This truck is already registered.");
  }

  await prisma.truck.create({
    data: {
      truckNumber,
      fleet,
      trailerNumber: trailerNumber || null,
      currentMileageKm,
      hasContainer: formData.get("hasContainer") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/trucks");
}
