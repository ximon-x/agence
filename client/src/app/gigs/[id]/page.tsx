import { getUser } from "@/api/users";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/supabase/actions";
import { createClient } from "@/modules/auth/lib/services/supabase/server";
import { Calendar, CreditCard, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function GigPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return redirect("/auth/sign-in");
  }

  const gig = {
    id: 27,
    image: "https://picsum.photos/seed/6RYnNU86Ej/1397/128?grayscale&blur=8",
    agency: "Wilkinson, Renner and O'Hara",
    agenceAddress: "GKOQETWPLO4KR2UJGH3BM4LXLAJS5ZSZJNKAW2MHS7LDOWDNMQZWVC42MI",

    ace: "Lee Kulas",
    aceAddress: "4O2Z4HX3FRFCITXA4I73WVNGCTJW6F6GOJ57T46WCDW34TRNHA7HRHWG4E",
    description:
      "Need a Full Stack Blockchain developer with Algorand experience",
    type: "Full Time",
    bindingAmount: 50,
    status: "Completed",
    creationDate: "2024-11-02T10:45:32.741Z",
  };

  return (
    <AuthProvider getUser={getUser} userId={user.id}>
      <div className="h-screen w-full flex-col md:flex">
        <Header title="Gigs" />
        <main>
          <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Gig Details</h1>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Gig Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Gig ID
                      </span>
                      <span className="font-medium">{id || gig.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Amount
                      </span>
                      <span className="text-2xl font-bold">
                        ${gig.bindingAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Date
                      </span>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>
                          {new Date(gig.creationDate).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status
                      </span>
                      <Badge
                        variant={
                          gig.status === "Completed" ? "default" : "outline"
                        }
                      >
                        {gig.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Gig Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Type
                      </span>
                      <span>{gig.type}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-sm text-muted-foreground">
                        Description
                      </span>
                      <span className="text-sm">{gig.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Parties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 flex items-center text-lg font-semibold">
                        <User className="mr-2 h-5 w-5" />
                        Agency
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="text-sm text-muted-foreground">
                            Name:
                          </span>{" "}
                          {gig.agency}
                        </p>
                        <p>
                          <span className="text-sm text-muted-foreground">
                            Address:
                          </span>{" "}
                          {gig.agenceAddress}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 flex items-center text-lg font-semibold">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Ace
                      </h3>
                      <div className="space-y-2">
                        <p>
                          <span className="text-sm text-muted-foreground">
                            Name:
                          </span>{" "}
                          {gig.ace}
                        </p>
                        <p>
                          <span className="text-sm text-muted-foreground">
                            Address:
                          </span>{" "}
                          {gig.aceAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer signout={signout} />
      </div>
    </AuthProvider>
  );
}
