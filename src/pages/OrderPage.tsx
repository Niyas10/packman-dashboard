import { useState, useMemo } from "react";
import { CheckCircle2, X } from "lucide-react";

import Header from "../components/Header";
import CategorySidebar from "../components/CategorySidebar";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import ConfirmModal from "../components/ConfirmModal";

import { CATEGORIES, PRODUCTS } from "../data/constants";
import type { CartItem, CartMap } from "../data/types";

interface Props {
  onLogout: () => void;
}

export default function OrderPage({ onLogout }: Props) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [cart, setCart] = useState<CartMap>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [pendingDiscountId, setPendingDiscountId] = useState("none");

  /* ── derived ── */
  const products = useMemo(
    () => PRODUCTS.filter((p) => p.cat === activeCat),
    [activeCat]
  );

  const cartItems: CartItem[] = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ ...PRODUCTS.find((p) => p.id === id)!, qty })),
    [cart]
  );

  const totalCartQty = cartItems.reduce((s, i) => s + i.qty, 0);

  /* ── handlers ── */
  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function changeQty(id: string, delta: number) {
    setCart((c) => {
      const next = Math.max(0, (c[id] || 0) + delta);
      return { ...c, [id]: next };
    });
  }

  function removeItem(id: string) {
    setCart((c) => ({ ...c, [id]: 0 }));
  }

  function handleCheckout(discountId: string) {
    setPendingDiscountId(discountId);
    setShowConfirm(true);
  }

  function handleConfirmOrder() {
    setShowConfirm(false);
    setCart({});
    setCartOpen(false);
    // Show toast after modal closes
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  }

  function handleLogout() {
    onLogout();
  }

  const activeCatName = CATEGORIES.find((c) => c.id === activeCat)?.name ?? "";

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <Header
        cartCount={totalCartQty}
        onLogout={handleLogout}
        onCartToggle={() => setCartOpen((v) => !v)}
      />

      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Sidebar */}
        <CategorySidebar activeCat={activeCat} onChange={setActiveCat} />

        {/* Product grid */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-5 py-4">
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">{activeCatName}</h2>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              {products.length} item{products.length !== 1 ? "s" : ""}
            </span>
            {totalCartQty > 0 && (
              <span className="ml-auto text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                {totalCartQty} in cart
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                qty={cart[p.id] ?? 0}
                onAdd={addToCart}
                onChangeQty={changeQty}
              />
            ))}
          </div>
        </main>

        {/* Cart panel — always visible on lg+, slide-up on mobile */}
        <div
          className={`
            lg:flex lg:static lg:h-auto
            fixed bottom-0 left-0 right-0 z-30
            transition-transform duration-300 ease-in-out
            ${cartOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"}
          `}
          style={{ ["--cart-max-h" as string]: "auto" }}
        >
          <CartPanel
            cartItems={cartItems}
            onChangeQty={changeQty}
            onRemove={removeItem}
            onCheckout={handleCheckout}
          />
        </div>

        {/* Mobile backdrop */}
        {cartOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
        )}
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <ConfirmModal
          cartItems={cartItems}
          discountId={pendingDiscountId}
          onConfirm={handleConfirmOrder}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* ── Success toast (bottom-right) ── */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-green-600 shadow-2xl shadow-green-200 rounded-2xl px-4 py-3.5 w-80 max-w-[calc(100vw-2rem)] overflow-hidden">
          {/* Icon */}
          <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 size={20} className="text-white" />
          </div>
          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white leading-snug">Order placed! 🎉</p>
            <p className="text-xs text-green-100 mt-0.5 leading-relaxed">
              Your order is confirmed and being prepared.
            </p>
          </div>
          {/* Dismiss */}
          <button
            onClick={() => setToastVisible(false)}
            className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-green-200 hover:text-white hover:bg-green-500 transition-colors mt-0.5 cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500">
            <div
              className="h-full bg-white/40"
              style={{ animation: "toast-shrink 4s linear forwards" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}