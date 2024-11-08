import { AgenceGovernanceClient } from "@/lib/interfaces/algorand/contract-clients/AgenceGovernanceClient";
import { Role } from "@/lib/types";
import { AGENCE_GOVERNANCE_ID, AGENCE_STAKING_ID } from "@/lib/utils/constants";
import { CoreAppCallArgs } from "@algorandfoundation/algokit-utils/types/app";
import {
  AppClientCallCoreParams,
  AppDetails,
} from "@algorandfoundation/algokit-utils/types/app-client";
import algosdk, { TransactionSigner } from "algosdk";

import { Account } from "../../hooks/providers/account-provider";

type GetAccountParams = {
  activeAddress: string;
  algodClient: algosdk.Algodv2;
};
export async function getAccount({
  algodClient,
  activeAddress,
}: GetAccountParams): Promise<Account | Error> {
  try {
    const boxesReponse = await algodClient
      .getApplicationBoxByName(AGENCE_STAKING_ID, Buffer.from(activeAddress))
      .do();

    console.log(boxesReponse);

    const account: Account = {
      address: "",
      role: "",
      locked_stake: 0,
      available_stake: 0,
      total_stake: 0,
      Gigs: [],
      Proposals: [],
    };

    return account;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }

    throw error;
  }
}

type RegisterParams = {
  activeAddress: string;
  algodClient: algosdk.Algodv2;
  signer: TransactionSigner;
  role: Role;
};
export async function register({
  algodClient,
  activeAddress,
  signer,
  role,
}: RegisterParams) {
  const appDetails: AppDetails = {
    id: AGENCE_GOVERNANCE_ID,
    resolveBy: "id",
    sender: {
      signer,
      addr: activeAddress,
    },
  };

  const governanceClient = new AgenceGovernanceClient(appDetails, algodClient);

  const params: AppClientCallCoreParams & CoreAppCallArgs = {};

  const { transaction: txID } = await governanceClient.register(
    { role },
    params,
  );

  return txID;
}
