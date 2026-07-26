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

// GET individual product details
export async function GET(req, { params }) {
  const supabaseServer = createSupabaseServerClient(req);
  if (!supabaseServer) {
    return Response.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { id } = await params;
  
  // 1. Fetch base storefront view
  const { data: viewData, error: viewErr } = await supabaseServer
    .from("products_view")
    .select("*")
    .eq("id", id)
    .single();

  if (viewErr) {
    return Response.json({ error: viewErr.message }, { status: 404 });
  }

  // 2. Fetch raw category junctions
  const { data: categories } = await supabaseServer
    .from("product_categories")
    .select("category_id")
    .eq("product_id", id);

  // 3. Fetch raw material junctions
  const { data: materials } = await supabaseServer
    .from("product_materials")
    .select("material_id")
    .eq("product_id", id);

  // 4. Fetch raw size junctions
  const { data: sizes } = await supabaseServer
    .from("product_sizes")
    .select("size_id")
    .eq("product_id", id);

  // 5. Fetch raw variants with size names & color details
  const { data: variants } = await supabaseServer
    .from("product_variants")
    .select("*, sizes(id, name), product_variant_colors(color_id, colors(id, name, hex_code))")
    .eq("product_id", id);

  // Format variants to contain flat size_name, color_names, color_hexes
  const formattedVariants = (variants || []).map(v => ({
    id: v.id,
    product_id: v.product_id,
    name: v.name || "",
    size_id: v.size_id,
    size_name: v.sizes?.name || null,
    stock: v.stock,
    price: v.price,
    images: v.images || [],
    colorIds: v.product_variant_colors?.map(pvc => pvc.color_id).filter(Boolean) || [],
    color_names: v.product_variant_colors?.map(pvc => pvc.colors?.name).filter(Boolean) || [],
    color_hexes: v.product_variant_colors?.map(pvc => pvc.colors?.hex_code).filter(Boolean) || [],
  }));

  // Combine into unified payload
  const combined = {
    ...viewData,
    categoryIds: categories?.map(c => c.category_id) || [],
    materialIds: materials?.map(m => m.material_id) || [],
    sizeIds: sizes?.map(s => s.size_id) || [],
    rawVariants: formattedVariants
  };

  return Response.json(combined);
}

// PUT update product details
export async function PUT(req, { params }) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const {
      title,
      slug,
      description,
      price,
      images,
      is_featured,
      sold_out,
      categoryIds,
      materialIds,
      sizeIds,
      variants,
    } = body;

    if (!title || !slug) {
      return Response.json({ error: "Title and slug are required" }, { status: 400 });
    }

    // 1. Update product base fields
    const { error: prodErr } = await supabaseServer
      .from("products")
      .update({
        title,
        slug,
        description: description || "",
        price: price || 0,
        images: images || [],
        is_featured: !!is_featured,
        sold_out: !!sold_out,
      })
      .eq("id", id);

    if (prodErr) throw prodErr;

    // 2. Re-sync Category Junctions
    await supabaseServer.from("product_categories").delete().eq("product_id", id);
    if (categoryIds && categoryIds.length > 0) {
      const categoryRows = categoryIds.map((catId) => ({
        product_id: id,
        category_id: catId,
      }));
      const { error: catErr } = await supabaseServer
        .from("product_categories")
        .insert(categoryRows);
      if (catErr) throw catErr;
    }

    // 3. Re-sync Material Junctions
    await supabaseServer.from("product_materials").delete().eq("product_id", id);
    if (materialIds && materialIds.length > 0) {
      const materialRows = materialIds.map((matId) => ({
        product_id: id,
        material_id: matId,
      }));
      const { error: matErr } = await supabaseServer
        .from("product_materials")
        .insert(materialRows);
      if (matErr) throw matErr;
    }

    // 4. Re-sync Size Junctions
    await supabaseServer.from("product_sizes").delete().eq("product_id", id);
    if (sizeIds && sizeIds.length > 0) {
      const sizeRows = sizeIds.map((szId) => ({
        product_id: id,
        size_id: szId,
      }));
      const { error: szErr } = await supabaseServer
        .from("product_sizes")
        .insert(sizeRows);
      if (szErr) throw szErr;
    }

    // 5. Sync Variants & Variant Colors
    if (variants) {
      // Get currently active variants in the database
      const { data: currentVariants, error: fetchErr } = await supabaseServer
        .from("product_variants")
        .select("id")
        .eq("product_id", id);

      if (fetchErr) throw fetchErr;

      const currentIds = currentVariants.map((v) => v.id);
      const incomingIds = variants.filter((v) => v.id).map((v) => v.id);

      // Identify variants to delete
      const idsToDelete = currentIds.filter((cid) => !incomingIds.includes(cid));

      if (idsToDelete.length > 0) {
        const { error: delErr } = await supabaseServer
          .from("product_variants")
          .delete()
          .in("id", idsToDelete);
        if (delErr) throw delErr;
      }

      // Iterate through incoming variants
      for (const variant of variants) {
        if (variant.id) {
          // Update existing variant
          const { error: varUpdErr } = await supabaseServer
            .from("product_variants")
            .update({
              name: variant.name || null,
              size_id: variant.size_id || null,
              stock: variant.stock !== undefined ? Number(variant.stock) : 0,
              price: variant.price !== undefined && variant.price !== null ? Number(variant.price) : null,
              images: variant.images || [],
            })
            .eq("id", variant.id);

          if (varUpdErr) throw varUpdErr;

          // Re-sync variant colors
          await supabaseServer
            .from("product_variant_colors")
            .delete()
            .eq("variant_id", variant.id);

          if (variant.colorIds && variant.colorIds.length > 0) {
            const colorRows = variant.colorIds.map((colId) => ({
              variant_id: variant.id,
              color_id: colId,
            }));
            const { error: colErr } = await supabaseServer
              .from("product_variant_colors")
              .insert(colorRows);
            if (colErr) throw colErr;
          }
        } else {
          // Insert new variant
          const { data: createdVariant, error: varInsErr } = await supabaseServer
            .from("product_variants")
            .insert({
              product_id: id,
              name: variant.name || null,
              size_id: variant.size_id || null,
              stock: variant.stock !== undefined ? Number(variant.stock) : 0,
              price: variant.price !== undefined && variant.price !== null ? Number(variant.price) : null,
              images: variant.images || [],
            })
            .select()
            .single();

          if (varInsErr) throw varInsErr;

          if (variant.colorIds && variant.colorIds.length > 0) {
            const colorRows = variant.colorIds.map((colId) => ({
              variant_id: createdVariant.id,
              color_id: colId,
            }));
            const { error: colErr } = await supabaseServer
              .from("product_variant_colors")
              .insert(colorRows);
            if (colErr) throw colErr;
          }
        }
      }
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message || "Something went wrong" }, { status: 400 });
  }
}

// DELETE product listing
export async function DELETE(req, { params }) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseServer
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ success: true });
}
