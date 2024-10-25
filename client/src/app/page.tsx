import ConnectWallet from "@/components/shared/connect-wallet";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agence",
  description: "Where Agencies meet their next Ace.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Header />
      <main className="flex h-full w-full flex-col items-center justify-center">
        <ConnectWallet />
        {/* <ShineBorder className="my-10 flex flex-col items-center justify-evenly bg-secondary dark:bg-secondary">
          <section className="m-10 flex flex-col items-center justify-center gap-2">
            <Text variant="massive">Friendly Finance</Text>
            <Text variant="lead">Your Friendly Neighbourhood Bank</Text>
          </section>
          <section className="m-10 flex items-center justify-center">
            <RainbowNavigationButton path="/sign-up">
              Get Started
            </RainbowNavigationButton>
          </section>
        </ShineBorder> */}
      </main>
      <Footer />
    </div>
  );
}
