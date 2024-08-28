import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicale Project",
  description: "It's a medical hepl site",
};
import Providers from "./providers";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <Container className="py-10">{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
