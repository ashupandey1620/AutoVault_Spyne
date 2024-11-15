"use client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductsList";
import ProductCreation from "./components/ProductCreation";
import ProductDetail from "./components/ProductDetails";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductCreation />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
