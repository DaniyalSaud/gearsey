import React from "react";
import { Link } from "react-router-dom";
import { Clock, ShoppingCart, Hammer } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function ProductCard({ product }) {
  const { dispatch } = useAppContext();

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: `${product.title} added to cart!`,
      },
    });
  };

  const formatTimeLeft = (timeLeft) => {
    if (!timeLeft) return "Ended";
    return `${timeLeft.hours}h ${timeLeft.minutes}m`;
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden bg-surface border border-border shadow-md hover:shadow-lg rounded-xl">
        <div className="relative">
          <img
            src={
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : product.image
            }
            alt={product.title}
            className="w-full h-48 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            {product.type === "fixed" ? (
              <span className="bg-success-500 text-bg px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <ShoppingCart size={12} />
                Fixed Price
              </span>
            ) : (
              <span className="bg-warning-500 text-bg px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Hammer size={12} />
                Auction
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-font-main mb-2 group-hover:text-primary-500 transition-colors text-lg truncate">
            {product.title}
          </h3>

          {product.type === "fixed" && (
            <p className="text-sm text-font-secondary mb-5">
              Condition: {product.condition}
            </p>
          )}

          {product.type === "fixed" ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-primary-500">
                  ${product.price}
                </span>
              </div>
              <button
                onClick={addToCart}
                className="bg-primary-500 hover:bg-primary-600 text-bg px-5 py-2 rounded-lg font-semibold transition-colors shadow"
              >
                Buy Now
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              <div className="flex items-center justify-between">
                <p className="text-sm text-font-secondary">Current Bid</p>
                <div className="flex items-center gap-1 text-warning-600 text-sm">
                  <Clock size={14} />
                  {formatTimeLeft(product.timeLeft)}
                </div>
              </div>

              <span className="text-xl mt-0 font-bold text-warning-500">
                ${product.currentBid}
              </span>

              <button className="w-full bg-warning-500 hover:bg-warning-600 text-bg py-1 rounded-lg font-semibold transition-colors shadow">
                Place Bid
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
