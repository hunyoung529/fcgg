import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "FC온라인 전적 검색은 ADARI.KR ",
  description: "FC온라인 전적&통계 검색 사이트",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "YUSMRC-SUV_pdgRNMWSpjYUCfeHNgVMWNuwS64AHink",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
      <GoogleTagManager
        gtmId="
GTM-PW8R82L3"
      />
    </html>
  );
}
