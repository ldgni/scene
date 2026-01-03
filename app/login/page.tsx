import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthForm from "@/components/auth-form";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login - Scene",
  description: "Sign in or create an account",
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center">
      <AuthForm />
    </div>
  );
}

