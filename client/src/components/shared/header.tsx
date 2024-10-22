import AppLogo from "../icons/app-logo";
import NavBar from "./nav-bar";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-evenly py-5">
      <section className="py-cs-4 flex w-full items-center justify-evenly">
        <AppLogo size={250} axis="width" />
        <NavBar />
        <div className="gap-cs-2 flex h-full">
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
}
