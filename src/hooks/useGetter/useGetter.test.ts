import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useGetter from './useGetter';

function useCount(number: number) {
  const [count, setCount] = useState(number);

  const getCount = useGetter(count);
  // const getCount = () => count;

  return { count, setCount, getCount };
}

describe('useGetter hook', () => {
  it('should maintain getter reference after change state', () => {
    const { result } = renderHook(() => useCount(1));

    const previousRef = result.current.getCount;

    expect(result.current.count).toBe(1);
    expect(result.current.getCount()).toBe(1);

    act(() => result.current.setCount(10));

    expect(result.current.count).toBe(10);
    expect(result.current.getCount()).toBe(10);

    expect(previousRef).toBe(result.current.getCount);
  });
});
