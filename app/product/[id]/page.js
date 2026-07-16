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

import ProductGallery from "src/components/organisms/ProductGallery";
import ProductInfo from "src/components/organisms/ProductInfo";
import RelatedProducts from "src/components/organisms/RelatedProducts";
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

  const variants = product?.variants ? [...product.variants] : [];
  const enhancedProduct = { ...product, variants };

  const defaultVariant = enhancedProduct?.variants?.[0] || null;
  const defaultSize = product?.sizes?.[0] || null;
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const defaultV = product?.variants?.[0] || null;
    if (defaultV && defaultV.style && defaultV.colors?.length) {
      setSelectedVariant({
        ...defaultV,
        selectedStyle: defaultV,
        selectedColor: defaultV.colors[0],
      });
    } else {
      setSelectedVariant(defaultV);
    }
    setSelectedSize(defaultSize);
    setQty(1);
  }, [product?.id, defaultSize]);

  const [searchProducts, { data: relatedProductsData }] =
    useLazySearchProductsQuery();

  useEffect(() => {
    if (product?.categories?.[0]) {
      searchProducts({ category: product.categories[0] });
    }
  }, [product, searchProducts]);

  const related = useMemo(() => {
    if (!product || !relatedProductsData) return [];
    return (relatedProductsData.data || [])
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product, relatedProductsData]);

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

  // Reset local qty state to 1 when selected variant or size changes
  useEffect(() => {
    setQty(1);
  }, [selectedVariant, selectedSize]);

  if (isLoading || !product) {
    return (
      <main className="bg-bg min-h-screen pt-24 pb-12 px-4 flex justify-center">
        <div className="animate-pulse w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-4/5 bg-surface-base rounded-2xl w-full"></div>
          <div className="space-y-6 pt-10">
            <div className="h-10 bg-surface-base rounded-lg w-3/4"></div>
            <div className="h-6 bg-surface-base rounded-lg w-1/4"></div>
            <div className="h-32 bg-surface-base rounded-lg w-full mt-10"></div>
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

    const finalPrice = selectedSize?.price ?? product.price;

    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
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
    <main className="bg-bg text-base min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-8 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 text-sm font-medium tracking-wide">
          <Link
            href="/"
            className="text-muted hover:text-primary transition-colors"
          >
            Home
          </Link>
          <span className="text-border">/</span>
          <Link
            href="/shop"
            className="text-muted hover:text-primary transition-colors"
          >
            Shop
          </Link>
          <span className="text-border">/</span>
          <span className="text-base truncate max-w-[200px] sm:max-w-md">
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
            onSelectVariant={setSelectedVariant}
          />

          <ProductInfo
            product={enhancedProduct}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
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
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 border-b border-border md:border-none pb-4 md:pb-0">
              <h3 className="font-serif text-xl sm:text-2xl font-medium mb-4">
                The Details
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-light">
                Designed for daily elegance, crafted with lasting materials.
                Pair it with matching pieces in our collection for a refined
                set.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-1 gap-8">
              
              <div className="bg-surface-base p-8 rounded-2xl">
                <h4 className="font-semibold uppercase tracking-widest text-xs sm:text-sm mb-4">
                  Care Guide
                </h4>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  Gently wipe with a soft cloth after wear to retain its
                  brilliant shine. Store in the provided pouch in a cool, dry
                  place. Avoid contact with perfumes and lotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedProducts related={related} />
      </div>
    </main>
  );
}
