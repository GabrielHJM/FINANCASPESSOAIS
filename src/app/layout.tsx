import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinançasPlus | Gestão Financeira Premium",
  description: "Dashboard inteligente com previsão de saldo e física de movimento estilo iOS.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.className} antialiased bg-[#05070a] text-white`}>
        <AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              className: "bg-white/5 backdrop-blur-3xl border border-white/10 text-white font-bold tracking-apple rounded-2xl",
              style: {
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(40px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#fff",
                borderRadius: "16px",
              },
            }} 
          />
          <div className="background-blobs pointer-events-none">
            <div className="bg-blob blob-1" />
            <div className="bg-blob blob-2" />
            <div className="bg-blob blob-3" />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

