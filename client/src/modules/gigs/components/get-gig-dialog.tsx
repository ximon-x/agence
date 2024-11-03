import { revalidateCache } from "@/api/cache";
import { getGig } from "@/api/gigs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import GetGigForm from "./get-gig-form";

export default function GetGigDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Find Gig</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find Gig</DialogTitle>
          <DialogDescription>
            Input the ID of the gig you want to find.
          </DialogDescription>
        </DialogHeader>

        <GetGigForm revalidateCache={revalidateCache} getGig={getGig} />
      </DialogContent>
    </Dialog>
  );
}
