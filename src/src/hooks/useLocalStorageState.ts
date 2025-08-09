import { useEffect, useRef, useState } from "react";

export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: (prev: T) => T) => void] {
  const [state, setState] = useState(initialValue);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) return;

    firstRender.current = false;

    const stored = localStorage.getItem(key);
    if (stored !== null) {
      setState(JSON.parse(stored) as T);
    }
  }, []);

  const setLocalStorageState = (value: (prev: T) => T) => {
    setState((prev) => {
      let val = value(prev);
      localStorage.setItem(key, JSON.stringify(val));
      return val;
    });
  };

  return [state, setLocalStorageState];
}
