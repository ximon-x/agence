import { getUser } from "@/api/users";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/actions";
import { createClient } from "@/modules/auth/lib/services/supabase/server";
import Component from "@/modules/messaging/ui";
import { redirect } from "next/navigation";

export default async function InboxPage() {
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
        <Header title="Inbox" />
        <main>
          <Component />
        </main>
        <Footer signout={signout} />
      </div>
    </AuthProvider>
  );
}
