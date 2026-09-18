export const AUTH_EXPIRED_EVENT = "pertineo:auth-expired";

// These values are client-side hints only. The HttpOnly cookies issued by the
// server remain the source of truth for proof and session validity.
export const AUTH_STORAGE_KEYS = Object.freeze([
  "verifiedEmail",
  "sessionStartTime",
  "agreementChecked",
]);

const PROTECTED_API_PREFIXES = [
  "/api/analysis",
  "/api/parse",
  "/api/auth/email/credit",
  "/api/sessions/extend",
  "/api/sessions/logout",
  "/analysis",
  "/analyses",
];

function getSessionStorage() {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function clearClientAuthState(storage = getSessionStorage()) {
  if (!storage) return;
  AUTH_STORAGE_KEYS.forEach((key) => storage.removeItem(key));
}

export function isProtectedApiUrl(url = "") {
  let path = url;
  try {
    path = new URL(url, window.location.origin).pathname;
  } catch {
    // Relative paths are already usable as-is. An invalid absolute URL is not
    // treated as a protected route by accident.
  }

  return PROTECTED_API_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function dispatchAuthExpired() {
  clearClientAuthState();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
  }
}
