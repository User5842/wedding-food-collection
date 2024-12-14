"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Guest } from "../interfaces/Guest.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Family } from "../interfaces/Family.interface";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const guestSchema = z.object({
  id: z.number(),
  allergies: z.string().optional(),
  child: z.boolean(),
  familyId: z.number(),
  firstName: z.string(),
  foodSelection: z.string().nonempty("Food selection is required"),
  lastName: z.string(),
  needsHighChair: z.boolean(),
});

const guestFoodFormSchema = z.object({
  guests: z.array(guestSchema),
});

interface GuestFormProps {
  guests: Guest[];
  family: Family | null;
}

export default function GuestForm({ guests, family }: GuestFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof guestFoodFormSchema>>({
    defaultValues: {
      guests: guests.map((guest) => ({
        ...guest,
        allergies: "",
        foodSelection: "",
      })),
    },
    resolver: zodResolver(guestFoodFormSchema),
  });

  const onSubmit = async (guests: z.infer<typeof guestFoodFormSchema>) => {
    const response = await fetch("/api/submit", {
      body: JSON.stringify({
        family,
        guests: guests.guests,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.ok) {
      toast({
        description: "Your response was recorded",
        duration: 3000,
        title: "Success!",
      });
    } else {
      toast({
        description: "There was an issue recording your response",
        duration: 3000,
        title: "Error!",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {guests.map((guest, index) => {
          const adultGuestFormItems = (
            <>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="chicken" />
                </FormControl>
                <FormLabel className="font-normal">
                  🍗 Lemon pepper chicken
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="steak" />
                </FormControl>
                <FormLabel className="font-normal">
                  🥩 Churrasco Steak (cooked medium)
                </FormLabel>
              </FormItem>
            </>
          );

          const childGuestFormItems = (
            <>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="cheesburger" />
                </FormControl>
                <FormLabel className="font-normal">
                  🍔 Cheeseburger sliders with fries (kids menu)
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="byom" />
                </FormControl>
                <FormLabel className="font-normal">
                  🍴 Bring my own meal
                </FormLabel>
              </FormItem>
            </>
          );

          const guestFormItem = guest.child
            ? childGuestFormItems
            : adultGuestFormItems;

          return (
            <div className="space-y-4" key={`${guest.familyId}.${guest.id}`}>
              <FormField
                control={form.control}
                name={`guests.${index}.foodSelection`}
                render={({ field }) => (
                  <FormItem className="space-y-3 text-left">
                    <FormLabel className="text-xl">
                      {guest.firstName} {guest.lastName}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {guestFormItem}
                        {guest.needsHighChair && (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox disabled value="chair" checked />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Needs high chair
                            </FormLabel>
                          </FormItem>
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name={`guests.${index}.allergies`}
                render={({ field }) => (
                  <FormItem className="space-y-3 text-left">
                    <FormLabel className="font-normal">
                      Do you have any dietary restrictions?
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
          );
        })}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Please wait...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
