import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Dancing_Script } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from '@/context/FavoritesContext';
import FABSearch from '@/components/FABSearch';

const alice = localFont({
  src: "./fonts/Alice-Regular.ttf",
  variable: "--font-alice",
  weight: "400",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "700"],
});

const amsterdam = localFont({
  src: "../public/Amsterdam Four_ttf 400.ttf",
  variable: "--font-amsterdam",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pearly | Luxury Beauty Products",
  description: "Discover your pearly glow with our luxury beauty products. Shop lip gloss, eyebrow wax, and more with cash on delivery.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alice.variable} ${dancingScript.variable} ${amsterdam.variable}`}>
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1816841682327637');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1816841682327637&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <CartProvider>
          <FavoritesProvider>
            {children}
            <Suspense fallback={null}>
              <FABSearch />
            </Suspense>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
