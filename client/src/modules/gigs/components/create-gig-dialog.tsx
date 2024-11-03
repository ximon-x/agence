import { revalidateCache } from "@/api/cache";
import { createGig } from "@/api/gigs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import CreateGigForm from "./create-gig-form";

export default function CreateGigDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Gig</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Gig</DialogTitle>
          <DialogDescription>
            Only for Agencies that have enough funds staked to cover the binding
            amount.{" "}
          </DialogDescription>
        </DialogHeader>

        <CreateGigForm
          revalidateCache={revalidateCache}
          createGig={createGig}
        />
      </DialogContent>
    </Dialog>
  );
}
