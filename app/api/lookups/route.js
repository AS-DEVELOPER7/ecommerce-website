import { createSupabaseServerClient } from "src/services/reducers/supabaseClient";

export const dynamic = "force-dynamic";

// Helper to validate admin auth
async function checkAdminAuth(req) {
  const supabaseServer = createSupabaseServerClient(req);
  if (!supabaseServer) return null;

  const { data: { user }, error } = await supabaseServer.auth.getUser();
  if (error || !user) return null;
  return supabaseServer;
}

// GET all lookups
export async function GET(req) {
  const supabaseServer = createSupabaseServerClient(req);
  if (!supabaseServer) {
    return Response.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const { data: categories } = await supabaseServer.from("categories").select("*").order("name");
    const { data: materials } = await supabaseServer.from("materials").select("*").order("name");
    const { data: sizes } = await supabaseServer.from("sizes").select("*").order("name");
    const { data: colors } = await supabaseServer.from("colors").select("*").order("name");

    return Response.json({
      categories: categories || [],
      materials: materials || [],
      sizes: sizes || [],
      colors: colors || [],
    });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to fetch lookups" }, { status: 400 });
  }
}

// POST create lookup value
export async function POST(req) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return Response.json({ error: "Type and data are required" }, { status: 400 });
    }

    let record = null;
    let error = null;

    if (type === "category") {
      const { name, slug, image_url } = data;
      if (!name || !slug) {
        return Response.json({ error: "Category name and slug are required" }, { status: 400 });
      }
      const { data: catRec, error: catErr } = await supabaseServer
        .from("categories")
        .insert({ name, slug, image_url: image_url || null })
        .select()
        .single();
      record = catRec;
      error = catErr;
    } else if (type === "material") {
      const { name } = data;
      if (!name) {
        return Response.json({ error: "Material name is required" }, { status: 400 });
      }
      const { data: matRec, error: matErr } = await supabaseServer
        .from("materials")
        .insert({ name })
        .select()
        .single();
      record = matRec;
      error = matErr;
    } else if (type === "size") {
      const { name } = data;
      if (!name) {
        return Response.json({ error: "Size name is required" }, { status: 400 });
      }
      const { data: szRec, error: szErr } = await supabaseServer
        .from("sizes")
        .insert({ name })
        .select()
        .single();
      record = szRec;
      error = szErr;
    } else if (type === "color") {
      const { name, hex_code } = data;
      if (!name || !hex_code) {
        return Response.json({ error: "Color name and HEX code are required" }, { status: 400 });
      }
      const { data: colRec, error: colErr } = await supabaseServer
        .from("colors")
        .insert({ name, hex_code })
        .select()
        .single();
      record = colRec;
      error = colErr;
    } else {
      return Response.json({ error: `Invalid lookup type: ${type}` }, { status: 400 });
    }

    if (error) throw error;

    return Response.json({ success: true, record });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to create lookup" }, { status: 400 });
  }
}

// PUT update lookup value
export async function PUT(req) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return Response.json({ error: "Type, id, and data are required" }, { status: 400 });
    }

    let record = null;
    let error = null;

    if (type === "category") {
      const { name, slug, image_url } = data;
      if (!name || !slug) {
        return Response.json({ error: "Category name and slug are required" }, { status: 400 });
      }
      const { data: catRec, error: catErr } = await supabaseServer
        .from("categories")
        .update({ name, slug, image_url: image_url || null })
        .eq("id", id)
        .select()
        .single();
      record = catRec;
      error = catErr;
    } else if (type === "material") {
      const { name } = data;
      if (!name) {
        return Response.json({ error: "Material name is required" }, { status: 400 });
      }
      const { data: matRec, error: matErr } = await supabaseServer
        .from("materials")
        .update({ name })
        .eq("id", id)
        .select()
        .single();
      record = matRec;
      error = matErr;
    } else if (type === "size") {
      const { name } = data;
      if (!name) {
        return Response.json({ error: "Size name is required" }, { status: 400 });
      }
      const { data: szRec, error: szErr } = await supabaseServer
        .from("sizes")
        .update({ name })
        .eq("id", id)
        .select()
        .single();
      record = szRec;
      error = szErr;
    } else if (type === "color") {
      const { name, hex_code } = data;
      if (!name || !hex_code) {
        return Response.json({ error: "Color name and HEX code are required" }, { status: 400 });
      }
      const { data: colRec, error: colErr } = await supabaseServer
        .from("colors")
        .update({ name, hex_code })
        .eq("id", id)
        .select()
        .single();
      record = colRec;
      error = colErr;
    } else {
      return Response.json({ error: `Invalid lookup type: ${type}` }, { status: 400 });
    }

    if (error) throw error;

    return Response.json({ success: true, record });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to update lookup" }, { status: 400 });
  }
}

// DELETE delete lookup value
export async function DELETE(req) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (!type || !id) {
      return Response.json({ error: "Type and id are required" }, { status: 400 });
    }

    let tableName = "";
    if (type === "category") tableName = "categories";
    else if (type === "material") tableName = "materials";
    else if (type === "size") tableName = "sizes";
    else if (type === "color") tableName = "colors";
    else {
      return Response.json({ error: `Invalid lookup type: ${type}` }, { status: 400 });
    }

    const { error: delErr } = await supabaseServer
      .from(tableName)
      .delete()
      .eq("id", id);

    if (delErr) throw delErr;

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message || "Failed to delete lookup" }, { status: 400 });
  }
}
