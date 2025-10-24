# 🚀 Instrucciones de Uso - WazeAereo

## 📋 Instrucciones para el Usuario

### 🎯 **Para usar el proyecto completo con todos los datos:**

1. **Descargar el archivo de datos completo:**
   - El archivo `airports.json` completo (314 MB) no está incluido en GitHub por limitaciones de tamaño
   - Para obtener todos los 1,818+ aeropuertos, necesitas el archivo completo

2. **Reemplazar el archivo de muestra:**
   ```bash
   # Eliminar el archivo de muestra
   rm src/data/sample_airports.json
   
   # Agregar el archivo completo (obtenerlo de otra fuente)
   # mv airports.json src/data/airports.json
   ```

3. **Actualizar las importaciones:**
   - Cambiar `import airportData from '../data/sample_airports.json'` 
   - Por `import airportData from '../data/airports.json'`

### 🛠️ **Para desarrolladores:**

#### **Instalación:**
```bash
git clone https://github.com/Dhilsen18/Waze_Aereo.git
cd Waze_Aereo
npm install
npm run dev
```

#### **Estructura de datos esperada:**
```json
{
  "data": [
    {
      "origin_code": "ATL",
      "destination_code": "LAX", 
      "origin_city": "Atlanta",
      "destination_city": "Los Angeles",
      "flight_time": 240,
      "delay_probability": 0.15,
      "avg_delay": 30
    }
  ]
}
```

### 📊 **Funcionalidades disponibles:**

#### **Con datos de muestra (8 aeropuertos):**
- ✅ Planificación básica de rutas
- ✅ Algoritmos de optimización
- ✅ Visualización en mapa
- ✅ Interfaz completa

#### **Con datos completos (1,818+ aeropuertos):**
- ✅ Todas las funcionalidades anteriores
- ✅ Base de datos completa de aeropuertos
- ✅ Búsqueda avanzada
- ✅ Rutas más realistas
- ✅ Cobertura nacional completa

### 🔧 **Configuración del entorno:**

#### **Variables de entorno (opcional):**
```bash
# .env
VITE_API_URL=https://api.wazeaereo.com
VITE_MAP_API_KEY=your_map_api_key
```

#### **Personalización:**
- **Logo:** Reemplazar `src/assets/LogoWase.svg`
- **Colores:** Modificar variables CSS en `src/App.css`
- **Datos:** Actualizar `src/data/airports.json`

### 🚀 **Despliegue:**

#### **Build de producción:**
```bash
npm run build
```

#### **Preview local:**
```bash
npm run preview
```

#### **Despliegue en Vercel/Netlify:**
- Conectar repositorio GitHub
- Configurar build command: `npm run build`
- Configurar output directory: `dist`

### 📝 **Notas importantes:**

1. **Datos grandes:** El archivo completo de aeropuertos debe obtenerse por separado
2. **Rendimiento:** Con datos completos, el mapa puede tardar más en cargar
3. **Memoria:** Asegúrate de tener suficiente RAM para el dataset completo
4. **Navegadores:** Compatible con Chrome, Firefox, Safari, Edge (versiones modernas)

### 🆘 **Solución de problemas:**

#### **Error de datos:**
```javascript
// Si no encuentra datos, verificar la ruta del archivo
console.log(airportData); // Debe mostrar el objeto con 'data' array
```

#### **Error de mapa:**
- Verificar conexión a internet
- Comprobar que Leaflet se carga correctamente
- Revisar la consola del navegador

#### **Error de algoritmos:**
- Verificar que los aeropuertos origen/destino existen
- Comprobar que hay rutas disponibles entre ellos
- Revisar la estructura de datos

---

**¡Disfruta usando WazeAereo! ✈️**
