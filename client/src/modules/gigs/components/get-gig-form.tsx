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
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GetGigParams, GetGigResponse } from "../types";

const formSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
});

type Props = {
  revalidateCache: (path: string) => Promise<void>;
  getGig: (params: GetGigParams) => Promise<GetGigResponse | Error>;
};

export default function GetGigForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
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
        name="id"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Binding Amount ($)
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter Gig ID" {...field} />
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
