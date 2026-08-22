import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#F4F1EA] border-t border-[#EFECE6] mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#D4A373] flex items-center justify-center text-white font-serif font-bold text-sm shadow-sm">
                A
              </div>
              <span className="text-lg font-serif font-bold tracking-wider text-[#2C2A29]">
                ATELIER
              </span>
            </div>
            <p className="text-[#6B655D] text-xs max-w-sm leading-relaxed">
              Curated intentional pieces crafted with care, quality, and
              effortless elegance for your everyday living.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#2C2A29] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B655D]">
              <li>
                <Link to="/" className="hover:text-[#2C2A29] transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-[#2C2A29] transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-[#2C2A29] transition-colors"
                >
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-serif font-bold uppercase tracking-wider text-[#2C2A29] mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#6B655D]">
              <li>
                <span className="hover:text-[#2C2A29] cursor-pointer transition-colors">
                  Shipping & Returns
                </span>
              </li>
              <li>
                <span className="hover:text-[#2C2A29] cursor-pointer transition-colors">
                  Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-[#2C2A29] cursor-pointer transition-colors">
                  Contact Atelier
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EFECE6] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C857B]">
          <p>
            © {new Date().getFullYear()} Atelier Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
