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
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email can not be blank" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type Props = React.HTMLAttributes<HTMLDivElement> & {
  signinAction: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

export function SigninForm({ signinAction }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(() => true);

    const { email, password } = values;

    try {
      await signinAction({ email, password });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(() => false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter secure password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}