import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Clock,
  Hammer,
  User,
  Shield,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [bidAmount, setBidAmount] = useState("");

  const product = state.products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-font-main mb-4">
          Product Not Found
        </h2>
        <button onClick={() => navigate("/")} className="btn-primary">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { type: "success", message: `${product.title} added to cart!` },
    });
  };

  const placeBid = () => {
    const amount = parseFloat(bidAmount);
    if (amount <= product.currentBid) {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message: `Bid must be higher than current bid of $${product.currentBid}`,
        },
      });
      return;
    }
    dispatch({ type: "PLACE_BID", payload: { productId: product.id, amount } });
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        type: "success",
        message: "Bid placed successfully! You are now the highest bidder.",
      },
    });
    setBidAmount("");
  };

  const formatTimeLeft = (timeLeft) =>
    !timeLeft ? "Ended" : `${timeLeft.hours}h ${timeLeft.minutes}m`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-font-secondary hover:text-primary-500 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 gap-8">
        {/* Swiper Image Carousel */}
        <div className="bg-surface lg:grid-cols rounded-xl p-4 shadow-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            slidesPerView={1}
            className=""
          >
            {(product.images ?? [product.image]).map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgUrl}
                  alt={`${product.title} image ${index + 1}`}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-font-main mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-font-secondary mb-4">
              <User size={16} />
              <span>Seller: {product.seller}</span>
              <Shield size={16} className="text-success-500" />
              <span className="text-success-500">Verified Seller</span>
            </div>
          </div>

          <div className="bg-surface-elevated p-4 rounded-lg">
            <p className="text-sm text-font-secondary mb-1">Condition</p>
            <p className="font-semibold text-font-main">{product.condition}</p>
          </div>

          {product.type === "fixed" ? (
            <div className="space-y-4">
              <div>
                <span className="text-4xl font-bold text-primary-500">
                  ${product.price}
                </span>
              </div>
              <button
                onClick={addToCart}
                className="btn-primary w-full text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-font-secondary">Current Bid</p>
                  <span className="text-3xl font-bold text-primary-500">
                    ${product.currentBid}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-font-secondary">Time Left</p>
                  <div className="flex items-center gap-1 text-warning-500 text-lg font-semibold">
                    <Clock size={18} />
                    {formatTimeLeft(product.timeLeft)}
                  </div>
                </div>
              </div>

              <div className="bg-surface-elevated p-4 rounded-lg">
                <p className="text-sm text-font-secondary mb-1">
                  Starting Price
                </p>
                <p className="font-semibold text-font-main">
                  ${product.startingPrice}
                </p>
              </div>

              <div className="flex gap-3">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Enter bid (min $${product.currentBid + 1})`}
                  className="flex-1 input-field"
                />
                <button
                  onClick={placeBid}
                  disabled={
                    !bidAmount || parseFloat(bidAmount) <= product.currentBid
                  }
                  className="bg-warning-500 hover:bg-warning-600 disabled:bg-surface border border-warning-500 text-bg px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                  Place Bid
                </button>
              </div>

              <div className="bg-secondary-500 bg-opacity-10 border border-secondary-500 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Seller may extend auction if reserve
                  not met.
                </p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-font-main mb-3">
              Description
            </h3>
            <p className="text-font-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.type === "auction" && product.bids && (
            <div>
              <h3 className="text-lg font-semibold text-font-main mb-3">
                Auction History
              </h3>
              <div className="bg-surface-elevated rounded-lg p-4 space-y-2">
                {product.bids.map((bid, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium text-font-main">
                      {bid.bidder} bid ${bid.amount}
                    </span>
                    <span className="text-sm text-font-secondary">
                      {bid.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Swiper styling overrides */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          color: #D92B2B;
        }
        .swiper-pagination-bullet {
          background: #37CDB2;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background: #F8BA00;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default ProductDetails;


