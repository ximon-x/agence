import { AgenceGovernanceClient } from "@/lib/interfaces/algorand/contract-clients/AgenceGovernanceClient";
import { AGENCE_GOVERNANCE_ID } from "@/lib/utils/constants";
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client";
import { Algodv2, TransactionSigner, ALGORAND_MIN_TX_FEE } from "algosdk";

type AddStake = {
  amount: number;
  algodClient: Algodv2;
  signer: TransactionSigner;
  activeAddress: string;
};

export async function addStake({
  algodClient,
  signer,
  activeAddress,
}: AddStake) {
  const appDetails = {
    resolveBy: "id",
    id: AGENCE_GOVERNANCE_ID,
    sender: { signer, addr: activeAddress } as TransactionSignerAccount,
  } as AppDetails;

  const governanceClient = new AgenceGovernanceClient(appDetails, algodClient);

  await governanceClient.deposit(
    {},
    {
      sendParams: {
        fee: AlgoAmount.MicroAlgos(ALGORAND_MIN_TX_FEE),
      },
    },
  );
}

export async function register({
  algodClient,
  signer,
  activeAddress,
}: AddStake) {
  const appDetails = {
    resolveBy: "id",
    id: AGENCE_GOVERNANCE_ID,
    sender: { signer, addr: activeAddress } as TransactionSignerAccount,
  } as AppDetails;

  const governanceClient = new AgenceGovernanceClient(appDetails, algodClient);

  await governanceClient.register(
    {
      role: "Ace",
    },
    {
      sendParams: {
        fee: AlgoAmount.MicroAlgos(ALGORAND_MIN_TX_FEE),
      },
    },
  );
}

export async function unstake({
  algodClient,
  signer,
  activeAddress,
}: AddStake) {
  const appDetails = {
    resolveBy: "id",
    id: AGENCE_GOVERNANCE_ID,
    sender: { signer, addr: activeAddress } as TransactionSignerAccount,
  } as AppDetails;

  const governanceClient = new AgenceGovernanceClient(appDetails, algodClient);

  await governanceClient.register(
    {
      role: "Ace",
    },
    {
      sendParams: {
        fee: AlgoAmount.MicroAlgos(ALGORAND_MIN_TX_FEE),
      },
    },
  );
}
