import * as motion from "framer-motion/client";
import { Button } from "@/components/ui/button";
import Safari from "@/components/ui/safari";
import { Text } from "@/lib/styles/typography";
import Footer from "@/modules/auth/components/footer";
import Header from "@/modules/auth/components/header";
import { LogIn } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agence",
  description: "Where Agencies meet their next Ace.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Header />
      <main className="h-full w-full flex-col items-start justify-center">
        <motion.div
          animate={{ y: [120, 0] }}
          transition={{ ease: "anticipate", duration: 1 }}
        >
          <section className="my-36 flex flex-col items-center justify-center gap-32 text-center">
            <div className="flex h-fit w-full flex-col items-center justify-center gap-6">
              <Text variant="massive" className="max-w-[20ch]">
                Simplying the hiring process.
              </Text>

              <Link href="/auth/sign-in" className="flex items-center">
                <Button variant="default" size="lg">
                  Get Started
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="my-4 flex w-full flex-col items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                <Text variant="muted">Powered by</Text>
                <Image
                  src="/algorand.png"
                  alt="Algorand"
                  width={100}
                  height={100}
                />
              </span>

              <Safari
                url="https://ximon-agence-client.vercel.app/"
                className="h-full w-[80%]"
                // src="https://via.placeholder.com/1200x750"
                src="/banner.gif"
              />
            </div>
          </section>
        </motion.div>

        {/* <section className="h-12 relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg bg-background md:shadow-xl">
          <Text variant="muted" className="text-center">
            Powered by
          </Text>
          <Marquee className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
