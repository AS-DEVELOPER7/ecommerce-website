"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetLookupsQuery,
  useCreateProductMutation,
  useCreateLookupMutation,
} from "src/services/api/productsApi";

import AdminProductForm from "src/components/organisms/admin/products/AdminProductForm";
import QuickAddLookupModal from "src/components/organisms/admin/products/QuickAddLookupModal";

export default function AdminNewProduct() {
  const router = useRouter();

  // RTK Query endpoints
  const { data: lookupsData } = useGetLookupsQuery();
  const [createProduct] = useCreateProductMutation();
  const [createLookup] = useCreateLookupMutation();

  const categoriesList = lookupsData?.categories || [];
  const materialsList = lookupsData?.materials || [];
  const sizesList = lookupsData?.sizes || [];
  const colorsList = lookupsData?.colors || [];

  // Core Product States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([""]); // Array of product gallery image URLs
  const [isFeatured, setIsFeatured] = useState(false);
  const [soldOut, setSoldOut] = useState(false);

  // Selected checkboxes for this product
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // Generated Variants state
  const [variants, setVariants] = useState([]);

  // Bulk Apply States
  const [bulkStock, setBulkStock] = useState("");
  const [bulkPrice, setBulkPrice] = useState("");

  // Quick Add Modal States
  const [activeModal, setActiveModal] = useState(null); // 'category', 'material', 'size', 'color'
  const [modalName, setModalName] = useState("");
  const [modalSlug, setModalSlug] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalHexCode, setModalHexCode] = useState("");
  const [modalSaving, setModalSaving] = useState(false);

  // Form actions
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Helper actions
  const handleAddProductImage = () => setImages([...images, ""]);
  const handleUpdateProductImage = (idx, val) =>
    setImages(images.map((img, i) => (i === idx ? val : img)));
  const handleRemoveProductImage = (idx) =>
    setImages(images.filter((_, i) => i !== idx));

  const handleAddCustomVariant = () =>
    setVariants([
      ...variants,
      {
        name: "",
        size_id: null,
        size_name: "Free Size",
        colorIds: [],
        color_names: [],
        stock: 0,
        price: null,
        images: [],
      },
    ]);

  const handleRemoveCustomVariant = (vIdx) =>
    setVariants(variants.filter((_, i) => i !== vIdx));

  const handleAddVariantImage = (vIdx) =>
    setVariants((prev) =>
      prev.map((v, idx) => (idx === vIdx ? { ...v, images: [...(v.images || []), ""] } : v))
    );

  const handleUpdateVariantImage = (vIdx, imgIdx, val) =>
    setVariants((prev) =>
      prev.map((v, idx) =>
        idx === vIdx
          ? {
              ...v,
              images: v.images.map((img, i) => (i === imgIdx ? val : img)),
            }
          : v
      )
    );

  const handleRemoveVariantImage = (vIdx, imgIdx) =>
    setVariants((prev) =>
      prev.map((v, idx) =>
        idx === vIdx ? { ...v, images: v.images.filter((_, i) => i !== imgIdx) } : v
      )
    );

  const handleTitleChange = (val) => {
    setTitle(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  // Matrix combination variant generator
  const handleGenerateVariants = () => {
    const activeSizes = sizesList.filter((s) => selectedSizes.includes(s.id));
    const activeColors = colorsList.filter((c) => selectedColors.includes(c.id));

    if (activeSizes.length === 0 && activeColors.length === 0) {
      alert("Please select at least one Size or Color option to generate variants.");
      return;
    }

    let list = [];
    if (activeColors.length > 0) {
      activeColors.forEach((c) => {
        list.push({
          sizeIds: activeSizes.map((s) => s.id),
          colorIds: [c.id],
          stock: 0,
          price: null,
          images: [],
        });
      });
    } else if (activeSizes.length > 0) {
      list.push({
        sizeIds: activeSizes.map((s) => s.id),
        colorIds: [],
        stock: 0,
        price: null,
        images: [],
      });
    }
    setVariants(list);
  };

  // Bulk Apply options to variant grid
  const handleBulkApply = () => {
    setVariants((prev) =>
      prev.map((v) => ({
        ...v,
        stock: bulkStock !== "" ? Number(bulkStock) : v.stock,
        price: bulkPrice !== "" ? Number(bulkPrice) : v.price,
      }))
    );
  };

  // Handle Quick Add Lookup Submissions
  const handleQuickAddSave = async (e) => {
    e.preventDefault();
    setModalSaving(true);
    setError(null);

    let payload = { type: activeModal, data: {} };
    if (activeModal === "category") {
      payload.data = { name: modalName, slug: modalSlug, image_url: modalImageUrl };
    } else if (activeModal === "material" || activeModal === "size") {
      payload.data = { name: modalName };
    } else if (activeModal === "color") {
      payload.data = { name: modalName, hex_code: modalHexCode };
    }

    try {
      const result = await createLookup(payload).unwrap();
      const created = result.record;

      setActiveModal(null);
      setModalName("");
      setModalSlug("");
      setModalImageUrl("");
      setModalHexCode("");

      if (payload.type === "category") {
        setSelectedCategories((prev) => [...prev, created.id]);
      } else if (payload.type === "material") {
        setSelectedMaterials((prev) => [...prev, created.id]);
      } else if (payload.type === "size") {
        setSelectedSizes((prev) => [...prev, created.id]);
      } else if (payload.type === "color") {
        setSelectedColors((prev) => [...prev, created.id]);
      }
    } catch (err) {
      alert(`Lookup failed: ${err.message || "Operation failed"}`);
    } finally {
      setModalSaving(false);
    }
  };

  // Primary Create Product save handler
  const handleSaveProduct = async () => {
    if (!title || !slug) return;
    setSaving(true);
    setError(null);

    const payload = {
      title,
      slug,
      description,
      price: price ? Number(price) : 0,
      images: images.map((img) => img.trim()).filter((img) => img !== ""),
      is_featured: isFeatured,
      sold_out: soldOut,
      categoryIds: selectedCategories,
      materialIds: selectedMaterials,
      sizeIds: selectedSizes,
      variants: (() => {
        const apiVars = [];
        variants.forEach((v) => {
          if (v.sizeIds && v.sizeIds.length > 0) {
            v.sizeIds.forEach((szId) => {
              apiVars.push({
                name: v.name || "",
                size_id: szId,
                stock: Number(v.stock),
                price: v.price !== null && v.price !== "" ? Number(v.price) : null,
                images: (v.images || []).map((img) => img.trim()).filter((img) => img !== ""),
                colorIds: v.colorIds || [],
              });
            });
          } else {
            apiVars.push({
              name: v.name || "",
              size_id: null,
              stock: Number(v.stock),
              price: v.price !== null && v.price !== "" ? Number(v.price) : null,
              images: (v.images || []).map((img) => img.trim()).filter((img) => img !== ""),
              colorIds: v.colorIds || [],
            });
          }
        });
        return apiVars;
      })(),
    };

    try {
      await createProduct(payload).unwrap();
      router.replace("/admin/products");
    } catch (err) {
      setError(err.message || "Failed to save product listing");
      setSaving(false);
    }
  };

  return (
    <>
      <AdminProductForm
        pageTitle="Add New Product"
        title={title}
        setTitle={setTitle}
        slug={slug}
        setSlug={setSlug}
        description={description}
        setDescription={setDescription}
        price={price}
        setPrice={setPrice}
        images={images}
        setImages={setImages}
        isFeatured={isFeatured}
        setIsFeatured={setIsFeatured}
        soldOut={soldOut}
        setSoldOut={setSoldOut}
        categoriesList={categoriesList}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        materialsList={materialsList}
        selectedMaterials={selectedMaterials}
        setSelectedMaterials={setSelectedMaterials}
        sizesList={sizesList}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        colorsList={colorsList}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        variants={variants}
        setVariants={setVariants}
        bulkStock={bulkStock}
        setBulkStock={setBulkStock}
        bulkPrice={bulkPrice}
        setBulkPrice={setBulkPrice}
        loading={saving}
        error={error}
        onSaveProduct={handleSaveProduct}
        onTitleChange={handleTitleChange}
        onAddProductImage={handleAddProductImage}
        onUpdateProductImage={handleUpdateProductImage}
        onRemoveProductImage={handleRemoveProductImage}
        onQuickAddCategory={() => setActiveModal("category")}
        onQuickAddMaterial={() => setActiveModal("material")}
        onQuickAddSize={() => setActiveModal("size")}
        onQuickAddColor={() => setActiveModal("color")}
        onGenerateVariants={handleGenerateVariants}
        onAddCustomVariant={handleAddCustomVariant}
        onRemoveCustomVariant={handleRemoveCustomVariant}
        onAddVariantImage={handleAddVariantImage}
        onUpdateVariantImage={handleUpdateVariantImage}
        onRemoveVariantImage={handleRemoveVariantImage}
        onBulkApply={handleBulkApply}
      />

      <QuickAddLookupModal
        activeModal={activeModal}
        onSave={handleQuickAddSave}
        onClose={() => {
          setActiveModal(null);
          setModalName("");
          setModalSlug("");
          setModalImageUrl("");
          setModalHexCode("");
        }}
        modalName={modalName}
        setModalName={setModalName}
        modalSlug={modalSlug}
        setModalSlug={setModalSlug}
        modalImageUrl={modalImageUrl}
        setModalImageUrl={setModalImageUrl}
        modalHexCode={modalHexCode}
        setModalHexCode={setModalHexCode}
        modalSaving={modalSaving}
      />
    </>
  );
}
