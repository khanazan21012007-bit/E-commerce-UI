import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";

export default function ProductDetails({
  products,
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-xl font-serif font-bold">Piece Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-[#2C2A29] text-white rounded-full text-xs font-medium"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#6B655D] hover:text-[#2C2A29] mb-6 text-xs font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-[#EFECE6] p-6 sm:p-10 rounded-3xl shadow-sm">
        <div className="bg-[#FBF9F5] p-8 rounded-2xl flex items-center justify-center min-h-[320px] border border-[#F4F1EA]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-[#F4F1EA] text-[#BC6C25] text-[10px] font-bold rounded-full uppercase tracking-widest mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C2A29] mb-3">
              {product.title}
            </h1>
            <p className="text-[#6B655D] text-xs sm:text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-[#2C2A29]">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] bg-[#EFECE6] text-[#283618] px-3 py-1 rounded-full font-medium">
                In Stock ({product.stock})
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-[#F4F1EA]">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 py-3.5 bg-[#2C2A29] hover:bg-[#433F3D] text-[#FBF9F5] font-medium rounded-full transition-all flex items-center justify-center gap-2 text-xs shadow-md"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="p-3.5 bg-[#F4F1EA] hover:bg-[#EFECE6] text-[#2C2A29] rounded-full transition-colors"
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
  );
}
