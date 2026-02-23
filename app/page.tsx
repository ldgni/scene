import SearchInput from "@/components/search-input";

export default async function HomePage() {
  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Scene</h1>
        <p className="text-muted-foreground text-sm italic">
          Track your movies & TV shows
        </p>
      </div>
      <SearchInput />
    </>
  );
}
