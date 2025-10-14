import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import Swal from 'sweetalert2'

export default function Expenses(){
  const [form, setForm] = useState({concept:'', amount:''})
  const [list, setList] = useState([])

  const load = async ()=>{
    const qs = await getDocs(collection(db,'expenses'))
    const rows = []; qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setList(rows)
  }
  useEffect(()=>{ load() }, [])

  const add = async (e)=>{
    e.preventDefault()
    await addDoc(collection(db,'expenses'), { ...form, amount: Number(form.amount), createdAt: serverTimestamp() })
    setForm({concept:'', amount:''})
    await load()
    Swal.fire({icon:'success', title:'Gasto registrado', timer:1200, showConfirmButton:false})
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Gastos</h3>
      <form onSubmit={add} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
        <input className="input" placeholder="Concepto" value={form.concept} onChange={e=>setForm({...form, concept:e.target.value})} required/>
        <input className="input w-40" placeholder="Valor" type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required/>
        <button className="btn-primary">Agregar</button>
      </form>

      <ul className="mt-4 grid gap-2">
        {list.map(g=> (
          <li key={g.id} className="bg-white border border-gray-200 rounded-md px-3 py-2 flex justify-between">
            <span>{g.concept}</span>
            <span className="font-semibold">${g.amount}</span>
          </li>
        ))}
      </ul>

      <style>{`
        .input{ @apply w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary{ @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition; }
      `}</style>
    </div>
  )
}
