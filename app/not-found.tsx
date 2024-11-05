'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { Suspense } from 'react';

export default function NothingFoundBackground() {
  const router = useRouter();
  return (
    <Suspense fallback={<div />}>
      <div className="container">
        <div>
          <div>
            <p>Nothing to see here</p>
            <p
              className="text-center"
            >
              Page you are trying to open does not exist. You may have mistyped
              the address, or the page has been moved to another URL. If you think
              this is an error contact support.
            </p>
            <div>
              <Button size="md" onClick={() => router.push('/')}>
                Take me back to home page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
