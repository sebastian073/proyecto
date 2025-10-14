import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import Swal from 'sweetalert2'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const submit = async (e)=>{
    e.preventDefault()
    try{
      if(isRegister){
        await createUserWithEmailAndPassword(auth, email, password)
        Swal.fire({icon:'success', title:'Cuenta creada. Ahora inicia sesión.', timer:1500, showConfirmButton:false})
        setIsRegister(false)
      }else{
        await signInWithEmailAndPassword(auth, email, password)
        Swal.fire({icon:'success', title:'Sesión iniciada', timer:1000, showConfirmButton:false})
      }
    }catch(err){
      Swal.fire({icon:'error', title:'Error', text:String(err)})
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-3">{isRegister? 'Crear cuenta' : 'Iniciar sesión'}</h2>
      <form onSubmit={submit} className="grid gap-3">
        <input className="input" placeholder="Correo" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input className="input" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit" className="btn-primary">{isRegister? 'Registrarme' : 'Entrar'}</button>
      </form>
      <button onClick={()=>setIsRegister(v=>!v)} className="mt-3 text-sm text-blue-600 hover:underline">
        {isRegister? 'Ya tengo cuenta' : 'Crear cuenta nueva'}
      </button>

      <style>{`
        .input{ @apply w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn-primary{ @apply inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition w-full; }
      `}</style>
    </div>
  )
}
