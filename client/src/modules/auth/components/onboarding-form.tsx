"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/lib/hooks/use-toast";
import { CreateUserParams, CreateUserResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  phoneNumber: z
    .string()
    .min(7, { message: "Phone Number must be at least 7 digits long" }),
  role: z.enum(["ace", "agency"]),
});

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  emailAddress: string;
  createUser: (params: CreateUserParams) => Promise<CreateUserResponse | Error>;
  onboarded: () => Promise<void>;
};

export default function OnboardingForm({
  createUser,
  id,
  emailAddress,
  onboarded,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: "ace",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(() => true);

    const { firstName, lastName, phoneNumber, role } = values;

    try {
      const res = await createUser({
        firstName,
        lastName,
        phoneNumber,
        role,
        id,
        emailAddress,
      });

      if (res instanceof Error) {
        throw res;
      }

      await onboarded();

      toast({
        title: "Account created",
        description: "We've created your account for you.",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="my-4 space-y-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <PhoneInput placeholder="Enter Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you an Ace or Agency?</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an role." />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="ace">Ace</SelectItem>
                  <SelectItem value="agency">Agency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      <Button className="w-full" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  );
}
