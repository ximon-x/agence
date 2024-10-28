import { createUser } from "@/api/users";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/modules/auth/components/footer";
import Header from "@/modules/auth/components/header";
import OnboardingForm from "@/modules/auth/components/onboarding-form";
import { onboarded } from "@/modules/auth/lib/services/actions";
import { createClient } from "@/modules/auth/lib/services/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Onboarding | Agence",
};

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <Header />
      <main>
        <Card className="w-96">
          <CardHeader>
            <CardTitle>User Onboarding</CardTitle>
            <CardDescription>
              Please fill in the information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingForm
              id={user.id}
              emailAddress={user.email!}
              createUser={createUser}
              onboarded={onboarded}
            />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}