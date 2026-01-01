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
      <div className="grid place-items-center gap-2">
        <h1 className="text-4xl font-bold sm:text-6xl">Scene</h1>
        <p className="text-muted-foreground mb-2 italic">
          Keep track of your movie watchlist
        </p>
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
