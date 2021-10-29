import { useRef, useCallback, useEffect } from "react";

export default function useGetter<T>(value: T): () => T {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const getValue = useCallback(() => valueRef.current, []);

  return getValue;
}
