# Safari session hotfix

Tracking: https://github.com/khu-return-19/server/issues/421

Vercel deployments send both Axios and streaming analysis requests to `/api` on
the page's origin. `vercel.json` proxies that path to the production API without
changing the path. Production builds intentionally ignore `REACT_APP_BASE_URL`;
`npm start` still supports that variable for local development.

The backend's host-only `PERTINEO_EMAIL_PROOF` and `PERTINEO_SESSION` cookies then
belong to the frontend host. HttpOnly, Secure, cookie paths, one-time verification,
and server-side session validation remain in effect. Do not add a cookie Domain
pointing to the upstream API. Existing cookies on the old API host do not migrate;
users must authenticate again after switching to the proxy.

API responses are marked no-store for browsers and Vercel/CDN caches. The SPA
fallback excludes `/api` so backend errors remain API responses.

## Deployment verification

1. Deploy this branch to Vercel. Other static hosts need the same `/api` proxy
   before using this build. Preview Origins must already be allowed by the
   backend; do not weaken the production Origin allowlist for a preview.
2. On an allowed frontend host, verify `/api/auth/email/credit` returns the
   backend's 401 JSON (not index.html) when signed out, with no-store headers.
3. On Safari with cross-site tracking prevention enabled, complete email
   verification. Inspect Set-Cookie: proof Path=/api/sessions/start, HttpOnly,
   Secure, no upstream Domain. The following start request must carry the proof,
   return 200, set the session cookie, and clear the proof cookie.
4. Check credit, session extension/logout, and analysis SSE on the same host.
   SSE must deliver events incrementally and continue for a normal long analysis;
   Vercel's external proxy has platform timeout limits.
5. Check client-IP rate limiting through the extra proxy hop under concurrent
   users. The backend trusts configured proxy CIDRs only; do not trust arbitrary
   X-Forwarded-For values to work around a shared proxy IP.
6. Repeat on Samsung Internet and Chrome. Do not export cookie values, proof
   tokens, email verification codes, or user email addresses into logs.

Rollback: restore the preceding Vercel deployment (routing and application as a
unit). This also restores the original cross-site cookie limitation.
