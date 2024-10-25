import { env } from "@/lib/utils";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import {
  WalletSelectorModal,
  setupModal,
} from "@near-wallet-selector/modal-ui";
import { useEffect, useState } from "react";

interface Props {
  contractId:
    | "agence.testnet"
    | "governance.agence.testnet"
    | "staking.agence.testnet"
    | "gigs.agence.testnet";
}

export default function useWallet({ contractId }: Props) {
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);

  useEffect(() => {
    const bitteWallet = setupBitteWallet({
      walletUrl: env.NEXT_PUBLIC_WALLET_URL,
      callbackUrl: env.NEXT_PUBLIC_APP_URL,
      deprecated: false,
    });

    async function getSelector() {
      const selector = setupWalletSelector({
        network: "testnet",
        modules: [bitteWallet],
      });

      return selector;
    }

    getSelector().then((selector) => {
      const m = setupModal(selector, {
        // ! TODO: Replace this
        contractId: "guest-book.testnet",
      });

      setModal(m);
    });
  }, [contractId]);

  return { modal };
}
