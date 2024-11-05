import { revalidateCache } from "@/api/cache";
import { createProposal } from "@/api/proposals";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateProposalForm from "./create-proposal-form";

export default function CreateGigDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Proposal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Proposals</DialogTitle>
          <DialogDescription>
            Want to report something malicious? or want to suggest a new
            feature? Create a proposal
          </DialogDescription>
        </DialogHeader>

        <CreateProposalForm
          revalidateCache={revalidateCache}
          createProposal={createProposal}
        />
      </DialogContent>
    </Dialog>
  );
}
