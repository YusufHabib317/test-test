/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import { useIsMounted } from '@/hooks';

interface LoadingWrapperProps {
  isPending?: boolean;
  children: React.ReactNode;
}

export function LoadingWrapper({ isPending = false, children }: LoadingWrapperProps) {
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMounted && !isPending) {
      setIsLoading(false);
    }
  }, [isMounted, isPending]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="Please Wait..." />
      </div>
    );
  }

  return <>{children}</>;
}
