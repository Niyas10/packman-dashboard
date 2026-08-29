import { useState } from "react";
import { Minus, Plus, X, ShoppingBag, Tag, ChevronDown } from "lucide-react";
import type { CartItem } from "../data/types";
import { DISCOUNT_OPTIONS } from "../data/constants";

interface Props {
  cartItems: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: (discountId: string) => void;
}

function fmt(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function CartPanel({ cartItems, onChangeQty, onRemove, onCheckout }: Props) {
  const [discountId, setDiscountId] = useState("none");

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const isEmpty = cartItems.length === 0;
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  const selected = DISCOUNT_OPTIONS.find((d) => d.id === discountId)!;
  const discountAmt =
    selected.type === "percent"
      ? (subtotal * selected.value) / 100
      : Math.min(selected.value, subtotal);
  const afterDiscount = subtotal - discountAmt;
  const total = afterDiscount;

  return (
    <aside className="w-full lg:w-96 shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col max-h-[52vh] lg:max-h-full shadow-lg lg:shadow-none">

      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-green-700 shrink-0 bg-green-600">
        <div className="flex items-center gap-2.5">
          <ShoppingBag size={18} className="text-white" />
          <h2 className="font-bold text-white text-base tracking-wide">Your Order</h2>
          {!isEmpty && (
            <span className="ml-auto text-xs font-bold bg-white text-green-700 px-2.5 py-0.5 rounded-full">
              {totalQty} item{totalQty > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* ── Items list ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center select-none">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
              <ShoppingBag size={28} className="text-gray-200" />
            </div>
            <p className="text-sm font-semibold text-gray-400">Cart is empty</p>
            <p className="text-xs text-gray-300 mt-1">Add items from the menu</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-gray-50 hover:bg-green-50 rounded-xl px-3 py-2.5 group transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    (t.parentElement as HTMLElement).innerText = item.emoji;
                  }}
                />
              </div>

              {/* Name + unit price */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 tabular-nums">
                  {fmt(item.price)} × {item.qty}
                </p>
              </div>

              {/* Qty stepper */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => onChangeQty(item.id, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  aria-label={`Decrease ${item.name}`}
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-sm font-bold text-gray-800 tabular-nums">
                  {item.qty}
                </span>
                <button
                  onClick={() => onChangeQty(item.id, 1)}
                  className="btn-gloss w-7 h-7 flex items-center justify-center rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer"
                  aria-label={`Increase ${item.name}`}
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Line total */}
              <span className="text-sm font-extrabold text-gray-800 w-16 text-right tabular-nums shrink-0">
                {fmt(item.price * item.qty)}
              </span>

              {/* Remove */}
              <button
                onClick={() => onRemove(item.id)}
                className="opacity-0 group-hover:opacity-100 ml-0.5 text-gray-300 hover:text-red-400 transition-all shrink-0 cursor-pointer"
                aria-label={`Remove ${item.name}`}
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* ── Checkout section ── */}
      <div className="px-5 pb-5 pt-4 border-t border-gray-100 space-y-3.5 shrink-0 bg-gray-50">

        {/* Discount selector */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            <Tag size={12} className="text-green-600" />
            Discount / Offer
          </label>
          <div className="relative">
            <select
              value={discountId}
              onChange={(e) => setDiscountId(e.target.value)}
              disabled={isEmpty}
              className="w-full appearance-none bg-white border border-gray-200 rounded-lg pl-3.5 pr-9 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-50 disabled:text-gray-300 transition cursor-pointer"
            >
              {DISCOUNT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Price breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span className="tabular-nums font-semibold">{fmt(subtotal)}</span>
          </div>
          {discountAmt > 0 && (
            <div className="flex justify-between text-sm text-green-600 font-semibold">
              <span className="flex items-center gap-1.5">
                <Tag size={12} />
                {selected.type === "percent"
                  ? `Discount (${selected.value}%)`
                  : `Flat Discount`}
              </span>
              <span className="tabular-nums">− {fmt(discountAmt)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2.5 border-t border-gray-200">
            <span>Total</span>
            <span className="tabular-nums text-green-700">{fmt(total)}</span>
          </div>
        </div>

        {/* Checkout button */}
        <button
          disabled={isEmpty}
          onClick={() => onCheckout(discountId)}
          className="btn-gloss w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag size={16} />
          {isEmpty ? "Add items to checkout" : `Checkout · ${fmt(total)}`}
        </button>
      </div>
    </aside>
  );
}
