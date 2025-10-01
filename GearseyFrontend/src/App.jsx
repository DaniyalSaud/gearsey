import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Homepage from './components/Homepage'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import UserDashboard from './components/UserDashboard'
import SellItem from './components/SellItem'
import NotificationToast from './components/NotificationToast'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-bg">
          <Navigation />
          <NotificationToast />
          
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/sell" element={<SellItem />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App