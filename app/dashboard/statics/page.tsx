'use client';

import { Suspense } from 'react';

export default function StaticsPage() {
  return (
    <Suspense fallback={<div />}>
      Statics Page
    </Suspense>
  );
}
