import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'MD. FOISAL IQBAL | Computer Science & Engineering Graduate',
  description: 'Portfolio of MD. Foisal Iqbal, a JNTU Computer Science & Engineering graduate based in Nachole, Rajshahi, Bangladesh. Explore skills, education and contact information.',
  applicationName: 'Foisal Iqbal Portfolio',
  authors: [{ name: 'MD. FOISAL IQBAL' }],
  keywords: ['Foisal Iqbal', 'Computer Science', 'Software Developer', 'Web Developer', 'Next.js', 'JNTU', 'Bangladesh'],
  openGraph: {
    title: 'MD. FOISAL IQBAL | Portfolio',
    description: 'Computer Science & Engineering graduate. Curious mind. Builder’s mindset. Available for full-time opportunities.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Foisal Iqbal Portfolio',
  },
  twitter: { card: 'summary', title: 'MD. FOISAL IQBAL | Portfolio', description: 'Computer Science & Engineering Graduate · JNTU, India' },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#0a111a' };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
