import { PrismaClient } from "@prisma/client";

import guests from "@/data/guests.json";
import { Guest } from "./interfaces/Guest.interface";

const typedGuests: Guest[] = guests;

const prisma = new PrismaClient();

export default async function Home() {
  // const guests = await prisma.guest.findMany();
  // console.log(guests);

  await prisma.guest.createMany({ data: typedGuests });

  return (
    <main className="container mx-auto max-w-prose">
      <header>
        <h1 className="text-4xl font-bold">Festing with Karen and Rafael!</h1>
        <p>
          Join us for love, laughter, and delicious bites! RSVP now and save
          your seat at the table. To begin the food selection process, please
          find your name in the dropdown below.
        </p>
      </header>
    </main>
  );
}
