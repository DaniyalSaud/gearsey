import React, { useState } from "react";
import { Upload, DollarSign, Hammer } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function SellItem() {
  const { dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "used",
    category: "engines",
    sellingMode: "fixed",
    price: "",
    startingPrice: "",
    auctionEndDate: "",
    auctionEndTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: "Your listing has been created successfully!",
      },
    });
    setFormData({
      title: "",
      description: "",
      condition: "used",
      category: "engines",
      sellingMode: "fixed",
      price: "",
      startingPrice: "",
      auctionEndDate: "",
      auctionEndTime: "",
    });
  };

  return (
    <div className=" max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-primary-500 drop-shadow mb-2 tracking-tight">
          List Your Car Part
        </h1>
        <p className="text-font-secondary text-lg">
          Create a listing to sell your car parts to thousands of buyers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Card with Gradient Border */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 shadow-xl shadow-border/40">
          <div className="bg-surface rounded-[inherit] p-6 lg:p-8">
            {/* Section Heading */}
            <div className="flex items-center mb-4">
              <span className="inline-block w-2 h-8 bg-primary-500 rounded-r-xl mr-3" />
              <h2 className="text-2xl font-black text-secondary-500 drop-shadow-sm">
                Basic Information
              </h2>
            </div>
            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., 1968 Mustang Carburetor"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main placeholder:text-font-secondary focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Provide a detailed description including compatibility, condition, and more..."
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main placeholder:text-font-secondary resize-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all"
                    required
                  >
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/70 transition-all"
                    required
                  >
                    <option value="engines">Engines</option>
                    <option value="body">Body</option>
                    <option value="wheels">Wheels</option>
                    <option value="accessories">Accessories</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Dropzone for Photos */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-tertiary-500 via-primary-500 to-secondary-500 shadow-xl shadow-border/40">
          <div className="bg-surface rounded-[inherit] p-6 lg:p-8 flex flex-col items-center text-center">
            <div className="flex items-center mb-4">
              <span className="inline-block w-2 h-8 bg-tertiary-500 rounded-r-xl mr-3" />
              <h2 className="text-2xl font-black text-tertiary-500 drop-shadow-sm">
                Photos
              </h2>
            </div>
            <div className="w-full border-2 border-dashed border-tertiary-500 bg-surface-elevated/60 rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:border-primary-500 group backdrop-blur">
              <Upload
                size={42}
                className="mb-2 animate-bounce text-tertiary-500 group-hover:text-primary-500"
              />
              <p className="text-font-main font-semibold mb-1">
                Drop photos here or click to browse
              </p>
              <p className="text-sm text-font-secondary">
                Upload up to 10 photos (JPG, PNG, WebP)
              </p>
              <button
                type="button"
                className="btn-secondary mt-4 animate-pulse-slow font-bold"
              >
                Choose Files
              </button>
            </div>
          </div>
        </div>

        {/* Selling Options Section */}
        <div className="rounded-2xl p-1 bg-gradient-to-r from-secondary-500 via-primary-500 to-tertiary-500 shadow-xl shadow-border/40">
          <div className="bg-surface rounded-[inherit] p-6 lg:p-8">
            <div className="flex items-center mb-4">
              <span className="inline-block w-2 h-8 bg-secondary-500 rounded-r-xl mr-3" />
              <h2 className="text-2xl font-black text-primary-500 drop-shadow-sm">
                Selling Mode
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                  formData.sellingMode === "fixed"
                    ? "border-primary-500 bg-surface-elevated/90 ring-4 ring-primary-500/10 backdrop-blur-sm scale-105"
                    : "border-border hover:border-primary-500 hover:scale-105"
                }`}
              >
                <input
                  type="radio"
                  name="sellingMode"
                  value="fixed"
                  checked={formData.sellingMode === "fixed"}
                  onChange={handleInputChange}
                  className="sr-only accent-primary-500"
                />
                <DollarSign
                  size={28}
                  className={`mr-4 ${
                    formData.sellingMode === "fixed"
                      ? "text-primary-500 animate-bounce"
                      : "text-font-secondary"
                  }`}
                />
                <div>
                  <p className="font-extrabold text-font-main text-lg">
                    Fixed Price
                  </p>
                  <p className="text-font-secondary text-sm">
                    Sell at a set price
                  </p>
                </div>
              </label>
              <label
                className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 shadow-sm ${
                  formData.sellingMode === "auction"
                    ? "border-secondary-500 bg-surface-elevated/90 ring-4 ring-secondary-500/10 backdrop-blur-sm scale-105"
                    : "border-border hover:border-secondary-500 hover:scale-105"
                }`}
              >
                <input
                  type="radio"
                  name="sellingMode"
                  value="auction"
                  checked={formData.sellingMode === "auction"}
                  onChange={handleInputChange}
                  className="sr-only accent-secondary-500"
                />
                <Hammer
                  size={28}
                  className={`mr-4 ${
                    formData.sellingMode === "auction"
                      ? "text-secondary-500 animate-bounce"
                      : "text-font-secondary"
                  }`}
                />
                <div>
                  <p className="font-extrabold text-font-main text-lg">
                    Auction
                  </p>
                  <p className="text-font-secondary text-sm">
                    Let buyers bid for it
                  </p>
                </div>
              </label>
            </div>
            {formData.sellingMode === "fixed" ? (
              <div>
                <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-primary-500 focus:ring-2 focus:ring-primary-500/70 transition-all max-w-[300px]"
                  required
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                    Starting Price ($) *
                  </label>
                  <input
                    type="number"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/70 transition-all max-w-[300px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                      Auction End Date *
                    </label>
                    <input
                      type="date"
                      name="auctionEndDate"
                      value={formData.auctionEndDate}
                      onChange={handleInputChange}
                      className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/70 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wide text-xs font-bold text-font-secondary mb-2">
                      Auction End Time *
                    </label>
                    <input
                      type="time"
                      name="auctionEndTime"
                      value={formData.auctionEndTime}
                      onChange={handleInputChange}
                      className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-font-main focus:border-secondary-500 focus:ring-2 focus:ring-secondary-500/70 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-12 py-4 rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-tertiary-500 text-bg font-bold text-xl shadow-lg hover:from-secondary-500 hover:to-primary-500 transition-transform duration-150 hover:scale-105 focus:ring-4 focus:ring-secondary-500/30 animate-pulse-slow"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellItem;
