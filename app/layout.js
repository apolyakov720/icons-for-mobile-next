import { JetBrains_Mono } from "next/font/google";
import { Providers } from "@/app/components/providers";
import { Wrapper } from "@/app/components/wrapper";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const font = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

export const metadata = {
  title: "Icon generator",
  description: "Icon generator and splash screenshots for mobile platforms",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body className={font.className}>
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
