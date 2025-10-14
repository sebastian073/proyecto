
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Products(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({name:'', category:'', price:'', stock:'', imei_required:false})
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const load = async ()=>{
    const qs = await getDocs(collection(db,'products'))
    const rows = []
    qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setList(rows)
  }
  useEffect(()=>{ load() }, [])

  const add = async (e)=>{
    e.preventDefault()
    setLoading(true); setMsg('')
    try{
      await addDoc(collection(db,'products'), {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        createdAt: serverTimestamp()
      })
      setForm({name:'', category:'', price:'', stock:'', imei_required:false})
      await load()
      setMsg('Producto agregado.')
    }catch(err){ setMsg(err.message) }
    setLoading(false)
  }

  return (
    <div style={{padding:16}}>
      <h3>Productos ({list.length})</h3>
      <form onSubmit={add} style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:8}}>
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <input placeholder="Categoría" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required/>
        <input placeholder="Precio" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required/>
        <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} required/>
        <label style={{display:'flex', alignItems:'center', gap:6}}>
          <input type="checkbox" checked={form.imei_required} onChange={e=>setForm({...form, imei_required:e.target.checked})}/> IMEI
        </label>
        <button disabled={loading} type="submit">Agregar</button>
      </form>
      {msg && <p>{msg}</p>}
      <table border="1" cellPadding="6" style={{marginTop:16, width:'100%'}}>
        <thead><tr><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>IMEI</th></tr></thead>
        <tbody>
          {list.map(p=>(
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.imei_required? 'Sí':'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
