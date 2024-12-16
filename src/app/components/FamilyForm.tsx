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

const familySchema = z.object({
  id: z.number(),
  familyName: z.string(),
  guests: z.array(guestSchema),
  responseRecorded: z.boolean(),
});

interface FamilyFormProps {
  family: Family;
  onGuestResponseRecorded: () => void;
}

export default function FamilyForm({
  family,
  onGuestResponseRecorded,
}: FamilyFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof familySchema>>({
    defaultValues: {
      id: family.id,
      familyName: family.familyName,
      guests: family.guests.map((guest) => ({ ...guest })),
      responseRecorded: family.responseRecorded,
    },
    resolver: zodResolver(familySchema),
  });

  console.log("Form validation errors:", form.formState.errors);

  const onSubmit = async (family: z.infer<typeof familySchema>) => {
    const response = await fetch("/api/submit", {
      body: JSON.stringify({
        family,
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
      onGuestResponseRecorded();
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
      <div>
        <h2 className="text-2xl font-semibold">{family.familyName}</h2>
        <p className="italic">
          Both options come with a delicious Caesar salad, fresh asparagus, and
          creamy potatoes au gratin to perfectly complement your meal. Enjoy a
          savory and satisfying dining experience!
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {family.guests.map((guest, index) => {
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
                  <RadioGroupItem value="cheeseburger" />
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
