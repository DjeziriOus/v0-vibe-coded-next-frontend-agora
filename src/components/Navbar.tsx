"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Diamond,
  Search,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Store,
  Package,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--agora-surface)] border-b border-[var(--agora-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 shrink-0"
          >
            <Image 
                src="/logo.png" 
                alt="Logo Agora" 
                width={50} 
                height={50} 
                className="w-10 h-10 rounded-full object-cover" 
              />
            <span className="font-display text-xl font-bold text-[var(--agora-primary)]">
              Agora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-8">
            <Link
              href="/catalogue"
              className="text-[var(--agora-mid)] hover:text-[var(--agora-primary)] font-medium text-sm transition-colors"
            >
              Catalogue
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--agora-line)] rounded-[var(--radius-md)] text-sm text-[var(--agora-ink)] placeholder:text-[var(--agora-text-disabled)] focus:outline-none focus:border-[var(--agora-primary)] focus:ring-2 focus:ring-[var(--agora-primary)]/20 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--agora-mid)]" />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-[var(--agora-mid)] hover:text-[var(--agora-primary)] transition-colors"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              href="/panier"
              className="relative p-2 text-[var(--agora-mid)] hover:text-[var(--agora-primary)] transition-colors"
              aria-label={`Panier (${itemCount} articles)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-[var(--agora-primary)] text-white text-[10px] font-bold rounded-full px-1">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 text-[var(--agora-mid)] hover:text-[var(--agora-primary)] transition-colors"
                  aria-label="Menu utilisateur"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--agora-accent)] flex items-center justify-center text-[var(--agora-primary)] font-medium text-sm">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </div>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>

                {/* Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[var(--agora-surface)] border border-[var(--agora-line)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] py-1 z-20">
                      <div className="px-4 py-3 border-b border-[var(--agora-line)]">
                        <p className="font-medium text-[var(--agora-ink)]">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-[var(--agora-mid)]">
                          {user?.email}
                        </p>
                      </div>
                      
                      {user?.role === "seller" && (
                        <Link
                          href="/vendeur/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--agora-mid)] hover:text-[var(--agora-ink)] hover:bg-[var(--agora-accent)] transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Store className="w-4 h-4" />
                          Espace vendeur
                        </Link>
                      )}
                      
                      <Link
                        href="/commandes"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--agora-mid)] hover:text-[var(--agora-ink)] hover:bg-[var(--agora-accent)] transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        Mes commandes
                      </Link>
                      
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[var(--agora-danger)] hover:bg-[var(--agora-accent)] transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--agora-primary)] text-white rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--agora-primary-hover)] transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Connexion</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--agora-mid)] hover:text-[var(--agora-primary)] transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-3 border-t border-[var(--agora-line)]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des produits..."
                className="w-full pl-10 pr-4 py-2.5 border border-[var(--agora-line)] rounded-[var(--radius-md)] text-sm text-[var(--agora-ink)] placeholder:text-[var(--agora-text-disabled)] focus:outline-none focus:border-[var(--agora-primary)] focus:ring-2 focus:ring-[var(--agora-primary)]/20"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--agora-mid)]" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--agora-line)]">
            <nav className="flex flex-col gap-1">
              <Link
                href="/catalogue"
                className="px-4 py-3 text-[var(--agora-mid)] hover:text-[var(--agora-primary)] hover:bg-[var(--agora-accent)] rounded-[var(--radius-md)] font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catalogue
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
