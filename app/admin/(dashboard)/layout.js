"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "src/services/reducers/supabaseClient";
import AdminSidebar from "src/components/organisms/admin/AdminSidebar";
import ImagePreviewModal from "src/components/organisms/admin/ImagePreviewModal";

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (!currentUser) {
        router.replace("/admin/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    const handlePreview = (e) => {
      setPreviewSrc(e.detail?.src || null);
    };
    window.addEventListener("image-preview", handlePreview);
    return () => window.removeEventListener("image-preview", handlePreview);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg relative">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wider text-neutral-500">
          SECURE CONNECTION CHECK...
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-bg relative overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          overflow: hidden !important;
          height: 100% !important;
          width: 100% !important;
          padding-right: 0px !important;
        }
      `}} />
      {/* Dynamic drifting glow circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      {/* Sidebar navigation */}
      <AdminSidebar
        pathname={pathname}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto p-2 sm:p-4 relative z-10">
        {children}
      </main>

      {/* Global Image Preview Overlay */}
      <ImagePreviewModal
        src={previewSrc}
        onClose={() => setPreviewSrc(null)}
      />
    </div>
  );
}
