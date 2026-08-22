import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  Star,
  Heart,
  Eye,
} from "lucide-react";

export default function Home({
  products,
  categories,
  loading,
  error,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  wishlist,
  toggleWishlist,
  setActiveQuickView,
}) {
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EFECE6] bg-[#F4F1EA]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#2C2A29] leading-tight">
            The Atelier Market
          </h1>
          <p className="mt-4 text-[#6B655D] text-sm sm:text-base max-w-xl mx-auto font-light">
            Explore our curated catalog of intentional pieces crafted with care,
            quality, and effortless elegance.
          </p>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-serif font-bold text-[#2C2A29] uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4A373]" />{" "}
              Categories
            </h2>
            <span className="text-[11px] text-[#8C857B] font-medium">
              {filteredProducts.length} items
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.slice(0, 12).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all capitalize ${
                  selectedCategory === cat
                    ? "bg-[#2C2A29] text-[#FBF9F5] shadow-sm"
                    : "bg-[#F4F1EA] text-[#6B655D] hover:bg-[#EFECE6] hover:text-[#2C2A29]"
                }`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-[#D4A373]">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#D4A373]" />
            <p className="text-[#6B655D] font-medium text-xs">
              Curating catalog...
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 bg-[#FAF0ED] border border-[#F2D6CE] rounded-2xl text-[#A34733]">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="font-medium text-sm">Unable to load catalog</p>
            <p className="text-xs text-[#C27967] mt-0.5">{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F4F1EA]/60 rounded-2xl border border-[#EFECE6]">
            <p className="text-[#6B655D] text-sm">
              No items found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {!loading &&
              !error &&
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-[#EFECE6] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-square bg-[#FBF9F5] p-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-[#2C2A29] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#EFECE6]">
                      {product.category.replace("-", " ")}
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Wishlist"
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#6B655D] hover:text-[#BC6C25] transition-colors border border-[#EFECE6]"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          wishlist.includes(product.id)
                            ? "fill-[#BC6C25] text-[#BC6C25]"
                            : ""
                        }`}
                      />
                    </button>

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
                      <button
                        onClick={() => setActiveQuickView(product)}
                        aria-label="Quick View"
                        className="p-2.5 bg-white text-[#2C2A29] rounded-full text-xs font-medium shadow-md hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="px-4 py-2.5 bg-white text-[#2C2A29] rounded-full text-xs font-medium shadow-md hover:scale-105 transition-transform"
                      >
                        View
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1.5">
                        <Star className="w-3 h-3 fill-[#D4A373] text-[#D4A373]" />
                        <span className="text-[11px] font-bold text-[#6B655D]">
                          {product.rating}
                        </span>
                      </div>

                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-serif font-bold text-[#2C2A29] text-xs leading-snug line-clamp-1 hover:text-[#D4A373] transition-colors cursor-pointer"
                      >
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between">
                      <span className="text-sm font-bold text-[#2C2A29]">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#2C2A29] hover:text-white text-[#2C2A29] text-[11px] font-medium rounded-full transition-all"
                      >
                        + Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </>
  );
}
