"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn } from "@/lib/auth/auth-client";

export default function SignInDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
