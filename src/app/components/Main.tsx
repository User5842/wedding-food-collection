"use client";

import { Guest } from "../interfaces/Guest.interface";
import GuestSelection from "./GuestSelection";
import { useEffect, useState } from "react";
import { Family } from "../interfaces/Family.interface";
import Image, { StaticImageData } from "next/image";
import party from "@/assets/party.webp";
import dachshund from "@/assets/dachshund.webp";
import partyTwo from "@/assets/party-two.webp";
import partyThree from "@/assets/party-three.webp";
import partyFour from "@/assets/party-four.webp";
import partyFive from "@/assets/party-five.webp";
import FamilyForm from "./FamilyForm";

interface MainProps {
  families: Family[];
}

const images = [dachshund, party, partyTwo, partyThree, partyFour, partyFive];

export default function Main({ families }: MainProps) {
  const [family, setFamily] = useState<Family | null>(null);
  const [image, setImage] = useState<StaticImageData | null>(null);

  useEffect(() => {
    const image = images[Math.floor(Math.random() * images.length)];
    setImage(image);
  }, []);

  const onGuestSelection = (guest: Guest) =>
    setFamily(families.find(({ id }) => id === guest.familyId)!);

  return (
    <main className="container mx-auto max-w-prose text-center space-y-8 p-4">
      <div className="w-[546px] h-[546px]">
        {image && (
          <Image
            priority
            src={image}
            className="w-full h-full object-cover"
            alt="Picture of the author"
          />
        )}
      </div>
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
