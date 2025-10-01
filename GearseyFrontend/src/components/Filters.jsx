import React from "react";
import { useAppContext } from "../context/AppContext";

function Filters() {
  const { state, dispatch } = useAppContext();

  const handleFilterChange = (filterType, value) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { [filterType]: value },
    });
  };

  return (
    <div className="bg-surface-elevated rounded-xl shadow-lg p-6 mb-8 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Show Filter */}
        <div>
          <label className="block text-sm font-semibold text-font-main mb-3">
            Show
          </label>
          <div className="flex gap-3">
            {["all", "fixed", "auctions"].map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange("show", option)}
                className={`px-5 py-2 rounded-lg font-semibold transition-all capitalize shadow-md
                  ${
                    state.filters.show === option
                      ? "bg-primary-500 text-bg shadow-xl"
                      : "bg-surface border border-border text-font-secondary hover:bg-surface-elevated hover:text-primary-500"
                  }`}
              >
                {option === "fixed" ? "Fixed Price" : option}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-semibold text-font-main mb-3">
            Categories
          </label>
          <select
            value={state.filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="input-field bg-surface border border-border text-font-main focus:ring-primary-500"
          >
            <option value="all">All Categories</option>
            <option value="engines">Engines</option>
            <option value="body">Body</option>
            <option value="wheels">Wheels</option>
            <option value="accessories">Accessories</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-font-main mb-3">
            Sort By
          </label>
          <select
            value={state.filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="input-field bg-surface border border-border text-font-main focus:ring-primary-500"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price (Low → High)</option>
            <option value="price-high">Price (High → Low)</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
