import { CheckCircle2, RotateCcw, LogOut } from "lucide-react";

interface Props {
  onNewOrder: () => void;
  onLogout: () => void;
}

export default function OrderSuccess({ onNewOrder, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-sm w-full text-center border border-gray-100">
        {/* Animated check */}
        <div className="w-20 h-20 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={38} className="text-green-600" />
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Order Placed! 🎉
        </h2>
        <p className="text-sm text-gray-500 mb-2 leading-relaxed">
          Your order has been submitted and is being prepared.
        </p>
        <p className="text-xs text-green-600 font-semibold bg-green-50 border border-green-100 rounded-lg px-3 py-1.5 inline-block mb-8">
          Thank you for your order!
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onNewOrder}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.99]"
          >
            <RotateCcw size={15} />
            Start New Order
          </button>
          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
