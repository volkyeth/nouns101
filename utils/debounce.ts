import { useEffect, useState } from "react";

export const useDebounce = <T>(
  state: T,
  delay: number
): { debouncedState: T; changed: boolean } => {
  const [debouncedState, setDebouncedState] = useState<T>(state);
  const changed = state !== debouncedState;

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedState(state), delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [state, delay]);

  return { debouncedState, changed };
};
