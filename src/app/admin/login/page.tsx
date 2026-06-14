"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await loginAdmin(null, formData);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "An unexpected error occurred");
      }
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8f4] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background image overlay */}
      <div className="absolute inset-0 scale-105">
        <Image
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
          alt="Century Convention Center Background"
          fill
          priority
          className="object-cover opacity-15 blur-[2px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#faf8f4] via-[#faf8f4]/95 to-gold/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <span className="label-luxury text-gold-600 mb-2 block">Admin Portal</span>
          <h2 
            className="text-4xl font-light text-neutral-800 tracking-wide"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Century Convention
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-gold" />
            <div className="h-1 w-1 rotate-45 bg-gold" />
            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gold/15 relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gold-600 text-xs uppercase tracking-widest font-semibold">Username</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-gold/60" />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="admin"
                  className="pl-10 pr-4 h-12 border border-gold/20 bg-white text-neutral-800 placeholder-neutral-400 focus-visible:border-gold-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gold-600 text-xs uppercase tracking-widest font-semibold">Password</Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-gold/60" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-4 h-12 border border-gold/20 bg-white text-neutral-800 placeholder-neutral-400 focus-visible:border-gold-500 rounded-xl"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-800"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button
              type="submit"
              variant="gold"
              className="w-full h-12 rounded-xl text-sm font-medium tracking-wide shadow-lg shadow-gold-600/15 cursor-pointer"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-current" />
                  Authenticating...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
