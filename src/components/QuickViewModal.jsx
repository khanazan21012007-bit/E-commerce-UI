import React from "react";
import { X, Heart } from "lucide-react";

export default function QuickViewModal({
  product,
  onClose,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F4F1EA] text-[#2C2A29] hover:bg-[#EFECE6] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="bg-[#FBF9F5] p-6 rounded-2xl flex items-center justify-center aspect-square">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-48 object-contain"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#BC6C25]">
              {product.category}
            </span>
            <h3 className="text-lg font-serif font-bold text-[#2C2A29] mt-2 mb-2">
              {product.title}
            </h3>
            <p className="text-[#6B655D] text-xs line-clamp-3 mb-4">
              {product.description}
            </p>

            <div className="text-xl font-bold text-[#2C2A29] mb-6">
              ${product.price.toFixed(2)}
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 bg-[#2C2A29] hover:bg-[#433F3D] text-[#FBF9F5] text-xs font-medium rounded-full shadow-md transition-all"
              >
                Add to Bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className="p-3 bg-[#F4F1EA] hover:bg-[#EFECE6] text-[#2C2A29] rounded-full transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist.includes(product.id)
                      ? "fill-[#BC6C25] text-[#BC6C25]"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
