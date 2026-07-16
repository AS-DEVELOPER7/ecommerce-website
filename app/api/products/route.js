import { supabase } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json(data);
}

export async function POST(req) {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });
  
  const body = await req.json();

  const { error } = await supabase.from("products").insert(body);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ message: "Product created" });
}
