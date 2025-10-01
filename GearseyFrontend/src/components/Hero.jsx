import React from "react";
import { Search, Zap } from "lucide-react";

function Hero() {
  return (
    <div className="relative bg-bg">
      {/* Overlay for depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary-700 via-bg to-surface-elevated opacity-80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Vintage tag highlight */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary-500 text-bg font-bold rounded-full shadow-lg mb-6 tracking-wider text-base animate-pulse-slow">
          <Zap size={18} className="text-warning-500 animate-bounce" />
          Vintage & Rare Finds
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-secondary-500 drop-shadow-lg mb-5 animate-fade-in tracking-tight">
          Find Car Parts & Classic Treasures
        </h1>
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-font-secondary mb-10 animate-slide-up max-w-2xl mx-auto">
          Buy instantly or join bidding wars for rare collectibles from verified
          sellers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search part, model, or vintage year..."
              className="w-full pl-5 pr-14 py-5 rounded-xl text-font-main text-lg bg-surface border border-border shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
              aria-label="Search by car part, model, or category"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-500 hover:text-tertiary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={28} />
            </button>
          </div>
          <button className="bg-primary-500 text-font-main px-10 py-5 rounded-xl font-black text-lg shadow-xl hover:bg-tertiary-500 hover:text-bg transition-colors flex items-center gap-3 whitespace-nowrap animate-pulse-slow border-2 border-primary-700">
            <Zap size={24} />
            Search Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
