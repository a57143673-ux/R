import { useState, useCallback } from 'react';

const KEY = 'safsaf-favorites';

function load(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>(load);

  const toggle = useCallback((id: string) => {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFav = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, isFav };
}
