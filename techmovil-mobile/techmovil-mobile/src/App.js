
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, TextInput, Button, FlatList, SafeAreaView } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from './firebase'

const Stack = createNativeStackNavigator()

function LoginScreen({ navigation }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const login = async ()=>{
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigation.replace('Reportes')
    }catch(err){ setMsg(String(err)) }
  }

  return (
    <SafeAreaView style={{flex:1, padding:16}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Login (Reportes)</Text>
      <TextInput placeholder="Correo" autoCapitalize="none" style={{borderWidth:1, marginTop:12, padding:8}} value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Contraseña" secureTextEntry style={{borderWidth:1, marginTop:12, padding:8}} value={password} onChangeText={setPassword}/>
      <Button title="Entrar" onPress={login} />
      {msg? <Text style={{color:'red', marginTop:8}}>{msg}</Text> : null}
    </SafeAreaView>
  )
}

function ReportesScreen(){
  const [ventas, setVentas] = useState([])
  const [gastos, setGastos] = useState([])

  const load = async ()=>{
    const vs = await getDocs(collection(db,'sales'))
    const gs = await getDocs(collection(db,'expenses'))
    const vrows = []; vs.forEach(d=> vrows.push({id:d.id, ...d.data()}))
    const grows = []; gs.forEach(d=> grows.push({id:d.id, ...d.data()}))
    setVentas(vrows); setGastos(grows)
  }

  React.useEffect(()=>{ load() }, [])

  return (
    <SafeAreaView style={{flex:1, padding:16}}>
      <Text style={{fontSize:22, fontWeight:'700'}}>Reportes</Text>

      <Text style={{marginTop:12, fontSize:18}}>Ventas</Text>
      <FlatList
        data={ventas}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <View style={{padding:8, borderWidth:1, marginTop:6}}>
            <Text>{item.productName} x{item.quantity} — ${item.subtotal}</Text>
            <Text>Factura: {item.invoiceRequested? 'Sí':'No'} IMEI: {item.imei || '-'}</Text>
          </View>
        )}
      />

      <Text style={{marginTop:12, fontSize:18}}>Gastos</Text>
      <FlatList
        data={gastos}
        keyExtractor={item=>item.id}
        renderItem={({item})=>(
          <View style={{padding:8, borderWidth:1, marginTop:6}}>
            <Text>{item.concept}: ${item.amount}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Reportes" component={ReportesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
