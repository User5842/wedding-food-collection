import prisma from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const families = await prisma.family.findMany({
      include: { guests: true },
      where: { responseRecorded: false },
    });
    return new Response(JSON.stringify(families), { status: 200 });
  } catch (e) {
    console.error("Error retrieving families:", e);
    return new Response("Error retrieving families.", { status: 500 });
  }
}
