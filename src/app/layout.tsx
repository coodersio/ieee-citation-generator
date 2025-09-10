import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import Script from "next/script";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  authors: [{ name: "IEEE Citation Generator" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%232563eb'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='white' font-family='system-ui' font-size='14' font-weight='bold'%3E%5B1%5D%3C/text%3E%3C/svg%3E", sizes: "32x32" }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Theme
          accentColor="blue"
          grayColor="slate"
          radius="medium"
          scaling="100%"
        >
          {children}
        </Theme>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FTV7T5GSME"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FTV7T5GSME');
          `}
        </Script>
      </body>
    </html>
  );
}
