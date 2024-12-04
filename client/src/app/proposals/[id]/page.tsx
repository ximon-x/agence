// import { getUser } from "@/api/users";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
// import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/supabase/actions";
// import { createClient } from "@/modules/auth/lib/services/supabase/server";
import { User, ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";

// import { redirect } from "next/navigation";

export default async function ProposalPage({}: { params: { id: string } }) {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user || !user.id) {
  //   return redirect("/auth/sign-in");
  // }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const proposal = {
    id: 3,
    proposer: "Sarah Johnson",
    description: "Ace keeps requesting that I send my private key to them.",
    offender: "Schowalter and Sons",
    proposalKind: "Report Scam",
    proposalStatus: "Pending",
    votes: {
      approve: 29,
      reject: 65,
      remove: 57,
    },
    submissionTime: "2024-11-03T20:18:56.508Z",
  };

  const discussionThread = [
    {
      id: 1,
      user: "Sarah Johnson",
      timestamp: "2 hours ago",
      content:
        "Hello Everyone. I hired an ace last month and I believe they have malicious intent as they have, on numerous occasions requested that I share my personal private key with them for 'development purposes'.",
    },
    {
      id: 2,
      user: "Mike Chen",
      timestamp: "1 hour 45 minutes ago",
      content:
        "That's a serious accusation, Sarah. Do you have any concrete evidence? We need to be absolutely sure before taking any action.",
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      timestamp: "1 hour 30 minutes ago",
      content:
        "I'm with Sarah on this. I've also noticed some odd behavior from the freelancer. They've been asking for access to areas of the project that aren't relevant to their assigned tasks. We should investigate further.",
    },
    {
      id: 4,
      user: "Alex Thompson",
      timestamp: "1 hour 15 minutes ago",
      content:
        "Hold on, everyone. Let's not jump to conclusions. Sarah and Emily, can you provide specific examples of what you've observed?",
    },
    {
      id: 5,
      user: "Sarah Johnson",
      timestamp: "1 hour ago",
      content:
        "I have updated the proposal to include screenshots of our conversations. Kindly review them.",
    },
  ];

  const totalVotes =
    proposal.votes.approve + proposal.votes.reject + proposal.votes.remove;

  return (
    // <AuthProvider getUser={getUser} userId={user.id}>
    <div className="h-screen w-full flex-col md:flex">
      <Header title={"Proposals"} />
      <main className="grid grid-cols-3 gap-6 px-8">
        <Card className="">
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Proposer</h3>
                <p>{proposal.proposer}</p>
              </div>
              <div>
                <h3 className="font-semibold">Description</h3>
                <p>{proposal.description}</p>
              </div>
              <div>
                <h3 className="font-semibold">Offender</h3>
                <p>{proposal.offender}</p>
              </div>
              <div>
                <h3 className="font-semibold">Proposal Kind</h3>
                <Badge>{proposal.proposalKind}</Badge>
              </div>
              <div>
                <h3 className="font-semibold">Status</h3>
                <Badge variant="outline">{proposal.proposalStatus}</Badge>
              </div>
              <div>
                <h3 className="font-semibold">Votes</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-green-600">
                      Approve: {proposal.votes.approve}
                    </span>
                    <Progress
                      value={(proposal.votes.approve / totalVotes) * 100}
                      className="mt-1 h-2"
                    />
                  </div>
                  <div>
                    <span className="text-red-600">
                      Reject: {proposal.votes.reject}
                    </span>
                    <Progress
                      value={(proposal.votes.reject / totalVotes) * 100}
                      className="mt-1 h-2"
                    />
                  </div>
                  <div>
                    <span className="text-yellow-600">
                      Remove: {proposal.votes.remove}
                    </span>
                    <Progress
                      value={(proposal.votes.remove / totalVotes) * 100}
                      className="mt-1 h-2"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Submission Time</h3>
                <p>{formatDate(proposal.submissionTime)}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="default" className="mr-2 flex-1">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button variant="destructive" className="mx-2 flex-1">
              <ThumbsDown className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button variant="secondary" className="ml-2 flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Discussion Thread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussionThread.map((post, index) => (
                <div
                  key={post.id}
                  className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 ${index % 2 === 0 ? "mr-3" : "ml-3"}`}
                    >
                      <User className="h-6 w-6 text-gray-600" />
                    </div>
                    <div
                      className={`space-y-2 ${index % 2 === 0 ? "text-left" : "text-right"}`}
                    >
                      <h3 className="font-semibold">{post.user}</h3>
                      <div
                        className={`rounded-lg p-3 ${index % 2 === 0 ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"}`}
                      >
                        <p className="text-sm">{post.content}</p>
                      </div>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer signout={signout} />
    </div>
    // </AuthProvider>
  );
}
