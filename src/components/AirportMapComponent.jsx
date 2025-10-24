import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import airportData from '../data/airports.json'

// Configurar iconos de Leaflet para React
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

const AirportMapComponent = () => {
  const [airports, setAirports] = useState([])
  const [routes, setRoutes] = useState([])
  const [selectedAirport, setSelectedAirport] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAirports, setFilteredAirports] = useState([])
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra')
  const [pathResult, setPathResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [useFullDataset, setUseFullDataset] = useState(false) // Para cambiar entre modo desarrollo y producción
  const [mapCenter, setMapCenter] = useState([39.8283, -98.5795]) // Centro de Estados Unidos
  const [mapZoom, setMapZoom] = useState(4)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showRoutes, setShowRoutes] = useState(true)
  const [routeFilter, setRouteFilter] = useState('all') // 'all', 'from', 'to'
  const [panelCollapsed, setPanelCollapsed] = useState(false)

  useEffect(() => {
    try {
      // Procesar datos de aeropuertos y rutas para el mapa
      if (airportData && airportData.data) {
        const airportMap = new Map()
        const routeMap = new Map()
        
        // Procesar datos según el modo seleccionado
        const dataSample = useFullDataset ? airportData.data : airportData.data.slice(0, 50000) // Mantener suficientes datos para 1500+ aeropuertos
        dataSample.forEach(record => {
          const originCode = record.origin_code
          const destCode = record.destination_code
          
          // Crear aeropuertos con coordenadas simuladas basadas en códigos
          if (originCode && !airportMap.has(originCode)) {
            airportMap.set(originCode, {
              code: originCode,
              city: record.origin_city,
              name: `${originCode} - ${record.origin_city}`,
              // Coordenadas simuladas basadas en el código del aeropuerto
              lat: 39.8283 + (Math.random() - 0.5) * 20,
              lng: -98.5795 + (Math.random() - 0.5) * 40,
              flights: 1
            })
          }
          
          if (destCode && !airportMap.has(destCode)) {
            airportMap.set(destCode, {
              code: destCode,
              city: record.destination_city,
              name: `${destCode} - ${record.destination_city}`,
              lat: 39.8283 + (Math.random() - 0.5) * 20,
              lng: -98.5795 + (Math.random() - 0.5) * 40,
              flights: 1
            })
          }
          
          // Crear rutas entre aeropuertos
          if (originCode && destCode && originCode !== destCode) {
            const routeKey = `${originCode}-${destCode}`
            if (!routeMap.has(routeKey)) {
              const originAirport = airportMap.get(originCode)
              const destAirport = airportMap.get(destCode)
              
              if (originAirport && destAirport) {
                routeMap.set(routeKey, {
                  id: routeKey,
                  from: originCode,
                  to: destCode,
                  fromAirport: originAirport,
                  toAirport: destAirport,
                  flights: 1,
                  passengers: parseInt(record.passengers) || 0,
                  distance: parseInt(record.distance) || 0
                })
              }
            } else {
              // Incrementar contador de vuelos para rutas existentes
              const existingRoute = routeMap.get(routeKey)
              existingRoute.flights += 1
              existingRoute.passengers += parseInt(record.passengers) || 0
            }
          }
        })
        
        const airportList = Array.from(airportMap.values())
        const routeList = Array.from(routeMap.values())
        
        // Usar datos según el modo seleccionado
        if (useFullDataset) {
          setAirports(airportList)
          setRoutes(routeList)
          setFilteredAirports(airportList.slice(0, 100))
        } else {
          // Para desarrollo, mantener al menos 1500 aeropuertos pero optimizar rutas
          const sampledAirports = airportList // Mantener todos los aeropuertos únicos
          const sampledRoutes = routeList.slice(0, Math.min(routeList.length, 10000)) // Limitar rutas para rendimiento
          
          setAirports(sampledAirports)
          setRoutes(sampledRoutes)
          setFilteredAirports(sampledAirports.slice(0, 100)) // Mostrar más aeropuertos
        }
        setLoading(false)
      }
    } catch (err) {
      setError('Error al cargar los datos de aeropuertos')
      setLoading(false)
    }
  }, [useFullDataset]) // Recargar cuando cambie el modo de datos

  useEffect(() => {
    // Filtrar aeropuertos basado en búsqueda
    if (searchTerm === '') {
      setFilteredAirports(airports.slice(0, 100))
    } else {
      const filtered = airports.filter(airport =>
        airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAirports(filtered.slice(0, 50))
    }
  }, [searchTerm, airports])

  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport)
    setMapCenter([airport.lat, airport.lng])
    setMapZoom(10)
    
    // Filtrar rutas relacionadas con el aeropuerto seleccionado
    if (routeFilter === 'from') {
      setRouteFilter('from')
    } else if (routeFilter === 'to') {
      setRouteFilter('to')
    }
  }

  const handleShowAllAirports = () => {
    setSelectedAirport(null)
    setMapCenter([39.8283, -98.5795])
    setMapZoom(4)
    setRouteFilter('all')
  }

  const getFilteredRoutes = () => {
    if (!showRoutes) return []
    
    let filteredRoutes = routes
    
    if (selectedAirport) {
      switch (routeFilter) {
        case 'from':
          filteredRoutes = routes.filter(route => route.from === selectedAirport.code)
          break
        case 'to':
          filteredRoutes = routes.filter(route => route.to === selectedAirport.code)
          break
        case 'all':
        default:
          filteredRoutes = routes.filter(route => 
            route.from === selectedAirport.code || route.to === selectedAirport.code
          )
          break
      }
    }
    
    // Limitar a 200 rutas para rendimiento pero mostrar más conexiones
    return filteredRoutes.slice(0, 200)
  }

  // Algoritmo de Dijkstra mejorado para encontrar la ruta más corta
  const dijkstra = (startAirport, endAirport) => {
    const graph = new Map()
    const distances = new Map()
    const previous = new Map()
    const visited = new Set()
    
    // Construir el grafo con conexiones bidireccionales
    airports.forEach(airport => {
      graph.set(airport.code, [])
      distances.set(airport.code, Infinity)
    })
    
    // Agregar rutas bidireccionales para mejor conectividad
    routes.forEach(route => {
      if (graph.has(route.from)) {
        graph.get(route.from).push({
          to: route.to,
          weight: route.distance || Math.random() * 1000 + 100, // Distancia simulada más realista
          route: route
        })
      }
      // Agregar conexión de vuelta
      if (graph.has(route.to)) {
        graph.get(route.to).push({
          to: route.from,
          weight: route.distance || Math.random() * 1000 + 100,
          route: route
        })
      }
    })
    
    // Si no hay conexión directa, crear conexiones entre aeropuertos cercanos
    airports.forEach(airport1 => {
      airports.forEach(airport2 => {
        if (airport1.code !== airport2.code) {
          const distance = Math.sqrt(
            Math.pow(airport2.lat - airport1.lat, 2) + 
            Math.pow(airport2.lng - airport1.lng, 2)
          ) * 111 // Convertir a km aproximados
          
          // Solo agregar conexiones si están relativamente cerca
          if (distance < 2000 && !graph.get(airport1.code).some(conn => conn.to === airport2.code)) {
            graph.get(airport1.code).push({
              to: airport2.code,
              weight: distance,
              route: { from: airport1.code, to: airport2.code, distance: distance }
            })
          }
        }
      })
    })
    
    distances.set(startAirport, 0)
    
    while (visited.size < airports.length) {
      let current = null
      let minDistance = Infinity
      
      for (const [airport, distance] of distances) {
        if (!visited.has(airport) && distance < minDistance) {
          minDistance = distance
          current = airport
        }
      }
      
      if (current === null || current === endAirport) break
      
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
    
    // Reconstruir el camino
    const path = []
    let current = endAirport
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }
    
    return {
      path: path,
      distance: distances.get(endAirport),
      algorithm: 'Dijkstra'
    }
  }

  // Algoritmo de Bellman-Ford mejorado para rutas con pesos negativos
  const bellmanFord = (startAirport, endAirport) => {
    const distances = new Map()
    const previous = new Map()
    const allEdges = []
    
    airports.forEach(airport => {
      distances.set(airport.code, Infinity)
    })
    distances.set(startAirport, 0)
    
    // Crear todas las aristas bidireccionales
    routes.forEach(route => {
      const weight = route.distance || Math.random() * 1000 + 100
      allEdges.push({ from: route.from, to: route.to, weight: weight })
      allEdges.push({ from: route.to, to: route.from, weight: weight })
    })
    
    // Agregar conexiones entre aeropuertos cercanos con pesos variables
    airports.forEach(airport1 => {
      airports.forEach(airport2 => {
        if (airport1.code !== airport2.code) {
          const distance = Math.sqrt(
            Math.pow(airport2.lat - airport1.lat, 2) + 
            Math.pow(airport2.lng - airport1.lng, 2)
          ) * 111
          
          if (distance < 2000) {
            // Agregar peso negativo ocasional para simular descuentos
            const weight = distance * (Math.random() > 0.8 ? -0.5 : 1)
            allEdges.push({ from: airport1.code, to: airport2.code, weight: weight })
          }
        }
      })
    })
    
    // Relajar las aristas V-1 veces
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
    
    // Reconstruir el camino
    const path = []
    let current = endAirport
    while (current !== undefined) {
      path.unshift(current)
      current = previous.get(current)
    }
    
    return {
      path: path,
      distance: distances.get(endAirport),
      algorithm: 'Bellman-Ford'
    }
  }

  // Algoritmo de Ford-Fulkerson para flujo máximo
  const fordFulkerson = (startAirport, endAirport) => {
    const graph = new Map()
    const residualGraph = new Map()
    
    // Construir grafo de capacidades
    airports.forEach(airport => {
      graph.set(airport.code, new Map())
      residualGraph.set(airport.code, new Map())
    })
    
    routes.forEach(route => {
      const capacity = route.passengers || 1
      graph.get(route.from).set(route.to, capacity)
      residualGraph.get(route.from).set(route.to, capacity)
      residualGraph.get(route.to).set(route.from, 0)
    })
    
    let maxFlow = 0
    const paths = []
    
    // Encontrar caminos de aumento usando BFS
    while (true) {
      const parent = new Map()
      const visited = new Set()
      const queue = [startAirport]
      visited.add(startAirport)
      
      while (queue.length > 0) {
        const current = queue.shift()
        
        if (current === endAirport) break
        
        const neighbors = residualGraph.get(current)
        if (neighbors) {
          for (const [neighbor, capacity] of neighbors) {
            if (!visited.has(neighbor) && capacity > 0) {
              visited.add(neighbor)
              parent.set(neighbor, current)
              queue.push(neighbor)
            }
          }
        }
      }
      
      if (!visited.has(endAirport)) break
      
      // Encontrar el flujo mínimo en el camino
      let pathFlow = Infinity
      let current = endAirport
      const path = []
      
      while (current !== startAirport) {
        path.unshift(current)
        const parentNode = parent.get(current)
        pathFlow = Math.min(pathFlow, residualGraph.get(parentNode).get(current))
        current = parentNode
      }
      path.unshift(startAirport)
      
      // Actualizar el grafo residual
      current = endAirport
      while (current !== startAirport) {
        const parentNode = parent.get(current)
        residualGraph.get(parentNode).set(current, 
          residualGraph.get(parentNode).get(current) - pathFlow)
        residualGraph.get(current).set(parentNode, 
          residualGraph.get(current).get(parentNode) + pathFlow)
        current = parentNode
      }
      
      maxFlow += pathFlow
      paths.push({ path, flow: pathFlow })
    }
    
    return {
      paths: paths,
      maxFlow: maxFlow,
      algorithm: 'Ford-Fulkerson'
    }
  }

  const calculateOptimalRoute = async (startAirport, endAirport) => {
    if (!startAirport || !endAirport) return
    
    setIsCalculating(true)
    
    // Simular tiempo de cálculo
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let result
    switch (selectedAlgorithm) {
      case 'dijkstra':
        result = dijkstra(startAirport.code, endAirport.code)
        break
      case 'bellman-ford':
        result = bellmanFord(startAirport.code, endAirport.code)
        break
      case 'ford-fulkerson':
        result = fordFulkerson(startAirport.code, endAirport.code)
        break
      default:
        result = dijkstra(startAirport.code, endAirport.code)
    }
    
    setPathResult(result)
    setIsCalculating(false)
  }

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando mapa...</span>
          </div>
          <p className="mt-2">Cargando datos de aeropuertos...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  return (
    <div className="map-container" style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <div className="map-header" style={{ 
        background: '#343a40', 
        color: 'white', 
        padding: '10px 20px', 
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h4 className="mb-0">
            <i className="fas fa-map"></i> Mapa Interactivo de Aeropuertos
          </h4>
          <small>
            Total: {airports.length} aeropuertos | {routes.length} rutas | Mostrando: {filteredAirports.length} aeropuertos
            <br />
            <span className={useFullDataset ? "text-success" : "text-warning"}>
              <i className={`fas ${useFullDataset ? 'fa-database' : 'fa-flask'}`}></i> 
              {useFullDataset ? 'Modo producción: Todos los datos' : 'Modo desarrollo: 1500+ aeropuertos'}
            </span>
          </small>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-light" 
            size="sm"
            onClick={handleShowAllAirports}
          >
            <i className="fas fa-globe"></i> Ver Todos
          </Button>
        </div>
      </div>
      
      <div className="map-content" style={{ 
        display: 'flex', 
        height: 'calc(100% - 60px)', 
        margin: 0, 
        padding: 0 
      }}>
        {/* Panel de Control Lateral */}
        <div className="control-panel" style={{
          width: panelCollapsed ? '50px' : '350px',
          background: 'white',
          borderRight: '1px solid #dee2e6',
          padding: '15px',
          overflowY: 'auto',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          transition: 'width 0.3s ease'
        }}>
          {!panelCollapsed ? (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  <i className="fas fa-sliders-h"></i> Controles del Mapa
                </h5>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setPanelCollapsed(true)}
                >
                  <i className="fas fa-chevron-left"></i>
                </Button>
              </div>
              
              <div className="mb-3">
            <label className="form-label">Algoritmos de Rutas:</label>
            <div className="d-grid gap-2">
              <Button 
                variant={selectedAlgorithm === 'dijkstra' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedAlgorithm('dijkstra')}
              >
                <i className="fas fa-route me-1"></i> Dijkstra
              </Button>
              <Button 
                variant={selectedAlgorithm === 'bellman-ford' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedAlgorithm('bellman-ford')}
              >
                <i className="fas fa-exchange-alt me-1"></i> Bellman-Ford
              </Button>
              <Button 
                variant={selectedAlgorithm === 'ford-fulkerson' ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setSelectedAlgorithm('ford-fulkerson')}
              >
                <i className="fas fa-tint me-1"></i> Ford-Fulkerson
              </Button>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Mostrar Rutas:</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="show-routes"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="show-routes">
                Activar visualización de rutas
              </label>
            </div>
          </div>
          
          {showRoutes && (
            <div className="mb-3">
              <label className="form-label">Filtrar Rutas:</label>
              <select
                className="form-select"
                value={routeFilter}
                onChange={(e) => setRouteFilter(e.target.value)}
                disabled={!selectedAirport}
              >
                <option value="all">Todas las rutas</option>
                <option value="from">Rutas desde este aeropuerto</option>
                <option value="to">Rutas hacia este aeropuerto</option>
              </select>
            </div>
          )}
          
          <div className="mb-3">
            <label className="form-label">Modo de Datos:</label>
            <div className="d-grid gap-2">
              <Button 
                variant={useFullDataset ? "warning" : "outline-warning"}
                size="sm"
                onClick={() => setUseFullDataset(!useFullDataset)}
              >
                <i className={`fas ${useFullDataset ? 'fa-database' : 'fa-flask'} me-1`}></i>
                {useFullDataset ? 'Modo Producción' : 'Modo Desarrollo'}
              </Button>
            </div>
            <small className="text-muted">
              {useFullDataset ? 'Cargando todos los datos (más lento)' : 'Mantiene 1500+ aeropuertos, optimiza rutas'}
            </small>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Calcular Ruta Óptima:</label>
            <div className="d-grid gap-2">
              <Button 
                variant="success"
                size="sm"
                onClick={() => {
                  const startAirport = airports.find(a => a.code === 'ORD') // Chicago como origen
                  const endAirport = airports.find(a => a.code === 'LAX') // Los Angeles como destino
                  if (startAirport && endAirport) {
                    calculateOptimalRoute(startAirport, endAirport)
                  }
                }}
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Calculando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator me-1"></i> Calcular Ruta
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {pathResult && (
            <div className="mb-3">
              <h6 className="mb-2">Resultado del Algoritmo:</h6>
              <div className="bg-light rounded p-2">
                <small className="text-muted">Algoritmo: {pathResult.algorithm}</small>
                {pathResult.path && (
                  <>
                    <br />
                    <small className="text-muted">Ruta: {pathResult.path.join(' → ')}</small>
                    <br />
                    <small className="text-muted">Distancia: {pathResult.distance?.toFixed(2)} km</small>
                  </>
                )}
                {pathResult.maxFlow && (
                  <>
                    <br />
                    <small className="text-muted">Flujo Máximo: {pathResult.maxFlow} pasajeros</small>
                    <br />
                    <small className="text-muted">Caminos: {pathResult.paths?.length}</small>
                  </>
                )}
              </div>
            </div>
          )}
          
          <div className="airport-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <h6 className="mb-2">Aeropuertos Principales:</h6>
            {airports.slice(0, 20).map((airport, index) => (
              <div 
                key={index}
                className={`p-2 mb-1 border rounded cursor-pointer ${
                  selectedAirport?.code === airport.code ? 'bg-primary text-white' : 'bg-light'
                }`}
                onClick={() => handleAirportSelect(airport)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{airport.code}</strong> - {airport.city}
              </div>
            ))}
              </div>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setPanelCollapsed(false)}
                className="mb-3"
              >
                <i className="fas fa-chevron-right"></i>
              </Button>
              <div className="d-flex flex-column gap-2">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleShowAllAirports}
                  title="Ver Todos"
                >
                  <i className="fas fa-globe"></i>
                </Button>
                <Button 
                  variant={showRoutes ? "primary" : "outline-primary"} 
                  size="sm"
                  onClick={() => setShowRoutes(!showRoutes)}
                  title="Mostrar Rutas"
                >
                  <i className="fas fa-route"></i>
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Mapa Principal */}
        <div className="map-main" style={{ 
          flex: 1, 
          position: 'relative',
          background: '#f8f9fa'
        }}>
          <div style={{ height: '100%', width: '100%' }}>
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
            >
              <MapCenter center={mapCenter} zoom={mapZoom} />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {filteredAirports.map((airport, index) => {
                // Determinar el tamaño del marcador basado en el tráfico
                const airportTraffic = routes.filter(r => 
                  r.from === airport.code || r.to === airport.code
                ).length
                
                const markerSize = Math.min(airportTraffic / 10 + 1, 3)
                
                return (
                  <Marker
                    key={index}
                    position={[airport.lat, airport.lng]}
                    eventHandlers={{
                      click: () => handleAirportSelect(airport)
                    }}
                  >
                    <Popup>
                      <div style={{ minWidth: '180px' }}>
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-plane-departure text-primary me-2"></i>
                          <h6 className="mb-0"><strong>{airport.code}</strong></h6>
                        </div>
                        <p className="mb-2"><strong>{airport.city}</strong></p>
                        <div className="row text-center mb-2">
                          <div className="col-6">
                            <div className="bg-light rounded p-1">
                              <small className="text-muted">Rutas</small>
                              <br />
                              <strong>{airportTraffic}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="bg-light rounded p-1">
                              <small className="text-muted">Tráfico</small>
                              <br />
                              <strong>{markerSize > 2 ? 'Alto' : markerSize > 1.5 ? 'Medio' : 'Bajo'}</strong>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="primary" 
                          size="sm"
                          className="w-100"
                          onClick={() => handleAirportSelect(airport)}
                        >
                          <i className="fas fa-crosshairs me-1"></i> Centrar
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
              
              {/* Renderizar ruta óptima calculada con colores específicos por algoritmo */}
              {pathResult && pathResult.path && pathResult.path.length > 1 && (
                pathResult.path.slice(0, -1).map((airportCode, index) => {
                  const currentAirport = airports.find(a => a.code === airportCode)
                  const nextAirport = airports.find(a => a.code === pathResult.path[index + 1])
                  
                  if (!currentAirport || !nextAirport) return null
                  
                  // Colores específicos por algoritmo
                  let routeColor, routeWeight, routeOpacity, routeDashArray
                  
                  switch (pathResult.algorithm) {
                    case 'Dijkstra':
                      routeColor = '#e74c3c' // Rojo vibrante
                      routeWeight = 10
                      routeOpacity = 0.95
                      routeDashArray = '20, 10'
                      break
                    case 'Bellman-Ford':
                      routeColor = '#9b59b6' // Púrpura
                      routeWeight = 10
                      routeOpacity = 0.95
                      routeDashArray = '15, 5, 5, 5'
                      break
                    case 'Ford-Fulkerson':
                      routeColor = '#f39c12' // Naranja dorado
                      routeWeight = 10
                      routeOpacity = 0.95
                      routeDashArray = '25, 5'
                      break
                    default:
                      routeColor = '#3498db'
                      routeWeight = 8
                      routeOpacity = 0.9
                      routeDashArray = '15, 10'
                  }
                  
                  return (
                    <Polyline
                      key={`optimal-${index}`}
                      positions={[
                        [currentAirport.lat, currentAirport.lng],
                        [nextAirport.lat, nextAirport.lng]
                      ]}
                      color={routeColor}
                      weight={routeWeight}
                      opacity={routeOpacity}
                      dashArray={routeDashArray}
                    >
                      <Popup>
                        <div style={{ minWidth: '220px' }}>
                          <div className="d-flex align-items-center mb-2">
                            <div 
                              className="rounded-circle me-2" 
                              style={{ 
                                width: '12px', 
                                height: '12px', 
                                backgroundColor: routeColor 
                              }}
                            ></div>
                            <h6 className="mb-0"><strong>Ruta Óptima ({pathResult.algorithm})</strong></h6>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <small className="text-muted">Desde:</small>
                              <p className="mb-1 small">{currentAirport.city}</p>
                            </div>
                            <div className="col-6">
                              <small className="text-muted">Hacia:</small>
                              <p className="mb-1 small">{nextAirport.city}</p>
                            </div>
                          </div>
                          <hr className="my-2" />
                          <div className="text-center">
                            <div className="bg-light rounded p-2">
                              <small className="text-muted">Distancia Total:</small>
                              <br />
                              <strong className="h6 mb-0">{pathResult.distance?.toFixed(2)} km</strong>
                            </div>
                          </div>
                          {pathResult.maxFlow && (
                            <div className="text-center mt-2">
                              <div className="bg-warning text-white rounded p-1">
                                <small><strong>Flujo Máximo: {pathResult.maxFlow}</strong></small>
                              </div>
                            </div>
                          )}
                        </div>
                      </Popup>
                    </Polyline>
                  )
                })
              )}

              {/* Renderizar rutas aéreas con efectos profesionales */}
              {getFilteredRoutes().map((route, index) => {
                // Calcular distancia real para determinar el estilo
                const distance = Math.sqrt(
                  Math.pow(route.toAirport.lat - route.fromAirport.lat, 2) + 
                  Math.pow(route.toAirport.lng - route.fromAirport.lng, 2)
                ) * 111 // Aproximación de km
                
                // Determinar estilo basado en distancia y frecuencia
                let routeStyle = {
                  color: selectedAirport ? 
                    (route.from === selectedAirport.code ? '#e74c3c' : '#27ae60') : 
                    '#3498db',
                  weight: Math.min(route.flights / 3 + 1, 6),
                  opacity: selectedAirport ? 0.9 : 0.6,
                  dashArray: distance > 5 ? '10, 5' : undefined, // Líneas punteadas para rutas largas
                  lineCap: 'round',
                  lineJoin: 'round'
                }
                
                return (
                  <Polyline
                    key={index}
                    positions={[
                      [route.fromAirport.lat, route.fromAirport.lng],
                      [route.toAirport.lat, route.toAirport.lng]
                    ]}
                    color={routeStyle.color}
                    weight={routeStyle.weight}
                    opacity={routeStyle.opacity}
                    dashArray={routeStyle.dashArray}
                    lineCap={routeStyle.lineCap}
                    lineJoin={routeStyle.lineJoin}
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
                              <small><strong>{route.flights}</strong></small>
                              <br />
                              <small>Vuelos</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="bg-success text-white rounded p-1">
                              <small><strong>{route.passengers.toLocaleString()}</strong></small>
                              <br />
                              <small>Pasajeros</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="bg-info text-white rounded p-1">
                              <small><strong>{route.distance}</strong></small>
                              <br />
                              <small>km</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Polyline>
                )
              })}
            </MapContainer>
          </div>
          
          {/* Leyenda de Rutas Mejorada */}
          <div className="route-legend" style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            zIndex: 1000,
            fontSize: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div className="d-flex align-items-center mb-3">
              <i className="fas fa-route text-primary me-2"></i>
              <h6 className="mb-0">Red de Rutas Aéreas</h6>
            </div>
            
            <div className="mb-2">
              <small className="text-muted">TIPOS DE RUTAS:</small>
            </div>
            
            <div className="d-flex align-items-center mb-2">
              <div style={{ 
                width: '25px', 
                height: '4px', 
                background: '#3498db', 
                borderRadius: '2px',
                marginRight: '10px' 
              }}></div>
              <span>Todas las rutas</span>
            </div>
            
            {pathResult && (
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  width: '25px', 
                  height: '4px', 
                  background: pathResult.algorithm === 'Dijkstra' ? '#e74c3c' : 
                             pathResult.algorithm === 'Bellman-Ford' ? '#9b59b6' : '#f39c12',
                  borderRadius: '2px',
                  marginRight: '10px',
                  border: `2px dashed ${pathResult.algorithm === 'Dijkstra' ? '#e74c3c' : 
                             pathResult.algorithm === 'Bellman-Ford' ? '#9b59b6' : '#f39c12'}`
                }}></div>
                <span>Ruta Óptima ({pathResult.algorithm})</span>
              </div>
            )}
            
            {selectedAirport && (
              <>
                <div className="d-flex align-items-center mb-2">
                  <div style={{ 
                    width: '25px', 
                    height: '4px', 
                    background: '#e74c3c', 
                    borderRadius: '2px',
                    marginRight: '10px' 
                  }}></div>
                  <span>Salidas desde {selectedAirport.code}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div style={{ 
                    width: '25px', 
                    height: '4px', 
                    background: '#27ae60', 
                    borderRadius: '2px',
                    marginRight: '10px' 
                  }}></div>
                  <span>Llegadas a {selectedAirport.code}</span>
                </div>
              </>
            )}
            
            <hr className="my-2" />
            
            <div className="mb-2">
              <small className="text-muted">INTENSIDAD:</small>
            </div>
            
            <div className="d-flex align-items-center mb-1">
              <div style={{ 
                width: '15px', 
                height: '2px', 
                background: '#3498db', 
                borderRadius: '1px',
                marginRight: '10px' 
              }}></div>
              <span>Baja frecuencia</span>
            </div>
            
            <div className="d-flex align-items-center mb-1">
              <div style={{ 
                width: '20px', 
                height: '3px', 
                background: '#3498db', 
                borderRadius: '1px',
                marginRight: '10px' 
              }}></div>
              <span>Frecuencia media</span>
            </div>
            
            <div className="d-flex align-items-center mb-2">
              <div style={{ 
                width: '25px', 
                height: '4px', 
                background: '#3498db', 
                borderRadius: '2px',
                marginRight: '10px' 
              }}></div>
              <span>Alta frecuencia</span>
            </div>
            
            <hr className="my-2" />
            
            <div className="mb-2">
              <small className="text-muted">ALGORITMOS DE RUTAS:</small>
            </div>
            
            <div className="d-flex align-items-center mb-1">
              <div style={{ 
                width: '20px', 
                height: '3px', 
                background: '#e74c3c', 
                borderRadius: '1px',
                marginRight: '8px',
                border: '1px dashed #e74c3c'
              }}></div>
              <span>Dijkstra (Distancia)</span>
            </div>
            
            <div className="d-flex align-items-center mb-1">
              <div style={{ 
                width: '20px', 
                height: '3px', 
                background: '#9b59b6', 
                borderRadius: '1px',
                marginRight: '8px',
                border: '1px dashed #9b59b6'
              }}></div>
              <span>Bellman-Ford (Pesos)</span>
            </div>
            
            <div className="d-flex align-items-center mb-2">
              <div style={{ 
                width: '20px', 
                height: '3px', 
                background: '#f39c12', 
                borderRadius: '1px',
                marginRight: '8px',
                border: '1px dashed #f39c12'
              }}></div>
              <span>Ford-Fulkerson (Flujo)</span>
            </div>
            
            <div className="text-center mt-2">
              <small className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                Líneas punteadas = Rutas largas
              </small>
            </div>
          </div>

          {/* Panel de Información del Aeropuerto Seleccionado */}
          {selectedAirport && (
            <div className="airport-info-panel" style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              maxWidth: '320px',
              zIndex: 1000,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-primary text-white rounded-circle p-2 me-3">
                  <i className="fas fa-plane"></i>
                </div>
                <div>
                  <h5 className="mb-0">{selectedAirport.code}</h5>
                  <small className="text-muted">{selectedAirport.city}</small>
                </div>
              </div>
              
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <div className="bg-light rounded p-2 text-center">
                    <div className="text-primary h5 mb-0">
                      {routes.filter(r => r.from === selectedAirport.code || r.to === selectedAirport.code).length}
                    </div>
                    <small className="text-muted">Rutas</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-light rounded p-2 text-center">
                    <div className="text-success h5 mb-0">
                      {routes
                        .filter(r => r.from === selectedAirport.code || r.to === selectedAirport.code)
                        .reduce((sum, r) => sum + r.flights, 0)
                      }
                    </div>
                    <small className="text-muted">Vuelos</small>
                  </div>
                </div>
              </div>
              
              <div className="bg-light rounded p-2 text-center mb-3">
                <div className="text-info h6 mb-0">
                  {routes
                    .filter(r => r.from === selectedAirport.code || r.to === selectedAirport.code)
                    .reduce((sum, r) => sum + r.passengers, 0)
                    .toLocaleString()
                  }
                </div>
                <small className="text-muted">Pasajeros Totales</small>
              </div>
              
              <div className="text-center">
                <small className="text-muted">
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {selectedAirport.lat.toFixed(4)}, {selectedAirport.lng.toFixed(4)}
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AirportMapComponent
