/* eslint-disable react/require-default-props */

'use client';

import { useEffect } from 'react';
import {
  Card,
  Button,
  Code,
  Spacer,
  CardBody,
} from '@nextui-org/react';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <Card
        style={{
          backgroundColor: '#ffdddd',
          borderColor: '#ff4d4d',
          borderWidth: '1px',
        }}
      >
        <CardBody>
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <div>
                <IconAlertCircle size={28} color="#ff4d4d" />
              </div>
              <div>
                <p className="text-red-500">
                  Oops! Something went wrong
                </p>
              </div>
            </div>

            <p className="text-gray-500">An unexpected error has occurred</p>

            <Card style={{ padding: '1rem', borderWidth: '1px', borderColor: '#ff4d4d' }}>
              <p className="mb-5">
                Error Details:
              </p>
              <Code>
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </Code>
            </Card>

            {reset && (
              <>
                <Button
                  onClick={() => reset()}
                  variant="light"
                  startContent={<IconRefresh size={16} />}
                  className="w-40 mx-auto text-gray-800 bg-gray-300 hover:bg-gray-400"

                >
                  Try Again
                </Button>
                <Spacer y={0.5} />
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
