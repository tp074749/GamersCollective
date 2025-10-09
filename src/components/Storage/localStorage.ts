//localStorage.ts
import { useEffect, useRef, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  const keyRef = useRef(key);
  useEffect(() => { keyRef.current = key; }, [key]);

  // persist on change
  useEffect(() => {
    try { localStorage.setItem(keyRef.current, JSON.stringify(value)); } catch {}
  }, [value]);

  // cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== keyRef.current) return;
      try { setValue(e.newValue ? (JSON.parse(e.newValue) as T) : initial); } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [initial]);

  return [value, setValue] as const;
}
