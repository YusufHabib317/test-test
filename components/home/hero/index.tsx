'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';
import { Chip, Button } from '@nextui-org/react';
import { ThemeSwitch } from '@/components/common/theme-switch';
import { LoadingWrapper } from '@/components/common';

export default function Hero() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  return (
    <LoadingWrapper isPending={isPending}>
      <div className="relative container">
        <div className="pt-[50px]">
          {session?.user && (
          <div className="flex gap-5 items-center">
            <p className="text-[5rem] text-sky-600 font-extrabold">Welcome</p>
            <Chip className="mt-5" size="lg">
              <span className="font-extrabold">
                {session.user.email}
              </span>
            </Chip>
          </div>
          )}

          <h1 className="text-[4rem] font-extrabold">
            Your
            <span className="ml-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-sky-800">
              accounting made easy
            </span>
            <div>
              with our comprehensive solution
            </div>
          </h1>

          <p className="text-2xl max-w-[800px]">
            Streamline your sales and procurement processes with our intuitive
            platform – manage transactions, track inventory, and generate
            reports effortlessly.
          </p>

          <div className="mt-5 flex gap-5 items-center">
            <Link href="/dashboard/statics">
              <Button variant="bordered">
                Go to Dashboard
              </Button>
            </Link>
            {session?.user && (
            <Button
              variant="bordered"
              onClick={() => signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push('/auth/login');
                  },
                },
              })}
            >
              Sign Out
            </Button>
            )}
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
      </div>
    </LoadingWrapper>
  );
}
