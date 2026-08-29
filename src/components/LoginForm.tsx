import React, { useState } from "react";
import { Lock, User, Leaf, Eye, EyeOff } from "lucide-react";
import { STAFF } from "../data/constants";

const HERO_URL =
  "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=85&fit=crop";

interface Props {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState<"username" | "password" | "both" | "">("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Scenario-based validation before hitting the fake auth check
    if (!trimmedUsername && !trimmedPassword) {
      setFieldError("both");
      setError("Please enter your username and password.");
      return;
    }
    if (!trimmedUsername) {
      setFieldError("username");
      setError("Please enter your username.");
      return;
    }
    if (!trimmedPassword) {
      setFieldError("password");
      setError("Please enter your password.");
      return;
    }

    setFieldError("");
    setLoading(true);
    // Simulate brief auth delay for feel
    setTimeout(() => {
      if (username === STAFF.username && password === STAFF.password) {
        setError("");
        onLogin();
      } else {
        setFieldError("both");
        setError("Incorrect username or password. Please try again.");
      }
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left — hero panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <img
          src={HERO_URL}
          alt="PACKMAN Dashboard"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/80 via-green-800/60 to-green-600/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <Leaf size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-base tracking-tight leading-none">PACKMAN</span>
              <span className="text-green-200 text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5">Dashboard</span>
            </div>
          </div>

          {/* Bottom copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/30 backdrop-blur-sm border border-green-400/30 text-green-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              <Leaf size={11} />
              Fresh · Local · Honest
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
              PACKMAN<br />Dashboard
            </h2>
            <p className="text-green-200 mt-3 text-sm max-w-xs leading-relaxed">
              Sign in to start managing orders, browse the menu, and serve customers faster.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mt-5">
              {["Order Management", "INR Pricing", "Discounts"].map((f) => (
                <span key={f} className="text-xs bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-sm">

          {/* Mobile brand mark */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-sm">
              <Leaf size={17} className="text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="font-extrabold text-gray-900 text-lg leading-none tracking-tight">PACKMAN</p>
              <p className="text-[11px] text-green-600 font-bold uppercase tracking-widest leading-none mt-0.5">Dashboard</p>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Welcome back</h1>
          <p className="text-sm text-gray-500 mb-7">Sign in to your staff account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(""); setFieldError(""); }}
                  placeholder="Enter username"
                  autoComplete="username"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border bg-white text-gray-900 text-sm outline-none focus:ring-2 transition placeholder:text-gray-300 ${
                    fieldError === "username" || fieldError === "both"
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); setFieldError(""); }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border bg-white text-gray-900 text-sm outline-none focus:ring-2 transition placeholder:text-gray-300 ${
                    fieldError === "password" || fieldError === "both"
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-bold transition-all shadow-sm mt-1 cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-5 p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-700 font-medium text-center">
              Demo credentials:&nbsp;
              <span className="font-mono font-bold">admin</span>
              &nbsp;/&nbsp;
              <span className="font-mono font-bold">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}