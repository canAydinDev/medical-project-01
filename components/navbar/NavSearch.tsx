import React from "react";
import { Input } from "../ui/input";

function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="search model..."
      className="max-w-xs dark:bg-muted"
    />
  );
}

export default NavSearch;
