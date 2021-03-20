import { useCallback } from "react";
import { debounce } from "lodash";

export function useDebouncedHandler(handler, duration = 1000) {
  return useCallback(debounce(handler, duration), []);
}
