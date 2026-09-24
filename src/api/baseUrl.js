// Deployed apps use the Vercel /api proxy so HttpOnly cookies are first-party.
// Keep the explicit backend override only for the local development server.
export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? (process.env.REACT_APP_BASE_URL || "").replace(/\/+$/, "")
    : "";
