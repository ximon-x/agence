// import { getUser } from "@/api/users";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
// import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/supabase/actions";
// import { createClient } from "@/modules/auth/lib/services/supabase/server";
import CreateProposalDialog from "@/modules/proposals/components/create-proposal-dialog";
import GetProposalDialog from "@/modules/proposals/components/get-proposal-dialog";
import ProposalsTable from "@/modules/proposals/components/proposals-table";

// import { redirect } from "next/navigation";

export default async function ProposalsPage() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user || !user.id) {
  //   return redirect("/auth/sign-in");
  // }

  return (
    // <AuthProvider getUser={getUser} userId={user.id}>
    <div className="min-h-screen w-full flex-col md:flex">
      <Header title="Proposals" />
      <main className="space-y-4 px-8">
        <div className="flex items-center justify-end gap-4">
          <CreateProposalDialog />
          <GetProposalDialog />
        </div>
        <ProposalsTable pageSize={8} className="col-span-2" />
      </main>
      <Footer signout={signout} />
    </div>
    // </AuthProvider>
  );
}
