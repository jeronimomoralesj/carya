'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Mail, MapPin, Zap, Download, Search, Apple, Smartphone } from 'lucide-react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navBackground, setNavBackground] = useState(false)
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const mapRef = useRef(null)

  const heroImages = [
    'https://images.pexels.com/photos/34800677/pexels-photo-34800677.jpeg',
    'https://images.pexels.com/photos/34800675/pexels-photo-34800675.jpeg',
    'https://images.pexels.com/photos/8349487/pexels-photo-8349487.jpeg'
  ]

  const chargingStations = [
    { id: 1, lat: 4.7110, lng: -74.0721, name: 'Estación Chapinero' },
    { id: 2, lat: 4.6764, lng: -74.0538, name: 'Estación Zona T' },
    { id: 3, lat: 4.6533, lng: -74.0836, name: 'Estación Modelia' },
    { id: 4, lat: 4.6097, lng: -74.0817, name: 'Estación Aeropuerto' },
    { id: 5, lat: 4.7305, lng: -74.0393, name: 'Estación Usaquén' },
    { id: 6, lat: 4.6951, lng: -74.0489, name: 'Estación Parque 93' },
    { id: 7, lat: 4.6482, lng: -74.1029, name: 'Estación Fontibón' },
    { id: 8, lat: 4.6333, lng: -74.0667, name: 'Estación Centro' },
    { id: 9, lat: 4.7167, lng: -74.0833, name: 'Estación Salitre' },
    { id: 10, lat: 4.6889, lng: -74.0556, name: 'Estación Unicentro' },
  ]

  // Preload images
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setNavBackground(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Initialize Google Map
  // Initialize Leaflet Map
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.L) return

      // Clear any existing map
      if (mapRef.current._leaflet_id) {
        return
      }

      const map = window.L.map(mapRef.current).setView([4.6533, -74.0836], 12)

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map)

      // Custom icon for charging stations
      const chargingIcon = window.L.divIcon({
        className: 'custom-charging-icon',
        html: '<div style="background-color: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })

      // Add markers for each charging station
      chargingStations.forEach(station => {
        const marker = window.L.marker([station.lat, station.lng], {
          icon: chargingIcon,
          title: station.name
        }).addTo(map)

        marker.bindPopup(`<div style="padding: 8px; font-weight: 600; color: #111827;">${station.name}</div>`)
      })
    }

    // Load Leaflet CSS and JS
    if (!window.L) {
      // Add Leaflet CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
      document.head.appendChild(link)

      // Add Leaflet JS
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
      script.async = true
      script.onload = initMap
      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Glassmorphism Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBackground ? 'bg-white/70 backdrop-blur-2xl shadow-lg shadow-gray-200/50 border-b border-white/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%2310b981' stroke-width='3' fill='none'/%3E%3Cpath d='M30 50 L45 35 L60 50 L45 65 Z' fill='%2310b981'/%3E%3Ccircle cx='70' cy='50' r='8' fill='%2310b981'/%3E%3C/svg%3E"
                alt="Carya Logo"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button onClick={() => scrollToSection('chargers')} className="text-sm font-medium text-gray-800 hover:text-emerald-500 transition-colors">
                Cargadores
              </button>
              <button onClick={() => scrollToSection('app')} className="text-sm font-medium text-gray-800 hover:text-emerald-500 transition-colors">
                App
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-gray-800 hover:text-emerald-500 transition-colors">
                Contacto
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-medium rounded-full transition-all shadow-lg shadow-emerald-500/30"
              >
                Únete
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl shadow-lg border-t border-gray-200/50 py-4 px-4">
              <div className="flex flex-col gap-3">
                <button onClick={() => scrollToSection('chargers')} className="text-left text-gray-800 hover:text-emerald-500 transition-colors py-2 text-sm font-medium">
                  Cargadores
                </button>
                <button onClick={() => scrollToSection('app')} className="text-left text-gray-800 hover:text-emerald-500 transition-colors py-2 text-sm font-medium">
                  App
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-800 hover:text-emerald-500 transition-colors py-2 text-sm font-medium">
                  Contacto
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-full transition-all text-center mt-2 shadow-lg"
                >
                  Únete
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${idx === currentHeroImage ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url('${img}')`,
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-16 sm:mt-0">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold mb-4 sm:mb-6 tracking-tight leading-none text-white">
            CARYA
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 font-light">
            La red de carga eléctrica más grande de Colombia
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 font-light max-w-2xl mx-auto px-4">
            Encuentra cargadores rápidos en toda la ciudad
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button 
              onClick={() => scrollToSection('chargers')}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white text-gray-900 font-medium text-base sm:text-lg rounded-lg transition-all shadow-2xl hover:shadow-3xl"
            >
              Buscar cargador
            </button>
            <button 
              onClick={() => scrollToSection('app')}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium text-base sm:text-lg rounded-lg transition-all border border-white/30"
            >
              Descargar app
            </button>
          </div>
        </div>

        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroImage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentHeroImage ? 'bg-white w-8' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Find Chargers Section with Google Maps */}
      <section id="chargers" className="py-16 sm:py-24 md:py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-gray-900">
              Busca un <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">cargador activo</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Encuentra la estación de carga más cercana en tiempo real
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por ubicación o nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-lg bg-white/80 backdrop-blur-sm shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="relative w-full h-96 sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Map Overlay Info */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-200/50 z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold text-gray-900">{chargingStations.length} Cargadores Activos</span>
              </div>
              <p className="text-sm text-gray-600">En Bogotá</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{chargingStations.length}+</h3>
              <p className="text-gray-600">Estaciones activas</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <MapPin className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Zonas cubiertas</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Download className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Disponibilidad</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/5391510/pexels-photo-5391510.jpeg')`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 sm:mb-8 max-w-4xl">
            Carga en minutos, no en horas
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl">
            Nuestra tecnología de última generación te devuelve a la carretera más rápido
          </p>
        </div>
      </section>

      {/* App Download Section */}
      <section id="app" className="py-16 sm:py-24 md:py-32 relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6">
                Descarga la app de <span className="text-emerald-400">Carya</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                Encuentra cargadores, reserva tu espacio, paga sin contacto y monitorea tu carga en tiempo real. 
                Todo desde tu teléfono.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Descarga en</div>
                    <div className="text-sm">App Store</div>
                  </div>
                </button>
                
                <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-xl">
                  <Smartphone className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Descarga en</div>
                    <div className="text-sm">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/33661081/pexels-photo-33661081.jpeg"
                  alt="Carya App"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 relative bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 sm:mb-8 text-gray-900">
            Únete a la <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">revolución eléctrica</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-12 leading-relaxed">
            ¿Eres inversor, socio comercial o quieres instalar una estación? Contáctanos.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:contact@carya.com.co"
              className="group flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-base sm:text-lg rounded-full transition-all w-full sm:w-auto justify-center shadow-xl shadow-emerald-500/30"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              contact@carya.com.co
            </a>
            
            <p className="text-gray-500 text-sm">
              Respuesta en menos de 24 horas
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%2310b981' stroke-width='3' fill='none'/%3E%3Cpath d='M30 50 L45 35 L60 50 L45 65 Z' fill='%2310b981'/%3E%3Ccircle cx='70' cy='50' r='8' fill='%2310b981'/%3E%3C/svg%3E"
                alt="Carya Logo"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            
            <div className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
              © 2026 Carya. La red de carga eléctrica de Colombia.
            </div>
            
            <a 
              href="mailto:contact@carya.com.co"
              className="text-gray-600 hover:text-emerald-500 transition-colors text-xs sm:text-sm"
            >
              contact@carya.com.co
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}