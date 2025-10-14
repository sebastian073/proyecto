
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
      <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/sell">Vender</Link>
        <Link to="/sales">Ventas</Link>
        <Link to="/expenses">Gastos</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/sell" element={<Sell/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
