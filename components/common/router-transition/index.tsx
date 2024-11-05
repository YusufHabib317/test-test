/* eslint-disable sonarjs/no-identical-functions */

'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@nextui-org/react';

export function RouterTransition() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      setProgress(20);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    };

    const handleError = () => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 200);
    };

    const handleDocumentLoading = () => {
      if (document.readyState === 'complete') {
        handleComplete();
      }
    };

    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);
    document.addEventListener('readystatechange', handleDocumentLoading);

    window.addEventListener('next-route-start', handleStart);
    window.addEventListener('next-route-complete', handleComplete);
    window.addEventListener('next-route-error', handleError);

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      if (link?.getAttribute('href')?.startsWith('/')) {
        handleStart();
      }
    };

    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
      document.removeEventListener('readystatechange', handleDocumentLoading);
      window.removeEventListener('next-route-start', handleStart);
      window.removeEventListener('next-route-complete', handleComplete);
      window.removeEventListener('next-route-error', handleError);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <Progress
      size="sm"
      aria-label="Navigation progress"
      value={progress}
      className="fixed top-0 left-0 right-0 z-[9999]"
      classNames={{
        base: 'h-[2px]',
        track: '!bg-transparent',
        indicator: 'transition-all duration-200 ease-in-out',
      }}
      color="primary"
      isIndeterminate={loading && progress < 100}
      radius="none"
    />
  );
}
