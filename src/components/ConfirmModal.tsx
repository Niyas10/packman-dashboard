import { CheckCircle2, X, Tag } from "lucide-react";
import type { CartItem } from "../data/types";
import { DISCOUNT_OPTIONS } from "../data/constants";

interface Props {
  cartItems: CartItem[];
  discountId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function fmt(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function ConfirmModal({ cartItems, discountId, onConfirm, onCancel }: Props) {
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  const selected = DISCOUNT_OPTIONS.find((d) => d.id === discountId) ?? DISCOUNT_OPTIONS[0];
  const discountAmt =
    selected.type === "percent"
      ? (subtotal * selected.value) / 100
      : Math.min(selected.value, subtotal);
  const afterDiscount = subtotal - discountAmt;
  const total = afterDiscount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-green-600">
          <div>
            <h2 className="font-bold text-white text-base">Review Order</h2>
            <p className="text-xs text-green-100 mt-0.5">
              {totalQty} item{totalQty !== 1 ? "s" : ""} · {fmt(total)} payable
            </p>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 text-white transition-colors"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        {/* Order items */}
        <div className="px-4 py-3 max-h-52 overflow-y-auto space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-1">
              {/* Thumbnail */}
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
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
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400">
                  {fmt(item.price)} × {item.qty}
                </p>
              </div>
              <span className="text-sm font-bold text-gray-800 tabular-nums">
                {fmt(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Subtotal</span>
            <span className="tabular-nums font-medium">{fmt(subtotal)}</span>
          </div>
          {discountAmt > 0 && (
            <div className="flex justify-between text-xs text-green-600 font-semibold">
              <span className="flex items-center gap-1">
                <Tag size={10} />
                {selected.label}
              </span>
              <span className="tabular-nums">− {fmt(discountAmt)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total Payable</span>
            <span className="tabular-nums text-green-700">{fmt(total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-gloss flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.99] cursor-pointer"
          >
            <CheckCircle2 size={15} />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
