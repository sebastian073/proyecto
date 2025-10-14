
# Techmovil Web

## Requisitos
- Node 20+
- Proyecto de Firebase (habilitar Authentication con Email/Password y Firestore)
- Un SMTP (Brevo, SendGrid, Mailersend, etc.) para enviar correo

## Configuración
1. Copia tus credenciales Web en `src/firebase.js`.
2. En `functions/` coloca `serviceAccountKey.json` del servicio Firebase Admin.
3. Instala dependencias:

```bash
npm i
cd functions && npm i && cd ..
```

4. Semilla de **100 productos**:
```bash
npm run seed
```

5. Ejecuta funciones (correo de factura demo):
```bash
npm run functions:dev
# escoge puerto 5001 (por defecto)
```

6. Ejecuta el frontend:
```bash
npm run dev
```

> El flujo de venta: en **Vender** selecciona producto, cantidad, IMEI (si aplica), marca la casilla de **facturación electrónica**, y completa nombre, documento y correo. Al confirmar, se descuenta stock, se crea la venta y (si marcaste factura) se dispara el correo desde `functions`.

### Nota sobre DIAN
Este proyecto envía **comprobante DEMO**. Para facturación electrónica en Colombia debes integrar un **Proveedor Tecnológico Autorizado (PT)** que emita XML UBL 2.1, CUFE y numeración autorizada DIAN.
