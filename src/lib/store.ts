import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  Client,
  Partner,
  DEFAULT_CLIENTS,
  DEFAULT_PARTNERS,
} from "@/lib/content-types";

const DATA_DIR = path.join(process.cwd(), "data");
const CLIENTS_FILE = path.join(DATA_DIR, "clients.json");
const PARTNERS_FILE = path.join(DATA_DIR, "partners.json");

function ensureDataDir(): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readFile<T>(file: string, defaults: T): T {
  try {
    if (!fs.existsSync(file)) {
      return defaults;
    }
    const raw = fs.readFileSync(file, "utf-8");
    const parsed = JSON.parse(raw) as T;
    return Array.isArray(parsed) ? parsed : defaults;
  } catch {
    return defaults;
  }
}

function writeFile(file: string, data: unknown): void {
  ensureDataDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

export function getClients(): Client[] {
  const stored = readFile<Client[]>(CLIENTS_FILE, []);
  if (stored.length === 0) {
    const seeded: Client[] = DEFAULT_CLIENTS.map((c) => ({ id: randomUUID(), ...c }));
    saveClients(seeded);
    return seeded;
  }
  return stored;
}

export function saveClients(clients: Client[]): void {
  writeFile(CLIENTS_FILE, clients);
}

export function addClientRecord(data: Omit<Client, "id">): Client {
  const clients = getClients();
  const record: Client = { id: randomUUID(), ...data };
  clients.push(record);
  saveClients(clients);
  return record;
}

export function deleteClientRecord(id: string): boolean {
  const clients = getClients();
  const next = clients.filter((c) => c.id !== id);
  if (next.length === clients.length) return false;
  saveClients(next);
  return true;
}

export function getPartners(): Partner[] {
  const stored = readFile<Partner[]>(PARTNERS_FILE, []);
  if (stored.length === 0) {
    const seeded: Partner[] = DEFAULT_PARTNERS.map((p) => ({ id: randomUUID(), ...p }));
    savePartners(seeded);
    return seeded;
  }
  return stored;
}

export function savePartners(partners: Partner[]): void {
  writeFile(PARTNERS_FILE, partners);
}

export function addPartnerRecord(data: Omit<Partner, "id">): Partner {
  const partners = getPartners();
  const record: Partner = { id: randomUUID(), ...data };
  partners.push(record);
  savePartners(partners);
  return record;
}

export function deletePartnerRecord(id: string): boolean {
  const partners = getPartners();
  const next = partners.filter((p) => p.id !== id);
  if (next.length === partners.length) return false;
  savePartners(next);
  return true;
}