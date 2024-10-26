"use client";

import { Chains } from "@/lib/types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type ChainContextType = {
  chain: Chains;
  setChain: Dispatch<SetStateAction<Chains>>;
};

const ChainContext = createContext<ChainContextType | undefined>(undefined);

function ChainProvider({ children }: { children: React.ReactNode }) {
  const [chain, setChain] = useState<Chains>("Near");

  return (
    <ChainContext.Provider value={{ chain, setChain }}>
      {children}
    </ChainContext.Provider>
  );
}

export { ChainContext, ChainProvider };
