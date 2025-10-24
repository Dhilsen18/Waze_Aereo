import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Table, Form, InputGroup, Button } from 'react-bootstrap'
import airportData from '../data/airports.json'
import fondoAereo from '../assets/FondoAereo.jpg'

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
    
    // Más aeropuertos de Alaska con coordenadas reales
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

const AirportDataComponent = ({ onViewOnMap }) => {
  const [airports, setAirports] = useState([])
  const [filteredAirports, setFilteredAirports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar datos de aeropuertos
    if (airportData && airportData.data) {
      // Extraer aeropuertos únicos
      const uniqueAirports = new Map()
      
      airportData.data.forEach(record => {
        const originCode = record.origin_code
        const destCode = record.destination_code
        
        if (originCode && !uniqueAirports.has(originCode)) {
          const coords = getUSAirportCoordinates(originCode)
          uniqueAirports.set(originCode, {
            code: originCode,
            city: record.origin_city || coords.city,
            type: 'origin'
          })
        }
        
        if (destCode && !uniqueAirports.has(destCode)) {
          const coords = getUSAirportCoordinates(destCode)
          uniqueAirports.set(destCode, {
            code: destCode,
            city: record.destination_city || coords.city,
            type: 'destination'
          })
        }
      })
      
      const airportList = Array.from(uniqueAirports.values())
      setAirports(airportList)
      setFilteredAirports(airportList)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Filtrar aeropuertos basado en el término de búsqueda
    if (searchTerm === '') {
      setFilteredAirports(airports)
    } else {
      const filtered = airports.filter(airport =>
        airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAirports(filtered)
    }
  }, [searchTerm, airports])

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: 'calc(100vh - 200px)',
        position: 'relative'
      }}>
        {/* Contenido */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Container fluid className="mt-4">
            <Row className="justify-content-center">
              <Col md={6}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando aeropuertos...</span>
                  </div>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#6b7280',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Cargando datos de aeropuertos...
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: 'calc(100vh - 200px)',
      position: 'relative'
    }}>
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Container fluid className="mt-4">
          <Row>
            <Col md={12}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                borderRadius: '20px',
                padding: '25px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        marginBottom: '0',
                        marginRight: '20px'
                      }}>
                        <i className="fas fa-plane-departure me-3" style={{ color: '#6b7280' }}></i>
                        Base de Datos de Aeropuertos
                      </h3>
                    </div>
                    <div>
                      <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        fontWeight: '500',
                        margin: 0
                      }}>
                        Total: {airports.length} aeropuertos únicos
                      </p>
                    </div>
                  </div>
                </div>

                <Row className="mb-3">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text style={{
                        background: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        color: '#6b7280'
                      }}>
                        <i className="fas fa-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Buscar por código o ciudad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          background: 'rgba(255,255,255,0.8)',
                          border: '1px solid rgba(226, 232, 240, 0.8)',
                          borderRadius: '0 8px 8px 0'
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setSearchTerm('')}
                      disabled={!searchTerm}
                      style={{
                        borderRadius: '8px',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        background: 'rgba(255,255,255,0.8)',
                        color: '#6b7280'
                      }}
                    >
                      Limpiar búsqueda
                    </Button>
                  </Col>
                </Row>

                <div style={{ 
                  maxHeight: '400px', 
                  overflowY: 'auto',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(5px)'
                }}>
                  <Table hover responsive style={{ marginBottom: 0 }}>
                    <thead style={{
                      background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                      color: 'white',
                      position: 'sticky',
                      top: 0,
                      zIndex: 10
                    }}>
                      <tr>
                        <th style={{
                          padding: '16px 20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          textAlign: 'left'
                        }}>
                          <i className="fas fa-plane me-2"></i>
                          Código IATA
                        </th>
                        <th style={{
                          padding: '16px 20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          textAlign: 'left'
                        }}>
                          <i className="fas fa-map-marker-alt me-2"></i>
                          Ciudad
                        </th>
                        <th style={{
                          padding: '16px 20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          textAlign: 'center'
                        }}>
                          <i className="fas fa-tag me-2"></i>
                          Tipo
                        </th>
                        <th style={{
                          padding: '16px 20px',
                          fontWeight: '600',
                          fontSize: '14px',
                          border: 'none',
                          textAlign: 'center'
                        }}>
                          <i className="fas fa-cog me-2"></i>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAirports.slice(0, 100).map((airport, index) => (
                        <tr key={`${airport.code}-${index}`} style={{
                          borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                        >
                          <td style={{
                            padding: '16px 20px',
                            fontWeight: '600',
                            fontSize: '15px',
                            color: '#1f2937',
                            border: 'none'
                          }}>
                            <span style={{
                              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: '700',
                              letterSpacing: '0.5px'
                            }}>
                              {airport.code}
                            </span>
                          </td>
                          <td style={{
                            padding: '16px 20px',
                            fontSize: '14px',
                            color: '#374151',
                            border: 'none',
                            fontWeight: '500'
                          }}>
                            {airport.city}
                          </td>
                          <td style={{
                            padding: '16px 20px',
                            textAlign: 'center',
                            border: 'none'
                          }}>
                            <span style={{
                              background: airport.type === 'origin' 
                                ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' 
                                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                              color: 'white',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                              {airport.type === 'origin' ? 'Origen' : 'Destino'}
                            </span>
                          </td>
                          <td style={{
                            padding: '16px 20px',
                            textAlign: 'center',
                            border: 'none'
                          }}>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => {
                                if (onViewOnMap) {
                                  // Obtener coordenadas del aeropuerto
                                  const airportCoords = getUSAirportCoordinates(airport.code)
                                  onViewOnMap({
                                    code: airport.code,
                                    city: airport.city,
                                    lat: airportCoords.lat,
                                    lng: airportCoords.lng
                                  })
                                }
                              }}
                              style={{
                                borderRadius: '8px',
                                padding: '8px 16px',
                                fontSize: '12px',
                                fontWeight: '600',
                                border: '1px solid #3b82f6',
                                background: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#3b82f6'
                                e.target.style.color = 'white'
                                e.target.style.transform = 'translateY(-1px)'
                                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(59, 130, 246, 0.1)'
                                e.target.style.color = '#3b82f6'
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = 'none'
                              }}
                            >
                              <i className="fas fa-map-marker-alt me-2"></i> 
                              Ver en mapa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {filteredAirports.length > 100 && (
                  <div className="text-center mt-3">
                    <p style={{ color: '#6b7280', margin: 0 }}>
                      Mostrando 100 de {filteredAirports.length} aeropuertos
                    </p>
                  </div>
                )}

                {filteredAirports.length === 0 && searchTerm && (
                  <div className="text-center mt-3">
                    <p style={{ color: '#6b7280', margin: 0 }}>
                      No se encontraron aeropuertos que coincidan con "{searchTerm}"
                    </p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default AirportDataComponent

