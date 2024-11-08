import { getUser } from "@/api/users";
import { AppSidebar } from "@/components/shared/app-sidebar";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/modules/auth/lib/hooks/providers/auth-provider";
import { signout } from "@/modules/auth/lib/services/supabase/actions";
import { createClient } from "@/modules/auth/lib/services/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.id) {
    return redirect("/auth/sign-in");
  }

  return (
    <AuthProvider getUser={getUser} userId={user.id}>
      <SidebarProvider>
        <AppSidebar />
        <div className="h-screen w-full flex-col md:flex">
          <Header title="Settings" />
          <main className="flex-1 space-y-4 p-8"></main>
          <Footer signout={signout} />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
