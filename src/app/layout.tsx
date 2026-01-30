import type { Metadata } from "next";
import { Lexend, Atkinson_Hyperlegible, EB_Garamond } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibey.code - Claude Code Without The Pain Of The Terminal",
  description:
    "A native macOS app that brings everything you need for Claude Code into one place. Plans, PRDs, notes, and draft prompts - all ready to send with a single click.",
  keywords: ["Claude Code", "AI coding", "macOS app", "terminal", "developer tools"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Vibey.code - Claude Code Without The Pain Of The Terminal",
    description:
      "A native macOS app that brings everything you need for Claude Code into one place.",
    type: "website",
    url: "https://vibey.codes",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Vibey.code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibey.code - Claude Code Without The Pain Of The Terminal",
    description:
      "A native macOS app that brings everything you need for Claude Code into one place.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} ${atkinson.variable} ${garamond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
