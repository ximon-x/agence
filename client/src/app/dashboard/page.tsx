import { revalidateCache } from "@/api/cache";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddStakeDialog from "@/modules/staking/components/add-stake-dialog";
import { LockIcon, TrendingUpIcon, WalletIcon, UnlockIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Agence",
  description: "Dashboard | Where Agencies meet their next Ace.",
};

export default function DashboardPage() {
  return (
    <div className="h-screen flex-col md:flex">
      <Header />
      <main className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between space-y-2"></div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staking">Stakings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Available Balance
                  </CardTitle>
                  <UnlockIcon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$30</div>
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
                  <div className="text-2xl font-bold">$30</div>
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
                  <div className="text-2xl font-bold">$30</div>
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
                  <div className="text-2xl font-bold">$30</div>
                </CardContent>
              </Card>
            </div>

            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <DashboardChart />
              <DashboardRecent />
            </div> */}
          </TabsContent>

          <TabsContent value="staking" className="space-y-4">
            Staking
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            Analytics
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-end space-x-4">
          <AddStakeDialog revalidateCache={revalidateCache} />
          <Button variant="destructive">Withdraw Funds</Button>
        </div>
      </main>
      <Footer
        logout={async () => {
          "use server";
        }}
      />
    </div>
  );
}
