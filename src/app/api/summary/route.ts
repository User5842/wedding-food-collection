import prisma from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      byomCount,
      cheeseBurgerCount,
      chickenCount,
      dietaryRestrictionsCount,
      familiesWithGuests,
      highChairCount,
      steakCount,
    ] = await Promise.all([
      prisma.guest.count({ where: { foodSelection: "byom" } }),
      prisma.guest.count({ where: { foodSelection: "cheeseburger" } }),
      prisma.guest.count({ where: { foodSelection: "chicken" } }),
      prisma.guest.count({
        where: {
          allergies: {
            not: null,
            notIn: [""],
          },
        },
      }),
      prisma.family.findMany({ include: { guests: true } }),
      prisma.guest.count({ where: { needsHighChair: true } }),
      prisma.guest.count({ where: { foodSelection: "steak" } }),
    ]);
    return new Response(
      JSON.stringify({
        byomCount,
        cheeseBurgerCount,
        chickenCount,
        dietaryRestrictionsCount,
        familiesWithGuests,
        highChairCount,
        steakCount,
      }),
      { status: 200 }
    );
  } catch (e) {
    console.error("Error retrieving summary:", e);
    return new Response("Error retrieving summary.", { status: 500 });
  }
}
