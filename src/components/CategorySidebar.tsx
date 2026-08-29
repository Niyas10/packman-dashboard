import { CATEGORIES } from "../data/constants";
import type { Category } from "../data/types";

interface Props {
  activeCat: string;
  onChange: (id: string) => void;
}

export default function CategorySidebar({ activeCat, onChange }: Props) {
  return (
    <nav
      aria-label="Food categories"
      className="w-full lg:w-56 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-100 flex lg:flex-col gap-1 px-2 py-2 overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden"
    >
      {/* Section label — desktop only */}
      <p className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-widest px-3 pt-1 pb-2">
        Categories
      </p>

      {CATEGORIES.map((cat: Category) => {
        const Icon = cat.icon;
        const active = cat.id === activeCat;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`shrink-0 flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-[15px] font-semibold whitespace-nowrap cursor-pointer
              ${active
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-900 hover:bg-green-50 hover:text-green-700"
              }`}
          >
            <span
              className={`w-7 h-7 flex items-center justify-center rounded-lg shrink-0 transition-colors
                ${active ? "bg-green-500" : "bg-gray-100"}`}
            >
              <Icon size={15} className={active ? "text-white" : "text-gray-600"} />
            </span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </nav>
  );
}
