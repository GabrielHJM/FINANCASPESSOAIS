"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function EntryPoint() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-[#05070a] flex items-center justify-center relative overflow-hidden">
      {/* Background Vibrancy Blobs */}
      <div className="bg-blob blob-blue opacity-5" />
      <div className="bg-blob blob-purple opacity-5" />
      
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin shadow-2xl relative z-10" />
    </div>
  );
}

