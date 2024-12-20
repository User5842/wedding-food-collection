import Main from "./components/Main";
import prisma from "./lib/db";
import { Family } from "./interfaces/Family.interface";

// import families from "@/data/families.json";
// import guests from "@/data/guests.json";

export default async function Home() {
  // await prisma.family.createMany({ data: families });
  // await prisma.guest.createMany({ data: guests });

  // await prisma.guest.deleteMany();
  // await prisma.family.deleteMany();

  const families = (await prisma.family.findMany({
    include: { guests: true },
    where: {
      responseRecorded: false,
    },
  })) as Family[];

  return <Main families={families} />;
}
