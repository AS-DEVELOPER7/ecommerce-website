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

// GET all products
export async function GET(req) {
  const supabaseServer = createSupabaseServerClient(req);
  if (!supabaseServer) {
    return Response.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    // 1. Fetch base storefront products view
    const { data: viewProducts, error: viewError } = await supabaseServer
      .from("products_view")
      .select("*")
      .order("created_at", { ascending: false });

    if (viewError) {
      return Response.json({ error: viewError.message }, { status: 400 });
    }

    // 2. Fetch all raw junctions and variants in parallel for maximum performance
    const [
      { data: allVariants },
      { data: allCategories },
      { data: allMaterials },
      { data: allSizes },
    ] = await Promise.all([
      supabaseServer.from("product_variants").select("*, sizes(name), product_variant_colors(colors(id, name))"),
      supabaseServer.from("product_categories").select("*"),
      supabaseServer.from("product_materials").select("*"),
      supabaseServer.from("product_sizes").select("*"),
    ]);

    // 3. Match and map detailed variants and junctions back to each product
    const productsWithVariants = viewProducts.map(product => {
      const productVariants = (allVariants || [])
        .filter(v => v.product_id === product.id)
        .map(v => ({
          id: v.id,
          name: v.name || "",
          size_id: v.size_id,
          sizes: v.sizes ? { name: v.sizes.name } : null,
          stock: v.stock || 0,
          price: v.price,
          images: v.images || [],
          colors: v.product_variant_colors?.map(pvc => pvc.colors).filter(Boolean) || []
        }));

      const categoryIds = (allCategories || [])
        .filter(c => c.product_id === product.id)
        .map(c => c.category_id);

      const materialIds = (allMaterials || [])
        .filter(m => m.product_id === product.id)
        .map(m => m.material_id);

      const sizeIds = (allSizes || [])
        .filter(s => s.product_id === product.id)
        .map(s => s.size_id);

      return {
        ...product,
        categoryIds,
        materialIds,
        sizeIds,
        variants: productVariants
      };
    });

    return Response.json(productsWithVariants);
  } catch (err) {
    return Response.json({ error: err.message || "Failed to load products" }, { status: 400 });
  }
}

// POST create a product
export async function POST(req) {
  const supabaseServer = await checkAdminAuth(req);
  if (!supabaseServer) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    // 1. Insert product
    const { data: product, error: prodErr } = await supabaseServer
      .from("products")
      .insert({
        title,
        slug,
        description: description || "",
        price: price || 0,
        images: images || [],
        is_featured: !!is_featured,
        sold_out: !!sold_out,
      })
      .select()
      .single();

    if (prodErr) throw prodErr;

    const productId = product.id;

    // 2. Insert Category Junctions
    if (categoryIds && categoryIds.length > 0) {
      const categoryRows = categoryIds.map((catId) => ({
        product_id: productId,
        category_id: catId,
      }));
      const { error: catErr } = await supabaseServer
        .from("product_categories")
        .insert(categoryRows);
      if (catErr) throw catErr;
    }

    // 3. Insert Material Junctions
    if (materialIds && materialIds.length > 0) {
      const materialRows = materialIds.map((matId) => ({
        product_id: productId,
        material_id: matId,
      }));
      const { error: matErr } = await supabaseServer
        .from("product_materials")
        .insert(materialRows);
      if (matErr) throw matErr;
    }

    // 4. Insert Size Junctions
    if (sizeIds && sizeIds.length > 0) {
      const sizeRows = sizeIds.map((szId) => ({
        product_id: productId,
        size_id: szId,
      }));
      const { error: szErr } = await supabaseServer
        .from("product_sizes")
        .insert(sizeRows);
      if (szErr) throw szErr;
    }

    // 5. Insert Variants & Variant Colors
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        const { data: createdVariant, error: varErr } = await supabaseServer
          .from("product_variants")
          .insert({
            product_id: productId,
            name: variant.name || null,
            size_id: variant.size_id || null,
            stock: variant.stock !== undefined ? Number(variant.stock) : 0,
            price: variant.price !== undefined && variant.price !== null ? Number(variant.price) : null,
            images: variant.images || [],
          })
          .select()
          .single();

        if (varErr) throw varErr;

        // Associate variant colors
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

    return Response.json({ success: true, productId });
  } catch (err) {
    return Response.json({ error: err.message || "Something went wrong" }, { status: 400 });
  }
}
