"use client";

import { IWallet } from "@/lib/interfaces";
import { NearWallet } from "@/lib/services/wallets/near-wallet";
import { ContractId, Network } from "@/lib/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type NearContextType = {
  wallet?: IWallet;
  signedAccountId: string;
  setContractId: Dispatch<SetStateAction<ContractId>>;
};

export const NearContext = createContext<NearContextType | undefined>(
  undefined,
);

type Props = {
  network: Network;
  children: React.ReactNode;
};

export function NearProvider({ children, network }: Props) {
  const [signedAccountId, setSignedAccountId] = useState("");
  const [contractId, setContractId] = useState<ContractId>(
    "staking.agence.testnet",
  );

  const wallet = useMemo(
    () => new NearWallet({ network, contractId }),
    [network, contractId],
  );

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, [wallet]);

  return (
    <NearContext.Provider value={{ signedAccountId, wallet, setContractId }}>
      {children}
    </NearContext.Provider>
  );
}
