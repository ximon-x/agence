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
import { SigninForm } from "@/modules/auth/components/signin-form";
import { signin } from "@/modules/auth/lib/services/actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | Agence",
};

export default function SigninPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <main>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SigninForm signinAction={signin} />
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-2">
            <Text variant="muted">Don&apos;t have an account?</Text>
            <Text variant="muted">
              <Link href="/auth/sign-up" className="underline">
                Sign Up
              </Link>
            </Text>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
