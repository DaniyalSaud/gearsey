import React, { useState } from "react";
import {
  Clock,
  DollarSign,
  Package,
  Hammer,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function UserDashboard() {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState("bids");

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-font-main mb-2">My Dashboard</h1>
        <p className="text-font-secondary">Welcome back, {state.user.name}</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {[
            { key: "bids", label: "My Bids", icon: Hammer },
            { key: "orders", label: "Orders", icon: Package },
            { key: "listings", label: "My Listings", icon: DollarSign },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                activeTab === key
                  ? "border-primary-600 text-primary-500"
                  : "border-transparent text-font-secondary hover:text-font-main"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "bids" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-font-main mb-4">
              Active Bids
            </h2>
            <div className="space-y-4">
              {state.userBids.length > 0 ? (
                state.userBids.map((bid) => (
                  <div key={bid.id} className="card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-font-main mb-2">
                          {bid.productTitle}
                        </h3>
                        <p className="text-font-secondary">
                          Your Bid:{" "}
                          <span className="font-semibold text-primary-500">
                            ${bid.currentBid}
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs text-amber-50 font-medium ${
                              bid.status === "leading"
                                ? "bg-success-500 bg-opacity-20 text-amber-50"
                                : "bg-error-500 bg-opacity-20 text-amber-50"
                            }`}
                          >
                            {bid.status === "leading" ? "Leading" : "Outbid"}
                          </span>
                          <div className="flex items-center gap-1 text-warning-500 text-sm">
                            <Clock size={14} />
                            {formatTimeLeft(bid.timeLeft)}
                          </div>
                        </div>
                      </div>
                      <NavLink to={`/product/${bid.id}`}>
                        <button className="btn-secondary">View Item</button>
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-font-secondary italic">
                  No active bids found
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-font-main mb-4">
              Won Items
            </h2>
            <div className="card p-8 text-center">
              <Package size={48} className="mx-auto text-border mb-4" />
              <p className="text-font-secondary">No won items yet</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h2 className="text-xl font-semibold text-font-main mb-4">
            Order History
          </h2>
          <div className="card p-6 space-y-4">
            {state.userOrders?.length > 0 ? (
              state.userOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between bg-bg rounded-lg p-4 hover:bg-surface transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="font-semibold text-font-main mb-1">
                      {order.productTitle}
                    </h3>
                    <p className="text-font-secondary mb-1">
                      Order #{order.orderNumber} • ${order.total}
                    </p>
                    <span className="inline-block bg-success-500 bg-opacity-20 text-amber-50 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                      Delivered
                    </span>
                  </div>
                  <button className="btn-secondary px-5 py-2 font-semibold rounded-lg shadow hover:shadow-lg transition-shadow text-font-main">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-font-secondary italic">No orders found</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "listings" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-font-main tracking-wide">
              My Listings
            </h2>
            <button className="btn-primary">Create New Listing</button>
          </div>

          <div className="space-y-4">
            {state.userListings.length > 0 ? (
              state.userListings.map((listing) => (
                <div
                  key={listing.id}
                  className="card p-6 flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h3 className="font-semibold text-font-main mb-2">
                      {listing.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.type === "fixed"
                            ? "bg-success-500 bg-opacity-20 text-amber-50"
                            : "bg-warning-500 bg-opacity-20 text-amber-50"
                        }`}
                      >
                        {listing.type === "fixed" ? "Fixed Price" : "Auction"}
                      </span>
                      <span className="text-font-secondary font-mono">
                        {listing.type === "fixed"
                          ? `$${listing.price}`
                          : `Current Bid: $${listing.currentBid}`}
                      </span>
                      {listing.type === "auction" && (
                        <div className="flex items-center gap-1 text-warning-500 text-sm font-mono">
                          <Clock size={14} />
                          Ends in {formatTimeLeft(listing.timeLeft)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow hover:shadow-lg transition-shadow">
                      <Edit size={18} />
                      Edit
                    </button>
                    {listing.type === "auction" && (
                      <button className="btn-secondary rounded-lg px-4 py-2 font-semibold shadow hover:shadow-lg transition-shadow">
                        Extend
                      </button>
                    )}
                    <button className="p-2 text-font-secondary hover:text-font-main transition-colors rounded-full">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-font-secondary italic text-center">
                You have no listings yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
