'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

export function NextBreadcrumb() {
  const pathname = usePathname();
  const pathNames = pathname.split('/').filter((path) => path);

  return (
    <Breadcrumbs>
      <BreadcrumbItem key="home">
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      {pathNames.map((segment, index) => {
        const href = `/${pathNames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathNames.length - 1;
        const itemText = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <BreadcrumbItem key={href}>
            {isLast ? (
              itemText
            ) : (
              <Link href={href}>{itemText}</Link>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
