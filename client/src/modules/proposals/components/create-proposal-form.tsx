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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CreateProposalParams, CreateProposalResponse } from "../types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  offender: z.string().optional(),
  proposalKind: z.enum([
    "ReportScam",
    "ReportSpam",
    "ReportSham",
    "ChangePolicy",
  ]),
});

type Props = {
  revalidateCache: (path: string) => Promise<void>;
  createProposal: (
    params: CreateProposalParams,
  ) => Promise<CreateProposalResponse | Error>;
};

export default function CreateGigForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
              <span className="text-red-500">*</span> Title
            </FormLabel>
            <FormControl>
              <Input placeholder="Agency x tried to scam me" {...field} />
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
              <span className="text-red-500">*</span> Description
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Agency X tried to scam me. I want to report it."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="offender"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Offender</FormLabel>
            <FormControl>
              <Input placeholder="Wallet Address of Offender" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="proposalKind"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>
              <span className="text-red-500">*</span> Proposal Kind
            </FormLabel>

            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${field.value ?? "Select the proposal kind."}`}
                  />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem value="ReportScam">Report Scam</SelectItem>
                <SelectItem value="ReportSham">Report Sham</SelectItem>
                <SelectItem value="ReportSpam">Report Spam</SelectItem>
                <SelectItem value="ChangePolicy">Change Policy</SelectItem>
              </SelectContent>
            </Select>
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
