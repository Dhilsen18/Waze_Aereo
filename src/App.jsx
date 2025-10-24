import { useState, useEffect } from 'react'
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap'
import AirportDataComponent from './components/AirportDataComponent'
import RoutePlannerComponent from './components/RoutePlannerComponent'
import RoutesComponent from './components/RoutesComponent'
import HomePage from './components/HomePage'
import logo from './assets/LogoWase.svg'
import fondoAereo from './assets/FondoAereo.jpg'
import './App.css'

function App() {
  const [airportData, setAirportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('home')
  const [savedRoutes, setSavedRoutes] = useState([])
  const [selectedAirportForMap, setSelectedAirportForMap] = useState(null)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    
    // Cargar rutas guardadas desde localStorage
    const savedRoutesFromStorage = localStorage.getItem('wazeAereoRoutes')
    if (savedRoutesFromStorage) {
      setSavedRoutes(JSON.parse(savedRoutesFromStorage))
    }
  }, [])

  const handleRouteSaved = (route) => {
    const newRoute = {
      ...route,
      timestamp: Date.now(),
      id: Date.now()
    }
    const updatedRoutes = [...savedRoutes, newRoute]
    setSavedRoutes(updatedRoutes)
    localStorage.setItem('wazeAereoRoutes', JSON.stringify(updatedRoutes))
  }

  const handleClearRoutes = () => {
    setSavedRoutes([])
    localStorage.removeItem('wazeAereoRoutes')
  }

  const handleViewOnMap = (airport) => {
    setSelectedAirportForMap(airport)
    setCurrentView('map')
  }

  const renderContent = () => {
    switch (currentView) {
      case 'airports':
        return <AirportDataComponent onViewOnMap={handleViewOnMap} />
      case 'map':
        return <RoutePlannerComponent onRouteSaved={handleRouteSaved} selectedAirport={selectedAirportForMap} />
        case 'routes':
          return <RoutesComponent savedRoutes={savedRoutes} onClearRoutes={handleClearRoutes} />
      default:
        return <HomePage setCurrentView={setCurrentView} />
    }
  }


  return (
      <div className="App">
        <Navbar 
          bg={currentView === 'map' ? 'transparent' : 'dark'} 
          variant="dark" 
          expand="lg"
          className={currentView === 'map' ? 'navbar-map-mode' : 'navbar-professional'}
          style={currentView === 'map' ? { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1003 } : {
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '12px 0'
          }}
        >
          <Container fluid>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              width: '100%',
              position: 'relative'
            }}>
              {/* Logo y Brand a la Izquierda */}
              <Navbar.Brand 
                href="#home" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '1.9rem',
                  fontWeight: '800',
                  textDecoration: 'none',
                  color: 'white',
                  marginLeft: '24px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.02)'
                  e.target.style.textShadow = '0 4px 12px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)'
                  e.target.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <img 
                  src={logo} 
                  alt="Wase Aéreo Logo" 
                  style={{
                    height: '48px',
                    width: 'auto',
                    marginRight: '16px',
                    filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    transition: 'all 0.3s ease'
                  }}
                />
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Wase Aéreo
                </span>
              </Navbar.Brand>
              
              {/* Menú de Navegación Centrado */}
              <Navbar.Collapse 
                id="basic-navbar-nav" 
                style={{ 
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Nav className="mx-auto">
                  <Nav.Link 
                    onClick={() => setCurrentView('home')}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: currentView === 'home' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)' 
                        : 'transparent',
                      color: currentView === 'home' ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      border: currentView === 'home' 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid transparent',
                      boxShadow: currentView === 'home' 
                        ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                        : 'none',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      if (currentView !== 'home') {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                        e.target.style.color = 'white'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.2)'
                      } else {
                        e.target.style.transform = 'translateY(-1px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentView !== 'home') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'transparent'
                        e.target.style.color = 'rgba(255, 255, 255, 0.9)'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      } else {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Inicio
                  </Nav.Link>
                  <Nav.Link 
                    onClick={() => setCurrentView('map')}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: currentView === 'map' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)' 
                        : 'transparent',
                      color: currentView === 'map' ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      border: currentView === 'map' 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid transparent',
                      boxShadow: currentView === 'map' 
                        ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                        : 'none',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      if (currentView !== 'map') {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                        e.target.style.color = 'white'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.2)'
                      } else {
                        e.target.style.transform = 'translateY(-1px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentView !== 'map') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'transparent'
                        e.target.style.color = 'rgba(255, 255, 255, 0.9)'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      } else {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Planificador
                  </Nav.Link>
                  <Nav.Link 
                    onClick={() => setCurrentView('routes')}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: currentView === 'routes' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)' 
                        : 'transparent',
                      color: currentView === 'routes' ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      border: currentView === 'routes' 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid transparent',
                      boxShadow: currentView === 'routes' 
                        ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                        : 'none',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      if (currentView !== 'routes') {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                        e.target.style.color = 'white'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.2)'
                      } else {
                        e.target.style.transform = 'translateY(-1px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentView !== 'routes') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'transparent'
                        e.target.style.color = 'rgba(255, 255, 255, 0.9)'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      } else {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Rutas
                  </Nav.Link>
                  <Nav.Link 
                    onClick={() => setCurrentView('airports')}
                    style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: currentView === 'airports' 
                        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)' 
                        : 'transparent',
                      color: currentView === 'airports' ? 'white' : 'rgba(255, 255, 255, 0.9)',
                      border: currentView === 'airports' 
                        ? '1px solid rgba(59, 130, 246, 0.3)' 
                        : '1px solid transparent',
                      boxShadow: currentView === 'airports' 
                        ? '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                        : 'none',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => {
                      if (currentView !== 'airports') {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                        e.target.style.color = 'white'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.2)'
                      } else {
                        e.target.style.transform = 'translateY(-1px)'
                        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentView !== 'airports') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.borderColor = 'transparent'
                        e.target.style.color = 'rgba(255, 255, 255, 0.9)'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      } else {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Aeropuertos
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
              
              {/* Toggle Button */}
              <Navbar.Toggle 
                aria-controls="basic-navbar-nav" 
                style={{
                  position: 'absolute',
                  right: '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.target.style.transform = 'translateY(-50%) scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.target.style.transform = 'translateY(-50%) scale(1)'
                }}
              />
      </div>
          </Container>
        </Navbar>

      {renderContent()}

        {currentView !== 'map' && (
          <footer style={{
            background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
            color: 'white',
            padding: '25px 0',
            marginTop: 'auto',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
            position: 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000
          }}>
            <Container>
              <div className="text-center">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '10px'
                }}>
                  <img 
                    src={logo} 
                    alt="Wase Aéreo Logo" 
                    style={{
                      height: '30px',
                      width: 'auto',
                      marginRight: '12px',
                      filter: 'brightness(0) invert(1)'
                    }}
                  />
                      <h5 style={{
                        margin: 0,
                        fontWeight: '600',
                        fontSize: '1.2rem'
                      }}>
                        Wase Aéreo
                      </h5>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  fontWeight: '400'
                }}>
                  Sistema de Navegación Aérea con <strong>1,818+</strong> aeropuertos únicos
                </p>
              </div>
            </Container>
          </footer>
        )}
      </div>
  )
}

export default App