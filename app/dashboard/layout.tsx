'use client';

import { SideBar } from '@/components/common';
import { useDisclosure } from '@/hooks';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { opened, toggle } = useDisclosure();

  return (
    <main className="relative flex">
      <SideBar opened={opened} toggle={toggle} />
      <div className={`
        lg:ml-64 
        transition-margin duration-200 ease-in-out
        min-h-screen
        p-4
      `}
      >
        {children}
      </div>
    </main>
  );
}
