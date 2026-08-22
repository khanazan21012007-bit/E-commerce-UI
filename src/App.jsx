import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import "./App.css";
import Header from "./components/Header";
import Toast from "./components/Toast";
import QuickViewModal from "./components/QuickViewModal";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import WishlistPage from "./pages/Wishlist";
import Footer from "./components/Footer";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("atelier_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("atelier_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [activeQuickView, setActiveQuickView] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const toastTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("atelier_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("atelier_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://dummyjson.com/products?limit=100",
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error("Failed to fetch catalog");

        const data = await response.json();
        setProducts(data.products);

        const uniqueCategories = [
          "All",
          ...new Set(data.products.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(""), 3000);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        { ...product, quantity: 1, image: product.thumbnail },
      ];
    });
    showToast(`${product.title.substring(0, 20)}... added to your bag`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from bag");
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast("Removed from wishlist");
        return prev.filter((item) => item !== id);
      } else {
        showToast("Saved to wishlist");
        return [...prev, id];
      }
    });
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-[#FBF9F5] text-[#2C2A29] font-sans selection:bg-[#D4A373] selection:text-white relative">
        <Toast message={toastMessage} />

        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          wishlistCount={wishlist.length}
          cartItemCount={cartItemCount}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <div className="relative z-10">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  categories={categories}
                  loading={loading}
                  error={error}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  setActiveQuickView={setActiveQuickView}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  products={products}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  setIsCheckoutOpen={setIsCheckoutOpen}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <WishlistPage
                  products={products}
                  wishlist={wishlist}
                  addToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                />
              }
            />
          </Routes>
        </div>

        <QuickViewModal
          product={activeQuickView}
          onClose={() => setActiveQuickView(null)}
          addToCart={addToCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />

        <Footer
          product={activeQuickView}
          onClose={() => setActiveQuickView(null)}
          addToCart={addToCart}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />

        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border border-[#EFECE6] p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-[#EFECE6] rounded-full flex items-center justify-center text-[#283618] mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#2C2A29] mb-2">
                Order Confirmed
              </h3>
              <p className="text-[#6B655D] text-xs mb-6">
                Thank you for your order. We are preparing your items with care.
              </p>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full py-3 bg-[#283618] hover:bg-[#384d22] text-white font-medium rounded-full shadow-md transition-all text-xs"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}
