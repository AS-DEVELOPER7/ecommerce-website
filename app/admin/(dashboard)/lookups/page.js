"use client";

import { useState } from "react";
import { RiLoader5Line, RiAddLine } from "react-icons/ri";
import {
  useGetLookupsQuery,
  useCreateLookupMutation,
  useUpdateLookupMutation,
  useDeleteLookupMutation,
} from "src/services/api/productsApi";

import LookupTabs from "src/components/organisms/admin/lookups/LookupTabs";
import CategoryTabGrid from "src/components/organisms/admin/lookups/CategoryTabGrid";
import LookupItemGrid from "src/components/organisms/admin/lookups/LookupItemGrid";
import LookupEditModal from "src/components/organisms/admin/lookups/LookupEditModal";
import LookupDeleteModal from "src/components/organisms/admin/lookups/LookupDeleteModal";

export default function AdminLookupsPage() {
  const [activeTab, setActiveTab] = useState("category"); // 'category', 'material', 'size', 'color'
  const [saving, setSaving] = useState(false);

  // RTK Query endpoints
  const { data: lookupsData, isLoading } = useGetLookupsQuery();
  const [createLookup] = useCreateLookupMutation();
  const [updateLookup] = useUpdateLookupMutation();
  const [deleteLookup] = useDeleteLookupMutation();

  const lookups = lookupsData || {
    categories: [],
    materials: [],
    sizes: [],
    colors: [],
  };

  // Edit / Create Modals State
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // null for new item, or existing lookup object
  const [deleteTarget, setDeleteTarget] = useState(null); // Triggers delete confirmation modal

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formHexCode, setFormHexCode] = useState("");

  const openAddModal = () => {
    setEditItem(null);
    setFormName("");
    setFormSlug("");
    setFormImageUrl("");
    setFormHexCode("#000000");
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setFormName(item.name || "");
    setFormSlug(item.slug || "");
    setFormImageUrl(item.image_url || "");
    setFormHexCode(item.hex_code || "#000000");
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let payload = {
      type: activeTab,
      id: editItem?.id,
      data: {},
    };

    if (activeTab === "category") {
      payload.data = { name: formName, slug: formSlug, image_url: formImageUrl };
    } else if (activeTab === "material" || activeTab === "size") {
      payload.data = { name: formName };
    } else if (activeTab === "color") {
      payload.data = { name: formName, hex_code: formHexCode };
    }

    try {
      if (editItem) {
        await updateLookup(payload).unwrap();
      } else {
        await createLookup(payload).unwrap();
      }
      setModalOpen(false);
    } catch (err) {
      alert(`Error saving item: ${err.message || "Operation failed"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteLookup({ type: activeTab, id: deleteTarget }).unwrap();
      setDeleteTarget(null);
    } catch (err) {
      alert(`Error deleting item: ${err.message || "Operation failed"}`);
    }
  };

  // Auto-generate slug when name changes for Categories
  const handleNameChange = (val) => {
    setFormName(val);
    if (!editItem && activeTab === "category") {
      setFormSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      );
    }
  };

  const tabs = [
    {
      id: "category",
      label: "Categories",
      count: lookups.categories?.length || 0,
    },
    {
      id: "material",
      label: "Materials",
      count: lookups.materials?.length || 0,
    },
    { id: "size", label: "Sizes", count: lookups.sizes?.length || 0 },
    { id: "color", label: "Colors", count: lookups.colors?.length || 0 },
  ];

  return (
    <div className="space-y-6 relative z-10">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-neutral-800">
            Manage Lookups Options
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Configure master lists for Categories, Materials, Sizes, and Color
            swatches.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-xl py-4 px-4 text-xs font-bold shadow-md shadow-primary/25 transition cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <RiAddLine className="text-lg" /> ADD NEW ITEM
        </button>
      </div>

      {/* Tabs list menu */}
      <LookupTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
          <RiLoader5Line className="text-4xl animate-spin mb-3 text-primary" />
          <span className="text-sm font-semibold tracking-widest">
            LOADING OPTIONS...
          </span>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {/* Categories Tab */}
          {activeTab === "category" ? (
            <CategoryTabGrid
              categories={lookups.categories}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          ) : (
            <LookupItemGrid
              items={
                activeTab === "material"
                  ? lookups.materials
                  : activeTab === "size"
                    ? lookups.sizes
                    : lookups.colors
              }
              activeTab={activeTab}
              onEdit={openEditModal}
              onDelete={setDeleteTarget}
            />
          )}
        </div>
      )}

      {/* Edit / Create Modal dialog */}
      <LookupEditModal
        open={modalOpen}
        activeTab={activeTab}
        editItem={editItem}
        saving={saving}
        formName={formName}
        formSlug={formSlug}
        formImageUrl={formImageUrl}
        formHexCode={formHexCode}
        setFormSlug={setFormSlug}
        setFormImageUrl={setFormImageUrl}
        setFormHexCode={setFormHexCode}
        onNameChange={handleNameChange}
        onSave={handleSave}
        onClose={() => setModalOpen(false)}
      />

      {/* Delete confirmation modal */}
      <LookupDeleteModal
        open={!!deleteTarget}
        activeTab={activeTab}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
