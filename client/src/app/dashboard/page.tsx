import { revalidateCache } from "@/api/cache";
import { getUser } from "@/api/users";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/actions";
import { createClient } from "@/modules/auth/lib/services/supabase/server";
import GigsTable from "@/modules/gigs/components/gigs-table";
import ProposalsTable from "@/modules/governance/components/proposals-table";
import AddStakeDialog from "@/modules/staking/components/add-stake-dialog";
import { LockIcon, TrendingUpIcon, WalletIcon, UnlockIcon } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Agence",
  description: "Dashboard | Where Agencies meet their next Ace.",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return redirect("/auth/sign-in");
  }

  return (
    <AuthProvider getUser={getUser} userId={user.id}>
      <div className="h-screen w-full flex-col md:flex">
        <Header title="Dashboard" />
        <main className="flex-1 space-y-4 px-8 py-4">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Available Balance
                </CardTitle>
                <UnlockIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$280.30</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Locked Balance
                </CardTitle>
                <LockIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$575.28</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Accrued Interest
                </CardTitle>
                <TrendingUpIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32.05</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <WalletIcon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$887.63</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <AddStakeDialog revalidateCache={revalidateCache} />
            <Button variant="destructive">Withdraw Funds</Button>
          </div>

          <Tabs defaultValue="gigs" className="space-y-4">
            <TabsList>
              <TabsTrigger value="gigs">Recent Gigs</TabsTrigger>
              <TabsTrigger value="proposals">Recent Proposals</TabsTrigger>
            </TabsList>
            <TabsContent value="gigs" className="space-y-8">
              <GigsTable pageSize={5} />
            </TabsContent>

            <TabsContent value="proposals" className="space-y-4">
              <ProposalsTable pageSize={5} />
            </TabsContent>
          </Tabs>
        </main>
        <Footer signout={signout} />
      </div>
    </AuthProvider>
  );
}
