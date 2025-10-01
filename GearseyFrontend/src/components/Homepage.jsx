import React from "react";
import Hero from "./Hero";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-surface-elevated text-font-main">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Filters />
        <ProductGrid />
      </div>
    </div>
  );
}

export default Homepage;
