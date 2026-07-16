import { supabase } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!supabase) return Response.json({ error: "Supabase not configured" }, { status: 500 });
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const page = Number(url.searchParams.get("page") || 1);
  const limit = Number(url.searchParams.get("limit") || 12);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Fallback to 'categories' parameter if present to match old structure
  let category = url.searchParams.get("category") || url.searchParams.get("categories");
  let materials = url.searchParams.get("materials");
  let sizes = url.searchParams.get("sizes");
  let colors = url.searchParams.get("colors");
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  const sort = url.searchParams.get("sort");

  try { if (materials) materials = JSON.parse(materials); } catch(e){}
  try { if (sizes) sizes = JSON.parse(sizes); } catch(e){}
  try { if (colors) colors = JSON.parse(colors); } catch(e){}

  let query = supabase.from("products").select("*", { count: "exact" });

  // Map to the array overlapping logic provided
  if (category && category !== "All") {
    // Wrap category in array since column is JSONB/array
    query = query.contains("categories", JSON.stringify([category]));
  }


  if (materials && Array.isArray(materials) && materials.length > 0) {
    query = query.contains("materials", JSON.stringify(materials));
  }

  if (sizes && Array.isArray(sizes) && sizes.length > 0) {
    query = query.contains("sizes", JSON.stringify(sizes));
  }

  if (colors && Array.isArray(colors) && colors.length > 0) {
    query = query.contains("colors", JSON.stringify(colors));
  }

  if (minPrice) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }
  
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Sorting (always fallback to ID to ensure stable pagination across pages)
  if (sort === "lowToHigh") {
    query = query.order("price", { ascending: true, nullsFirst: false }).order("id", { ascending: true });
  } else if (sort === "highToLow") {
    query = query.order("price", { ascending: false, nullsFirst: false }).order("id", { ascending: true });
  } else {
    // default sort
    query = query.order("created_at", { ascending: false }).order("id", { ascending: true });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({
    data,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    },
  });
}
