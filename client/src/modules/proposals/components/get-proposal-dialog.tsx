import { revalidateCache } from "@/api/cache";
import { getProposal } from "@/api/proposals";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import GetProposalForm from "./get-proposal-form";

export default function GetProposalsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Find Proposals</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find Proposals</DialogTitle>
          <DialogDescription>
            Input the ID of the proposal you want to find.
          </DialogDescription>
        </DialogHeader>

        <GetProposalForm
          revalidateCache={revalidateCache}
          getProposal={getProposal}
        />
      </DialogContent>
    </Dialog>
  );
}
