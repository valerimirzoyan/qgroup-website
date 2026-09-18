"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Client,
  Partner,
} from "@/lib/content-types";
import {
  LogOut,
  Plus,
  Trash2,
  Link2,
  Users,
  Handshake,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Home,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-lime-500/60 focus:ring-2 focus:ring-lime-500/20 transition";

const labelClass =
  "block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5";

const cardClass = "rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error || "Request failed.");
  }
  return res.json();
}

function LogoField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-16 h-12 shrink-0 rounded-xl bg-white/95 border border-slate-700 flex items-center justify-center overflow-hidden p-1.5">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-slate-500 text-[9px] uppercase">No img</span>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <Link2 className="w-3 h-3" /> Paste an image URL (e.g. /images/clients/ecco.png or an
            uploaded https://… link).
          </p>
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
    } finally {
      setSigningOut(false);
    }
  };

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
                Clients & Partners Manager
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-lime-400 transition"
            >
              <Home className="w-3.5 h-3.5" /> View Website
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition disabled:opacity-60"
            >
              <LogOut className="w-3.5 h-3.5" />
              {signingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}

function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const empty: Omit<Client, "id"> = { name: "", category: "", colorSrc: "", monoSrc: "", alt: "", url: "" };
  const [form, setForm] = useState<Omit<Client, "id">>(empty);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setClients(await api<Client[]>("/api/admin/clients"));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    api<Client[]>("/api/admin/clients")
      .then((list) => {
        if (mounted) setClients(list);
      })
      .catch((e) => {
        if (mounted) setError((e as Error).message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const set = <K extends keyof Omit<Client, "id">>(key: K, value: Omit<Client, "id">[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.colorSrc.trim()) {
      setError("Name and colored logo are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api("/api/admin/clients", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      setShowForm(false);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete client "${name}"? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/clients/${id}`, { method: "DELETE" });
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2.5 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Clients / Customers</h2>
          <p className="text-[11px] text-slate-500">
            {loading ? "Loading…" : `${clients.length} shown on the website`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-3.5 py-2 text-xs font-bold transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Client
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className={cardClass}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <TextField label="Client Name" value={form.name} placeholder="e.g. ECCO" onChange={(v) => set("name", v)} />
            <TextField label="Category / Industry" value={form.category} placeholder="e.g. Global Footwear" onChange={(v) => set("category", v)} />
          </div>
          <LogoField label="Logo (full-color) — required" value={form.colorSrc} placeholder="/images/clients/ecco-orig.png or https://…" onChange={(v) => set("colorSrc", v)} />
          <LogoField label="Logo (grayscale, optional) — shows client in the homepage carousel" value={form.monoSrc || ""} placeholder="/images/clients/ecco.png or https://…" onChange={(v) => set("monoSrc", v)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <TextField label="Website URL (optional)" value={form.url || ""} placeholder="https://…" onChange={(v) => set("url", v)} />
            <TextField label="Alt Text (optional)" value={form.alt || ""} placeholder="e.g. ECCO Armenia IT Partner" onChange={(v) => set("alt", v)} />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition disabled:opacity-60"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save Client"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(empty);
              }}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-sm text-slate-500">
          No clients stored yet. The website is currently showing the built-in default portfolio.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {clients.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 px-4 py-3"
            >
              <div className="w-14 h-11 shrink-0 rounded-lg bg-white/95 border border-slate-700 flex items-center justify-center overflow-hidden p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.colorSrc || c.monoSrc} alt={c.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{c.name}</div>
                {c.category && (
                  <div className="text-[11px] text-slate-500 truncate">{c.category}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => c.id && handleDelete(c.id, c.name)}
                className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-red-300 hover:bg-red-500/20 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const empty: Omit<Partner, "id"> = { name: "", logo: "", tag: "", type: "", url: "" };
  const [form, setForm] = useState<Omit<Partner, "id">>(empty);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPartners(await api<Partner[]>("/api/admin/partners"));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    api<Partner[]>("/api/admin/partners")
      .then((list) => {
        if (mounted) setPartners(list);
      })
      .catch((e) => {
        if (mounted) setError((e as Error).message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const set = <K extends keyof Omit<Partner, "id">>(key: K, value: Omit<Partner, "id">[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.logo.trim()) {
      setError("Name and logo are required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await api("/api/admin/partners", { method: "POST", body: JSON.stringify(form) });
      setForm(empty);
      setShowForm(false);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete partner "${name}"? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/partners/${id}`, { method: "DELETE" });
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-2.5 text-xs text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Partners</h2>
          <p className="text-[11px] text-slate-500">
            {loading ? "Loading…" : `${partners.length} shown on the website`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-3.5 py-2 text-xs font-bold transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Partner
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className={cardClass}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <TextField label="Partner Name" value={form.name} placeholder="e.g. Microsoft" onChange={(v) => set("name", v)} />
            <TextField label="Type / Role" value={form.type} placeholder="e.g. Global Vendor" onChange={(v) => set("type", v)} />
          </div>
          <TextField label="Short Tag" value={form.tag} placeholder="e.g. Cloud, Azure & Microsoft 365" onChange={(v) => set("tag", v)} />
          <LogoField label="Partner Logo" value={form.logo} placeholder="/images/partners/microsoft-orig.png or https://…" onChange={(v) => set("logo", v)} />
          <TextField label="Website URL (optional)" value={form.url || ""} placeholder="https://…" onChange={(v) => set("url", v)} />
          <div className="flex items-center gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition disabled:opacity-60"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save Partner"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setForm(empty);
              }}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      ) : partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-sm text-slate-500">
          No partners stored yet. The website is currently showing the built-in default partners.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {partners.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 px-4 py-3"
            >
              <div className="w-14 h-11 shrink-0 rounded-lg bg-white/95 border border-slate-700 flex items-center justify-center overflow-hidden p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{p.name}</div>
                {p.tag && <div className="text-[11px] text-slate-500 truncate">{p.tag}</div>}
              </div>
              <button
                type="button"
                onClick={() => p.id && handleDelete(p.id, p.name)}
                className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-red-300 hover:bg-red-500/20 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"clients" | "partners">("clients");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (res.status === 401) {
          router.replace("/admin/login");
        }
      })
      .catch(() => router.replace("/admin/login"));
  }, [router]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 text-xs text-emerald-300 w-fit">
        <CheckCircle2 className="w-4 h-4" /> Authenticated as administrator
      </div>

      <div className="flex gap-1.5 rounded-2xl bg-slate-900/60 border border-slate-800 p-1.5 w-fit">
        <button
          type="button"
          onClick={() => setTab("clients")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            tab === "clients" ? "bg-lime-500 text-slate-950" : "text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5" /> Clients
        </button>
        <button
          type="button"
          onClick={() => setTab("partners")}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
            tab === "partners" ? "bg-lime-500 text-slate-950" : "text-slate-400 hover:text-white"
          }`}
        >
          <Handshake className="w-3.5 h-3.5" /> Partners
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 px-4 py-3 text-[11px] text-slate-400 leading-relaxed">
        Changes are saved instantly to the server and appear on the website for all visitors. If you
        delete every item, the original default portfolio is restored.
      </div>

      {tab === "clients" ? <ClientsManager /> : <PartnersManager />}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Shell>
      <Dashboard />
    </Shell>
  );
}