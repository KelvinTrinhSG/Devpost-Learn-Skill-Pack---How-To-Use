import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Providers } from "@/lib/providers";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";
import { vi } from "@/content/vi";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "vietnamese"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "vietnamese"],
});

// The "personal" font in the decision game's app preview (needs full Vietnamese glyphs).
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
});

// Static export: the page is pre-rendered once, in the default language (Vietnamese).
export const metadata: Metadata = {
  title: vi.meta.title,
  description: vi.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
