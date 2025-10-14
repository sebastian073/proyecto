import './index.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import './index.css'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Sell from './pages/Sell.jsx'
import Expenses from './pages/Expenses.jsx'
import Sales from './pages/Sales.jsx'

function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-bold text-lg tracking-tight">
              <span className="text-blue-600">Tech</span>movil
            </Link>
            <div className="flex gap-2 text-sm">
              {[
                {to:'/',label:'Inicio'},
                {to:'/products',label:'Productos'},
                {to:'/sell',label:'Vender'},
                {to:'/sales',label:'Ventas'},
                {to:'/expenses',label:'Gastos'},
                {to:'/login',label:'Login'},
              ].map(i=>(
                <Link key={i.to}
                  className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
                  to={i.to}>{i.label}</Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/sell" element={<Sell/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/expenses" element={<Expenses/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
