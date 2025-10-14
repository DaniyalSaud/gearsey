import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Homepage from './components/Homepage'
import ProductGrid from './components/ProductGrid'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import UserDashboard from './components/UserDashboard'
import SellItem from './components/SellItem'
import NotificationToast from './components/NotificationToast'
import Filters from './components/Filters'
import Footer from './components/Footer'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-bg flex flex-col">
          <Navigation />
          <NotificationToast />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/marketplace" element={<ProductGrid />} />
              <Route path="/filter" element={<Filters />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/sell" element={<SellItem />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App