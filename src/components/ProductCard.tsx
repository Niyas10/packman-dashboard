import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Product } from "../data/types";

interface Props {
  product: Product;
  qty: number;
  onAdd: (id: string) => void;
  onChangeQty: (id: string, delta: number) => void;
}

function fmt(n: number) {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function ProductCard({ product, qty, onAdd, onChangeQty }: Props) {
  const [imgError, setImgError] = useState(false);
  const isInCart = qty > 0;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col group
        ${isInCart
          ? "border-green-300 shadow-md shadow-green-50 ring-1 ring-green-200"
          : "border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        }`}
    >
      {/* Image area */}
      <div className="relative h-36 bg-gray-100 overflow-hidden shrink-0">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-green-50">
            {product.emoji}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-green-100">
          {fmt(product.price)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3 gap-2">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-1">
            {product.name}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-0.5">
          {qty === 0 ? (
            <button
              onClick={() => onAdd(product.id)}
              className="btn-gloss flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors active:scale-95 shadow-sm cursor-pointer"
              aria-label={`Add ${product.name}`}
            >
              <Plus size={12} />
              Add to order
            </button>
          ) : (
            <>
              <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                <button
                  onClick={() => onChangeQty(product.id, -1)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label={`Decrease ${product.name}`}
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-sm font-bold text-gray-800 tabular-nums">
                  {qty}
                </span>
                <button
                  onClick={() => onChangeQty(product.id, 1)}
                  className="btn-gloss w-7 h-7 flex items-center justify-center rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors cursor-pointer"
                  aria-label={`Increase ${product.name}`}
                >
                  <Plus size={12} />
                </button>
              </div>
              <span className="text-sm font-extrabold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 tabular-nums">
                {fmt(product.price * qty)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
