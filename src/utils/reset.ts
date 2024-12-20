import prisma from "@/app/lib/db";

import families from "@/data/families.json";
import guests from "@/data/guests.json";

async function reset() {
  try {
    await prisma.guest.deleteMany();
    await prisma.family.deleteMany();

    await prisma.guest.createMany({ data: guests });
    await prisma.family.createMany({ data: families });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.log("Unknown error");
    }
  }
}

await reset();
