/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

import { deleteUserByEmail, verifyUserByEmail } from '@/db';
import { emailOtp } from '@/lib/auth-client';
import { Button, Card, Link } from '@nextui-org/react';
import { PinInput } from '@/components/common/pin';
import toast from 'react-hot-toast';
import { checkEmailExists } from '@/actions';
import { IconExternalLink } from '@tabler/icons-react';

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState('');
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  const handleOtpComplete = (value: string) => {
    setOtp(value);
  };

  const handleVerifyOtp = async () => {
    setIsLoadingVerify(true);
    try {
      const user = await emailOtp.verifyEmail({
        email: email!,
        otp,
      });
      if (user.data !== null) {
        toast.success('SUCCESSFUL');
        await verifyUserByEmail(email!);
        router.push('/auth/login');
      } else if (user.error.status === 400) {
        toast.error(user.error.message!);
      }
    } catch {
      toast.error('SOMETHING WENT WRONG');
      await deleteUserByEmail(email!);
      router.push('/auth/login');
    } finally {
      setIsLoadingVerify(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoadingResend(true);
    try {
      const checkExistEmail = await checkEmailExists(email as string);

      if (!checkExistEmail.success) {
        toast.error(checkExistEmail.message);
      } else {
        await emailOtp.sendVerificationOtp({
          email: email!,
          type: 'email-verification',
        });
        toast.success('CHECK YOUR EMAIL');
      }
    } catch {
      toast.error('SOMETHING WENT WRONG');
    } finally {
      setIsLoadingResend(false);
    }
  };

  return (
    <Suspense fallback={<div />}>
      <div className="container my-10">
        <Card shadow="md" className="p-6 md:p-5 mt-5 mx-auto max-w-[500px]" radius="md">
          <p className="text-gray-200 text-center my-10 text-2xl">
            Enter
            {' '}
            <span className="text-emerald-500 font-bold underline">OTP</span>
            {' '}
            sent to your email:
          </p>
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-5">
              <PinInput
                length={6}
                type="numeric"
                autoFocus
                onChange={handleOtpComplete}
                onComplete={handleOtpComplete}
                disabled={isLoadingVerify}
              />
              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoadingVerify}
                isLoading={isLoadingVerify}
                variant="bordered"
                className="w-40 mx-auto"
              >
                {isLoadingVerify ? 'Verifying...' : 'Verify'}
              </Button>
              <Button
                onClick={handleSendOtp}
                disabled={isLoadingResend}
                variant="bordered"
                className="w-40 mx-auto"
                isLoading={isLoadingResend}
              >
                {isLoadingResend ? 'Resending Otp...' : ' Resend otp'}
              </Button>
              <div className=" flex justify-center items-center w-60 mx-auto">
                <Link href="https://mail.google.com/mail/u/0/" target="_blank">
                  Open Mail
                  {' '}
                  <IconExternalLink size={15} style={{ marginLeft: 5 }} />
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Suspense>
  );
}
