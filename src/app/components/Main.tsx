"use client";

import { Guest } from "../interfaces/Guest.interface";
import GuestSelection from "./GuestSelection";
import { useState } from "react";
import { Family } from "../interfaces/Family.interface";
import Image from "next/image";
import party from "@/assets/party.webp";
import FamilyForm from "./FamilyForm";

interface MainProps {
  families: Family[];
}

export default function Main({ families }: MainProps) {
  const [family, setFamily] = useState<Family | null>(null);

  const onGuestSelection = (guest: Guest) =>
    setFamily(families.find(({ id }) => id === guest.familyId)!);

  return (
    <main className="container mx-auto max-w-prose text-center space-y-8 p-4">
      <Image
        priority
        src={party}
        className="w-full h-auto object-contain aspect-square"
        alt="Picture of the author"
      />
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Feasting with Karen & Rafael</h1>
        <p>Join us for love, laughter, and delicious bites!</p>
        <p>
          To begin the food selection process, please find your name in the
          dropdown below.
        </p>
      </header>
      <section className="space-y-8">
        <GuestSelection
          guests={families.flatMap((family) => family.guests)}
          onGuestSelection={onGuestSelection}
        />
        {family && (
          <FamilyForm
            key={family.id}
            family={family}
            onGuestResponseRecorded={() => setFamily(null)}
          />
        )}
      </section>
    </main>
  );
}
