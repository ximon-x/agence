import AgenceLogo from "../icons/agence-logo";
import NavBar from "./nav-bar";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-evenly py-5">
      <section className="py-cs-4 flex w-full items-center justify-evenly">
        <AgenceLogo size={150} axis="width" />
        <NavBar />
        <div className="flex h-full items-center">
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
}
