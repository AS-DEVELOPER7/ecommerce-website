import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "src/config/config";

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export function createSupabaseServerClient(req) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const authHeader = req ? req.headers.get("authorization") : null;
  const token = authHeader ? authHeader.replace("Bearer ", "") : null;
  if (token) {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
