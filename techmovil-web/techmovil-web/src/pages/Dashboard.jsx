import React from 'react'
import { motion } from 'framer-motion'

export default function Dashboard(){
  const cards = [
    { title:'Productos', desc:'Gestiona el catálogo y existencias.', href:'/products' },
    { title:'Vender',    desc:'Registra ventas y facturas.',        href:'/sell' },
    { title:'Ventas',    desc:'Consulta el historial de ventas.',    href:'/sales' },
    { title:'Gastos',    desc:'Registra gastos operativos.',         href:'/expenses' },
  ]
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Panel</h2>
      <p className="text-gray-600 mb-6">
        Usa el menú para gestionar productos, registrar ventas y gastos, y ver reportes.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c,i)=>(
          <motion.a
            key={c.title}
            href={c.href}
            initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:i*0.05}}
            className="block rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-gray-600">{c.desc}</div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
