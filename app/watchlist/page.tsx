import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getWatchlist } from "@/lib/actions";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Watchlist",
};

export default async function WatchlistPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const items = await getWatchlist();

  return (
    <div className="space-y-8">
      <h1 className="text-center text-2xl font-extrabold tracking-tight">
        Watchlist
      </h1>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center">
          Your watchlist is empty.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link
                    href={`/${item.mediaType}/${item.tmdbId}`}
                    className="hover:underline">
                    {item.title}
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  {item.mediaType === "movie" ? "Movie" : "TV"}
                </TableCell>
                <TableCell className="text-center">{item.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
