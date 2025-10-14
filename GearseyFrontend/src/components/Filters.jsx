import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Filter,
  Tag,
  SortAsc,
  DollarSign,
  Calendar,
  MapPin,
  Star,
  Package,
  X,
  Search,
} from "lucide-react";
import ProductGrid from "./ProductGrid";

function FiltersPage() {
  const { state, dispatch } = useAppContext();
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [yearRange, setYearRange] = useState({ min: "", max: "" });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (filterType, value) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { [filterType]: value },
    });
  };

  const handlePriceRangeApply = () => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        priceMin: priceRange.min ? parseFloat(priceRange.min) : null,
        priceMax: priceRange.max ? parseFloat(priceRange.max) : null,
      },
    });
  };

  const handleYearRangeApply = () => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        yearMin: yearRange.min ? parseInt(yearRange.min) : null,
        yearMax: yearRange.max ? parseInt(yearRange.max) : null,
      },
    });
  };

  const handleClearAll = () => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        show: "all",
        category: "all",
        sortBy: "latest",
        condition: "all",
        manufacturer: "all",
        location: "all",
        rating: "all",
        priceMin: null,
        priceMax: null,
        yearMin: null,
        yearMax: null,
        inStock: false,
        freeShipping: false,
        verified: false,
      },
    });
    setPriceRange({ min: "", max: "" });
    setYearRange({ min: "", max: "" });
  };

  const activeFiltersCount = Object.entries(state.filters).filter(
    ([key, value]) => {
      if (key === "show" && value !== "all") return true;
      if (key === "category" && value !== "all") return true;
      if (key === "sortBy" && value !== "latest") return true;
      if (key === "condition" && value !== "all") return true;
      if (key === "manufacturer" && value !== "all") return true;
      if (key === "location" && value !== "all") return true;
      if (key === "rating" && value !== "all") return true;
      if (
        key === "priceMin" ||
        key === "priceMax" ||
        key === "yearMin" ||
        key === "yearMax"
      )
        return value !== null;
      if (key === "inStock" || key === "freeShipping" || key === "verified")
        return value === true;
      return false;
    }
  ).length;

  const FilterSection = ({ children }) => (
    <div className="bg-surface rounded-xl p-5 border border-border shadow-sm">
      {children}
    </div>
  );

  const FilterContent = () => (
    <>
      {/* Listing Type */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Tag size={18} className="text-secondary-500" />
          Listing Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["all", "fixed", "auctions"].map((option) => (
            <button
              key={option}
              onClick={() => handleFilterChange("show", option)}
              className={`px-3 py-2.5 rounded-lg font-semibold transition-all capitalize text-sm
                ${
                  state.filters.show === option
                    ? "bg-primary-500 text-white shadow-lg"
                    : "bg-surface-elevated border border-border text-font-secondary hover:border-primary-500 hover:text-primary-500"
                }`}
            >
              {option === "fixed" ? "Fixed" : option}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <DollarSign size={18} className="text-tertiary-500" />
          Price Range
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min ($)"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="input-field text-sm"
            />
            <input
              type="number"
              placeholder="Max ($)"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="input-field text-sm"
            />
          </div>
          <button
            onClick={handlePriceRangeApply}
            className="w-full btn-secondary text-sm py-2"
          >
            Apply Range
          </button>
          {/* Quick Price Filters */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-font-secondary mb-2">Quick Select:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Under $50", min: null, max: 50 },
                { label: "$50-$200", min: 50, max: 200 },
                { label: "$200-$500", min: 200, max: 500 },
                { label: "$500+", min: 500, max: null },
              ].map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    setPriceRange({
                      min: range.min || "",
                      max: range.max || "",
                    });
                    dispatch({
                      type: "SET_FILTERS",
                      payload: { priceMin: range.min, priceMax: range.max },
                    });
                  }}
                  className="px-2 py-1.5 rounded text-xs bg-surface-elevated border border-border text-font-secondary hover:border-tertiary-500 hover:text-tertiary-500 transition-all"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Package size={18} className="text-secondary-500" />
          Category
        </label>
        <select
          value={state.filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Categories</option>
          <option value="engines">🔧 Engines & Parts</option>
          <option value="body">🚗 Body & Exterior</option>
          <option value="interior">🪑 Interior & Upholstery</option>
          <option value="wheels">⚙️ Wheels & Tires</option>
          <option value="electrical">⚡ Electrical Systems</option>
          <option value="suspension">🔩 Suspension & Brakes</option>
          <option value="exhaust">💨 Exhaust Systems</option>
          <option value="accessories">✨ Accessories</option>
          <option value="vintage">🏆 Vintage Collectibles</option>
          <option value="memorabilia">🎖️ Memorabilia & Signs</option>
        </select>
      </FilterSection>

      {/* Condition */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Star size={18} className="text-warning-500" />
          Condition
        </label>
        <select
          value={state.filters.condition || "all"}
          onChange={(e) => handleFilterChange("condition", e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Conditions</option>
          <option value="new">✨ Brand New</option>
          <option value="like-new">⭐ Like New</option>
          <option value="excellent">💎 Excellent</option>
          <option value="good">👍 Good</option>
          <option value="fair">👌 Fair</option>
          <option value="restoration">🔧 For Restoration</option>
        </select>
      </FilterSection>

      {/* Manufacturer */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Tag size={18} className="text-tertiary-500" />
          Manufacturer
        </label>
        <select
          value={state.filters.manufacturer || "all"}
          onChange={(e) => handleFilterChange("manufacturer", e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Manufacturers</option>
          <option value="ford">Ford</option>
          <option value="chevrolet">Chevrolet</option>
          <option value="dodge">Dodge</option>
          <option value="plymouth">Plymouth</option>
          <option value="pontiac">Pontiac</option>
          <option value="buick">Buick</option>
          <option value="oldsmobile">Oldsmobile</option>
          <option value="cadillac">Cadillac</option>
          <option value="chrysler">Chrysler</option>
          <option value="mercedes">Mercedes-Benz</option>
          <option value="porsche">Porsche</option>
          <option value="jaguar">Jaguar</option>
          <option value="ferrari">Ferrari</option>
          <option value="other">Other</option>
        </select>
      </FilterSection>

      {/* Year Range */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Calendar size={18} className="text-secondary-500" />
          Year Range
        </label>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="From Year"
              value={yearRange.min}
              onChange={(e) =>
                setYearRange({ ...yearRange, min: e.target.value })
              }
              className="input-field text-sm"
              min="1900"
              max="2024"
            />
            <input
              type="number"
              placeholder="To Year"
              value={yearRange.max}
              onChange={(e) =>
                setYearRange({ ...yearRange, max: e.target.value })
              }
              className="input-field text-sm"
              min="1900"
              max="2024"
            />
          </div>
          <button
            onClick={handleYearRangeApply}
            className="w-full btn-secondary text-sm py-2"
          >
            Apply Range
          </button>
          {/* Quick Era Filters */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-font-secondary mb-2">Quick Era:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Pre-War", min: 1900, max: 1945 },
                { label: "1950s", min: 1950, max: 1959 },
                { label: "1960s", min: 1960, max: 1969 },
                { label: "1970s+", min: 1970, max: 2024 },
              ].map((era) => (
                <button
                  key={era.label}
                  onClick={() => {
                    setYearRange({ min: era.min, max: era.max });
                    dispatch({
                      type: "SET_FILTERS",
                      payload: { yearMin: era.min, yearMax: era.max },
                    });
                  }}
                  className="px-2 py-1.5 rounded text-xs bg-surface-elevated border border-border text-font-secondary hover:border-secondary-500 hover:text-secondary-500 transition-all"
                >
                  {era.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <MapPin size={18} className="text-error-500" />
          Location
        </label>
        <select
          value={state.filters.location || "all"}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Locations</option>
          <option value="usa">🇺🇸 United States</option>
          <option value="canada">🇨🇦 Canada</option>
          <option value="uk">🇬🇧 United Kingdom</option>
          <option value="europe">🇪🇺 Europe</option>
          <option value="australia">🇦🇺 Australia</option>
          <option value="international">🌍 International</option>
        </select>
      </FilterSection>

      {/* Seller Rating */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Star size={18} className="text-secondary-500" />
          Seller Rating
        </label>
        <select
          value={state.filters.rating || "all"}
          onChange={(e) => handleFilterChange("rating", e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
          <option value="4">⭐⭐⭐⭐ 4+ Stars</option>
          <option value="3">⭐⭐⭐ 3+ Stars</option>
        </select>
      </FilterSection>

      {/* Quick Filters (Toggles) */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <Filter size={18} className="text-tertiary-500" />
          Quick Filters
        </label>
        <div className="space-y-3">
          {[
            { key: "inStock", label: "In Stock Only", icon: "📦" },
            { key: "freeShipping", label: "Free Shipping", icon: "🚚" },
            { key: "verified", label: "Verified Sellers", icon: "✅" },
          ].map((filter) => (
            <label
              key={filter.key}
              className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border hover:border-tertiary-500 cursor-pointer transition-all"
            >
              <span className="flex items-center gap-2 text-sm text-font-main">
                <span>{filter.icon}</span>
                {filter.label}
              </span>
              <input
                type="checkbox"
                checked={state.filters[filter.key] || false}
                onChange={(e) =>
                  handleFilterChange(filter.key, e.target.checked)
                }
                className="w-5 h-5 rounded border-border text-primary-500 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sort By */}
      <FilterSection>
        <label className="flex items-center gap-2 text-sm font-bold text-font-main mb-4">
          <SortAsc size={18} className="text-warning-500" />
          Sort By
        </label>
        <select
          value={state.filters.sortBy}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          className="input-field text-sm"
        >
          <option value="latest">🆕 Latest Listed</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💎 Price: High to Low</option>
          <option value="ending-soon">⏰ Ending Soon</option>
          <option value="popular">🔥 Most Popular</option>
          <option value="rating">⭐ Highest Rated</option>
        </select>
      </FilterSection>
    </>
  );

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="bg-surface border-b border-border sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-font-main mb-1">
                Browse Inventory
              </h1>
              <p className="text-font-secondary">
                Filter and find exactly what you're looking for
              </p>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-error-500 hover:bg-error-500/80 text-white rounded-lg font-semibold transition-all text-sm"
              >
                <X size={16} />
                Clear All ({activeFiltersCount})
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full shadow-2xl font-bold"
          >
            <Filter size={20} />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`
              ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen lg:h-auto
              w-80 lg:w-72 bg-bg lg:bg-transparent z-40 lg:z-0
              transition-transform duration-300 overflow-y-auto
              pt-20 lg:pt-0 px-4 lg:px-0
            `}
          >
            {/* Mobile Close Button */}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="lg:hidden absolute top-4 right-4 p-2 bg-surface-elevated rounded-full"
            >
              <X size={20} className="text-font-main" />
            </button>

            <div className="space-y-4 pb-8">
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Overlay */}
          {showMobileFilters && (
            <div
              onClick={() => setShowMobileFilters(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
            />
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  );
}

export default FiltersPage;
