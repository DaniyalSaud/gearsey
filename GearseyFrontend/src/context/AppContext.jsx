import React, { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  user: {
    id: 1,
    name: "John Doe",
    isLoggedIn: true,
    isSeller: true,
  },
  cart: [],
  notifications: [],
  products: [
    {
      id: 1,
      title: "1968 Mustang Carburetor",
      seller: "John's Auto Parts",
      price: 120,
      type: "fixed",
      condition: "Used (Good)",
      category: "Engines",
      description:
        "Original carburetor, fits 1968 Mustang models. Excellent working condition with all original parts intact.",
      images: [
        "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/3807278/pexels-photo-3807278.jpeg?auto=compress&cs=tinysrgb&w=500",
      ],
      inStock: true,
    },
    {
      id: 2,
      title: "Vintage Steering Wheel (1960s)",
      seller: "Classic Car Vault",
      currentBid: 250,
      startingPrice: 200,
      type: "auction",
      condition: "Excellent",
      category: "Accessories",
      description:
        "Beautiful vintage steering wheel from the 1960s. Perfect for classic car restoration projects.",
      images: [
        "https://images.pexels.com/photos/3807275/pexels-photo-3807275.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/3807279/pexels-photo-3807279.jpeg?auto=compress&cs=tinysrgb&w=500",
      ],
      timeLeft: { hours: 2, minutes: 15 },
      bids: [
        { bidder: "Alex P.", amount: 250, time: "2 mins ago" },
        { bidder: "Sara K.", amount: 240, time: "10 mins ago" },
      ],
    },
    {
      id: 3,
      title: "Chrome Exhaust Tips Set",
      seller: "Performance Parts Pro",
      price: 85,
      type: "fixed",
      condition: "New",
      category: "Body",
      description:
        "High-quality chrome exhaust tips, universal fit for most vehicles.",
      images: [
        "https://images.pexels.com/photos/3807276/pexels-photo-3807276.jpeg?auto=compress&cs=tinysrgb&w=500",
        "https://images.pexels.com/photos/3807280/pexels-photo-3807280.jpeg?auto=compress&cs=tinysrgb&w=500",
      ],
      inStock: true,
    },
  ],
  userBids: [
    {
      id: 2,
      productTitle: "Vintage Steering Wheel (1960s)",
      currentBid: 250,
      status: "leading",
      timeLeft: { hours: 1, minutes: 45 },
    },
  ],
  userListings: [
    {
      id: 1,
      title: "1968 Mustang Carburetor",
      type: "fixed",
      status: "active",
      price: 120,
    },
    {
      id: 2,
      title: "Vintage Steering Wheel (1960s)",
      type: "auction",
      status: "active",
      currentBid: 250,
      timeLeft: { hours: 2, minutes: 0 },
    },
  ],
  filters: {
    show: "all",
    category: "all",
    sortBy: "latest",
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return state; // already in cart
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "REMOVE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "PLACE_BID":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.productId
            ? {
                ...product,
                currentBid: action.payload.amount,
                bids: [
                  {
                    bidder: "You",
                    amount: action.payload.amount,
                    time: "Just now",
                  },
                  ...product.bids,
                ],
              }
            : product
        ),
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: Date.now() },
        ],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.payload
        ),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload.productId) {
            return {
              ...item,
              deliveryOption: action.payload.deliveryOption,
              deliveryFee: action.payload.deliveryFee,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
