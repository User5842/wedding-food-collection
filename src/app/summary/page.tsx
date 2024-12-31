export const dynamic = "force-dynamic";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Family } from "../interfaces/Family.interface";

export default async function Summary() {
  const baseUrl =
    process.env.BASE_URL || "https://wedding-food-collection.vercel.app/";
  const summaryResponse = await fetch(`${baseUrl}/api/summary`);
  const {
    byomCount,
    cheeseBurgerCount,
    chickenCount,
    dietaryRestrictionsCount,
    familiesWithGuests,
    highChairCount,
    steakCount,
  } = (await summaryResponse.json()) as {
    byomCount: number;
    cheeseBurgerCount: number;
    chickenCount: number;
    dietaryRestrictionsCount: number;
    familiesWithGuests: Family[];
    highChairCount: number;
    steakCount: number;
  };

  return (
    <main className="container mx-auto max-w-lg text-center p-4 space-y-16">
      <header>
        <h1 className="text-4xl font-bold">Food Collection Summary</h1>
      </header>
      <section className="space-y-8">
        <header>
          <h2 className="text-2xl font-bold">Total item counts</h2>
        </header>
        <Table key={familiesWithGuests.length}>
          <TableHeader>
            <TableRow>
              <TableHead>🍗 Chicken</TableHead>
              <TableHead>🥩 Steak</TableHead>
              <TableHead>🍔 Cheeseburger</TableHead>
              <TableHead>🍴 Bring your own meal (BYOM)</TableHead>
              <TableHead>🪑 Needs high chair</TableHead>
              <TableHead className="text-right">
                🤧 Dietary restrictions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{chickenCount}</TableCell>
              <TableCell>{steakCount}</TableCell>
              <TableCell>{cheeseBurgerCount}</TableCell>
              <TableCell>{byomCount}</TableCell>
              <TableCell>{highChairCount}</TableCell>
              <TableCell>{dietaryRestrictionsCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
      <section className="space-y-8">
        <header>
          <h2 className="text-2xl font-bold">Family details</h2>
        </header>
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
                  <TableHead>Needs high chair</TableHead>
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
