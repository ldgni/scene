import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SearchResult } from "@/lib/types";
import { getMediaTitle, getMediaYear } from "@/lib/utils";

export default function SearchResultCard({ result }: { result: SearchResult }) {
  const title = getMediaTitle(result);
  const year = getMediaYear(result);
  const href = `/${result.media_type}/${result.id}`;

  return (
    <Link href={href}>
      <Card className="hover:border-primary shadow-none transition-colors">
        <CardHeader>
          <CardTitle>
            {title}{" "}
            <span className="text-muted-foreground text-xs">({year})</span>
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {result.overview}
          </CardDescription>
          <CardAction className="flex items-center gap-2">
            <Badge variant="secondary">
              {result.media_type === "movie" ? "Movie" : "TV"}
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
