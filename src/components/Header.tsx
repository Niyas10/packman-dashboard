import { Leaf, LogOut, ShoppingBag } from "lucide-react";

interface Props {
  cartCount: number;
  onLogout: () => void;
  onCartToggle?: () => void;
}

export default function Header({ cartCount, onLogout, onCartToggle }: Props) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shrink-0 z-20 shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="btn-gloss w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 cursor-default">
          <Leaf size={17} className="text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-extrabold text-gray-900 text-lg sm:text-xl tracking-tight leading-none">
            PACKMAN
          </span>
          <span className="text-[11px] text-green-600 font-bold tracking-widest uppercase leading-none mt-0.5">
            Dashboard
          </span>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Cart toggle — mobile only */}
        <button
          onClick={onCartToggle}
          className="relative lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition-colors cursor-pointer"
          aria-label="Toggle cart"
        >
          <ShoppingBag size={15} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>

        {/* Item count badge — desktop */}
        {cartCount > 0 && (
          <span className="hidden lg:flex items-center gap-1.5 text-xs text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full font-semibold">
            <ShoppingBag size={12} />
            {cartCount} item{cartCount !== 1 ? "s" : ""}
          </span>
        )}

        {/* Sign out */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 px-3 py-1.5 rounded-xl hover:bg-red-50 transition-colors font-medium cursor-pointer"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline text-xs font-semibold">Sign out</span>
        </button>
      </div>
    </header>
  );
}
