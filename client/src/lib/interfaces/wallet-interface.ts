import { Transaction as NearTransaction } from "@near-wallet-selector/core";
import { Dispatch, SetStateAction } from "react";

import { ContractId, Network } from "../types";

type CallMethod = {
  contractId: ContractId;
  method: string;
  args?: Record<string, unknown>;
  gas?: string;
  deposit?: string;
};

type ViewMethod = {
  contractId: ContractId;
  method: string;
  args?: Record<string, unknown>;
};

type SignAndSendTransactions = {
  transactions: NearTransaction[];
};

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

  callMethod: (args: CallMethod) => Promise<unknown>;

  viewMethod: (args: ViewMethod) => Promise<unknown>;

  signAndSendTransactions: (args: SignAndSendTransactions) => Promise<unknown>;
}
