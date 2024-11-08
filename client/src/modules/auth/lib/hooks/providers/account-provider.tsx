"use client";

import { Gig } from "@/modules/gigs/types";
import { Proposal } from "@/modules/proposals/types";
import { useWallet } from "@txnlab/use-wallet-react";
import { createContext, useEffect, useState } from "react";

import { getAccount } from "../../services/algorand/actions";

export type Account = {
  address: string;
  role: string;
  locked_stake: number;
  available_stake: number;
  total_stake: number;
  Gigs: Gig[];
  Proposals: Proposal[];
};

export type AccountContextType = {
  account?: Account;
};

export const AuthContext = createContext<AccountContextType>({});

type Props = {
  children: React.ReactNode;
};

export function AccountProvider(props: Props) {
  const { children } = props;
  const { algodClient, activeAddress, transactionSigner } = useWallet();

  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    if (!activeAddress) {
      return;
    }

    const fetchUser = async () =>
      await getAccount({
        activeAddress,
        algodClient,
      });

    fetchUser().then((account) => {
      if (account instanceof Error) {
        console.error(account.message);
        return;
      }

      setAccount(account);
    });
  }, [activeAddress, algodClient, transactionSigner]);

  return (
    <AuthContext.Provider value={{ account }}>{children}</AuthContext.Provider>
  );
}
