# WazeAereo 🛩️

**Sistema de Navegación Aérea con Algoritmos de Optimización**

WazeAereo es una aplicación web avanzada que utiliza algoritmos de optimización para planificar rutas aéreas eficientes, considerando múltiples factores como tiempo de vuelo, probabilidades de retraso, tiempos de conexión y capacidad de aeropuertos.

## 🚀 Características Principales

### ✈️ **Planificación Inteligente de Rutas**
- **Algoritmo Dijkstra**: Optimización de tiempo mínimo
- **Algoritmo Bellman-Ford**: Manejo de pesos negativos y descuentos
- **Algoritmo Ford-Fulkerson**: Optimización de capacidad máxima

### 🗺️ **Visualización Interactiva**
- Mapa interactivo con Leaflet/OpenStreetMap
- Marcadores de aeropuertos con información detallada
- Visualización de rutas calculadas con colores distintivos
- Controles de zoom personalizados

### 📊 **Base de Datos Completa**
- **1,818+ aeropuertos únicos** de Estados Unidos
- Coordenadas reales para aeropuertos principales
- Generación inteligente de coordenadas para aeropuertos desconocidos
- Datos de vuelos con tiempos, retrasos y probabilidades

### 🎨 **Interfaz Profesional**
- Diseño moderno con gradientes y efectos glassmorphism
- Navegación intuitiva entre secciones
- Modal de detalles para rutas planificadas
- Responsive design para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **UI Framework**: Bootstrap 5 + React-Bootstrap
- **Mapas**: React-Leaflet + Leaflet
- **Estilos**: CSS3 con efectos avanzados
- **Datos**: JSON con más de 1,800 aeropuertos

## 📁 Estructura del Proyecto

```
WazeAereo/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx              # Página principal
│   │   ├── RoutePlannerComponent.jsx # Planificador de rutas
│   │   ├── RoutesComponent.jsx       # Historial de rutas
│   │   └── AirportDataComponent.jsx  # Base de datos de aeropuertos
│   ├── assets/
│   │   ├── LogoWase.svg             # Logo del proyecto
│   │   └── FondoAereo.jpg           # Imagen de fondo
│   ├── data/
│   │   └── sample_airports.json     # Datos de muestra
│   ├── App.jsx                       # Componente principal
│   └── main.jsx                     # Punto de entrada
├── public/
│   └── LogoWase.svg                 # Logo público
└── package.json                     # Dependencias
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/Dhilsen18/Waze_Aereo.git

# Navegar al directorio
cd Waze_Aereo

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter de código
```

## 🎯 Funcionalidades

### 🏠 **Página Principal**
- Estadísticas del sistema
- Acceso rápido a funcionalidades
- Diseño profesional con animaciones

### 🗺️ **Planificador de Rutas**
- Selección de aeropuerto origen y destino
- Elección de algoritmo de optimización
- Visualización en mapa interactivo
- Guardado de rutas calculadas

### 📋 **Historial de Rutas**
- Lista de todas las rutas planificadas
- Estadísticas detalladas
- Modal con información completa
- Opción de limpiar historial

### 🛫 **Base de Datos de Aeropuertos**
- Búsqueda y filtrado de aeropuertos
- Información detallada de cada aeropuerto
- Navegación directa al mapa
- Más de 1,800 aeropuertos disponibles

## 🔧 Algoritmos Implementados

### 1. **Dijkstra** - Tiempo Mínimo
- Encuentra la ruta más rápida entre dos aeropuertos
- Considera tiempos de vuelo y conexión
- Ideal para viajes de negocios

### 2. **Bellman-Ford** - Pesos Negativos
- Maneja descuentos y promociones especiales
- Detecta ciclos negativos
- Optimiza costos con ofertas

### 3. **Ford-Fulkerson** - Capacidad Máxima
- Maximiza el flujo de pasajeros
- Considera capacidad de aeropuertos
- Ideal para aerolíneas comerciales

## 📊 Datos del Sistema

- **Aeropuertos**: 1,818+ únicos
- **Rutas**: Miles de conexiones directas
- **Cobertura**: Estados Unidos completo
- **Precisión**: Coordenadas reales para aeropuertos principales

## 🎨 Diseño y UX

- **Colores**: Paleta profesional con gradientes
- **Tipografía**: Fuentes modernas y legibles
- **Animaciones**: Transiciones suaves y efectos hover
- **Responsive**: Adaptable a todos los dispositivos
- **Accesibilidad**: Cumple estándares de accesibilidad web

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Dhilsen18**
- GitHub: [@Dhilsen18](https://github.com/Dhilsen18)
- Proyecto: [Waze_Aereo](https://github.com/Dhilsen18/Waze_Aereo)

## 🙏 Agradecimientos

- Datos de aeropuertos de OpenFlights
- Leaflet para la funcionalidad de mapas
- Bootstrap para el framework de UI
- React para el framework de frontend

---

**WazeAereo** - Optimizando el futuro de la navegación aérea ✈️