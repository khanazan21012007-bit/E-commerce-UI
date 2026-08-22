import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export default function WishlistPage({
  products,
  wishlist,
  addToCart,
  toggleWishlist,
}) {
  const navigate = useNavigate();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-serif font-bold text-[#2C2A29] mb-6 flex items-center gap-2.5">
        <Heart className="w-6 h-6 text-[#BC6C25]" /> Saved Wishlist
      </h1>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EFECE6]">
          <p className="text-[#6B655D] text-xs mb-4">
            Your wishlist is currently empty.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-[#2C2A29] text-white rounded-full text-xs font-medium"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
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
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Wishlist"
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-[#BC6C25] hover:text-[#6B655D] transition-colors border border-[#EFECE6]"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#BC6C25]" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-[#2C2A29] text-xs leading-snug line-clamp-1 mb-1">
                    {product.title}
                  </h3>
                  <span className="text-sm font-bold text-[#2C2A29]">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full py-2 bg-[#F4F1EA] hover:bg-[#2C2A29] hover:text-white text-[#2C2A29] text-xs font-medium rounded-full transition-all"
                >
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
