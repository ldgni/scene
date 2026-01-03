import { Film } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MovieNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <Film />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="text-muted-foreground">
          The movie you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to search</Link>
      </Button>
    </div>
  );
}
