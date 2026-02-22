import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchInput() {
  return (
    <InputGroup className="mx-auto max-w-xs">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
