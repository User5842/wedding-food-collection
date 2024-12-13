import { PrismaClient } from "@prisma/client";

import Main from "./components/Main";
import { Guest } from "./interfaces/Guest.interface";
import { Family } from "./interfaces/Family.interface";

const prisma = new PrismaClient();

export default async function Home() {
  const families = (await prisma.family.findMany()) as Family[];
  const guests = (await prisma.guest.findMany()) as Guest[];

  return <Main families={families} guests={guests} />;
}
