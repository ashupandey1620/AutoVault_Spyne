'use client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUpLogin from './components/SignUpLogin'
import ProductList from './components/ProductsList'
import ProductCreation from './components/ProductCreation'
import ProductDetail from './components/ProductDetails'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<SignUpLogin />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductCreation />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  )
}
