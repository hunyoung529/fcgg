import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Providers } from "./providers";
import RecoilContextProvider from "@/lib/recoilContextProvider";

export const metadata: Metadata = {
  title: "FC온라인 전적 검색은 ADARI.KR ",
  description: "FC온라인 전적&통계 검색 사이트",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "YUSMRC-SUV_pdgRNMWSpjYUCfeHNgVMWNuwS64AHink",
  },
  keywords: [
    "FC온라인",
    "FC온라인 전적",
    "FC온라인 통계",
    "전적 검색",
    "FC온라인 전적 검색",
    "FIFA 온라인",
    "피온",
    "피파온라인",
    "피온 전적검색",
  ],
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
        <RecoilContextProvider>
          <Providers>{children}</Providers>
        </RecoilContextProvider>
      </body>
      <GoogleTagManager
        gtmId="
GTM-PW8R82L3"
      />
    </html>
  );
}
