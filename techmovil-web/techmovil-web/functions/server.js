
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import admin from 'firebase-admin'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

if (!admin.apps.length) {
  // Requires serviceAccountKey.json placed in this folder
  const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json','utf8'))
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
}
const db = admin.firestore()

// Configure your SMTP via env vars
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
})

app.post('/send-invoice', async (req,res)=>{
  try{
    const { saleId } = req.body
    const saleSnap = await db.collection('sales').doc(saleId).get()
    if(!saleSnap.exists) return res.status(404).json({error:'Sale not found'})
    const sale = saleSnap.data()

    if(!sale.invoiceRequested || !sale.buyer?.email){
      return res.json({ ok:true, skipped:true })
    }

    const html = `
      <div style="font-family:Arial">
        <h2>Factura electrónica (Demo) - Techmovil</h2>
        <p><b>Cliente:</b> ${sale.buyer.name} (${sale.buyer.doc})</p>
        <p><b>Correo:</b> ${sale.buyer.email}</p>
        <hr/>
        <p><b>Producto:</b> ${sale.productName}</p>
        <p><b>Cantidad:</b> ${sale.quantity}</p>
        <p><b>Valor:</b> $${sale.subtotal}</p>
        <p><b>IMEI:</b> ${sale.imei || '-'}</p>
        <hr/>
        <p style="font-size:12px;color:#555">
          Nota: Este correo contiene un comprobante tipo UBL simplificado para demostración. 
          Para facturación electrónica DIAN en producción se requiere integración con un proveedor tecnológico autorizado (PT) y emisión del XML UBL 2.1 con CUFE, 
          esquema validado y numeración autorizada. Este demo no reemplaza la obligación legal.
        </p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: sale.buyer.email,
      subject: `Factura electrónica (Demo) - Venta ${saleId}`,
      html
    })

    res.json({ ok:true })
  }catch(err){
    console.error(err)
    res.status(500).json({ error: String(err) })
  }
})

app.listen(5001, ()=> console.log('Functions running on http://localhost:5001'))
