"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/lib/hooks/use-toast";
import { CreateUserParams, CreateUserResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBigLeft, ArrowBigRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const steps = [
  { title: "Personal Info" },
  { title: "Account Info" },
  { title: "Preferences" },
];

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    role: z.enum(["Ace", "Agency"]),
    preferredBlockchain: z.enum(["Algorand", "Near"]),
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
        return minHourlyRate < maxHourlyRate;
      }
      return true;
    },
    {
      message: "Max hourly rate must be greater than min hourly rate.",
      path: ["maxHourlyRate"],
    },
  );

type Props = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  emailAddress: string;
  createUser: (params: CreateUserParams) => Promise<CreateUserResponse | Error>;
  onboarded: () => Promise<void>;
};

export default function OnboardingForm(props: Props) {
  const { id, emailAddress, createUser, onboarded } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSumit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(() => true);

    const { firstName, lastName, phoneNumber, role, preferredBlockchain } =
      values;

    let { minHourlyRate, maxHourlyRate } = values;

    try {
      minHourlyRate = minHourlyRate || 0;
      maxHourlyRate = maxHourlyRate || 0;

      const res = await createUser({
        firstName,
        lastName,
        phoneNumber,
        minHourlyRate,
        maxHourlyRate,
        preferredBlockchain,
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

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-96">
      <div className="w-full p-2">
        <Progress value={progressPercentage} className="w-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {steps[currentStep].title}

              <div className="flex justify-end gap-2">
                {currentStep !== 0 && (
                  <Button
                    onClick={handlePrevious}
                    size="icon"
                    variant="outline"
                  >
                    <ArrowBigLeft className="h-4 w-4" />
                  </Button>
                )}
                {currentStep !== steps.length - 1 && (
                  <Button onClick={handleNext} size="icon" variant="outline">
                    <ArrowBigRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardTitle>
            <CardDescription>
              Please fill in the information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSumit)}
                className="space-y-4"
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>
                            <span className="text-red-500">*</span> First name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                          <FormLabel>
                            {" "}
                            <span className="text-red-500">*</span> Last name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
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
                          <FormLabel>
                            {" "}
                            <span className="text-red-500">*</span> Phone Number
                          </FormLabel>
                          <FormControl>
                            <PhoneInput placeholder="812 345 6789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="my-4 space-y-6">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>
                            {" "}
                            <span className="text-red-500">*</span> Are you an
                            Ace or Agency?
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`${field.value ?? "Select your role."}`}
                                />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              <SelectItem value="Ace">Ace</SelectItem>
                              <SelectItem value="Agency">Agency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minHourlyRate"
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            Minimum Amount per Hour{" "}
                            {value && value > 0 && `: $${value}`}
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(vals) => {
                                onChange(vals[0]);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxHourlyRate"
                      render={({ field: { value, onChange } }) => (
                        <FormItem className="mt-14 space-y-3">
                          <FormLabel>
                            Maximum Amount per Hour
                            {value && value > 0 && `: $${value}`}
                          </FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(vals) => {
                                onChange(vals[0]);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="preferredBlockchain"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>
                            <span className="text-red-500">*</span> Your
                            preferred blockchain
                          </FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`${field.value ?? "Select your preferred blockchain."}`}
                                />
                              </SelectTrigger>
                            </FormControl>

                            <FormDescription>
                              Temporary until Chain Abstraction is implemented.
                            </FormDescription>
                            <SelectContent>
                              <SelectItem value="Algorand" disabled>
                                Algorand
                              </SelectItem>
                              <SelectItem value="Near">
                                Near Protocol
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}
