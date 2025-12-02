const STORAGE_KEY = "admin_password_encrypted";
const ENCRYPTION_KEY = process.env.SECRET_KEY!;

async function deriveKey(password: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
    "deriveKey",
  ]);

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("assetify-desk-salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

async function aesEncrypt(text: string, key: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await deriveKey(key);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for AES-GCM

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    encoder.encode(text),
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

async function aesDecrypt(encrypted: string, key: string): Promise<string> {
  try {
    const decoder = new TextDecoder();
    const cryptoKey = await deriveKey(key);

    const combined = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));

    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      cryptoKey,
      data,
    );

    return decoder.decode(decrypted);
  } catch {
    return "";
  }
}

export async function savePassword(password: string): Promise<void> {
  const encrypted = await aesEncrypt(password, ENCRYPTION_KEY);
  localStorage.setItem(STORAGE_KEY, encrypted);
}

export async function loadPassword(): Promise<string> {
  const encrypted = localStorage.getItem(STORAGE_KEY);
  if (!encrypted) return "";
  return aesDecrypt(encrypted, ENCRYPTION_KEY);
}

export function clearPassword(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasStoredPassword(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}
