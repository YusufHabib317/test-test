import {
  Spinner, Spacer,
} from '@nextui-org/react';

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Spinner />
      <Spacer y={1} />
      <p>Loading...</p>
      <Spacer y={1} />
    </div>
  );
}
