import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Includes/Navbar";
import Footer from "@/components/Includes/Footer";
import PageWithLoader from '@/components/Includes/PageWithLoader';
import Script from "next/script";
import AntiInspect from "@/components/disableRight";
import { cookies } from 'next/headers';
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amaraiverse – Tech & AI Blog ",
  description: "Personal portfolio and blog focused on AI, tech, and development insights.",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const cookieStore = await cookies();
  const nonce = cookieStore.get('nonce')?.value;
  

  return (
    
    <html lang="en">
      <head>
      
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Amaraiverse – Tech & AI Blog" />
        <meta name="author" content="Amar kumar" />
        <meta property="og:title" content="Amaraiverse – Tech & AI Blog" />
        <meta property="og:description" content="Explore tech tutorials, AI trends, and personal projects from Amaraiverse." />
        <meta property="og:url" content="https://amaraiverse.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Amaraiverse – Tech & AI Blog" />
        <meta name="twitter:description" content="AI insights, dev tips, and more from Amaraiverse." />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preload"   href="/fonts/GeneralSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="https://amaraiverse.com/favicon.ico" />

        <Script nonce={nonce}
           src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
           strategy="beforeInteractive"
        />
       </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <Script strategy="afterInteractive" id="nonce-script" nonce={nonce} dangerouslySetInnerHTML={{ __html: `__turbopack_nonce__ = ${JSON.stringify(nonce)}` }}
                  />
        <Analytics />
        <AntiInspect />
        <PageWithLoader duration={2000}>
       
          <main className="w-full mx-auto relative">
            <Navbar /> 
            {children}
            <Footer />
          </main>
        </PageWithLoader>
      </body>
    </html>
  );
}
