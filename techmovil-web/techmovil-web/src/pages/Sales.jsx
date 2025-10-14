
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export default function Sales(){
  const [list, setList] = useState([])
  useEffect(()=>{
    (async()=>{
      const qs = await getDocs(collection(db,'sales'))
      const rows = []
      qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
      setList(rows)
    })()
  },[])

  return (
    <div style={{padding:16}}>
      <h3>Ventas</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th><th>IMEI</th><th>Factura</th></tr></thead>
        <tbody>
          {list.map(s=> (
            <tr key={s.id}>
              <td>{s.productName}</td>
              <td>{s.quantity}</td>
              <td>${s.subtotal}</td>
              <td>{s.imei || '-'}</td>
              <td>{s.invoiceRequested ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
