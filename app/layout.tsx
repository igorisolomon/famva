import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'

import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_TITLE, DEFAULT_URL, KEYWORDS } from "@/lib/constants"
import { RecaptchaProvider } from "@/components/providers/recaptcha-provider";

import './globals.css'
import { CookieConsentProvider } from '@/components/providers/cookie-consent-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const getTitle = (urlPath: string) => {
  // remove the first "/" if exists
  const path = urlPath.startsWith("/") ? urlPath.slice(1) : urlPath;

  // if no path, return default title
  if (!path) return DEFAULT_TITLE;

  // split by "/" and add space and capitalize first letter of each word and join with " - "
  const title = path
    .split("/")
    .filter(segment => segment) // filter out empty segments
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" - ");

  // else return the generated title
  return title.length > 60 ? `${title.slice(0, 57)}...` : title;
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';

  const title = getTitle(pathname);

  return {
    metadataBase: new URL(DEFAULT_URL),
    title: title || DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    keywords: KEYWORDS,
    authors: [{ name: "Pinavel", url: DEFAULT_URL }],
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title: title || DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: DEFAULT_URL,
      siteName: "Pinavel",
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: "Pinavel Open Graph Image",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title || DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [DEFAULT_IMAGE],
      creator: "@pinavel_travel",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      <GoogleAnalytics gaId="G-F8QHLT3ERW" />
      <body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <RecaptchaProvider>
          <CookieConsentProvider />
          {children}
          <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '860619920391247');
          fbq('track', 'PageView');
        `}</Script>
          <noscript><img height="1" width="1" className="hidden"
            src="https://www.facebook.com/tr?id=860619920391247&ev=PageView&noscript=1"
            alt=""
          /></noscript>
        </RecaptchaProvider>
      </body>
    </html>
  )
}
