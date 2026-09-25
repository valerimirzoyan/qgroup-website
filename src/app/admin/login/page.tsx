"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Home, Loader2, AlertTriangle, ShieldCheck } from "lucide-react";

const inputClass =
  "w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-lime-500/60 focus:ring-2 focus:ring-lime-500/20 transition";

const cardClass = "rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((data as { error?: string }).error || "Login failed.");
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cardClass}>
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Username
        </label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputClass}
          autoComplete="username"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2.5 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold py-3 text-sm transition disabled:opacity-60"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        {busy ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col">
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logos/q-logo.png"
              alt="Q Group"
              className="h-9 w-9 object-contain rounded-lg"
            />
            <div className="leading-tight">
              <div className="text-sm font-bold text-white tracking-wide">
                Q Group <span className="text-lime-400">Admin</span>
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest">
                Secure Sign In
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-lime-400 transition"
          >
            <Home className="w-3.5 h-3.5" /> View Website
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="text-center space-y-1.5 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-lime-400 uppercase tracking-widest">
            <Lock className="w-3 h-3" /> Restricted Area
          </div>
          <h1 className="text-xl font-extrabold text-white">Admin Sign In</h1>
          <p className="text-xs text-slate-500">
            Sign in to manage clients & partners shown on the website.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16 text-slate-500">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          Passwords are stored as one-way hashes; sessions use signed, short-lived tokens.
        </div>
      </main>
    </div>
  );
}