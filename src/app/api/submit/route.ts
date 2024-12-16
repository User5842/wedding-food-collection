import { Family } from "@/app/interfaces/Family.interface";
import prisma from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    const requestJson = await request.json();
    const family = structuredClone(requestJson) as Family;

    if (family?.guests?.length === 0) {
      return new Response("Bad Request", { status: 400 });
    }

    const familyAlreadyRecordedResponse = await prisma.family.findUnique({
      where: {
        id: family.id,
      },
    });

    if (familyAlreadyRecordedResponse?.responseRecorded) {
      console.error(`Family (${family.id}) already recorded a response.`);
      return new Response(
        `Family (${family.id}) already recorded a response.`,
        { status: 409 }
      );
    }

    console.log(family);

    const updateResult = await prisma.$transaction(async (prisma) => {
      const guestUpdates = family.guests.map((guest) =>
        prisma.guest.update({
          where: { id: guest.id },
          data: {
            allergies: guest.allergies,
            foodSelection: guest.foodSelection,
            needsHighChair: guest.needsHighChair,
          },
        })
      );

      const familyUpdate = prisma.family.update({
        where: { id: family.id },
        data: {
          responseRecorded: true,
        },
      });

      await Promise.all([...guestUpdates, familyUpdate]);

      return {
        guestResponses: await prisma.guest.findMany({
          where: { familyId: family.id },
        }),
        family,
      };
    });

    return new Response(JSON.stringify(updateResult), { status: 200 });
  } catch (error) {
    console.error("Error creating post and comments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
