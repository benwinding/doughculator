import React from "react";

export function useId(label: string) {
  const id = React.useMemo(
    () => label.replace(/[^A-Z0-9]+/ig, "_"),
  [label]);
  return id;
}
