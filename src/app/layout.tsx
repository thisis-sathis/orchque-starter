import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";
import { PRODUCT, theme } from "@/lib/config";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: PRODUCT.name, template: `%s | ${PRODUCT.name}` },
  description: PRODUCT.description,
  metadataBase: new URL(PRODUCT.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={theme.landing_theme}
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* No-flash theme + dark-class restore — runs before first paint */}
        <Script
          id="theme-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('saas-theme');if(t){var r=document.documentElement;r.setAttribute('data-theme',t);var c=localStorage.getItem('saas-custom-themes');var dark=['midnight','noir','pure-black','cyberpunk','forest','aurora','dusk'];var isDark=dark.includes(t);if(!isDark&&c){try{var ct=JSON.parse(c);var found=ct.find(function(x){return x.id===t;});if(found&&found.dark)isDark=true;}catch(e){}}if(isDark)r.classList.add('dark');else r.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
