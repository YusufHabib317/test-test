'use client';

import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

import { z } from 'zod';

import { loginValidation } from '@/actions';
import { signIn } from '@/lib/auth-client';
import { loginSchema } from '@/schema/auth';

import {
  Button, Input, Link,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import {
  IconEye, IconEyeOff, IconLockFilled, IconMailFilled,
} from '@tabler/icons-react';
import { AuthCard } from '@/components/auth/auth-card';
import { LoadingWrapper } from '@/components/common';
import { ThemeSwitch } from '@/components/common/theme-switch';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const checkEmail = await loginValidation(values.email);
    if (!checkEmail.success) {
      toast.error(checkEmail?.message!);
      setIsLoading(false);
    } else {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => {
            toast.loading('Authenticating, please wait...');
          },
          onSuccess: () => {
            setIsLoading(false);
            toast.success('Login successful! Redirecting...');
            router.push('/');
          },
          onError: (ctx) => {
            setIsLoading(false);
            toast.error(ctx.error.message);
            if (ctx.error.status === 403) {
              toast.error('Please verify your email address to continue.');
            }
          },
        },
      );
    }
  };

  return (
    <Suspense fallback={<div />}>
      <LoadingWrapper>
        <div className="container">
          <AuthCard type="login" title="Welcome back!" subTitle="Do not have an account ?">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      disabled={isLoading}
                      required
                      errorMessage={errors.email?.message}
                      placeholder="Enter Your Email"
                      startContent={
                        <IconMailFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
                    />
                  )}
                />
                {errors.email && <div className="text-red-500 ml-2 text-xs">{errors.email?.message}</div>}
              </div>
              <div className="mt-10">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Password"
                      labelPlacement="outside"
                      disabled={isLoading}
                      required
                      errorMessage={errors.password?.message}
                      placeholder="Enter Your Password"
                      startContent={
                        <IconLockFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                      endContent={(
                        <Button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                          {isVisible ? (
                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </Button>
      )}
                      type={isVisible ? 'text' : 'password'}
                    />
                  )}
                />
                {errors.password && <div className="text-red-500 ml-2 text-xs">{errors.password?.message}</div>}
              </div>

              <Link href="/auth/reset-password" className="text-xs md:text-xl mt-5 ml-2">
                Forgot password?
              </Link>
              <div className=" flex justify-center items-center w-60 mx-auto">
                <Button className="mt-5 " variant="bordered" color="primary" type="submit" isLoading={isLoading}>
                  Sign in
                </Button>
              </div>
            </form>
          </AuthCard>
        </div>
        <div className="absolute top-4 right-4">
          <ThemeSwitch />
        </div>
      </LoadingWrapper>
    </Suspense>
  );
}
