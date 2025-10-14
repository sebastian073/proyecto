
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'

export default function Sell(){
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [qty, setQty] = useState(1)
  const [imei, setImei] = useState('')
  const [askInvoice, setAskInvoice] = useState(false)
  const [buyer, setBuyer] = useState({name:'', doc:'', email:''})
  const [msg, setMsg] = useState('')

  const load = async ()=>{
    const qs = await getDocs(collection(db,'products'))
    const rows = []
    qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setProducts(rows)
  }
  useEffect(()=>{ load() }, [])

  const confirmSale = async ()=>{
    if(!selected) return
    if(selected.imei_required && !imei) { setMsg('Se requiere IMEI.'); return }
    if(askInvoice && (!buyer.name || !buyer.doc || !buyer.email)) { setMsg('Completa datos de facturación.'); return }

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
      // discount stock
      await updateDoc(doc(db,'products', selected.id), { stock: Number(selected.stock || 0) - Number(qty) })
      setMsg('Venta registrada.')
      // call cloud function to email invoice if requested
      if(askInvoice){
        await fetch('/send-invoice', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ saleId: ref.id })
        })
      }
      setSelected(null); setQty(1); setImei(''); setAskInvoice(false); setBuyer({name:'', doc:'', email:''})
      await load()
    }catch(err){
      setMsg(err.message)
    }
  }

  return (
    <div style={{padding:16, display:'grid', gap:16}}>
      <h3>Registrar venta</h3>
      <div>
        <label>Producto: </label>
        <select value={selected?.id || ''} onChange={e=> setSelected(products.find(p=>p.id===e.target.value) || null)}>
          <option value="">-- Selecciona --</option>
          {products.map(p=>(<option key={p.id} value={p.id}>{p.name} (${p.price}) - Stock {p.stock}</option>))}
        </select>
        <input type="number" min="1" style={{marginLeft:8, width:80}} value={qty} onChange={e=>setQty(e.target.value)}/>
        {selected?.imei_required && (
          <input placeholder="IMEI" style={{marginLeft:8}} value={imei} onChange={e=>setImei(e.target.value)}/>
        )}
      </div>
      <div>
        <label><input type="checkbox" checked={askInvoice} onChange={e=>setAskInvoice(e.target.checked)}/> ¿Desea facturación electrónica?</label>
        {askInvoice && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8, marginTop:8}}>
            <input placeholder="Nombre o Razón social" value={buyer.name} onChange={e=>setBuyer({...buyer, name:e.target.value})}/>
            <input placeholder="Documento (NIT/CC)" value={buyer.doc} onChange={e=>setBuyer({...buyer, doc:e.target.value})}/>
            <input placeholder="Correo" type="email" value={buyer.email} onChange={e=>setBuyer({...buyer, email:e.target.value})}/>
          </div>
        )}
      </div>
      <button onClick={confirmSale} disabled={!selected}>Confirmar venta</button>
      {msg && <p>{msg}</p>}
    </div>
  )
}
