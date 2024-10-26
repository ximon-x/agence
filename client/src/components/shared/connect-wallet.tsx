"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useChain from "@/lib/hooks/use-chain";
import { toast } from "@/lib/hooks/use-toast";
import useWallet from "@/lib/hooks/use-wallet";
import { Text } from "@/lib/styles/typography";
import { Check, Copy, Globe, LogIn, UserCheck2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function ConnectWallet() {
  const [copied, setCopied] = useState(false);
  const { chain, setChain } = useChain();
  const { wallet, signedAccountId } = useWallet();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Address Copied",
        description: "The wallet address has been copied to your clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {signedAccountId ? (
          <Button>{signedAccountId}</Button>
        ) : (
          <Button>
            Sign in
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Text variant="h1">Create Account</Text>
          </DialogTitle>
          <DialogDescription>
            <Text variant="lead">Select the chain you want to use.</Text>
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/**
         * TODO: Add support for multiple chains
         */}

        <Button
          type="button"
          variant="outline"
          onClick={() => setChain!("Near")}
          disabled={!!setChain || chain == "Near"}
        >
          <Globe className="mr-2 h-4 w-4" />
          NEAR Protocol
        </Button>

        <Separator />

        {signedAccountId ? (
          <div className="flex items-center justify-between rounded-lg bg-secondary p-2 transition-all duration-300 ease-in-out hover:shadow-md">
            <UserCheck2 className="h-4 w-4 text-green-500" />

            <span className="mr-2 cursor-pointer truncate font-mono text-sm">
              {signedAccountId}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(signedAccountId)}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}

              <span className="sr-only">Copy address</span>
            </Button>
          </div>
        ) : (
          <div className="flex-rol my-1 flex w-full justify-between">
            <Text variant="lead">No Active Wallet</Text>
          </div>
        )}

        <div className="my-4 flex justify-end gap-2">
          <Button
            onClick={() => wallet?.signIn()}
            variant="default"
            // disabled={!!wallet || !!signedAccountId}
          >
            Connect
          </Button>

          <Button
            onClick={() => wallet?.signOut()}
            variant="destructive"
            // disabled={!!wallet || !signedAccountId}
          >
            Disconnect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
