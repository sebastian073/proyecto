
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'

export default function Expenses(){
  const [form, setForm] = useState({concept:'', amount:''})
  const [list, setList] = useState([])

  const load = async ()=>{
    const qs = await getDocs(collection(db,'expenses'))
    const rows = []
    qs.forEach(d=> rows.push({id:d.id, ...d.data()}))
    setList(rows)
  }
  useEffect(()=>{ load() }, [])

  const add = async (e)=>{
    e.preventDefault()
    await addDoc(collection(db,'expenses'), { ...form, amount: Number(form.amount), createdAt: serverTimestamp() })
    setForm({concept:'', amount:''})
    await load()
  }

  return (
    <div style={{padding:16}}>
      <h3>Gastos</h3>
      <form onSubmit={add} style={{display:'flex', gap:8}}>
        <input placeholder="Concepto" value={form.concept} onChange={e=>setForm({...form, concept:e.target.value})} required/>
        <input placeholder="Valor" type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} required/>
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {list.map(g=> (<li key={g.id}>{g.concept}: ${g.amount}</li>))}
      </ul>
    </div>
  )
}
