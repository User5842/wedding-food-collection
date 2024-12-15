import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "../lib/db";

async function getFoodCount(
  foodItem: "byom" | "cheeseburger" | "chicken" | "steak"
) {
  try {
    const foundCount = await prisma.guest.count({
      where: {
        foodSelection: foodItem,
      },
    });
    return foundCount;
  } catch (e) {
    console.error(`Error retrieving food count for type ${foodItem}`, e);
    return 0;
  }
}

export default async function Summary() {
  const byomCount = getFoodCount("byom");

  const cheeseBurgerCount = getFoodCount("cheeseburger");

  const chickenCount = getFoodCount("chicken");

  const familiesWithGuests = await prisma.family.findMany({
    include: { guests: true },
  });

  const steakCount = getFoodCount("steak");

  return (
    <main className="container mx-auto max-w-lg text-center space-y-8 p-4">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Food Collection Summary</h1>
      </header>
      <section>
        <p>BYOM count: {byomCount}</p>
        <p>Cheesburger count: {cheeseBurgerCount}</p>
        <p>Chicken count: {chickenCount}</p>
        <p>Steak count: {steakCount}</p>
      </section>
      <section className="space-y-16">
        {familiesWithGuests
          .filter((family) => family.responseRecorded)
          .map((family) => (
            <Table key={family.id}>
              <TableCaption>{family.familyName}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Food selection</TableHead>
                  <TableHead>Allergies</TableHead>
                  <TableHead className="text-right">Needs high chair</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {family.guests.map((guest) => (
                  <TableRow key={guest.id}>
                    <TableCell className="font-medium">
                      {guest.firstName} {guest.lastName}
                    </TableCell>
                    <TableCell>{guest.foodSelection}</TableCell>
                    <TableCell>{guest.allergies}</TableCell>
                    <TableCell className="text-right">
                      {guest.needsHighChair ? "yes" : "no"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
      </section>
    </main>
  );
}
