import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage({
  cart,
  updateQuantity,
  removeFromCart,
  setIsCheckoutOpen,
}) {
  const navigate = useNavigate();
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-serif font-bold text-[#2C2A29] mb-6 flex items-center gap-2.5">
        <ShoppingCart className="w-6 h-6 text-[#D4A373]" /> Shopping Bag
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EFECE6]">
          <p className="text-[#6B655D] text-xs mb-4">
            Your bag is currently empty.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 bg-[#2C2A29] text-white rounded-full text-xs font-medium"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white border border-[#EFECE6] rounded-2xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain bg-[#FBF9F5] p-2 rounded-xl border border-[#F4F1EA]"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-[#2C2A29] text-xs truncate">
                    {item.title}
                  </h3>
                  <p className="text-[#D4A373] text-xs font-bold mt-0.5">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#F4F1EA] px-2 py-1 rounded-full">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    aria-label="Decrease quantity"
                    className="p-1 text-[#6B655D] hover:text-[#2C2A29]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    aria-label="Increase quantity"
                    className="p-1 text-[#6B655D] hover:text-[#2C2A29]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="p-2 text-[#8C857B] hover:text-[#A34733] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border border-[#EFECE6] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-[#8C857B] text-[10px] uppercase font-bold block">
                Subtotal
              </span>
              <span className="text-xl font-serif font-bold text-[#2C2A29]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#283618] hover:bg-[#384d22] text-white font-medium rounded-full shadow-md text-xs transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
