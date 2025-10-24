import { Container, Row, Col, Button } from 'react-bootstrap'
import fondoAereo from '../assets/FondoAereo.jpg'

const HomePage = ({ setCurrentView }) => {
  return (
    <div style={{
      backgroundImage: `url(${fondoAereo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 120px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Overlay con gradiente dinámico */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.9) 50%, rgba(241,245,249,0.85) 100%)',
        zIndex: 1
      }}></div>
      
      {/* Efectos de partículas flotantes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: 'rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Container fluid className="mt-3 mb-5">
          <Row>
            <Col md={12}>
              {/* Título Principal con Efectos */}
              <Row className="justify-content-center mb-3">
                <Col md={10}>
                  <div className="text-center">
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '30px',
                      padding: '25px 45px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                      marginBottom: '15px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Efecto de brillo animado */}
                      <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                        animation: 'shine 3s ease-in-out infinite',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 50%, #1f2937 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        textShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        letterSpacing: '-0.02em'
                      }}>
                        Optimización de Rutas Aéreas
                      </h1>
                      <p style={{
                        fontSize: '1.3rem',
                        color: '#6b7280',
                        fontWeight: '500',
                        margin: 0,
                        opacity: 0.9
                      }}>
                        Sistema inteligente de navegación aérea con algoritmos avanzados
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Stats Section con Efectos Avanzados */}
              <Row className="g-4 mb-3 justify-content-center">
                <Col md={2}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderRadius: '25px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: '#1f2937',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-10px) scale(1.02)'
                    e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '2.5rem', 
                      marginBottom: '15px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                    }}>
                      <i className="fas fa-plane-departure"></i>
                    </div>
                    <h3 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: '800', 
                      marginBottom: '10px',
                      background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      1,818
                    </h3>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#6b7280',
                      lineHeight: '1.3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Aeropuertos Únicos
                    </p>
                  </div>
                </Col>
                
                <Col md={2}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.95) 100%)',
                    borderRadius: '25px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: '#1f2937',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-10px) scale(1.02)'
                    e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '2.5rem', 
                      marginBottom: '15px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
                    }}>
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <h3 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: '800', 
                      marginBottom: '10px',
                      background: 'linear-gradient(135deg, #1f2937 0%, #10b981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      391,509
                    </h3>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#6b7280',
                      lineHeight: '1.3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Registros de Vuelos
                    </p>
                  </div>
                </Col>
                
                <Col md={2}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(239,246,255,0.95) 100%)',
                    borderRadius: '25px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: '#1f2937',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-10px) scale(1.02)'
                    e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '2.5rem', 
                      marginBottom: '15px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                    }}>
                      <i className="fas fa-route"></i>
                    </div>
                    <h3 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: '800', 
                      marginBottom: '10px',
                      background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      26,664
                    </h3>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#6b7280',
                      lineHeight: '1.3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Rutas Únicas
                    </p>
                  </div>
                </Col>
                
                <Col md={2}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,252,232,0.95) 100%)',
                    borderRadius: '25px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: '#1f2937',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-10px) scale(1.02)'
                    e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  >
                    <div style={{ 
                      fontSize: '2.5rem', 
                      marginBottom: '15px',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))'
                    }}>
                      <i className="fas fa-city"></i>
                    </div>
                    <h3 style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: '800', 
                      marginBottom: '10px',
                      background: 'linear-gradient(135deg, #1f2937 0%, #f59e0b 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      1,685
                    </h3>
                    <p style={{ 
                      fontSize: '0.95rem', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#6b7280',
                      lineHeight: '1.3',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Ciudades
                    </p>
                  </div>
                </Col>
              </Row>
              
              {/* Functions Section con Diseño Avanzado */}
              <Row className="justify-content-center mb-3">
                <Col md={8}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                    borderRadius: '30px',
                    padding: '25px',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Efecto de brillo */}
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'shine 4s ease-in-out infinite',
                      pointerEvents: 'none'
                    }}></div>
                    
                    <h3 style={{
                      fontSize: '1.8rem',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      marginBottom: '20px',
                      letterSpacing: '-0.01em'
                    }}>
                      <i className="fas fa-cogs me-3" style={{ 
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}></i>
                      Funcionalidades Disponibles
                    </h3>
                    
                    <Row className="g-3 justify-content-center">
                      <Col md={5}>
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-100" 
                          onClick={() => setCurrentView('map')}
                          style={{
                            borderRadius: '20px',
                            padding: '20px 20px',
                            fontWeight: '600',
                            fontSize: '15px',
                            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(59, 130, 246, 0.85) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            position: 'relative',
                            overflow: 'hidden',
                            backdropFilter: 'blur(10px)',
                            color: 'white'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(59, 130, 246, 0.9) 100%)'
                            e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.background = 'linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(59, 130, 246, 0.85) 100%)'
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <i className="fas fa-route me-3" style={{ fontSize: '18px', opacity: 0.9 }}></i> 
                          Planificar Ruta Aérea
                        </Button>
                      </Col>
                      <Col md={5}>
                        <Button 
                          variant="outline-secondary" 
                          size="lg" 
                          className="w-100" 
                          onClick={() => setCurrentView('airports')}
                          style={{
                            borderRadius: '20px',
                            padding: '20px 20px',
                            fontWeight: '600',
                            fontSize: '15px',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            color: '#1f2937',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(239, 246, 255, 0.8) 100%)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textTransform: 'uppercase',
                            letterSpacing: '0.8px',
                            backdropFilter: 'blur(10px)',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(31, 41, 55, 0.85) 100%)'
                            e.target.style.color = 'white'
                            e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(239, 246, 255, 0.8) 100%)'
                            e.target.style.color = '#1f2937'
                            e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <i className="fas fa-search me-3" style={{ fontSize: '18px', opacity: 0.9 }}></i> 
                          Buscar Aeropuertos
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
      `}</style>
    </div>
  )
}

export default HomePage
