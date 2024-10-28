"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useChain from "@/lib/hooks/use-chain";
import { useToast } from "@/lib/hooks/use-toast";
import useWallet from "@/lib/hooks/use-wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { utils as nearUtils } from "near-api-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  amount: z.coerce
    .number()
    .gte(0.1, { message: "Amount must be at least 0.1" }),
});

type Props = {
  revalidateCache: (path: string) => Promise<void>;
};

export default function DepositDialog({ revalidateCache }: Props) {
  const { wallet, signedAccountId } = useWallet();
  const [loading, setLoading] = useState(false);

  const { chain } = useChain();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0.1,
    },
  });

  if (!wallet || !chain) {
    return null;
  }

  const handleDeposit = async (values: z.infer<typeof formSchema>) => {
    const { amount } = values;
    setLoading(true);

    try {
      const balance = await wallet.getBalance(signedAccountId!);

      if (balance < amount) {
        toast({
          title: "Insufficient funds",
          description: `Your wallet balance is ${balance}.`,
        });

        return;
      }

      toast({
        title: "Please Sign Transaction",
        description: `You'll be redirected shortly to sign the transaction.`,
      });

      setTimeout(async () => {
        const parsedAmount = nearUtils.format.parseNearAmount(
          amount.toString(),
        );

        await wallet.callMethod({
          contractId: "staking.agence.testnet",
          deposit: parsedAmount!,
          method: "stake",
        });
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    revalidateCache("/dashboard");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Stake</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stake</DialogTitle>
          <DialogDescription>
            Add {chain} Tokens into the agence smart contract.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleDeposit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Deposit Amount</FormLabel>
                  <FormControl>
                    <Input placeholder={`Minimum 0.001 ${chain}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="default"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Deposit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
