import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function Navigation() {
  const { state } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Connect this to your app’s search endpoint for real functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav
      className="bg-gradient-to-br from-bg to-surface-elevated shadow-lg sticky top-0 z-50"
      role="navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex gap-5 items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-font-main font-bold text-sm">G</span>
            </div>
            <span className="text-2xl font-bold uppercase tracking-wide text-font-main">
              Gearsey
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-font-main hover:text-secondary-500 font-bold uppercase tracking-wide transition-colors"
            >
              Marketplace
            </Link>
            <Link
              to="/sell"
              className="text-font-main hover:text-primary-500 font-bold uppercase tracking-wide transition-colors"
            >
              Sell an Item
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by part name, model, or category..."
                className="w-full pl-4 pr-12 py-2 bg-surface text-font-main border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                aria-label="Search inventory"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-secondary-500"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-font-main hover:text-tertiary-500 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
              {state.cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-tertiary-500 text-bg text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg border border-border font-bold">
                  {state.cart.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-font-main hover:text-primary-500 transition-colors"
                aria-label="User Menu"
              >
                <User size={24} />
                <span className="hidden md:block font-bold uppercase tracking-wide">
                  My Account
                </span>
                <ChevronDown size={16} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-elevated text-font-main rounded-lg shadow-xl border border-border py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    My Bids
                  </Link>
                  <hr className="my-2 border-border" />
                  <button className="block w-full text-left px-4 py-2 text-font-main hover:bg-surface font-medium transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-font-main"
              aria-label="Mobile Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-elevated border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-4 pr-12 py-2 bg-surface text-font-main border border-border rounded-lg"
                  aria-label="Search inventory"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-secondary-500"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              <Link
                to="/"
                className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/"
                className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-secondary-500 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                to="/sell"
                className="block py-2 text-font-main font-bold uppercase tracking-wide hover:text-primary-500 transition-colors"
              >
                Sell an Item
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
