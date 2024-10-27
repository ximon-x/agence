import { IWallet } from "@/lib/interfaces";
import { ContractId, Network } from "@/lib/types";
import { env, formatToNearGas } from "@/lib/utils";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { Transaction } from "@near-wallet-selector/core";
import {
  WalletSelector,
  setupWalletSelector,
} from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import "@near-wallet-selector/modal-ui/styles.css";
import { providers, utils } from "near-api-js";
import { Dispatch, SetStateAction } from "react";

const THIRTY_TGAS = formatToNearGas({ gas: 30 });
const NO_DEPOSIT = "0";

export class NearWallet implements IWallet {
  contractId?: ContractId;
  network: Network;
  selector?: Promise<WalletSelector>;

  constructor({
    network,
    contractId,
  }: {
    network: Network;
    contractId?: ContractId;
  }) {
    this.contractId = contractId;
    this.network = network;
  }

  startUp = async (
    accountChangeHook: Dispatch<SetStateAction<string>>,
  ): Promise<string> => {
    this.selector = setupWalletSelector({
      network: this.network,
      modules: [
        setupBitteWallet({
          walletUrl: env.NEXT_PUBLIC_WALLET_URL,
          callbackUrl: `${env.NEXT_PUBLIC_APP_URL}/transactions`,
          deprecated: false,
        }),
      ],
    });

    const walletSelector = await this.selector;
    const isSignedIn = walletSelector.isSignedIn();

    const accountId = isSignedIn
      ? walletSelector.store.getState().accounts[0].accountId
      : "";

    walletSelector.store.observable.subscribe(async (state) => {
      const signedAccount = state?.accounts.find(
        (account) => account.active,
      )?.accountId;
      accountChangeHook(signedAccount || "");
    });

    return accountId;
  };

  signIn = async () => {
    const modal = setupModal(await this.selector!, {
      contractId: this.contractId!,
    });

    modal.show();
  };

  signOut = async () => {
    const selectedWallet = await (await this.selector!).wallet();

    selectedWallet.signOut();
  };

  getBalance = async (accountId: string) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector!.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const account = await provider.query({
      request_type: "view_account",
      account_id: accountId,
      finality: "final",
    });

    // @ts-expect-error The returned result is not typed
    return account.amount
      ? // @ts-expect-error The returned result is not typed
        Number(utils.format.formatNearAmount(account.amount))
      : 0;
  };

  getTransactionResult = async (txhash: string) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector!.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    const transaction = await provider.txStatus(txhash, "unnused");
    return providers.getTransactionLastResult(transaction);
  };

  viewMethod = async ({
    contractId,
    method,
    args = {},
  }: {
    contractId: ContractId;
    method: string;
    args?: Record<string, unknown>;
  }) => {
    const url = `https://rpc.${this.network}.near.org`;
    const provider = new providers.JsonRpcProvider({ url });

    const res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic",
    });

    // @ts-expect-error The returned result is not typed
    return JSON.parse(Buffer.from(res.result).toString());
  };

  callMethod = async ({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT,
  }: {
    contractId: ContractId;
    method: string;
    args?: Record<string, unknown>;
    gas?: string;
    deposit?: string;
  }) => {
    const selectedWallet = await (await this.selector!).wallet();

    const outcome = await selectedWallet.signAndSendTransaction({
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    // @ts-expect-error The returned result is not typed
    return providers.getTransactionLastResult(outcome);
  };

  signAndSendTransactions = async ({
    transactions,
  }: {
    transactions: Transaction[];
  }) => {
    const selectedWallet = await (await this.selector!).wallet();
    return selectedWallet.signAndSendTransactions({ transactions });
  };

  getAccessKeys = async (accountId: string) => {
    const walletSelector = await this.selector;
    const { network } = walletSelector!.options;

    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    // Retrieve account state from the network
    const keys = await provider.query({
      request_type: "view_access_key_list",
      account_id: accountId,
      finality: "final",
    });

    // @ts-expect-error The returned result is not typed
    return keys.keys;
  };
}
