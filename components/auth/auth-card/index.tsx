import {
  Card, CardHeader, Link, CardBody,
} from '@nextui-org/react';

type AuthCardProps = {
 children: React.ReactNode;
 title: string;
 subTitle: string;
 type: 'login' | 'register';
}
export function AuthCard(props: AuthCardProps) {
  const {
    children, title, subTitle, type,
  } = props;
  return (
    <Card shadow="md" className="p-6 md:p-10 mt-10 mx-auto max-w-[650px]" radius="md">
      <CardHeader className="pb-0 pt-2 px-4 mb-5 flex-col items-center">
        <h2 className="text-center text-2xl md:text-4xl">{title}</h2>
        <h2 className="text-gray-500 text-center mt-3 text-xs md:text-xl">
          {subTitle}
          {' '}
          {type === 'register' && <Link href="/auth/login" className="text-xs md:text-xl">Login</Link>}
          {type === 'login' && <Link href="/auth/register" className="text-xs md:text-xl">Create account</Link>}
        </h2>
      </CardHeader>
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
}
