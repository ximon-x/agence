"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateGigParams, CreateGigResponse } from "../types";

const formSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    bindingAmount: z.number().optional(),

    minHourlyRate: z
      .number()
      .min(2, {
        message: "Hourly Rate must be at least $2.",
      })
      .max(100, {
        message: "Hourly Rate must be at most $100.",
      })
      .optional(),

    maxHourlyRate: z
      .number()
      .min(2, {
        message: "Hourly Rate must be at least $2.",
      })
      .max(100, {
        message: "Hourly Rate must be at most $100.",
      })
      .optional(),
  })
  .refine(
    ({ minHourlyRate, maxHourlyRate }) => {
      if (minHourlyRate && maxHourlyRate) {
        return maxHourlyRate > minHourlyRate;
      }
      return true;
    },
    {
      message: "Max Hourly Rate must be greater than Min Hourly Rate",
      path: ["maxHourlyRate"],
    },
  );

type Props = {
  revalidateCache: (path: string) => Promise<void>;
  createGig: (params: CreateGigParams) => Promise<CreateGigResponse | Error>;
};

export default function CreateGigForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      bindingAmount: 50,
      maxHourlyRate: 10,
      minHourlyRate: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(() => true);

    try {
      console.log(values);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"></form>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Your Title
            </FormLabel>
            <FormControl>
              <Input placeholder="Backend Dev Needed" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Your Title Description
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="I need a backend developer with x years of experience."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bindingAmount"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Binding Amount ($)
            </FormLabel>
            <FormControl>
              <Input placeholder="Maximum Amount per Hour" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="maxHourlyRate"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Max Hourly Rate ($)
            </FormLabel>
            <FormControl>
              <Input placeholder="Maximum Amount per Hour" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="minHourlyRate"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Min Hourly Rate ($)</FormLabel>
            <FormControl>
              <Input placeholder="Minimum Amount per Hour" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button className="w-full" type="submit" disabled={isLoading}>
        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </Form>
  );
}
