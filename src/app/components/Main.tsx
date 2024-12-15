"use client";

import { Guest } from "../interfaces/Guest.interface";
import GuestSelection from "./GuestSelection";
import { useState } from "react";
import { Family } from "../interfaces/Family.interface";
import GuestForm from "./GuestForm";
import Image from "next/image";
import party from "@/assets/party.webp";

interface MainProps {
  families: Family[];
  guests: Guest[];
}

export default function Main({ guests, families }: MainProps) {
  const [guestFamily, setGuestFamily] = useState<Family | null>(null);
  const [guestFamilyMembers, setGuestFamilyMembers] = useState<Guest[]>([]);

  const onGuestResponseRecorded = () => {
    setGuestFamily(null);
    setGuestFamilyMembers([]);
  };

  const onGuestSelection = (guest: Guest) => {
    const guestFamily = families.find(
      (family) => family.id === guest.familyId
    )!;
    setGuestFamily(guestFamily);

    const guestFamilyMembers = guests.filter(
      (guest) => guest.familyId === guestFamily.id
    );
    setGuestFamilyMembers(guestFamilyMembers);
  };

  return (
    <main className="container mx-auto max-w-prose text-center space-y-8 p-4">
      <Image
        priority
        src={party}
        className="w-full h-full object-cover"
        alt="Picture of the author"
      />
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Feasting with Karen and Rafael!</h1>
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
        {guestFamily?.familyName && (
          <div>
            <h2 className="text-2xl font-semibold">{guestFamily.familyName}</h2>
            <p className="italic">
              Both options come with a delicious Caesar salad, fresh asparagus,
              and creamy potatoes au gratin to perfectly complement your meal.
              Enjoy a savory and satisfying dining experience!
            </p>
          </div>
        )}
        {guestFamilyMembers.length > 0 && (
          <GuestForm
            family={guestFamily!}
            guests={guestFamilyMembers}
            onGuestResponseRecorded={onGuestResponseRecorded}
          />
        )}
      </section>
    </main>
  );
}
