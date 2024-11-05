'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Dispatch custom events for navigation
    const dispatchNavigationStart = () => {
      window.dispatchEvent(new Event('next-route-start'));
    };

    const dispatchNavigationComplete = () => {
      window.dispatchEvent(new Event('next-route-complete'));
    };

    // Handle navigation
    dispatchNavigationStart();

    // Use RAF to ensure we're in the next frame
    requestAnimationFrame(() => {
      dispatchNavigationComplete();
    });
  }, [pathname, searchParams]);

  return null;
}
