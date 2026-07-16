import { supabase } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET(_, { params }) {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  console.log(id);
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return Response.json({ error: error.message }, { status: 404 });

  return Response.json(data);
}
