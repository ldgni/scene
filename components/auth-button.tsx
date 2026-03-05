"use client";

import { LogIn, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn, signOut } from "@/lib/auth/auth-client";

export default function AuthButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Sign in">
          <LogIn />
          <span className="sr-only">Sign in</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>Choose a provider to sign in</DialogDescription>
        </DialogHeader>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() =>
            signIn.social({
              provider: "github",
              callbackURL: pathname,
              fetchOptions: {
                onRequest: () => {
                  setLoading(true);
                },
                onResponse: () => {
                  setLoading(false);
                },
              },
            })
          }>
          <FaGithub /> Continue with GitHub
        </Button>
        <Button
          variant="outline"
          disabled={loading}
          onClick={() =>
            signIn.social({
              provider: "google",
              callbackURL: pathname,
              fetchOptions: {
                onRequest: () => {
                  setLoading(true);
                },
                onResponse: () => {
                  setLoading(false);
                },
              },
            })
          }>
          <FaGoogle /> Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
