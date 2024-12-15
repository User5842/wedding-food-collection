import Main from "./components/Main";
import prisma from "./lib/db";
import { Family } from "./interfaces/Family.interface";
import { Guest } from "./interfaces/Guest.interface";

export default async function Home() {
  // await prisma.family.createMany({ data: families });
  // await prisma.guest.createMany({ data: guests });

  // await prisma.guest.deleteMany();
  // await prisma.family.deleteMany();

  const families = (await prisma.family.findMany({
    include: { guests: true },
  })) as Family[];
  const guests = (await prisma.guest.findMany({
    where: { family: { responseRecorded: false } },
  })) as Guest[];

  return <Main families={families} guests={guests} />;
}
