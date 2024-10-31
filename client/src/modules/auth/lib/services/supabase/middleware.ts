import { env } from "@/lib/utils";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/staking", "/onboarding"];

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const user = await supabase.auth.getUser();

  // User is not signed and in landing page.
  if (request.nextUrl.pathname === "/" && user.error) {
    return response;
  }

  // User is signed and in landing page.
  if (request.nextUrl.pathname === "/" && !user.error) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // User is not signed and in protected route.
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    user.error
  ) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // User is signed and in protected route but not onboarded.
  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    user.data?.user?.user_metadata?.onboarded !== true
  ) {
    return NextResponse.redirect(new URL("/auth/onboarding", request.url));
  }

  return response;
};
