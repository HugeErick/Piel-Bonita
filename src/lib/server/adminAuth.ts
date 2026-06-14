// src/lib/server/adminAuth.ts
import crypto from "crypto";

import { ADMIN_SECRET } from "$env/static/private";

export function generateToken(): string {
  const timestamp = Math.floor(Date.now() / 1000 / 600); // window time
  const hmac = crypto.createHmac("sha256", ADMIN_SECRET)
    .update(timestamp.toString())
    .digest("hex");
  return `${timestamp}.${hmac}`;
}

export function verifyToken(token: string): boolean {
  const [timestampStr, signature] = token.split(".");
  if (!timestampStr || !signature) return false;

  const timestamp = parseInt(timestampStr);
  const now = Math.floor(Date.now() / 1000 / 600);

  // allow current and previous window (grace period)
  if (timestamp !== now && timestamp !== now - 1) return false;

  const expected = crypto.createHmac("sha256", ADMIN_SECRET)
    .update(timestampStr)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
