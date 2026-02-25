import { CornerDownLeft, Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchBar() {
  return (
    <form action="/search">
      <InputGroup className="mx-auto max-w-xs">
        <InputGroupInput name="q" placeholder="Search..." autoComplete="off" />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <CornerDownLeft />
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
