import { headers } from "next/headers";

import AuthForm from "@/components/auth-form";
import SignOutButton from "@/components/sign-out-button";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1>Hello, {session.user.name}!</h1>
      <SignOutButton />
    </div>
  );
}
