import { headers } from "next/headers";

import SignInButtons from "@/components/sign-in-buttons";
import SignOutButton from "@/components/sign-out-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Scene</h1>
        <p className="text-muted-foreground text-sm italic">
          Track your movies & TV shows
        </p>
      </div>
      {session ? (
        <div className="space-y-4 text-center">
          <p>Welcome {session.user.name}!</p>
          <SignOutButton />
        </div>
      ) : (
        <Card className="mx-auto max-w-xs">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <SignInButtons />
          </CardContent>
        </Card>
      )}
    </>
  );
}
