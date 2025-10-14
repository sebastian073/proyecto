import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

export default function Sell(){
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)
  const [imei, setImei] = useState('')
  const [askInvoice, setAskInvoice] = useState(false)
  const [buyer, setBuyer] = useState({name:'', doc:'', email:''})

  const load = async ()=>{
    const qs = await getDocs(collection(db,'products'))
    const rows = []; qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setProducts(rows)
  }
  useEffect(()=>{ load() }, [])

  const confirmSale = async ()=>{
    if(!selected) return
    if(selected.imei_required && !imei) { return Swal.fire('Falta IMEI','Este producto lo requiere.','warning') }
    if(askInvoice && (!buyer.name || !buyer.doc || !buyer.email)) {
      return Swal.fire('Datos incompletos','Completa nombre, documento y correo.','warning')
    }

    const ok = await Swal.fire({
      icon:'question',
      title:'Confirmar venta',
      html:`<b>${selected.name}</b> x ${qty} <br/> Total: $${(qty*selected.price).toFixed(2)}`,
      showCancelButton:true,
      confirmButtonText:'Confirmar',
      cancelButtonText:'Cancelar'
    })
    if(!ok.isConfirmed) return

    try{
      const sale = {
        productId: selected.id,
        productName: selected.name,
        unitPrice: selected.price,
        quantity: Number(qty),
        subtotal: Number(qty) * selected.price,
        imei: selected.imei_required ? imei : null,
        createdAt: serverTimestamp(),
        invoiceRequested: askInvoice,
        buyer: askInvoice ? buyer : null
      }
      const ref = await addDoc(collection(db,'sales'), sale)
      await updateDoc(doc(db,'products', selected.id), { stock: Number(selected.stock || 0) - Number(qty) })
      if(askInvoice){
        await fetch('/send-invoice',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ saleId: ref.id }) })
      }
      setSelected(null); setQty(1); setImei(''); setAskInvoice(false); setBuyer({name:'', doc:'', email:''})
      await load()
      Swal.fire({icon:'success', title:'Venta registrada', timer:1500, showConfirmButton:false})
    }catch(err){
      Swal.fire({icon:'error', title:'Error', text:String(err)})
    }
  }

  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
      <h3 className="text-xl font-semibold mb-4">Registrar venta</h3>

      <div className="bg-white border border-gray-200 rounded-lg p-4 grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2 flex items-center gap-3">
          <select className="input" value={selected?.id || ''} onChange={e=> setSelected(products.find(p=>p.id===e.target.value) || null)}>
            <option value="">-- Selecciona producto --</option>
            {products.map(p=> <option key={p.id} value={p.id}>{p.name} (${p.price}) · Stock {p.stock}</option>)}
          </select>
          <input className="input w-28" type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)}/>
          {selected?.imei_required && (
            <input className="input" placeholder="IMEI" value={imei} onChange={e=>setImei(e.target.value)}/>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input id="inv" type="checkbox" checked={askInvoice} onChange={e=>setAskInvoice(e.target.checked)}/>
          <label htmlFor="inv">¿Desea facturación electrónica?</label>
        </div>

        {askInvoice && (
          <div className="md:col-span-3 grid md:grid-cols-3 gap-3">
            <input className="input" placeholder="Nombre o Razón social" value={buyer.name} onChange={e=>setBuyer({...buyer, name:e.target.value})}/>
            <input className="input" placeholder="Documento (NIT/CC)" value={buyer.doc} onChange={e=>setBuyer({...buyer, doc:e.target.value})}/>
            <input className="input" placeholder="Correo" type="email" value={buyer.email} onChange={e=>setBuyer({...buyer, email:e.target.value})}/>
          </div>
        )}

        <div className="md:col-span-3 flex justify-end">
          <button onClick={confirmSale} disabled={!selected} className="btn-primary disabled:opacity-50">Confirmar venta</button>
        </div>
      </div>

      <style>{`
        .input{ @apply w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary{ @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition; }
      `}</style>
    </motion.div>
  )
}
