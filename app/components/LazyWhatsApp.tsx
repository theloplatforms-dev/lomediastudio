'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// The chat widget is not needed for first paint, so its code is fetched only once the browser is idle.
const FloatingWhatsApp = dynamic(() => import('./FloatingWhatsApp'), { ssr: false });

export default function LazyWhatsApp() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return ready ? <FloatingWhatsApp /> : null;
}
