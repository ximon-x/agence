import { Button } from "@/components/ui/button";
import Footer from "@/modules/auth/components/footer";
import Header from "@/modules/auth/components/header";
import { LogIn } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agence",
  description: "Where Agencies meet their next Ace.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Header />
      <main className="flex h-full w-full flex-col items-center justify-center">
        <Button>
          <Link href="/sign-up" className="flex">
            Join for Free
            <LogIn className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </main>
      <Footer />
    </div>
  );
}
