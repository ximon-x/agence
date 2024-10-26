import { Dispatch, SetStateAction } from "react";

import { ContractId, Network } from "../types";

export interface IWallet {
  contractId?: ContractId;
  network: Network;

  startUp: (
    accountChangeHook: Dispatch<SetStateAction<string>>,
  ) => Promise<string>;

  signIn: () => Promise<void>;

  signOut: () => Promise<void>;

  getBalance: (accountId: string) => Promise<number>;

  getTransactionResult: (accountId: string) => Promise<JSON>;
}
