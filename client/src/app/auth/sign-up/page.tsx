import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/lib/styles/typography";
import Footer from "@/modules/auth/components/footer";
import Header from "@/modules/auth/components/header";
import { SignupForm } from "@/modules/auth/components/signup-form";
import { signup } from "@/modules/auth/lib/services/supabase/actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | Agence",
};

export default function SignupPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <Header />
      <main>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create an Account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm signupAction={signup} />
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-2">
            <Text variant="muted">Already have an account?</Text>
            <Text variant="muted">
              <Link href="/auth/sign-in" className="underline">
                Sign In
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
