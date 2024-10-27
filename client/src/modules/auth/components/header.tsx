import AgenceLogo from "@/components/icons/agence-logo";
import GithubIcon from "@/components/icons/github-icon";
import NavBar from "@/components/shared/nav-bar";
import ThemeToggle from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/utils";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-between px-5 py-5">
      <Link href="/">
        <AgenceLogo size={150} axis="width" />
      </Link>

      <NavBar />

      <div className="flex h-full items-center gap-4">
        <Button variant="outline" size="icon">
          <a target="_blank" href={env.NEXT_PUBLIC_CODE_URL}>
            <GithubIcon />
          </a>
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}
