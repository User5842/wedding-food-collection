import { Family } from "@/app/interfaces/Family.interface";
import { Guest } from "@/app/interfaces/Guest.interface";
import prisma from "@/app/lib/db";

interface FamilyResponse {
  guests: Guest[];
  family: Family;
}

export async function POST(request: Request) {
  try {
    const requestJson = await request.json();
    const { family, guests } = structuredClone(requestJson) as FamilyResponse;

    if (family == null || guests == null || guests.length === 0) {
      return Response.error();
    }

    const familyAlreadyRecordedResponse = await prisma.family.findUnique({
      where: {
        id: family.id,
        responseRecorded: true,
      },
    });

    if (familyAlreadyRecordedResponse != null) {
      console.error(`Family (${family.id}) already recorded a response.`);
      return new Response(
        `Family (${family.id}) already recorded a response.`,
        { status: 409 }
      );
    }

    const updateResult = await prisma.$transaction(async (prisma) => {
      const guestUpdates = guests.map((guest) =>
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
        where: { id: guests[0].familyId },
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
