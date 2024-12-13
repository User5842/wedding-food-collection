"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Guest } from "../interfaces/Guest.interface";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface GuestSelectionProps {
  guests: Guest[];
  onGuestSelection: (guest: Guest) => void;
}

export default function GuestSelection({
  guests,
  onGuestSelection,
}: GuestSelectionProps) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {guest != null
            ? (() => {
                const { firstName, lastName } = guests.find(
                  ({ firstName, lastName }) =>
                    `${firstName}.${lastName}`.toLowerCase() ===
                    `${guest.firstName}.${guest.lastName}`.toLowerCase()
                )!;
                return `${firstName} ${lastName}`;
              })()
            : "Select a guest..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search guest list..." />
          <CommandList>
            <CommandEmpty>No guest found.</CommandEmpty>
            <CommandGroup>
              {guests.map((guest) => (
                <CommandItem
                  key={`${guest.id}.${guest.familyId}`}
                  value={JSON.stringify(guest)}
                  onSelect={(currentGuest) => {
                    const parsedGuest = JSON.parse(currentGuest);
                    setGuest(parsedGuest === guest ? null : parsedGuest);
                    onGuestSelection(parsedGuest);
                    setOpen(false);
                  }}
                >
                  {guest.firstName} {guest.lastName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
