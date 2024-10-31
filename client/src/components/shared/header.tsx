import { Text } from "@/lib/styles/typography";
import { env } from "@/lib/utils";

import GithubIcon from "../icons/github-icon";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ThemeToggle from "./theme-toggle";
import WalletButton from "./wallet-button";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-between p-8">
      <div className="flex h-full w-fit items-center justify-between gap-8">
        <Text variant="h1">Dashboard</Text>

        <Input
          type="search"
          placeholder="Enter Gig ID"
          className="md:w-[100px] lg:w-[300px]"
        />
      </div>

      <div className="flex h-full items-center gap-5 px-5">
        <WalletButton />

        <a target="_blank" href={env.NEXT_PUBLIC_CODE_URL}>
          <Button variant="outline" size="icon">
            <GithubIcon />
          </Button>
        </a>

        <ThemeToggle />
      </div>
    </header>
  );
}
