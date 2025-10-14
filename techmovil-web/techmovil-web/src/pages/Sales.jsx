import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function Sales(){
  const [list, setList] = useState([])
  useEffect(()=>{
    (async()=>{
      const qs = await getDocs(collection(db,'sales'))
      const rows = []; qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
      setList(rows)
    })()
  },[])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Ventas</h3>
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="th">Producto</th><th className="th">Cantidad</th>
              <th className="th">Subtotal</th><th className="th">IMEI</th><th className="th">Factura</th>
            </tr>
          </thead>
          <tbody>
            {list.map(s=> (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="td">{s.productName}</td>
                <td className="td">{s.quantity}</td>
                <td className="td">${s.subtotal}</td>
                <td className="td">{s.imei || '-'}</td>
                <td className="td">{s.invoiceRequested ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .th{ @apply text-left px-3 py-2 font-semibold; }
        .td{ @apply px-3 py-2; }
      `}</style>
    </div>
  )
}
