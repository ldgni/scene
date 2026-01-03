"use client";

import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

interface AuthButtonProps {
  isAuthenticated: boolean;
}

export default function AuthButton({ isAuthenticated }: AuthButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSignOut}
        disabled={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <LogOut />
            <span className="sr-only">Sign out</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/login">
        <LogIn />
        <span className="sr-only">Sign in</span>
      </Link>
    </Button>
  );
}
