import { useContext } from "react";

import { ChainContext } from "./providers/chain-provider";

export default function useChain() {
  const { chain, setChain } = useContext(ChainContext) ?? {};

  return { chain, setChain };
}
