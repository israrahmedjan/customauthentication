import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Mainheader from "@/components/header/header";
import Mainfooter from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Authentication",
  description: "Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Mainheader />
        {children}
      <Mainfooter />
      </body>
    </html>
  );
}
