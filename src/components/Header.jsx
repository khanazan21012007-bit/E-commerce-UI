import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Menu, X } from "lucide-react";

export default function Header({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartItemCount,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EFECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-[#D4A373] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              A
            </div>
            <span className="text-xl font-serif font-bold tracking-wider text-[#2C2A29]">
              ATELIER
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C857B] w-4 h-4" />
            <input
              type="text"
              placeholder="Search curated pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-[#F4F1EA] border border-transparent rounded-full text-xs text-[#2C2A29] placeholder-[#8C857B] focus:outline-none focus:border-[#D4A373] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2.5 text-[#2C2A29] hover:bg-[#F4F1EA] rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#BC6C25] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative p-2.5 text-[#2C2A29] hover:bg-[#F4F1EA] rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#283618] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-[#2C2A29]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`pb-4 md:hidden transition-all ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C857B] w-4 h-4" />
            <input
              type="text"
              placeholder="Search pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-[#F4F1EA] rounded-full text-xs text-[#2C2A29] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
