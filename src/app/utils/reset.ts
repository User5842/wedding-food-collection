import { exec } from "child_process";

import families from "../../data/families.json";
import guests from "../../data/guests.json";
import prisma from "../lib/db";

async function reset() {
  const command = "npx prisma migrate reset --force";
  console.log(`Running ${command}`);

  try {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    await prisma.family.createMany({ data: families });
    await prisma.guest.createMany({ data: guests });
  } catch (error: unknown) {
    if (error instanceof Error)
      console.error("Error running Prisma migration reset:", error.message);
  }
}

await reset();
