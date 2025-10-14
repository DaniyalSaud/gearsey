import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import WhyChooseUs from "./WhyChooseUs";
import ProductGrid from "./ProductGrid";
import Newsletter from "./Newsletter";

function Homepage() {
  return (
    <div className="min-h-screen bg-bg">
      <Hero />
      <div
        id="marketplace"
        className="relative bg-gradient-to-b from-surface/30 to-bg scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Products */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-font-main mb-2">
              Featured Items
            </h2>
            <p className="text-font-secondary">
              Handpicked vintage treasures and rare finds
            </p>
          </div>
          <ProductGrid />
        </div>
      </div>
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Homepage;
