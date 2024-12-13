"use client";

import { Guest } from "../interfaces/Guest.interface";
import GuestSelection from "./GuestSelection";
import { useState } from "react";
import { Family } from "../interfaces/Family.interface";
import GuestForm from "./GuestForm";

interface MainProps {
  families: Family[];
  guests: Guest[];
}

export default function Main({ guests, families }: MainProps) {
  const [guestFamily, setGuestFamily] = useState<Family | null>(null);
  const [guestFamilyMembers, setGuestFamilyMembers] = useState<Guest[]>([]);

  const onGuestSelection = (guest: Guest) => {
    const guestFamily = families.find(
      (family) => family.familyId === guest.familyId
    )!;
    setGuestFamily(guestFamily);

    const guestFamilyMembers = guests.filter(
      (guest) => guest.familyId === guestFamily.familyId
    );
    setGuestFamilyMembers(guestFamilyMembers);
  };

  return (
    <main className="container mx-auto max-w-lg text-center space-y-8 p-4">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Festing with Karen and Rafael!</h1>
        <p>
          Join us for love, laughter, and delicious bites! RSVP now and save
          your seat at the table.
        </p>
        <p>
          To begin the food selection process, please find your name in the
          dropdown below.
        </p>
      </header>
      <section className="space-y-8">
        <GuestSelection guests={guests} onGuestSelection={onGuestSelection} />
        <h2 className="text-2xl font-semibold">{guestFamily?.familyName}</h2>
        {guestFamilyMembers.length > 0 && (
          <GuestForm guests={guestFamilyMembers} />
        )}
      </section>
    </main>
  );
}
