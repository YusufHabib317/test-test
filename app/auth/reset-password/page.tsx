/* eslint-disable sonarjs/no-duplicate-string */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  IconArrowLeft, IconExternalLink, IconLockFilled, IconMailFilled,
} from '@tabler/icons-react';
import { z } from 'zod';
import { forgetPassword, resetPassword } from '@/lib/auth-client';
import { sendResetEmailSchema, setNewPasswordSchema } from '@/schema/auth';
import {
  Button, Card, Chip, Input, CardBody, CardHeader,
  Link,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { checkEmailExists } from '@/actions';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSetNewPassword, setIsLoadingSetNewPassword] = useState(false);
  const searchParams = useSearchParams();
  const tokenQuery = searchParams.get('token');
  const errorQuery = searchParams.get('error');
  const router = useRouter();

  const { control: controlSendEmail, handleSubmit: formResetSendEmail, formState: { errors: errorsSendEmail } } = useForm({
    resolver: zodResolver(sendResetEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const { control: controlNewPassword, handleSubmit: formResetNewPassword, formState: { errors: errorsNewPassword } } = useForm({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof sendResetEmailSchema>) => {
    setIsLoading(true);
    try {
      const checkExistEmail = await checkEmailExists(values.email);
      if (!checkExistEmail.success) {
        toast.error(checkExistEmail.message);
      } else {
        await forgetPassword(
          {
            email: values.email,
            redirectTo: '/auth/reset-password',
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: () => {
              toast.success('CHECK YOUR EMAIL');
            },
          },
        );
      }
    } catch {
      toast.error('SOMETHING WENT WRONG');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSetNewPassword = async (
    values: z.infer<typeof setNewPasswordSchema>,
  ) => {
    try {
      setIsLoadingSetNewPassword(true);
      await resetPassword(
        {
          newPassword: values.newPassword,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: (ctx) => {
            toast.success('SUCCESSFUL');
            router.push('/auth/login');
          },
        },
      );
    } catch {
      toast.error('SOMETHING WENT WRONG');
    } finally {
      setIsLoadingSetNewPassword(false);
    }
  };

  if (errorQuery && errorQuery === 'INVALID_TOKEN') {
    return <Chip>Token Invalid</Chip>;
  }

  if (tokenQuery && tokenQuery.length !== 0) {
    return (
      <div className="container">
        <Card shadow="md" className="p-6 md:p-10 mt-10 mx-auto max-w-[650px]" radius="md">
          <CardHeader className="flex flex-col">
            <h2 className="text-center text-2xl md:text-4xl">Reset Your Password</h2>
            <h2 className="text-gray-500 text-center mt-3 text-xs md:text-xl">
              Please enter your new password below.
            </h2>
          </CardHeader>
          <form onSubmit={formResetNewPassword(onSubmitSetNewPassword)}>
            <div>
              <Controller
                name="newPassword"
                control={controlNewPassword}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="New Password"
                    disabled={isLoadingSetNewPassword}
                    required
                    errorMessage={errorsNewPassword.newPassword?.message}
                    placeholder="Enter Your New Password"
                    startContent={
                      <IconLockFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                  />
                )}
              />
              {errorsNewPassword.newPassword && <div className="text-red-500 ml-2 text-xs">{errorsNewPassword.newPassword?.message}</div>}
            </div>
            <div className="mt-10">
              <Controller
                name="confirmNewPassword"
                control={controlNewPassword}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Confirm New Password"
                    disabled={isLoadingSetNewPassword}
                    required
                    errorMessage={errorsNewPassword.confirmNewPassword?.message}
                    placeholder="Enter Confirm Password"
                    startContent={
                      <IconLockFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                  />
                )}
              />
              {errorsNewPassword.confirmNewPassword && <div className="text-red-500 ml-2 text-xs">{errorsNewPassword.confirmNewPassword?.message}</div>}
            </div>

            <div className=" flex justify-center items-center w-60 mx-auto">
              <Button className="mt-5 " variant="bordered" color="primary" type="submit" isLoading={isLoadingSetNewPassword}>
                Reset password
              </Button>
            </div>
          </form>
          <div className="mt-5">
            <Link href="/auth/login">
              <div className="flex gap-2">
                <IconArrowLeft stroke={1.5} />
                <div>Back to the login page</div>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      <Card shadow="md" className="p-6 md:p-10 mt-10 mx-auto max-w-[650px]" radius="md">
        <CardHeader className="flex flex-col">
          <h2 className="text-center text-2xl md:text-4xl">Reset Your Password</h2>
          <h2 className="text-gray-500 text-center mt-3 text-xs md:text-xl">
            Please enter your email to receive a password reset link.
          </h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={formResetSendEmail(onSubmit)}>
            <Controller
              name="email"
              control={controlSendEmail}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email"
                  disabled={isLoading}
                  labelPlacement="outside"
                  required
                  errorMessage={errorsSendEmail.email?.message}
                  startContent={
                    <IconMailFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
                />
              )}
            />
            {errorsSendEmail.email && <div className="text-red-500 ml-2 text-xs">{errorsSendEmail.email?.message}</div>}
            <div className=" flex justify-center items-center w-60 mx-auto mt-5">
              <Button className="mt-5 " variant="bordered" color="primary" type="submit" isLoading={isLoading}>
                Send Email
              </Button>
            </div>
            <div className=" flex justify-center items-center w-60 mx-auto">
              <Link className="mt-5" href="https://mail.google.com/mail/u/0/" target="_blank">
                Open Mail
                {' '}
                <IconExternalLink size={15} style={{ marginLeft: 5 }} />
              </Link>
            </div>
          </form>
          <div className="mt-5">
            <Link href="/auth/login">
              <div className="flex gap-2">
                <IconArrowLeft stroke={1.5} />
                <div>Back to the login page</div>
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
