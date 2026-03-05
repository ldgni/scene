"use client";

import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import SignInDialog from "@/components/sign-in-dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-client";

export default function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoggedIn) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Sign out"
        disabled={loading}
        onClick={async () =>
          await signOut({
            fetchOptions: {
              onSuccess: () => {
                router.refresh();
              },
              onRequest: () => {
                setLoading(true);
              },
              onResponse: () => {
                setLoading(false);
              },
            },
          })
        }>
        <LogOut />
        <span className="sr-only">Sign out</span>
      </Button>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Sign in"
        onClick={() => setDialogOpen(true)}>
        <LogIn />
        <span className="sr-only">Sign in</span>
      </Button>
      <SignInDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
