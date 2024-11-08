"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/hooks/use-toast";
import { useWallet } from "@txnlab/use-wallet-react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import useAccount from "../lib/hooks/use-account";
import UseAuth from "../lib/hooks/use-auth";
import { register } from "../lib/services/algorand/actions";

export function AccountAlert() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { activeAddress, transactionSigner, algodClient } = useWallet();
  const { account } = useAccount();
  const { user } = UseAuth();

  useEffect(() => {
    if (account || !activeAddress || !user) {
      return;
    }

    setOpen(true);

    return () => {
      setOpen(false);
    };
  }, [account, activeAddress, user]);

  const handleApprove = async () => {
    setLoading(() => true);

    if (account || !activeAddress || !user) {
      return;
    }

    try {
      const txID = await register({
        algodClient,
        activeAddress,
        signer: transactionSigner,
        role: user.role,
      });

      toast({
        title: "Success",
        description: `Transaction ${txID} submitted`,
        variant: "default",
      });

      setOpen(false);
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please approve the transaction</AlertDialogTitle>
          <AlertDialogDescription>
            To use the app, you need to register a new account on the smart
            contract.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleApprove}>
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {loading ? "Approving..." : "Approve"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
