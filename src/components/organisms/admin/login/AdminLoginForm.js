"use client";

import Button from "src/components/atoms/Button";
import { RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function AdminLoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  error,
  onSubmit,
}) {
  return (
    <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-white/60 shadow-glass rounded-3xl p-8 sm:p-10 relative z-10 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-bold text-neutral-800 tracking-tight">
          Admin Portal
        </h2>
        <p className="text-sm text-neutral-500 mt-2">
          Log in to manage Tarmal Creation products
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-bg border border-danger/25 text-danger text-sm rounded-2xl">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <RiMailLine className="text-lg" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@tarmal.com"
              className="w-full rounded-xl h-12 border border-neutral-300 bg-white pl-12 pr-4 text-base placeholder:text-muted focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none hover:border-neutral-400 transition duration-300"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 block">
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <RiLockPasswordLine className="text-lg" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl h-12 border border-neutral-300 bg-white pl-12 pr-12 text-base placeholder:text-muted focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none hover:border-neutral-400 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-primary transition-colors cursor-pointer"
            >
              {showPassword ? (
                <RiEyeOffLine className="text-lg" />
              ) : (
                <RiEyeLine className="text-lg" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl flex items-center justify-center font-bold bg-primary hover:bg-primary-dark text-white tracking-wider cursor-pointer shadow-md shadow-primary/20 transition-all duration-300"
        >
          {loading ? "Signing in..." : "SIGN IN"}
        </Button>
      </form>
    </div>
  );
}
