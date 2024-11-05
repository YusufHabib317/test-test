import '@/styles/globals.css';
import { Providers } from '../components/providers/providers';

import { Inter } from 'next/font/google';
import { configMetadata, configViewport } from '@/config/meta';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = configMetadata;

export const viewport = configViewport;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased"
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
