import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Agence",
  description: "Dashboard | Where Agencies meet their next Ace.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Header />
      <main></main>
      <Footer
        logout={async () => {
          "use server";
        }}
      />
    </div>
  );
}
