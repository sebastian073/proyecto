
import React, { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setMsg('')
    try{
      if(isRegister){
        await createUserWithEmailAndPassword(auth, email, password)
        setMsg('Usuario registrado. Ahora puedes iniciar sesión.')
        setIsRegister(false)
      }else{
        await signInWithEmailAndPassword(auth, email, password)
        setMsg('Sesión iniciada.')
      }
    }catch(err){
      setMsg(err.message)
    }
  }

  return (
    <div style={{maxWidth:420, margin:'32px auto'}}>
      <h2>{isRegister? 'Crear cuenta' : 'Iniciar sesión'}</h2>
      <form onSubmit={submit}>
        <input placeholder="Correo" type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{display:'block', width:'100%', margin:'8px 0'}}/>
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{display:'block', width:'100%', margin:'8px 0'}}/>
        <button type="submit">{isRegister? 'Registrarme' : 'Entrar'}</button>
      </form>
      <button onClick={()=>setIsRegister(v=>!v)} style={{marginTop:12}}>
        {isRegister? 'Ya tengo cuenta' : 'Crear cuenta nueva'}
      </button>
      {msg && <p>{msg}</p>}
    </div>
  )
}
