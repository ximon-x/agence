import AgenceLogo from "../icons/agence-logo";
import ConnectWallet from "./connect-wallet";
import NavBar from "./nav-bar";

export default function Header() {
  return (
    <header className="flex h-fit w-full items-center justify-evenly py-5">
      <section className="py-cs-4 flex w-full items-center justify-evenly">
        <AgenceLogo size={300} axis="width" />
        <NavBar />
        <div className="flex h-full gap-2">
          <ConnectWallet />
        </div>
      </section>
    </header>
  );
}
