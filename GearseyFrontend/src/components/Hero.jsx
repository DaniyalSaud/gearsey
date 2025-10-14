import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Zap } from "lucide-react";

function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[82vh] bg-bg">
      {/* Subtle background gradient - WITH BREATHING ANIMATION */}
      <div
        className="absolute inset-0 animate-gradient-pulse"
        style={{
          background:
            "radial-gradient(ellipse at top, #37CDB2 0%, transparent 50%), radial-gradient(ellipse at bottom right, #D92B2B 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] animate-fade-in"
        style={{
          backgroundImage: `linear-gradient(#495061 1px, transparent 1px), linear-gradient(90deg, #495061 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-elevated text-tertiary-500 font-bold rounded-full border border-tertiary-500/30 mb-8 tracking-wider text-sm animate-slide-down animate-delay-200">
          <Zap size={18} className="fill-tertiary-500" />
          Vintage & Rare Finds
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-font-main leading-tight animate-slide-up animate-delay-400">
          Find Car Parts &<br />
          <span className="bg-gradient-to-r from-secondary-500 via-tertiary-500 to-primary-500 bg-clip-text text-transparent">
            Classic Treasures
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-12 text-font-secondary max-w-2xl mx-auto leading-relaxed animate-slide-up animate-delay-600">
          Buy instantly or join bidding wars for rare collectibles from{" "}
          <span className="font-semibold text-tertiary-500">
            verified sellers
          </span>
          .
        </p>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-3xl mx-auto mb-8 animate-slide-up animate-delay-800">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search part, model, or vintage year..."
              className="input-field pr-14"
              aria-label="Search by car part, model, or category"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-font-secondary hover:text-secondary-500 transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2 whitespace-nowrap px-8 py-3.5 text-base">
            <Zap size={20} className="fill-current" />
            Search Now
          </button>
        </div>

        {/* Browse Button */}
        <div className="mt-6 animate-slide-up animate-delay-1000">
          <NavLink to="/filter">
            <button className="btn-secondary uppercase tracking-wider font-semibold text-sm px-8 py-3">
              Browse Inventory
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Hero;
