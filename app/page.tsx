"use client";

import Link from "next/link";
import { Diamond, ArrowRight, ShoppingBag, Store, Shield } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { mockProducts, mockCategories } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const categoryIcons: Record<string, string> = {
  Papeterie: "📝",
  Maison: "🏠",
  Mode: "👜",
  Bijoux: "💎",
  Art: "🎨",
  Alimentation: "🍯",
  Beauté: "✨",
  Jouets: "🧸",
};

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const featuredCategories = mockCategories.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[var(--agora-ink)] to-[#2D2F6B] overflow-hidden">
          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
            <div className="max-w-3xl mx-auto text-center">
              {/* Logo Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Diamond className="w-5 h-5 text-[var(--agora-gold)]" />
                <span className="text-white/80 text-sm font-medium">
                  La marketplace française
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Bienvenue sur{" "}
                <span className="relative inline-block">
                  Agora
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[var(--agora-gold)] rounded-full" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                La marketplace multi-boutiques française. Découvrez des créateurs
                passionnés et des produits artisanaux uniques.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/catalogue"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--agora-primary)] text-white rounded-[var(--radius-md)] font-medium hover:bg-[var(--agora-primary-hover)] transition-colors"
                >
                  Découvrir les produits
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white/30 text-white rounded-[var(--radius-md)] font-medium hover:bg-white/10 transition-colors"
                >
                  Ouvrir ma boutique
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        {/* <section className="py-16 bg-[var(--agora-bg)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--agora-ink)] mb-8 text-center">
              Parcourir par catégorie
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/catalogue?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center p-4 bg-[var(--agora-surface)] border border-[var(--agora-line)] rounded-[var(--radius-lg)] hover:border-[var(--agora-primary)] hover:shadow-[var(--shadow-md)] transition-all"
                >
                  <span className="text-3xl mb-2">
                    {categoryIcons[category.name] || "📦"}
                  </span>
                  <span className="text-sm font-medium text-[var(--agora-ink)] text-center group-hover:text-[var(--agora-primary)] transition-colors">
                    {category.name}
                  </span>
                  <span className="text-xs text-[var(--agora-mid)] mt-1">
                    {category.productCount} produits
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section> */}

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--agora-ink)]">
                Produits en vedette
              </h2>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-1 text-[var(--agora-primary)] font-medium text-sm hover:underline"
              >
                Voir tout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-[var(--agora-accent)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--agora-ink)] mb-12 text-center">
              Comment ça marche
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--agora-primary)] flex items-center justify-center text-white font-display font-bold text-xl mb-4">
                  1
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--agora-surface)] border border-[var(--agora-line)] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-[var(--agora-primary)]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[var(--agora-ink)] mb-2">
                  Créez votre compte
                </h3>
                <p className="text-[var(--agora-mid)] text-sm max-w-xs">
                  Inscrivez-vous gratuitement en quelques secondes pour commencer
                  vos achats.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--agora-primary)] flex items-center justify-center text-white font-display font-bold text-xl mb-4">
                  2
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--agora-surface)] border border-[var(--agora-line)] flex items-center justify-center mb-4">
                  <Store className="w-6 h-6 text-[var(--agora-primary)]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[var(--agora-ink)] mb-2">
                  Parcourez le catalogue
                </h3>
                <p className="text-[var(--agora-mid)] text-sm max-w-xs">
                  Explorez des centaines de boutiques et trouvez des produits
                  uniques.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--agora-primary)] flex items-center justify-center text-white font-display font-bold text-xl mb-4">
                  3
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--agora-surface)] border border-[var(--agora-line)] flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[var(--agora-primary)]" />
                </div>
                <h3 className="font-display font-semibold text-lg text-[var(--agora-ink)] mb-2">
                  Commandez en toute sécurité
                </h3>
                <p className="text-[var(--agora-mid)] text-sm max-w-xs">
                  Paiement sécurisé et suivi de livraison pour chaque commande.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 bg-[var(--agora-primary)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Vous êtes artisan ou créateur ?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Rejoignez Agora et vendez vos créations à des milliers de clients.
              Inscription gratuite, commissions réduites.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[var(--agora-primary)] rounded-[var(--radius-md)] font-medium hover:bg-white/90 transition-colors"
            >
              Ouvrir ma boutique gratuitement
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
