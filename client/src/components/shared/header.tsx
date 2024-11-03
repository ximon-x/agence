import { Text } from "@/lib/styles/typography";
import { env } from "@/lib/utils";

import AgenceIcon from "../icons/agence-icon";
import GithubIcon from "../icons/github-icon";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";
import WalletButton from "./wallet-button";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <header className="flex h-fit w-full items-center justify-between px-8 py-4">
      <div className="flex h-full w-fit items-center justify-between gap-2">
        <AgenceIcon size={50} />
        <Text variant="h1">{title}</Text>
      </div>

      <div className="flex h-full items-center gap-5">
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
