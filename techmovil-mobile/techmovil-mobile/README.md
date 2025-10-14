
# Techmovil Mobile (Reportes)

App móvil solo para **ver reportes** (ventas y gastos). Incluye **login** con Firebase.

## Requisitos
- Node 20+
- Expo CLI (`npm i -g expo-cli`)
- EAS CLI para generar APK (`npm i -g eas-cli`)
- Mismas credenciales de Firebase que el proyecto web

## Uso
```bash
npm i
npm start
```
Para Android (USB o emulador):
```bash
npm run android
```

## Generar APK
Con EAS (requiere cuenta gratuita):
```bash
eas login
eas build:configure
npm run build-apk
```
El perfil `preview` genera un **.apk** instalable.

> Esta app es de solo lectura (reportes). La creación de ventas y gastos se hace desde la app web.
