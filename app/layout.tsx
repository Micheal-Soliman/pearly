import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from '@/context/FavoritesContext';

const alice = localFont({
  src: "./fonts/Alice-Regular.ttf",
  variable: "--font-alice",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pearly - Luxury Beauty Products",
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
    <html lang="en" className={alice.variable}>
      <body>
        <CartProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
