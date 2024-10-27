import { useContext } from "react";

import { NearContext } from "./providers/near-provider";
import useChain from "./use-chain";

export default function useWallet() {
  const { chain } = useChain();

  const { wallet, signedAccountId, setContractId } =
    useContext(NearContext) ?? {};

  switch (chain) {
    case "Near": {
      return {
        wallet,
        signedAccountId,
        setContractId,
      };
    }

    default: {
      return {};
    }
  }
}
