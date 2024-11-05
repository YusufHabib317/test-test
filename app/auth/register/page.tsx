'use client';

import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { emailOtp, signUp } from '@/lib/auth-client';
import { registerSchema } from '@/schema/auth';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button, Input,
} from '@nextui-org/react';
import toast from 'react-hot-toast';
import {
  IconEye, IconEyeOff, IconLockFilled, IconMailFilled,
  IconUserFilled,
} from '@tabler/icons-react';
import { z } from 'zod';
import { AuthCard } from '@/components/auth/auth-card';
import { LoadingWrapper } from '@/components/common';
import { ThemeSwitch } from '@/components/common/theme-switch';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    const { error } = await signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: () => {
          toast.loading('WAIT PLEASE...');
        },
        onSuccess: () => {
          toast.success('SUCCESSFUL');
          setIsLoading(false);
          router.push(`/auth/otp-email-verification?email=${values.email}`);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
    if (!error) {
      await emailOtp.sendVerificationOtp({
        email: values.email,
        type: 'email-verification',
      });
    }
  };

  return (
    <Suspense fallback={<div />}>
      <LoadingWrapper>
        <div className="container overflow-hidden">
          <AuthCard type="register" title="Welcome!" subTitle="You have an account? Log in now!">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Name"
                      disabled={isLoading}
                      labelPlacement="outside"
                      required
                      errorMessage={errors.name?.message}
                      placeholder="Enter Your Name"
                      startContent={
                        <IconUserFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                    />
                  )}
                />
                {errors.name && <div className="text-red-500 ml-2 text-xs">{errors.name?.message}</div>}
              </div>
              <div className="mt-10">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="text"
                      label="Email"
                      disabled={isLoading}
                      required
                      labelPlacement="outside"
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
                      disabled={isLoading}
                      required
                      label="Password"
                      labelPlacement="outside"
                      errorMessage={errors.password?.message}
                      placeholder="Enter Your Password"
                      endContent={(
                        <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                          {isPasswordVisible ? (
                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                  )}
                      startContent={
                        <IconLockFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                      type={isPasswordVisible ? 'text' : 'password'}
                    />
                  )}
                />
                {errors.password && <div className="text-red-500 ml-2 text-xs">{errors.password?.message}</div>}
              </div>
              <div className="mt-10">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Confirm Password"
                      disabled={isLoading}
                      required
                      labelPlacement="outside"
                      errorMessage={errors.confirmPassword?.message}
                      placeholder="Enter Confirm Password"
                      endContent={(
                        <button className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility} aria-label="toggle confirm password visibility">
                          {isConfirmPasswordVisible ? (
                            <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <IconEye className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                  )}
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      startContent={
                        <IconLockFilled className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
                    />
                  )}
                />
                {errors.confirmPassword && <div className="text-red-500 ml-2 text-xs">{errors.confirmPassword?.message}</div>}
              </div>

              <div className="flex justify-center items-center w-60 mx-auto">
                <Button className="mt-5" variant="bordered" color="primary" type="submit" isLoading={isLoading}>
                  Register
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
