"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useQueryParam(
  key: string,
  onMatch: (value: string | null) => void,
  expectedValue?: string
) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const value = searchParams.get(key);

    if (expectedValue !== undefined) {
      if (value === expectedValue) {
        onMatch(value);
      }
    } else {
      onMatch(value);
    }
  }, [searchParams, key, expectedValue, onMatch]);
}
