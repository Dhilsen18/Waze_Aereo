import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Table, Modal } from 'react-bootstrap'
import fondoAereo from '../assets/FondoAereo.jpg'

const RoutesComponent = ({ savedRoutes, onClearRoutes }) => {
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Cargar rutas guardadas desde localStorage
    const savedRoutesFromStorage = localStorage.getItem('wazeAereoRoutes')
    if (savedRoutesFromStorage) {
      setRoutes(JSON.parse(savedRoutesFromStorage))
    }
  }, [])

  useEffect(() => {
    // Actualizar cuando cambien las rutas guardadas
    if (savedRoutes && savedRoutes.length > 0) {
      setRoutes(savedRoutes)
    }
  }, [savedRoutes])

  const clearAllRoutes = () => {
    setRoutes([])
    localStorage.removeItem('wazeAereoRoutes')
    if (onClearRoutes) {
      onClearRoutes()
    }
  }

  const showRouteDetails = (route) => {
    setSelectedRoute(route)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedRoute(null)
  }

  const getAlgorithmColor = (algorithm) => {
    switch (algorithm) {
      case 'Dijkstra':
        return 'primary'
      case 'Bellman-Ford':
        return 'warning'
      case 'Ford-Fulkerson':
        return 'success'
      default:
        return 'secondary'
    }
  }

  const getAlgorithmIcon = (algorithm) => {
    switch (algorithm) {
      case 'Dijkstra':
        return 'fas fa-clock'
      case 'Bellman-Ford':
        return 'fas fa-tags'
      case 'Ford-Fulkerson':
        return 'fas fa-users'
      default:
        return 'fas fa-route'
    }
  }

  const formatTime = (timeString) => {
    // Si es un string como "3h 37.47439861782897m", extraer solo las horas
    if (typeof timeString === 'string' && timeString.includes('h')) {
      const hoursMatch = timeString.match(/(\d+)h/)
      if (hoursMatch) {
        const hours = parseInt(hoursMatch[1])
        return `${hours}h`
      }
    }
    
    // Si es un número (minutos), convertir a horas redondeadas
    if (typeof timeString === 'number') {
      const hours = Math.round(timeString / 60)
      if (hours > 0) {
        return `${hours}h`
      }
      return `${Math.round(timeString)}m`
    }
    
    // Fallback
    return timeString || '0h'
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div style={{
      backgroundImage: `url(${fondoAereo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: 'calc(100vh - 200px)',
      position: 'relative'
    }}>
      {/* Overlay transparente */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.75)',
        zIndex: 1
      }}></div>
      
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Container fluid className="mt-4">
          <Row className="justify-content-center">
            <Col md={10}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                backdropFilter: 'blur(10px)'
              }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '5px'
                    }}>
                      <i className="fas fa-route me-3" style={{ color: '#6b7280' }}></i>
                      Rutas Planificadas
                    </h3>
                    <p style={{
                      fontSize: '1rem',
                      color: '#6b7280',
                      fontWeight: '500',
                      margin: 0
                    }}>
                      Historial de rutas calculadas con algoritmos de optimización
                    </p>
                  </div>
                  {routes.length > 0 && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={clearAllRoutes}
                      style={{
                        borderRadius: '10px',
                        padding: '8px 16px',
                        fontWeight: '600',
                        fontSize: '13px',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#dc2626',
                        background: 'rgba(254, 226, 226, 0.8)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#dc2626'
                        e.target.style.color = 'white'
                        e.target.style.borderColor = '#dc2626'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(254, 226, 226, 0.8)'
                        e.target.style.color = '#dc2626'
                        e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      <i className="fas fa-trash me-2"></i>
                      Limpiar Todo
                    </Button>
                  )}
                </div>

                {/* Stats */}
                <Row className="mb-4">
                  <Col md={3}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
                      borderRadius: '15px',
                      padding: '20px',
                      textAlign: 'center',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                      <div style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '8px' }}>
                        <i className="fas fa-route"></i>
                      </div>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                        {routes.length}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                        Rutas Totales
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                      borderRadius: '15px',
                      padding: '20px',
                      textAlign: 'center',
                      border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      <div style={{ fontSize: '2rem', color: '#10b981', marginBottom: '8px' }}>
                        <i className="fas fa-clock"></i>
                      </div>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                        {routes.length > 0 ? Math.round(routes.reduce((acc, route) => acc + route.totalTime, 0) / routes.length) : 0}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                        Tiempo Promedio (min)
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
                      borderRadius: '15px',
                      padding: '20px',
                      textAlign: 'center',
                      border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}>
                      <div style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '8px' }}>
                        <i className="fas fa-exchange-alt"></i>
                      </div>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                        {routes.length > 0 ? Math.round(routes.reduce((acc, route) => acc + route.connections, 0) / routes.length) : 0}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                        Conexiones Promedio
                      </p>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                      borderRadius: '15px',
                      padding: '20px',
                      textAlign: 'center',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '8px' }}>
                        <i className="fas fa-brain"></i>
                      </div>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                        {new Set(routes.map(route => route.algorithm)).size}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                        Algoritmos Usados
                      </p>
                    </div>
                  </Col>
                </Row>

                {/* Routes List */}
                {routes.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)',
                    borderRadius: '20px',
                    border: '2px dashed rgba(156, 163, 175, 0.3)'
                  }}>
                    <div style={{ fontSize: '4rem', color: '#9ca3af', marginBottom: '20px' }}>
                      <i className="fas fa-route"></i>
                    </div>
                    <h4 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#6b7280',
                      marginBottom: '10px'
                    }}>
                      No hay rutas planificadas
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#9ca3af',
                      margin: 0
                    }}>
                      Ve al Planificador para calcular tu primera ruta optimizada
                    </p>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '16px',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                    overflow: 'hidden'
                  }}>
                    <Table hover responsive style={{ marginBottom: 0 }}>
                      <thead style={{
                        background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
                        color: 'white'
                      }}>
                        <tr>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-route me-2"></i>
                            Ruta
                          </th>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-brain me-2"></i>
                            Algoritmo
                          </th>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-clock me-2"></i>
                            Tiempo
                          </th>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-exchange-alt me-2"></i>
                            Conexiones
                          </th>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-calendar me-2"></i>
                            Fecha
                          </th>
                          <th style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px', border: 'none' }}>
                            <i className="fas fa-cog me-2"></i>
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.slice().reverse().map((route, index) => (
                          <tr key={index} style={{
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
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <div style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '700',
                                letterSpacing: '0.5px',
                                display: 'inline-block'
                              }}>
                                {route.path.join(' → ')}
                              </div>
                            </td>
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <Badge 
                                bg={getAlgorithmColor(route.algorithm)}
                                style={{
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  padding: '8px 12px',
                                  borderRadius: '8px'
                                }}
                              >
                                <i className={`${getAlgorithmIcon(route.algorithm)} me-2`}></i>
                                {route.algorithm}
                              </Badge>
                            </td>
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1f2937'
                              }}>
                                {formatTime(route.totalTime)}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <span style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1f2937'
                              }}>
                                {route.connections}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <span style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                fontWeight: '500'
                              }}>
                                {formatDate(route.timestamp)}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', border: 'none' }}>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => showRouteDetails(route)}
                                style={{
                                  borderRadius: '8px',
                                  padding: '6px 12px',
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
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.background = 'rgba(59, 130, 246, 0.1)'
                                  e.target.style.color = '#3b82f6'
                                  e.target.style.transform = 'translateY(0)'
                                }}
                              >
                                <i className="fas fa-eye me-2"></i>
                                Ver Detalles
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal de Detalles de Ruta */}
      <Modal 
        show={showModal} 
        onHide={closeModal}
        size="lg"
        centered
        style={{ zIndex: 1050 }}
      >
        <Modal.Header 
          closeButton 
          style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
            color: 'white',
            border: 'none'
          }}
        >
          <Modal.Title style={{ fontWeight: '700', fontSize: '1.3rem' }}>
            <i className="fas fa-route me-3" style={{ color: '#3b82f6' }}></i>
            Detalles de la Ruta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '30px' }}>
          {selectedRoute && (
            <div>
              {/* Información General */}
              <Row className="mb-4">
                <Col md={6}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%)',
                    borderRadius: '15px',
                    padding: '20px',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <h6 style={{ color: '#3b82f6', fontWeight: '600', marginBottom: '10px' }}>
                      <i className="fas fa-plane me-2"></i>
                      Ruta Completa
                    </h6>
                    <div style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '700',
                      letterSpacing: '0.5px'
                    }}>
                      {selectedRoute.path.join(' → ')}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                    borderRadius: '15px',
                    padding: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    <h6 style={{ color: '#10b981', fontWeight: '600', marginBottom: '10px' }}>
                      <i className="fas fa-brain me-2"></i>
                      Algoritmo Utilizado
                    </h6>
                    <Badge 
                      bg={getAlgorithmColor(selectedRoute.algorithm)}
                      style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        padding: '10px 16px',
                        borderRadius: '10px'
                      }}
                    >
                      <i className={`${getAlgorithmIcon(selectedRoute.algorithm)} me-2`}></i>
                      {selectedRoute.algorithm}
                    </Badge>
                  </div>
                </Col>
              </Row>

              {/* Estadísticas Detalladas */}
              <Row className="mb-4">
                <Col md={4}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)',
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}>
                    <div style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '8px' }}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                      {formatTime(selectedRoute.totalTime)}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                      Tiempo Total
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                  }}>
                    <div style={{ fontSize: '2rem', color: '#8b5cf6', marginBottom: '8px' }}>
                      <i className="fas fa-exchange-alt"></i>
                    </div>
                    <h4 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                      {selectedRoute.connections}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                      Conexiones
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                    borderRadius: '15px',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}>
                    <div style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '8px' }}>
                      <i className="fas fa-calendar"></i>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                      {formatDate(selectedRoute.timestamp)}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
                      Fecha de Cálculo
                    </p>
                  </div>
                </Col>
              </Row>

              {/* Información Adicional */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(226, 232, 240, 0.8)'
              }}>
                <h6 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '15px' }}>
                  <i className="fas fa-info-circle me-2" style={{ color: '#3b82f6' }}></i>
                  Información Adicional
                </h6>
                <Row>
                  <Col md={6}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                      <strong style={{ color: '#1f2937' }}>Aeropuerto de Origen:</strong> {selectedRoute.origin || selectedRoute.path[0]}
                    </p>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                      <strong style={{ color: '#1f2937' }}>Aeropuerto de Destino:</strong> {selectedRoute.destination || selectedRoute.path[selectedRoute.path.length - 1]}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                      <strong style={{ color: '#1f2937' }}>Ciudad de Origen:</strong> {selectedRoute.originCity || 'N/A'}
                    </p>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                      <strong style={{ color: '#1f2937' }}>Ciudad de Destino:</strong> {selectedRoute.destinationCity || 'N/A'}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: 'none',
          padding: '20px 30px'
        }}>
          <Button 
            variant="secondary" 
            onClick={closeModal}
            style={{
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-times me-2"></i>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RoutesComponent
