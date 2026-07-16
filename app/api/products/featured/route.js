import { supabase } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}
