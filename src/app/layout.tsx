import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins", // instead of className
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <header>
          <Navigation />
        </header>
        <main>
          {children}

          <Toaster position="top-center" richColors />
        </main>
        <Footer />
      </body>
    </html>
  );
}
