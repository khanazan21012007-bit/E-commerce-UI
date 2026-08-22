import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#2C2A29] text-[#FBF9F5] px-5 py-3 rounded-full shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
      <CheckCircle2 className="w-4 h-4 text-[#E9EDC9]" />
      <span className="text-xs font-medium tracking-wide">{message}</span>
    </div>
  );
}
