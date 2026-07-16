import { supabase } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });
  try {
    const { data: categoriesData, error: catError } = await supabase
      .from("categories")
      .select("name")
      .order("name", { ascending: true });
    if (catError) throw catError;

    const { data: materialsData, error: matError } = await supabase
      .from("materials")
      .select("name")
      .order("name", { ascending: true });
    if (matError) throw matError;

    const { data: colorsData, error: colError } = await supabase
      .from("colors")
      .select("name, hex_code")
      .order("name", { ascending: true });
    if (colError) throw colError;

    const { data: sizesData, error: sizeError } = await supabase
      .from("sizes")
      .select("name")
      .order("name", { ascending: true });
    if (sizeError) throw sizeError;

    const { data: minData, error: minError } = await supabase
      .from("products")
      .select("price")
      .order("price", { ascending: true })
      .limit(1);
    if (minError) throw minError;

    const { data: maxData, error: maxError } = await supabase
      .from("products")
      .select("price")
      .order("price", { ascending: false })
      .limit(1);
    if (maxError) throw maxError;

    const categories = categoriesData.map(c => c.name);
    const materials = materialsData.map(m => m.name);
    const colors = colorsData || [];
    const sizes = sizesData.map(s => s.name);
    const minPrice = minData?.[0]?.price || 0;
    const maxPrice = maxData?.[0]?.price || 10000;

    return new Response(
      JSON.stringify({
        categories,
        materials,
        colors,
        sizes,
        minPrice,
        maxPrice,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
