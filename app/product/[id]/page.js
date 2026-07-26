"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "src/services/reducers/cartReducer";
import { useParams } from "next/navigation";
import {
  useLazyGetProductByIdQuery,
  useLazySearchProductsQuery,
} from "src/services/api/productsApi";

import ProductGallery from "src/components/organisms/product/ProductGallery";
import ProductInfo from "src/components/organisms/product/ProductInfo";
import RelatedProducts from "src/components/organisms/product/RelatedProducts";
import { CURRENCY } from "src/constants";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cart = useSelector((s) => s.cart.items || []);

  const [getProductById, { data: product, isLoading }] =
    useLazyGetProductByIdQuery();

  useEffect(() => {
    if (id) getProductById(id);
  }, [id, getProductById]);

  const rawVars =
    product?.rawVariants && product.rawVariants.length > 0
      ? product.rawVariants
      : product?.variants && product.variants.length > 0
      ? product.variants
      : [];

  // Consolidate DB variant rows by name/color into unique storefront variant cards
  const variants = [];
  rawVars.forEach((rv) => {
    const match = variants.find((v) => {
      if (rv.name && v.name) return rv.name === v.name;
      const sameColors = JSON.stringify(v.color_names) === JSON.stringify(rv.color_names);
      const sameImages = JSON.stringify(v.images) === JSON.stringify(rv.images);
      return sameColors && sameImages;
    });

    if (match) {
      if (rv.size_name && !match.sizes?.includes(rv.size_name)) {
        match.sizes.push(rv.size_name);
      }
    } else {
      variants.push({
        ...rv,
        color: rv.color_names?.length ? rv.color_names.join(" / ") : rv.color || null,
        sizes: rv.size_name ? [rv.size_name] : (rv.sizes || []),
      });
    }
  });

  const enhancedProduct = { ...product, variants };

  const defaultVariant = enhancedProduct?.variants?.[0] || null;
  const initialSize =
    defaultVariant?.sizes?.[0] ||
    defaultVariant?.size_name ||
    product?.sizes?.[0] ||
    null;

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [qty, setQty] = useState(1);

  const handleSelectVariant = (v) => {
    setSelectedVariant(v);
    const firstSize =
      v?.sizes?.[0] ||
      v?.size_name ||
      product?.sizes?.[0] ||
      null;
    if (firstSize) {
      setSelectedSize(firstSize);
    }
  };

  useEffect(() => {
    if (!product) return;
    const vars = enhancedProduct?.variants || [];
    const defaultV = vars[0] || null;
    setSelectedVariant(defaultV);
    const firstSize =
      defaultV?.sizes?.[0] ||
      defaultV?.size_name ||
      product.sizes?.[0] ||
      null;
    setSelectedSize(firstSize);
    setQty(1);
  }, [product?.id]);

  // Query category-matched related products with guaranteed catalog fallback
  const [searchCategoryProducts, { data: categoryProductsData }] =
    useLazySearchProductsQuery();
  const [searchFallbackProducts, { data: fallbackProductsData }] =
    useLazySearchProductsQuery();

  const firstCategory =
    (Array.isArray(product?.categories) ? product.categories[0] : product?.categories) ||
    product?.categoryIds?.[0] ||
    null;

  useEffect(() => {
    if (product?.id) {
      if (firstCategory) {
        searchCategoryProducts({ category: firstCategory, limit: 10 });
      }
      searchFallbackProducts({ limit: 10 });
    }
  }, [product?.id, firstCategory, searchCategoryProducts, searchFallbackProducts]);

  const related = useMemo(() => {
    if (!product) return [];

    const categoryList = Array.isArray(categoryProductsData)
      ? categoryProductsData
      : categoryProductsData?.data || [];

    const fallbackList = Array.isArray(fallbackProductsData)
      ? fallbackProductsData
      : fallbackProductsData?.data || [];

    const categoryMatches = categoryList.filter((p) => p.id !== product.id);
    const fallbackMatches = fallbackList.filter((p) => p.id !== product.id);

    const combined = [...categoryMatches];
    fallbackMatches.forEach((p) => {
      if (combined.length < 4 && !combined.some((item) => item.id === p.id)) {
        combined.push(p);
      }
    });

    return combined.slice(0, 4);
  }, [product, categoryProductsData, fallbackProductsData]);

  const currentSizeLabel =
    typeof selectedSize === "object" ? selectedSize?.size : selectedSize;
  const itemInCart = cart.find(
    (i) =>
      product &&
      i.id === product.id &&
      i.style === (selectedVariant?.style || null) &&
      i.color ===
        (selectedVariant?.selectedColor?.color ||
          selectedVariant?.color ||
          null) &&
      i.size === (currentSizeLabel || null),
  );

  useEffect(() => {
    setQty(1);
  }, [selectedVariant, selectedSize]);

  if (isLoading || !product) {
    return (
      <main className="bg-[#FDFBF7] min-h-screen pt-24 pb-12 px-4 flex justify-center">
        <div className="animate-pulse w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-4/5 bg-surface-base rounded-3xl w-full"></div>
          <div className="space-y-6 pt-10">
            <div className="h-10 bg-surface-base rounded-xl w-3/4"></div>
            <div className="h-6 bg-surface-base rounded-xl w-1/4"></div>
            <div className="h-32 bg-surface-base rounded-xl w-full mt-10"></div>
          </div>
        </div>
      </main>
    );
  }

  const handleQtyChange = (val) => {
    if (itemInCart) {
      const next = typeof val === "function" ? val(itemInCart.qty) : val;
      dispatch(updateQuantity({ cartId: itemInCart.cartId, qty: next }));
    } else {
      setQty(val);
    }
  };

  const handleAdd = () => {
    const mainImg =
      selectedVariant?.selectedColor?.images?.[0] ||
      selectedVariant?.images?.[0] ||
      selectedVariant?.selectedStyle?.images?.[0] ||
      product?.images?.[0];

    const finalPrice = selectedVariant?.price ?? selectedSize?.price ?? product.price;

    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        variantName: selectedVariant?.name || null,
        style: selectedVariant?.style || null,
        color:
          selectedVariant?.selectedColor?.color ||
          selectedVariant?.color ||
          null,
        size: currentSizeLabel || null,
        image: mainImg,
        price: finalPrice,
        soldOut: product.sold_out,
        qty,
      }),
    );
  };

  const handleRemove = () => {
    if (itemInCart) {
      dispatch(removeFromCart(itemInCart.cartId));
    }
  };

  return (
    <main className="bg-[#FDFBF7] text-base min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 text-sm font-medium tracking-wide">
          <Link
            href="/"
            className="text-neutral-500 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <span className="text-neutral-300">/</span>
          <Link
            href="/shop"
            className="text-neutral-500 hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-[200px] sm:max-w-md">
            {product.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ProductGallery
            product={enhancedProduct}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
          />

          <ProductInfo
            product={enhancedProduct}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            qty={itemInCart ? itemInCart.qty : qty}
            setQty={handleQtyChange}
            itemInCart={itemInCart}
            onAdd={handleAdd}
            onRemove={handleRemove}
          />
        </div>

        {/* Description / Extra Details Section */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 border-b border-border md:border-none pb-4 md:pb-0">
              <h3 className="font-serif text-xl sm:text-2xl font-medium mb-4 text-neutral-900">
                The Details
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Designed for daily elegance, crafted with lasting materials.
                Pair it with matching pieces in our collection for a refined
                set.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-1 gap-8">
              <div className="bg-white/80 p-8 rounded-3xl border border-border shadow-sm">
                <h4 className="font-semibold uppercase tracking-widest text-xs sm:text-sm mb-4 text-neutral-900">
                  Care Guide
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Gently wipe with a soft cloth after wear to retain its
                  brilliant shine. Store in the provided pouch in a cool, dry
                  place. Avoid contact with perfumes and lotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts products={related} />
      </div>
    </main>
  );
}
