import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import airportData from '../data/airports.json'

// Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Componente para centrar el mapa
function MapCenter({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  return null
}

// Función para obtener coordenadas reales de aeropuertos de EE.UU.
const getUSAirportCoordinates = (airportCode) => {
  const usAirports = {
    // Aeropuertos principales de EE.UU.
    'ATL': { lat: 33.6407, lng: -84.4277, city: 'Atlanta' },
    'LAX': { lat: 33.9425, lng: -118.4081, city: 'Los Angeles' },
    'ORD': { lat: 41.9786, lng: -87.9048, city: 'Chicago' },
    'DFW': { lat: 32.8968, lng: -97.0380, city: 'Dallas' },
    'DEN': { lat: 39.8561, lng: -104.6737, city: 'Denver' },
    'JFK': { lat: 40.6413, lng: -73.7781, city: 'New York' },
    'SFO': { lat: 37.6213, lng: -122.3790, city: 'San Francisco' },
    'SEA': { lat: 47.4502, lng: -122.3088, city: 'Seattle' },
    'LAS': { lat: 36.0840, lng: -115.1537, city: 'Las Vegas' },
    'MIA': { lat: 25.7959, lng: -80.2870, city: 'Miami' },
    'PHX': { lat: 33.4342, lng: -112.0116, city: 'Phoenix' },
    'IAH': { lat: 29.9902, lng: -95.3368, city: 'Houston' },
    'MCO': { lat: 28.4312, lng: -81.3081, city: 'Orlando' },
    'EWR': { lat: 40.6895, lng: -74.1745, city: 'Newark' },
    'MSP': { lat: 44.8848, lng: -93.2223, city: 'Minneapolis' },
    'DTW': { lat: 42.2162, lng: -83.3554, city: 'Detroit' },
    'PHL': { lat: 39.8729, lng: -75.2437, city: 'Philadelphia' },
    'LGA': { lat: 40.7769, lng: -73.8740, city: 'New York' },
    'BWI': { lat: 39.1774, lng: -76.6684, city: 'Baltimore' },
    'SLC': { lat: 40.7899, lng: -111.9791, city: 'Salt Lake City' },
    'DCA': { lat: 38.8521, lng: -77.0377, city: 'Washington' },
    'MDW': { lat: 41.7868, lng: -87.7522, city: 'Chicago' },
    'HNL': { lat: 21.3245, lng: -157.9251, city: 'Honolulu' },
    'SAN': { lat: 32.7338, lng: -117.1933, city: 'San Diego' },
    'TPA': { lat: 27.9755, lng: -82.5332, city: 'Tampa' },
    'PDX': { lat: 45.5898, lng: -122.5951, city: 'Portland' },
    'STL': { lat: 38.7487, lng: -90.3700, city: 'St. Louis' },
    'MCI': { lat: 39.2976, lng: -94.7139, city: 'Kansas City' },
    'AUS': { lat: 30.1945, lng: -97.6699, city: 'Austin' },
    'RDU': { lat: 35.8776, lng: -78.7875, city: 'Raleigh' },
    'MSY': { lat: 29.9934, lng: -90.2581, city: 'New Orleans' },
    'SJC': { lat: 37.3626, lng: -121.9290, city: 'San Jose' },
    'OAK': { lat: 37.8044, lng: -122.2712, city: 'Oakland' },
    'BOS': { lat: 42.3656, lng: -71.0096, city: 'Boston' },
    'FLL': { lat: 26.0726, lng: -80.1527, city: 'Fort Lauderdale' },
    'IAD': { lat: 38.9531, lng: -77.4565, city: 'Washington' },
    'CLE': { lat: 41.4117, lng: -81.8498, city: 'Cleveland' },
    'PIT': { lat: 40.4915, lng: -80.2329, city: 'Pittsburgh' },
    'IND': { lat: 39.7173, lng: -86.2944, city: 'Indianapolis' },
    'CMH': { lat: 39.9980, lng: -82.8919, city: 'Columbus' },
    'CVG': { lat: 39.0488, lng: -84.6678, city: 'Cincinnati' },
    'MEM': { lat: 35.0424, lng: -89.9767, city: 'Memphis' },
    'BNA': { lat: 36.1245, lng: -86.6782, city: 'Nashville' },
    'MKE': { lat: 42.9472, lng: -87.8966, city: 'Milwaukee' },
    'OMA': { lat: 41.3032, lng: -95.8941, city: 'Omaha' },
    'OKC': { lat: 35.3931, lng: -97.6007, city: 'Oklahoma City' },
    'TUL': { lat: 36.1984, lng: -95.8882, city: 'Tulsa' },
    'ABQ': { lat: 35.0402, lng: -106.6092, city: 'Albuquerque' },
    'ELP': { lat: 31.8072, lng: -106.3776, city: 'El Paso' },
    'SAT': { lat: 29.5337, lng: -98.4698, city: 'San Antonio' },
    'HOU': { lat: 29.6454, lng: -95.2789, city: 'Houston' },
    'DAL': { lat: 32.8471, lng: -96.8518, city: 'Dallas' },
    'BUR': { lat: 34.2006, lng: -118.3587, city: 'Burbank' },
    'ONT': { lat: 34.0560, lng: -117.6012, city: 'Ontario' },
    'SNA': { lat: 33.6757, lng: -117.8682, city: 'Santa Ana' },
    'LGB': { lat: 33.8177, lng: -118.1516, city: 'Long Beach' },
    'SMF': { lat: 38.6954, lng: -121.5908, city: 'Sacramento' },
    'FAT': { lat: 36.7761, lng: -119.7181, city: 'Fresno' },
    'BFL': { lat: 35.4336, lng: -119.0568, city: 'Bakersfield' },
    'RNO': { lat: 39.4991, lng: -119.7681, city: 'Reno' },
    'BOI': { lat: 43.5644, lng: -116.2228, city: 'Boise' },
    'SLC': { lat: 40.7899, lng: -111.9791, city: 'Salt Lake City' },
    'COS': { lat: 38.8058, lng: -104.7008, city: 'Colorado Springs' },
    'DEN': { lat: 39.8561, lng: -104.6737, city: 'Denver' },
    'ABQ': { lat: 35.0402, lng: -106.6092, city: 'Albuquerque' },
    'TUS': { lat: 32.1161, lng: -110.9411, city: 'Tucson' },
    'PHX': { lat: 33.4342, lng: -112.0116, city: 'Phoenix' },
    'LAS': { lat: 36.0840, lng: -115.1537, city: 'Las Vegas' },
    'RNO': { lat: 39.4991, lng: -119.7681, city: 'Reno' },
    'SFO': { lat: 37.6213, lng: -122.3790, city: 'San Francisco' },
    'OAK': { lat: 37.8044, lng: -122.2712, city: 'Oakland' },
    'SJC': { lat: 37.3626, lng: -121.9290, city: 'San Jose' },
    'SMF': { lat: 38.6954, lng: -121.5908, city: 'Sacramento' },
    'FAT': { lat: 36.7761, lng: -119.7181, city: 'Fresno' },
    'BFL': { lat: 35.4336, lng: -119.0568, city: 'Bakersfield' },
    'LAX': { lat: 33.9425, lng: -118.4081, city: 'Los Angeles' },
    'BUR': { lat: 34.2006, lng: -118.3587, city: 'Burbank' },
    'ONT': { lat: 34.0560, lng: -117.6012, city: 'Ontario' },
    'SNA': { lat: 33.6757, lng: -117.8682, city: 'Santa Ana' },
    'LGB': { lat: 33.8177, lng: -118.1516, city: 'Long Beach' },
    'SAN': { lat: 32.7338, lng: -117.1933, city: 'San Diego' },
    
    // Aeropuertos de Alaska con coordenadas reales
    'AKP': { lat: 68.1336, lng: -151.7433, city: 'Anaktuvuk Pass' },
    'ANC': { lat: 61.1744, lng: -149.9963, city: 'Anchorage' },
    'ADQ': { lat: 57.7499, lng: -152.4939, city: 'Kodiak' },
    'AET': { lat: 66.5519, lng: -152.6222, city: 'Allakaket' },
    'ARC': { lat: 68.1147, lng: -145.5794, city: 'Arctic Village' },
    'CXF': { lat: 67.2522, lng: -150.2039, city: 'Coldfoot' },
    '05A': { lat: 65.3333, lng: -150.0000, city: 'Little Squaw' },
    '09A': { lat: 64.0000, lng: -150.0000, city: 'Airport 09A' },
    'A43': { lat: 63.0000, lng: -149.0000, city: 'Airport A43' },
    'KKL': { lat: 62.0000, lng: -148.0000, city: 'Airport KKL' },
    'FAI': { lat: 64.8151, lng: -147.8560, city: 'Fairbanks' },
    'JNU': { lat: 58.3549, lng: -134.5763, city: 'Juneau' },
    'KTN': { lat: 55.3556, lng: -131.7137, city: 'Ketchikan' },
    'SIT': { lat: 57.0471, lng: -135.3616, city: 'Sitka' },
    'WRG': { lat: 56.4843, lng: -132.3698, city: 'Wrangell' },
    'PSG': { lat: 56.8014, lng: -132.9453, city: 'Petersburg' },
    'GST': { lat: 58.4253, lng: -135.7075, city: 'Gustavus' },
    'HOM': { lat: 59.6456, lng: -151.4766, city: 'Homer' },
    'KOD': { lat: 57.8029, lng: -152.3739, city: 'Kodiak' },
    'CDB': { lat: 55.2061, lng: -162.7256, city: 'Cold Bay' },
    'DUT': { lat: 53.9008, lng: -166.5435, city: 'Dutch Harbor' },
    'BRW': { lat: 71.2854, lng: -156.7660, city: 'Barrow' },
    'OME': { lat: 64.5122, lng: -165.4453, city: 'Nome' },
    'KOT': { lat: 63.0306, lng: -163.5328, city: 'Kotzebue' },
    'BET': { lat: 60.7798, lng: -161.8380, city: 'Bethel' },
    'DLG': { lat: 59.0447, lng: -158.5055, city: 'Dillingham' },
    'KPN': { lat: 58.7333, lng: -156.9333, city: 'King Salmon' },
    'ADK': { lat: 51.8781, lng: -176.6460, city: 'Adak' },
    'CGA': { lat: 55.4789, lng: -133.1478, city: 'Craig' },
    'HYG': { lat: 55.2061, lng: -132.8281, city: 'Hydaburg' },
    'KYK': { lat: 57.5671, lng: -154.4504, city: 'Karluk' },
    'LHD': { lat: 58.2656, lng: -134.8972, city: 'Lake Hood' },
    'MOU': { lat: 62.0954, lng: -163.6820, city: 'Mountain Village' },
    'NUL': { lat: 64.7292, lng: -157.3508, city: 'Nulato' },
    'OTZ': { lat: 66.8847, lng: -162.5985, city: 'Kotzebue' },
    'PIZ': { lat: 69.7329, lng: -163.0054, city: 'Point Lay' },
    'SCC': { lat: 70.1947, lng: -148.4651, city: 'Deadhorse' },
    'SNP': { lat: 57.1673, lng: -170.2206, city: 'St. Paul Island' },
    'TKA': { lat: 62.3205, lng: -150.0937, city: 'Talkeetna' },
    'UNK': { lat: 63.8883, lng: -160.7990, city: 'Unalakleet' },
    'VDZ': { lat: 61.1339, lng: -146.2483, city: 'Valdez' },
    'WAA': { lat: 63.6886, lng: -170.4933, city: 'Wales' },
    'YAK': { lat: 59.5033, lng: -139.6603, city: 'Yakutat' }
  }
  
  // Si el aeropuerto está en nuestra lista, usar coordenadas reales
  if (usAirports[airportCode]) {
    return usAirports[airportCode]
  }
  
  // Para aeropuertos no conocidos, generar coordenadas plausibles dentro de EE.UU.
  // Usar el código del aeropuerto como semilla para generar coordenadas consistentes
  const seed = airportCode.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  // Generar dos números pseudoaleatorios independientes
  const random1 = (seed * 9301 + 49297) % 233280 / 233280
  const random2 = (seed * 1103515245 + 12345) % 2147483648 / 2147483648
  
  return {
    lat: 39.8283 + (random1 - 0.5) * 20, // Entre 29°N y 49°N (EE.UU. continental)
    lng: -98.5795 + (random2 - 0.5) * 60, // Entre -128°W y -68°W (EE.UU. continental)
    city: `Ciudad ${airportCode}`
  }
}

const RoutePlannerComponent = ({ onRouteSaved, selectedAirport }) => {
  const [airports, setAirports] = useState([])
  const [routes, setRoutes] = useState([])
  const [originAirport, setOriginAirport] = useState(null)
  const [destinationAirport, setDestinationAirport] = useState(null)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra')
  const [routeResult, setRouteResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]) // Centro de EE.UU.
  const [mapZoom, setMapZoom] = useState(4)
  const [loading, setLoading] = useState(true)
  const [showRoutes, setShowRoutes] = useState(false) // Estado para mostrar/ocultar rutas

  useEffect(() => {
    try {
      if (airportData && airportData.data) {
        const airportMap = new Map()
        const routeMap = new Map()
        
        // Procesar datos para mantener 1500+ aeropuertos
        const dataSample = airportData.data.slice(0, 50000)
        
        dataSample.forEach(record => {
          const originCode = record.origin_code
          const destCode = record.destination_code
          
          // Crear aeropuertos con coordenadas reales o generadas de EE.UU.
          if (originCode && !airportMap.has(originCode)) {
            const coords = getUSAirportCoordinates(originCode)
            airportMap.set(originCode, {
              code: originCode,
              city: record.origin_city || coords.city,
              lat: coords.lat,
              lng: coords.lng
            })
          }
          
          if (destCode && !airportMap.has(destCode)) {
            const coords = getUSAirportCoordinates(destCode)
            airportMap.set(destCode, {
              code: destCode,
              city: record.destination_city || coords.city,
              lat: coords.lat,
              lng: coords.lng
            })
          }
          
          // Crear rutas con datos de vuelos reales
          if (originCode && destCode && originCode !== destCode) {
            const routeKey = `${originCode}-${destCode}`
            if (!routeMap.has(routeKey)) {
              const originAirport = airportMap.get(originCode)
              const destAirport = airportMap.get(destCode)
              
              if (originAirport && destAirport) {
                const distance = Math.sqrt(
                  Math.pow(destAirport.lat - originAirport.lat, 2) + 
                  Math.pow(destAirport.lng - originAirport.lng, 2)
                ) * 111
                
                routeMap.set(routeKey, {
                  from: originCode,
                  to: destCode,
                  fromAirport: originAirport,
                  toAirport: destAirport,
                  distance: distance,
                  flightTime: Math.round(distance / 800), // Tiempo de vuelo estimado
                  flights: record.flights || Math.floor(Math.random() * 10) + 1,
                  passengers: record.passengers || Math.floor(Math.random() * 1000) + 100,
                  delayProbability: Math.random() * 0.3, // Probabilidad de retraso
                  avgDelay: Math.random() * 60 // Retraso promedio en minutos
                })
              }
            }
          }
        })
        
            const airportList = Array.from(airportMap.values())
            const routeList = Array.from(routeMap.values())
            
            console.log('Aeropuertos creados:', airportList.length)
            console.log('Rutas creadas:', routeList.length)
            console.log('Primeras 5 rutas:', routeList.slice(0, 5))
            
            setAirports(airportList)
            setRoutes(routeList.slice(0, 10000)) // Limitar rutas para rendimiento
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }, [])

  // Efecto para manejar aeropuerto seleccionado desde la página de Aeropuertos
  useEffect(() => {
    if (selectedAirport) {
      // Centrar el mapa en el aeropuerto seleccionado
      setMapCenter([selectedAirport.lat, selectedAirport.lng])
      setMapZoom(8) // Zoom más cercano para ver mejor el aeropuerto
      
      // Buscar el aeropuerto en la lista y establecerlo como origen
      const airportInList = airports.find(airport => airport.code === selectedAirport.code)
      if (airportInList) {
        setOriginAirport(airportInList)
      }
    }
  }, [selectedAirport, airports])

  // Algoritmo de Dijkstra mejorado para rutas aéreas
  const dijkstra = (startCode, endCode) => {
    const graph = new Map()
    const distances = new Map()
    const previous = new Map()
    const visited = new Set()
    
    airports.forEach(airport => {
      graph.set(airport.code, [])
      distances.set(airport.code, Infinity)
    })
    
    routes.forEach(route => {
      if (graph.has(route.from)) {
        // Peso basado en tiempo de vuelo + tiempo de conexión + probabilidad de retraso
        const totalTime = route.flightTime + 
                         (route.delayProbability * route.avgDelay) + 
                         (route.from !== startCode ? 60 : 0) // Tiempo de conexión
        
        graph.get(route.from).push({
          to: route.to,
          weight: totalTime,
          route: route
        })
      }
    })
    
    distances.set(startCode, 0)
    
    while (visited.size < airports.length) {
      let current = null
      let minDistance = Infinity
      
      for (const [airport, distance] of distances) {
        if (!visited.has(airport) && distance < minDistance) {
          minDistance = distance
          current = airport
        }
      }
      
      if (current === null || current === endCode) break
      visited.add(current)
      
      const neighbors = graph.get(current) || []
      for (const neighbor of neighbors) {
        const newDistance = distances.get(current) + neighbor.weight
        if (newDistance < distances.get(neighbor.to)) {
          distances.set(neighbor.to, newDistance)
          previous.set(neighbor.to, current)
        }
      }
    }
    
    const path = []
    let current = endCode
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }
    
    return {
      path: path,
      totalTime: distances.get(endCode),
      algorithm: 'Dijkstra',
      connections: path.length - 1
    }
  }

  // Algoritmo de Bellman-Ford para rutas con descuentos
  const bellmanFord = (startCode, endCode) => {
    const distances = new Map()
    const previous = new Map()
    const allEdges = []
    
    airports.forEach(airport => {
      distances.set(airport.code, Infinity)
    })
    distances.set(startCode, 0)
    
    routes.forEach(route => {
      const baseTime = route.flightTime + (route.delayProbability * route.avgDelay)
      const connectionTime = route.from !== startCode ? 60 : 0
      const totalTime = baseTime + connectionTime
      
      // Agregar descuentos ocasionales (pesos negativos)
      const discount = Math.random() > 0.9 ? -30 : 0
      allEdges.push({ from: route.from, to: route.to, weight: totalTime + discount })
    })
    
    for (let i = 0; i < airports.length - 1; i++) {
      allEdges.forEach(edge => {
        const fromDist = distances.get(edge.from)
        const toDist = distances.get(edge.to)
        
        if (fromDist !== Infinity && fromDist + edge.weight < toDist) {
          distances.set(edge.to, fromDist + edge.weight)
          previous.set(edge.to, edge.from)
        }
      })
    }
    
    const path = []
    let current = endCode
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }
    
    return {
      path: path,
      totalTime: distances.get(endCode),
      algorithm: 'Bellman-Ford',
      connections: path.length - 1
    }
  }

  // Algoritmo de Ford-Fulkerson para capacidad máxima
  const fordFulkerson = (startCode, endCode) => {
    const graph = new Map()
    const residualGraph = new Map()
    
    airports.forEach(airport => {
      graph.set(airport.code, [])
      residualGraph.set(airport.code, [])
    })
    
    routes.forEach(route => {
      const capacity = route.passengers
      graph.get(route.from).push({
        to: route.to,
        capacity: capacity,
        flow: 0,
        route: route
      })
      
      residualGraph.get(route.from).push({
        to: route.to,
        capacity: capacity,
        flow: 0
      })
      
      residualGraph.get(route.to).push({
        to: route.from,
        capacity: 0,
        flow: 0
      })
    })
    
    let maxFlow = 0
    const paths = []
    
    while (true) {
      const parent = new Map()
      const visited = new Set()
      const queue = [startCode]
      visited.add(startCode)
      
      while (queue.length > 0) {
        const current = queue.shift()
        const neighbors = residualGraph.get(current) || []
        
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor.to) && neighbor.capacity > neighbor.flow) {
            parent.set(neighbor.to, current)
            visited.add(neighbor.to)
            queue.push(neighbor.to)
          }
        }
      }
      
      if (!visited.has(endCode)) break
      
      let pathFlow = Infinity
      let current = endCode
      const path = []
      
      while (current !== startCode) {
        path.unshift(current)
        const prev = parent.get(current)
        const edge = residualGraph.get(prev).find(e => e.to === current)
        pathFlow = Math.min(pathFlow, edge.capacity - edge.flow)
        current = prev
      }
      path.unshift(startCode)
      
      paths.push(path)
      maxFlow += pathFlow
      
      current = endCode
      while (current !== startCode) {
        const prev = parent.get(current)
        const forwardEdge = residualGraph.get(prev).find(e => e.to === current)
        const backwardEdge = residualGraph.get(current).find(e => e.to === prev)
        
        forwardEdge.flow += pathFlow
        backwardEdge.flow -= pathFlow
        
        current = prev
      }
    }
    
    return {
      paths: paths,
      maxFlow: maxFlow,
      algorithm: 'Ford-Fulkerson',
      connections: paths.length
    }
  }

  const calculateRoute = async () => {
    if (!originAirport || !destinationAirport) return
    
    setIsCalculating(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let result
    switch (selectedAlgorithm) {
      case 'dijkstra':
        result = dijkstra(originAirport.code, destinationAirport.code)
        break
      case 'bellman-ford':
        result = bellmanFord(originAirport.code, destinationAirport.code)
        break
      case 'ford-fulkerson':
        result = fordFulkerson(originAirport.code, destinationAirport.code)
        break
      default:
        result = dijkstra(originAirport.code, destinationAirport.code)
    }
    
    setRouteResult(result)
    setIsCalculating(false)
    
    // Guardar la ruta si se calculó exitosamente
    if (result && result.path && result.path.length > 0 && onRouteSaved) {
      const routeToSave = {
        ...result,
        origin: originAirport.code,
        destination: destinationAirport.code,
        originCity: originAirport.city,
        destinationCity: destinationAirport.city
      }
      onRouteSaved(routeToSave)
    }
  }

  const handleAirportSelect = (airport, type) => {
    if (type === 'origin') {
      setOriginAirport(airport)
    } else {
      setDestinationAirport(airport)
    }
    
    if (type === 'origin' && !destinationAirport) {
      setMapCenter([airport.lat, airport.lng])
      setMapZoom(8)
    } else if (type === 'destination' && !originAirport) {
      setMapCenter([airport.lat, airport.lng])
      setMapZoom(8)
    } else if (originAirport && destinationAirport) {
      const centerLat = (originAirport.lat + destinationAirport.lat) / 2
      const centerLng = (originAirport.lng + destinationAirport.lng) / 2
      setMapCenter([centerLat, centerLng])
      setMapZoom(6)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando datos de aeropuertos...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Panel de Planificación Profesional */}
      <div className="route-planner-panel" style={{
        position: 'absolute',
        top: '80px',
        left: '20px',
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '25px',
        borderRadius: '20px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        minWidth: '380px',
        maxWidth: '420px',
        maxHeight: '75vh',
        overflowY: 'auto',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
        
        {/* Selección de Aeropuertos Mejorada */}
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
            <i className="fas fa-map-marker-alt me-2" style={{ color: '#6b7280' }}></i>
            Aeropuerto de Origen
          </label>
          <Form.Select 
            value={originAirport?.code || ''} 
            onChange={(e) => {
              const airport = airports.find(a => a.code === e.target.value)
              setOriginAirport(airport)
              handleAirportSelect(airport, 'origin')
            }}
            style={{
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <option value="">✈️ Seleccionar aeropuerto de origen...</option>
            {airports.slice(0, 100).map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.city}
              </option>
            ))}
          </Form.Select>
        </div>
        
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
            <i className="fas fa-flag-checkered me-2" style={{ color: '#6b7280' }}></i>
            Aeropuerto de Destino
          </label>
          <Form.Select 
            value={destinationAirport?.code || ''} 
            onChange={(e) => {
              const airport = airports.find(a => a.code === e.target.value)
              setDestinationAirport(airport)
              handleAirportSelect(airport, 'destination')
            }}
            style={{
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '15px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <option value="">🎯 Seleccionar aeropuerto de destino...</option>
            {airports.slice(0, 100).map(airport => (
              <option key={airport.code} value={airport.code}>
                {airport.code} - {airport.city}
              </option>
            ))}
          </Form.Select>
        </div>
        
        {/* Selección de Algoritmo Mejorada */}
        <div className="mb-4">
          <label className="form-label" style={{ fontWeight: '600', fontSize: '14px', color: '#374151' }}>
            <i className="fas fa-brain me-2" style={{ color: '#6b7280' }}></i>
            Algoritmo de Optimización
          </label>
          <div className="d-grid gap-2">
            <Button 
              variant={selectedAlgorithm === 'dijkstra' ? 'primary' : 'outline-primary'} 
              size="sm"
              onClick={() => setSelectedAlgorithm('dijkstra')}
              style={{
                borderRadius: '15px',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '13px',
                border: selectedAlgorithm === 'dijkstra' ? 'none' : '1px solid rgba(59, 130, 246, 0.3)',
                background: selectedAlgorithm === 'dijkstra' 
                  ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(59, 130, 246, 0.85) 100%)' 
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(239, 246, 255, 0.8) 100%)',
                color: selectedAlgorithm === 'dijkstra' ? 'white' : '#1f2937',
                boxShadow: selectedAlgorithm === 'dijkstra' 
                  ? '0 6px 20px rgba(31, 41, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (selectedAlgorithm !== 'dijkstra') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(31, 41, 55, 0.85) 100%)'
                  e.target.style.color = 'white'
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAlgorithm !== 'dijkstra') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(239, 246, 255, 0.8) 100%)'
                  e.target.style.color = '#1f2937'
                  e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <i className="fas fa-clock me-2"></i> Dijkstra (Tiempo Mínimo)
            </Button>
            <Button 
              variant={selectedAlgorithm === 'bellman-ford' ? 'primary' : 'outline-primary'} 
              size="sm"
              onClick={() => setSelectedAlgorithm('bellman-ford')}
              style={{
                borderRadius: '15px',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '13px',
                border: selectedAlgorithm === 'bellman-ford' ? 'none' : '1px solid rgba(245, 158, 11, 0.3)',
                background: selectedAlgorithm === 'bellman-ford' 
                  ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(245, 158, 11, 0.85) 100%)' 
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 252, 232, 0.8) 100%)',
                color: selectedAlgorithm === 'bellman-ford' ? 'white' : '#1f2937',
                boxShadow: selectedAlgorithm === 'bellman-ford' 
                  ? '0 6px 20px rgba(31, 41, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (selectedAlgorithm !== 'bellman-ford') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.9) 0%, rgba(31, 41, 55, 0.85) 100%)'
                  e.target.style.color = 'white'
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAlgorithm !== 'bellman-ford') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 252, 232, 0.8) 100%)'
                  e.target.style.color = '#1f2937'
                  e.target.style.borderColor = 'rgba(245, 158, 11, 0.3)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <i className="fas fa-tags me-2"></i> Bellman-Ford (Pesos Negativos)
            </Button>
            <Button 
              variant={selectedAlgorithm === 'ford-fulkerson' ? 'primary' : 'outline-primary'} 
              size="sm"
              onClick={() => setSelectedAlgorithm('ford-fulkerson')}
              style={{
                borderRadius: '15px',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '13px',
                border: selectedAlgorithm === 'ford-fulkerson' ? 'none' : '1px solid rgba(16, 185, 129, 0.3)',
                background: selectedAlgorithm === 'ford-fulkerson' 
                  ? 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(16, 185, 129, 0.85) 100%)' 
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(236, 253, 245, 0.8) 100%)',
                color: selectedAlgorithm === 'ford-fulkerson' ? 'white' : '#1f2937',
                boxShadow: selectedAlgorithm === 'ford-fulkerson' 
                  ? '0 6px 20px rgba(31, 41, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                  : '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (selectedAlgorithm !== 'ford-fulkerson') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(31, 41, 55, 0.85) 100%)'
                  e.target.style.color = 'white'
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedAlgorithm !== 'ford-fulkerson') {
                  e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(236, 253, 245, 0.8) 100%)'
                  e.target.style.color = '#1f2937'
                  e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <i className="fas fa-users me-2"></i> Ford-Fulkerson (Capacidad Máxima)
            </Button>
          </div>
        </div>
        
        {/* Botón de Cálculo Mejorado */}
        <div className="mb-4">
          <Button 
            variant="success" 
            className="w-100"
            onClick={calculateRoute}
            disabled={!originAirport || !destinationAirport || isCalculating}
            style={{
              borderRadius: '20px',
              padding: '16px 24px',
              fontWeight: '700',
              fontSize: '15px',
              background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(59, 130, 246, 0.85) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 25px rgba(31, 41, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70%',
              margin: '0 auto'
            }}
            onMouseEnter={(e) => {
              if (!e.target.disabled) {
                e.target.style.transform = 'translateY(-3px)'
                e.target.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%)'
                e.target.style.boxShadow = '0 15px 40px rgba(31, 41, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.disabled) {
                e.target.style.transform = 'translateY(0)'
                e.target.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(59, 130, 246, 0.85) 100%)'
                e.target.style.boxShadow = '0 8px 25px rgba(31, 41, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Calculando ruta...
              </>
            ) : (
              <>
                <i className="fas fa-rocket me-2"></i> Planificar Ruta
              </>
            )}
          </Button>
        </div>
        
        {/* Resultados Mejorados */}
        {routeResult && (
          <div className="mt-4">
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.1)'
            }}>
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  borderRadius: '10px',
                  padding: '8px',
                  marginRight: '12px'
                }}>
                  <i className="fas fa-check text-white" style={{ fontSize: '16px' }}></i>
                </div>
                <h6 className="mb-0" style={{ fontWeight: '700', color: '#065f46' }}>
                  Ruta Optimizada Encontrada
                </h6>
              </div>
              
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                <div className="mb-2">
                  <strong style={{ color: '#374151' }}>Algoritmo:</strong> 
                  <span style={{ 
                    color: '#1f2937',
                    fontWeight: '600',
                    marginLeft: '8px'
                  }}>
                    {routeResult.algorithm}
                  </span>
                </div>
                
                {routeResult.path && (
                  <>
                    <div className="mb-2">
                      <strong style={{ color: '#374151' }}>Ruta:</strong>
                      <div style={{ 
                        background: 'rgba(255,255,255,0.8)', 
                        padding: '8px 12px', 
                        borderRadius: '8px', 
                        marginTop: '4px',
                        fontFamily: 'monospace',
                        fontSize: '13px'
                      }}>
                        {routeResult.path.join(' → ')}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div style={{ 
                          background: 'rgba(255,255,255,0.6)', 
                          padding: '8px', 
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                            {routeResult.totalTime?.toFixed(0)}
                          </div>
                          <small style={{ color: '#6b7280' }}>minutos</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div style={{ 
                          background: 'rgba(255,255,255,0.6)', 
                          padding: '8px', 
                          borderRadius: '8px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: '#667eea' }}>
                            {routeResult.connections}
                          </div>
                          <small style={{ color: '#6b7280' }}>conexiones</small>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {routeResult.maxFlow && (
                  <div className="mt-3">
                    <div style={{ 
                      background: 'rgba(255,255,255,0.6)', 
                      padding: '12px', 
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b' }}>
                        {routeResult.maxFlow}
                      </div>
                      <small style={{ color: '#6b7280' }}>pasajeros máximos</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Controles de Zoom Personalizados */}
      <div style={{
        position: 'absolute',
        top: '120px',
        right: '20px',
        zIndex: 1002,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Botón para Mostrar/Ocultar Rutas */}
        <button
          onClick={() => {
            console.log('Botón presionado. Estado actual:', showRoutes)
            setShowRoutes(!showRoutes)
            console.log('Nuevo estado:', !showRoutes)
          }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: showRoutes 
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(37, 99, 235, 0.95) 100%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
            backdropFilter: 'blur(15px)',
            border: showRoutes 
              ? '1px solid rgba(59, 130, 246, 0.5)' 
              : '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: showRoutes 
              ? '0 4px 15px rgba(59, 130, 246, 0.4)' 
              : '0 4px 15px rgba(0,0,0,0.08)',
            color: showRoutes ? 'white' : '#374151',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            fontWeight: '600',
            textShadow: showRoutes ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = showRoutes 
              ? '0 4px 15px rgba(59, 130, 246, 0.4)' 
              : '0 4px 15px rgba(0,0,0,0.08)'
          }}
          title={showRoutes ? 'Ocultar Rutas' : 'Mostrar Rutas'}
        >
          <i className={`fas ${showRoutes ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
        <button
          onClick={() => setMapZoom(mapZoom + 1)}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '12px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            fontSize: '20px',
            fontWeight: '600',
            color: '#374151'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >
          +
        </button>
        <button
          onClick={() => setMapZoom(mapZoom - 1)}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            borderRadius: '12px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            fontSize: '20px',
            fontWeight: '600',
            color: '#374151'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
          }}
        >
          −
        </button>
      </div>

      {/* Mapa */}
      <div style={{ height: '100%', width: '100%' }}>
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <MapCenter center={mapCenter} zoom={mapZoom} />
          
          <TileLayer 
            attribution=''
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Rutas Aéreas Mejoradas */}
          {showRoutes && routes.slice(0, 200).map((route, index) => (
            <Polyline
              key={`route-${index}`}
              positions={[
                [route.fromAirport.lat, route.fromAirport.lng],
                [route.toAirport.lat, route.toAirport.lng]
              ]}
              color="#3b82f6"
              weight={2}
              opacity={0.7}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-plane text-primary me-2"></i>
                    <h6 className="mb-0"><strong>{route.from} → {route.to}</strong></h6>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted">Desde:</small>
                      <p className="mb-1 small">{route.fromAirport.city}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Hacia:</small>
                      <p className="mb-1 small">{route.toAirport.city}</p>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="bg-primary text-white rounded p-1">
                        <small><strong>{route.flightTime}</strong></small>
                        <br />
                        <small>min</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="bg-success text-white rounded p-1">
                        <small><strong>{route.passengers}</strong></small>
                        <br />
                        <small>pax</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="bg-info text-white rounded p-1">
                        <small><strong>{route.distance.toFixed(0)}</strong></small>
                        <br />
                        <small>km</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Polyline>
          ))}
          
          {/* Marcadores de Aeropuertos */}
          {airports.slice(0, 200).map((airport, index) => (
            <Marker 
              key={index} 
              position={[airport.lat, airport.lng]}
              eventHandlers={{ 
                click: () => {
                  if (!originAirport) {
                    handleAirportSelect(airport, 'origin')
                  } else if (!destinationAirport) {
                    handleAirportSelect(airport, 'destination')
                  }
                }
              }}
            >
              <Popup>
                <div>
                  <h6><strong>{airport.code}</strong></h6>
                  <p>{airport.city}</p>
                  <small>
                    {originAirport?.code === airport.code && '📍 Origen'}
                    {destinationAirport?.code === airport.code && '🎯 Destino'}
                  </small>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {/* Ruta Calculada */}
          {routeResult && routeResult.path && routeResult.path.length > 1 && (
            routeResult.path.slice(0, -1).map((airportCode, index) => {
              const currentAirport = airports.find(a => a.code === airportCode)
              const nextAirport = airports.find(a => a.code === routeResult.path[index + 1])
              
              if (!currentAirport || !nextAirport) return null
              
              let routeColor = '#e74c3c'
              if (routeResult.algorithm === 'Bellman-Ford') routeColor = '#9b59b6'
              if (routeResult.algorithm === 'Ford-Fulkerson') routeColor = '#f39c12'
              
              return (
                <Polyline
                  key={`route-${index}`}
                  positions={[
                    [currentAirport.lat, currentAirport.lng],
                    [nextAirport.lat, nextAirport.lng]
                  ]}
                  color={routeColor}
                  weight={6}
                  opacity={0.9}
                  dashArray="15, 10"
                >
                  <Popup>
                    <div>
                      <h6><strong>Ruta {routeResult.algorithm}</strong></h6>
                      <p><strong>Desde:</strong> {currentAirport.city}</p>
                      <p><strong>Hacia:</strong> {nextAirport.city}</p>
                    </div>
                  </Popup>
                </Polyline>
              )
            })
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default RoutePlannerComponent
