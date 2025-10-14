
import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const servicePath = path.resolve(__dirname, '../functions/serviceAccountKey.json')
if(!fs.existsSync(servicePath)){ console.error('Coloca serviceAccountKey.json en functions/'); process.exit(1) }

const serviceAccount = JSON.parse(fs.readFileSync(servicePath,'utf8'))
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

const products = [
  {
    "id": "P001",
    "name": "Samsung Galaxy A15",
    "category": "Celulares",
    "price": 518.75,
    "stock": 4,
    "sku": "SAM001",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P002",
    "name": "Samsung Galaxy S23 FE",
    "category": "Celulares",
    "price": 598.41,
    "stock": 11,
    "sku": "SAM002",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P003",
    "name": "Samsung Galaxy S24",
    "category": "Celulares",
    "price": 194.1,
    "stock": 27,
    "sku": "SAM003",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P004",
    "name": "Xiaomi Redmi Note 13",
    "category": "Celulares",
    "price": 99.95,
    "stock": 27,
    "sku": "XIA004",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P005",
    "name": "Xiaomi Poco X6",
    "category": "Celulares",
    "price": 715.9,
    "stock": 6,
    "sku": "XIA005",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P006",
    "name": "Motorola Moto G54",
    "category": "Celulares",
    "price": 480.58,
    "stock": 5,
    "sku": "MOT006",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P007",
    "name": "Motorola Edge 40",
    "category": "Celulares",
    "price": 43.24,
    "stock": 10,
    "sku": "MOT007",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P008",
    "name": "iPhone 12",
    "category": "Celulares",
    "price": 201.48,
    "stock": 23,
    "sku": "IPH008",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P009",
    "name": "iPhone 13",
    "category": "Celulares",
    "price": 40.7,
    "stock": 10,
    "sku": "IPH009",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P010",
    "name": "iPhone 14",
    "category": "Celulares",
    "price": 578.5,
    "stock": 26,
    "sku": "IPH010",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P011",
    "name": "iPhone 15",
    "category": "Celulares",
    "price": 445.05,
    "stock": 11,
    "sku": "IPH011",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P012",
    "name": "Nokia G22",
    "category": "Celulares",
    "price": 370.38,
    "stock": 12,
    "sku": "NOK012",
    "imei_required": true,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P013",
    "name": "JBL Flip 6",
    "category": "Parlantes",
    "price": 651.36,
    "stock": 4,
    "sku": "JBL013",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P014",
    "name": "JBL Charge 5",
    "category": "Parlantes",
    "price": 611.87,
    "stock": 9,
    "sku": "JBL014",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P015",
    "name": "Sony SRS-XB23",
    "category": "Parlantes",
    "price": 564.55,
    "stock": 14,
    "sku": "SON015",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P016",
    "name": "Sony SRS-XG300",
    "category": "Parlantes",
    "price": 236.74,
    "stock": 10,
    "sku": "SON016",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P017",
    "name": "Ultimate Ears Boom 3",
    "category": "Parlantes",
    "price": 766.63,
    "stock": 14,
    "sku": "ULT017",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P018",
    "name": "Tronsmart T7",
    "category": "Parlantes",
    "price": 99.72,
    "stock": 16,
    "sku": "TRO018",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P019",
    "name": "Anker Soundcore 3",
    "category": "Parlantes",
    "price": 95.44,
    "stock": 15,
    "sku": "ANK019",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P020",
    "name": "Pantalla iPhone 11",
    "category": "Repuestos",
    "price": 75.62,
    "stock": 29,
    "sku": "PAN020",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P021",
    "name": "Pantalla Samsung A12",
    "category": "Repuestos",
    "price": 12.87,
    "stock": 18,
    "sku": "PAN021",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P022",
    "name": "Batería iPhone 8",
    "category": "Repuestos",
    "price": 68.06,
    "stock": 16,
    "sku": "BAT022",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P023",
    "name": "Batería Xiaomi Redmi 9",
    "category": "Repuestos",
    "price": 16.83,
    "stock": 13,
    "sku": "BAT023",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P024",
    "name": "Conector carga Moto G7",
    "category": "Repuestos",
    "price": 100.89,
    "stock": 23,
    "sku": "CON024",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P025",
    "name": "Módulo cámara iPhone XR",
    "category": "Repuestos",
    "price": 107.17,
    "stock": 15,
    "sku": "MÓD025",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P026",
    "name": "Flex botón iPhone 7",
    "category": "Repuestos",
    "price": 72.66,
    "stock": 26,
    "sku": "FLE026",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P027",
    "name": "Altavoz interno Samsung A30",
    "category": "Repuestos",
    "price": 15.79,
    "stock": 25,
    "sku": "ALT027",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P028",
    "name": "JBL Tune 510BT",
    "category": "Audífonos",
    "price": 197.76,
    "stock": 13,
    "sku": "JBL028",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P029",
    "name": "Sony WH-CH520",
    "category": "Audífonos",
    "price": 788.47,
    "stock": 11,
    "sku": "SON029",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P030",
    "name": "Apple AirPods 2",
    "category": "Audífonos",
    "price": 695.86,
    "stock": 16,
    "sku": "APP030",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P031",
    "name": "Apple AirPods Pro 2",
    "category": "Audífonos",
    "price": 236.82,
    "stock": 24,
    "sku": "APP031",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P032",
    "name": "Xiaomi Redmi Buds 5",
    "category": "Audífonos",
    "price": 670.61,
    "stock": 9,
    "sku": "XIA032",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P033",
    "name": "Samsung Galaxy Buds FE",
    "category": "Audífonos",
    "price": 308.74,
    "stock": 10,
    "sku": "SAM033",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P034",
    "name": "Anker Life Q30",
    "category": "Audífonos",
    "price": 542.74,
    "stock": 26,
    "sku": "ANK034",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P035",
    "name": "Case iPhone 11",
    "category": "Protectores",
    "price": 750.59,
    "stock": 24,
    "sku": "CAS035",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P036",
    "name": "Case iPhone 12",
    "category": "Protectores",
    "price": 75.69,
    "stock": 24,
    "sku": "CAS036",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P037",
    "name": "Case iPhone 13",
    "category": "Protectores",
    "price": 153.49,
    "stock": 27,
    "sku": "CAS037",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P038",
    "name": "Case iPhone 14",
    "category": "Protectores",
    "price": 210.95,
    "stock": 18,
    "sku": "CAS038",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P039",
    "name": "Case iPhone 15",
    "category": "Protectores",
    "price": 315.98,
    "stock": 24,
    "sku": "CAS039",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P040",
    "name": "Templado Samsung A12",
    "category": "Protectores",
    "price": 556.77,
    "stock": 11,
    "sku": "TEM040",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P041",
    "name": "Templado Xiaomi Note 10",
    "category": "Protectores",
    "price": 554.0,
    "stock": 30,
    "sku": "TEM041",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P042",
    "name": "Case Moto G54",
    "category": "Protectores",
    "price": 619.28,
    "stock": 5,
    "sku": "CAS042",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P043",
    "name": "Accesorio Genérico 1",
    "category": "Accesorios",
    "price": 15.31,
    "stock": 7,
    "sku": "ACC043",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P044",
    "name": "Accesorio Genérico 2",
    "category": "Accesorios",
    "price": 41.23,
    "stock": 30,
    "sku": "ACC044",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P045",
    "name": "Accesorio Genérico 3",
    "category": "Accesorios",
    "price": 17.05,
    "stock": 18,
    "sku": "ACC045",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P046",
    "name": "Accesorio Genérico 4",
    "category": "Accesorios",
    "price": 46.09,
    "stock": 25,
    "sku": "ACC046",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P047",
    "name": "Accesorio Genérico 5",
    "category": "Accesorios",
    "price": 14.57,
    "stock": 36,
    "sku": "ACC047",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P048",
    "name": "Accesorio Genérico 6",
    "category": "Accesorios",
    "price": 22.8,
    "stock": 34,
    "sku": "ACC048",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P049",
    "name": "Accesorio Genérico 7",
    "category": "Accesorios",
    "price": 11.43,
    "stock": 13,
    "sku": "ACC049",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P050",
    "name": "Accesorio Genérico 8",
    "category": "Accesorios",
    "price": 16.1,
    "stock": 40,
    "sku": "ACC050",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P051",
    "name": "Accesorio Genérico 9",
    "category": "Accesorios",
    "price": 29.25,
    "stock": 32,
    "sku": "ACC051",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P052",
    "name": "Accesorio Genérico 10",
    "category": "Accesorios",
    "price": 45.4,
    "stock": 30,
    "sku": "ACC052",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P053",
    "name": "Accesorio Genérico 11",
    "category": "Accesorios",
    "price": 21.29,
    "stock": 13,
    "sku": "ACC053",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P054",
    "name": "Accesorio Genérico 12",
    "category": "Accesorios",
    "price": 27.93,
    "stock": 10,
    "sku": "ACC054",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P055",
    "name": "Accesorio Genérico 13",
    "category": "Accesorios",
    "price": 39.01,
    "stock": 12,
    "sku": "ACC055",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P056",
    "name": "Accesorio Genérico 14",
    "category": "Accesorios",
    "price": 11.88,
    "stock": 15,
    "sku": "ACC056",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P057",
    "name": "Accesorio Genérico 15",
    "category": "Accesorios",
    "price": 40.64,
    "stock": 32,
    "sku": "ACC057",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P058",
    "name": "Accesorio Genérico 16",
    "category": "Accesorios",
    "price": 31.84,
    "stock": 29,
    "sku": "ACC058",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P059",
    "name": "Accesorio Genérico 17",
    "category": "Accesorios",
    "price": 22.17,
    "stock": 34,
    "sku": "ACC059",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P060",
    "name": "Accesorio Genérico 18",
    "category": "Accesorios",
    "price": 28.81,
    "stock": 40,
    "sku": "ACC060",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P061",
    "name": "Accesorio Genérico 19",
    "category": "Accesorios",
    "price": 43.74,
    "stock": 5,
    "sku": "ACC061",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P062",
    "name": "Accesorio Genérico 20",
    "category": "Accesorios",
    "price": 35.61,
    "stock": 12,
    "sku": "ACC062",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P063",
    "name": "Accesorio Genérico 21",
    "category": "Accesorios",
    "price": 35.68,
    "stock": 39,
    "sku": "ACC063",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P064",
    "name": "Accesorio Genérico 22",
    "category": "Accesorios",
    "price": 38.79,
    "stock": 26,
    "sku": "ACC064",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P065",
    "name": "Accesorio Genérico 23",
    "category": "Accesorios",
    "price": 10.02,
    "stock": 32,
    "sku": "ACC065",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P066",
    "name": "Accesorio Genérico 24",
    "category": "Accesorios",
    "price": 12.12,
    "stock": 5,
    "sku": "ACC066",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P067",
    "name": "Accesorio Genérico 25",
    "category": "Accesorios",
    "price": 47.92,
    "stock": 21,
    "sku": "ACC067",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P068",
    "name": "Accesorio Genérico 26",
    "category": "Accesorios",
    "price": 48.73,
    "stock": 16,
    "sku": "ACC068",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P069",
    "name": "Accesorio Genérico 27",
    "category": "Accesorios",
    "price": 27.85,
    "stock": 11,
    "sku": "ACC069",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P070",
    "name": "Accesorio Genérico 28",
    "category": "Accesorios",
    "price": 44.17,
    "stock": 24,
    "sku": "ACC070",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P071",
    "name": "Accesorio Genérico 29",
    "category": "Accesorios",
    "price": 42.88,
    "stock": 37,
    "sku": "ACC071",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P072",
    "name": "Accesorio Genérico 30",
    "category": "Accesorios",
    "price": 32.4,
    "stock": 14,
    "sku": "ACC072",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P073",
    "name": "Accesorio Genérico 31",
    "category": "Accesorios",
    "price": 21.83,
    "stock": 15,
    "sku": "ACC073",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P074",
    "name": "Accesorio Genérico 32",
    "category": "Accesorios",
    "price": 29.27,
    "stock": 38,
    "sku": "ACC074",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P075",
    "name": "Accesorio Genérico 33",
    "category": "Accesorios",
    "price": 46.33,
    "stock": 25,
    "sku": "ACC075",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P076",
    "name": "Accesorio Genérico 34",
    "category": "Accesorios",
    "price": 26.99,
    "stock": 12,
    "sku": "ACC076",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P077",
    "name": "Accesorio Genérico 35",
    "category": "Accesorios",
    "price": 46.81,
    "stock": 24,
    "sku": "ACC077",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P078",
    "name": "Accesorio Genérico 36",
    "category": "Accesorios",
    "price": 15.78,
    "stock": 20,
    "sku": "ACC078",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P079",
    "name": "Accesorio Genérico 37",
    "category": "Accesorios",
    "price": 44.51,
    "stock": 10,
    "sku": "ACC079",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P080",
    "name": "Accesorio Genérico 38",
    "category": "Accesorios",
    "price": 8.85,
    "stock": 36,
    "sku": "ACC080",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P081",
    "name": "Accesorio Genérico 39",
    "category": "Accesorios",
    "price": 41.72,
    "stock": 39,
    "sku": "ACC081",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P082",
    "name": "Accesorio Genérico 40",
    "category": "Accesorios",
    "price": 39.46,
    "stock": 13,
    "sku": "ACC082",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P083",
    "name": "Accesorio Genérico 41",
    "category": "Accesorios",
    "price": 34.69,
    "stock": 40,
    "sku": "ACC083",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P084",
    "name": "Accesorio Genérico 42",
    "category": "Accesorios",
    "price": 12.43,
    "stock": 38,
    "sku": "ACC084",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P085",
    "name": "Accesorio Genérico 43",
    "category": "Accesorios",
    "price": 44.26,
    "stock": 32,
    "sku": "ACC085",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P086",
    "name": "Accesorio Genérico 44",
    "category": "Accesorios",
    "price": 48.4,
    "stock": 39,
    "sku": "ACC086",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P087",
    "name": "Accesorio Genérico 45",
    "category": "Accesorios",
    "price": 38.99,
    "stock": 17,
    "sku": "ACC087",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P088",
    "name": "Accesorio Genérico 46",
    "category": "Accesorios",
    "price": 37.08,
    "stock": 30,
    "sku": "ACC088",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P089",
    "name": "Accesorio Genérico 47",
    "category": "Accesorios",
    "price": 49.78,
    "stock": 28,
    "sku": "ACC089",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P090",
    "name": "Accesorio Genérico 48",
    "category": "Accesorios",
    "price": 24.71,
    "stock": 38,
    "sku": "ACC090",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P091",
    "name": "Accesorio Genérico 49",
    "category": "Accesorios",
    "price": 25.32,
    "stock": 20,
    "sku": "ACC091",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P092",
    "name": "Accesorio Genérico 50",
    "category": "Accesorios",
    "price": 15.11,
    "stock": 26,
    "sku": "ACC092",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P093",
    "name": "Accesorio Genérico 51",
    "category": "Accesorios",
    "price": 5.95,
    "stock": 40,
    "sku": "ACC093",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P094",
    "name": "Accesorio Genérico 52",
    "category": "Accesorios",
    "price": 15.36,
    "stock": 19,
    "sku": "ACC094",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P095",
    "name": "Accesorio Genérico 53",
    "category": "Accesorios",
    "price": 5.32,
    "stock": 8,
    "sku": "ACC095",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P096",
    "name": "Accesorio Genérico 54",
    "category": "Accesorios",
    "price": 15.3,
    "stock": 7,
    "sku": "ACC096",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P097",
    "name": "Accesorio Genérico 55",
    "category": "Accesorios",
    "price": 43.68,
    "stock": 9,
    "sku": "ACC097",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P098",
    "name": "Accesorio Genérico 56",
    "category": "Accesorios",
    "price": 28.14,
    "stock": 22,
    "sku": "ACC098",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P099",
    "name": "Accesorio Genérico 57",
    "category": "Accesorios",
    "price": 35.1,
    "stock": 18,
    "sku": "ACC099",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  },
  {
    "id": "P100",
    "name": "Accesorio Genérico 58",
    "category": "Accesorios",
    "price": 29.27,
    "stock": 35,
    "sku": "ACC100",
    "imei_required": false,
    "createdAt": "serverTimestamp"
  }
]

async function run(){
  const batch = db.batch()
  products.forEach(p=>{
    const ref = db.collection('products').doc()
    const data = {...p}
    if(data.createdAt==='serverTimestamp') delete data.createdAt
    batch.set(ref, data)
  })
  await batch.commit()
  console.log(`Seeded ${products.length} products.`)
}

run().then(()=>process.exit(0)).catch(e=>{console.error(e); process.exit(1)})
