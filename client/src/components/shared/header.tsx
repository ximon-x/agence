import { env } from "@/lib/utils";
import Link from "next/link";

import AgenceIcon from "../icons/agence-icon";
import GithubIcon from "../icons/github-icon";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-between">
      <div className="flex h-full items-center gap-5 px-5">
        <Link href="/">
          <AgenceIcon size={75} />
        </Link>
      </div>

      <nav className="flex h-full items-center gap-5 px-5">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          href="/gigs"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Gigs
        </Link>
      </nav>

      <div className="flex h-full items-center gap-5 px-5">
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
