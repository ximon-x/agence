import { env } from "@/lib/utils";

import AgenceLogo from "../icons/agence-logo";
import GithubIcon from "../icons/github-icon";
import { Button } from "../ui/button";
import NavBar from "./nav-bar";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-evenly py-5">
      <section className="py-cs-4 flex w-full items-center justify-evenly">
        <AgenceLogo size={150} axis="width" />
        <NavBar />
        <div className="flex h-full items-center gap-4">
          <Button variant="outline" size="icon">
            <a target="_blank" href={env.NEXT_PUBLIC_CODE_URL}>
              <GithubIcon />
            </a>
          </Button>

          <ThemeToggle />
        </div>
      </section>
    </header>
  );
}
