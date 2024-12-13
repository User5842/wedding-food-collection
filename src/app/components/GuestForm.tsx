"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Guest } from "../interfaces/Guest.interface";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const guestSchema = z.object({
  id: z.number(),
  allergies: z.string().optional(),
  child: z.boolean(),
  familyId: z.number(),
  firstName: z.string(),
  foodSelection: z.string(),
  lastName: z.string(),
  memberId: z.number(),
  needsHighChair: z.boolean(),
});

// const familySchema = z.object({
//   id: z.number(),
//   familyName: z.string(),
//   familyId: z.number(),
// });

interface GuestFormProps {
  guests: Guest[];
}

export default function GuestForm({ guests }: GuestFormProps) {
  const form = useForm<z.infer<typeof guestSchema>>({
    defaultValues: {
      id: 0,
      allergies: "",
      child: false,
      familyId: 0,
      firstName: "",
      foodSelection: "",
      lastName: "",
      memberId: 0,
      needsHighChair: false,
    },
    resolver: zodResolver(guestSchema),
  });

  const onSubmit = (values: z.infer<typeof guestSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {guests.map((guest) => {
          const adultGuestFormItems = (
            <>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="chicken" />
                </FormControl>
                <FormLabel className="font-normal">Chicken</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="steak" />
                </FormControl>
                <FormLabel className="font-normal">Steak</FormLabel>
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
                  Cheeseburger with fries
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="byom" />
                </FormControl>
                <FormLabel className="font-normal">
                  Bring your own meal
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
                name="foodSelection"
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
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="allergies"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
