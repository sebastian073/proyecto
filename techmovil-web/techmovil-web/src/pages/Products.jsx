import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

export default function Products(){
  const [list, setList] = useState([])
  const [form, setForm] = useState({name:'', category:'', price:'', stock:'', imei_required:false})
  const [loading, setLoading] = useState(false)

  const load = async ()=>{
    const qs = await getDocs(collection(db,'products'))
    const rows = []
    qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setList(rows)
  }
  useEffect(()=>{ load() }, [])

  const add = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      await addDoc(collection(db,'products'), {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        createdAt: serverTimestamp()
      })
      setForm({name:'', category:'', price:'', stock:'', imei_required:false})
      await load()
      Swal.fire({icon:'success', title:'Producto agregado', timer:1400, showConfirmButton:false})
    }catch(err){
      Swal.fire({icon:'error', title:'Error', text:String(err)})
    }
    setLoading(false)
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Productos <span className="text-gray-500">({list.length})</span></h3>

      <form onSubmit={add} className="grid md:grid-cols-5 gap-3 bg-white p-4 rounded-lg border border-gray-200">
        <input className="input" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
        <input className="input" placeholder="Categoría" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required/>
        <input className="input" placeholder="Precio" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required/>
        <input className="input" placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} required/>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.imei_required} onChange={e=>setForm({...form, imei_required:e.target.checked})}/>
          IMEI
        </label>
        <button disabled={loading} className="md:col-span-5 btn-primary">{loading?'Guardando…':'Agregar'}</button>
      </form>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm bg-white rounded-lg border border-gray-200">
          <thead className="bg-gray-50 text-gray-600">
            <tr><th className="th">Nombre</th><th className="th">Categoría</th><th className="th">Precio</th><th className="th">Stock</th><th className="th">IMEI</th></tr>
          </thead>
          <tbody>
            {list.map(p=>(
              <tr key={p.id} className="border-t">
                <td className="td">{p.name}</td>
                <td className="td">{p.category}</td>
                <td className="td">${p.price}</td>
                <td className="td">{p.stock}</td>
                <td className="td">{p.imei_required? 'Sí':'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* utilidades de estilo rápidas */}
      <style>{`
        .input{ @apply w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary{ @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition; }
        .th{ @apply text-left px-3 py-2 font-semibold; }
        .td{ @apply px-3 py-2; }
      `}</style>
    </div>
  )
}
