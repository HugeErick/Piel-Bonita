import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Piel Bonita",
  description: "Los mejores sueritos de Puebla",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.className)}>
      <body
        className={
          "dark:bg-zinc-800 bg-zinc-50 dark:text-white text-slate-900 antialiased"
        }
      >
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className="container max-w-7xl mx-auto h-full pt-20">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
