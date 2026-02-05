'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X, Mail, MapPin, Zap, Download, Search, Apple, Smartphone, Car, Clock, Shield, Star } from 'lucide-react'

declare global {
  interface Window {
    L: any;
  }
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navBackground, setNavBackground] = useState(false)
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  const heroImages = [
    'https://images.pexels.com/photos/34800677/pexels-photo-34800677.jpeg',
    'https://images.pexels.com/photos/34800675/pexels-photo-34800675.jpeg',
    'https://images.pexels.com/photos/5391510/pexels-photo-5391510.jpeg'
  ]

  // Ubicaciones reales de Carya en Bogotá
  const chargingStations = [
    { 
      id: 1, 
      lat: 4.6951, 
      lng: -74.0331, 
      name: 'Carya - Hacienda Santa Bárbara',
      address: 'Cra. 7 #115-60, Usaquén',
      valetCharge: true,
      fastCharge: true,
      available: true
    },
    { 
      id: 2, 
      lat: 4.6284, 
      lng: -74.1195, 
      name: 'Carya - Centro Empresarial Conecta 26',
      address: 'Av. Cra. 68 #26-50, Puente Aranda',
      valetCharge: true,
      fastCharge: true,
      available: true
    },
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

  // Initialize Leaflet Map
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !window.L) return

      // Clear any existing map
      if ((mapRef.current as any)._leaflet_id) {
        return
      }

      // Center map between both real locations
      const map = window.L.map(mapRef.current).setView([4.6618, -74.0764], 12)

      // Add OpenStreetMap tiles
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map)

      // Custom icon for charging stations with Valet Charge
      const chargingIcon = window.L.divIcon({
        className: 'custom-charging-icon',
        html: `<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 40px; height: 40px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">⚡</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      })

      // Add markers for each real charging station
      chargingStations.forEach(station => {
        const marker = window.L.marker([station.lat, station.lng], {
          icon: chargingIcon,
          title: station.name
        }).addTo(map)

        marker.bindPopup(`
          <div style="padding: 12px; min-width: 220px;">
            <h3 style="font-weight: 700; color: #111827; margin-bottom: 8px; font-size: 16px;">${station.name}</h3>
            <p style="color: #6b7280; font-size: 13px; margin-bottom: 8px;">${station.address}</p>
            ${station.valetCharge ? '<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; display: inline-block; margin-bottom: 6px;">✓ Valet Charge</div>' : ''}
            ${station.fastCharge ? '<div style="background: #e0e7ff; color: #4f46e5; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; display: inline-block; margin-left: 4px; margin-bottom: 6px;">⚡ Carga Rápida</div>' : ''}
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
              <div style="display: flex; align-items: center; gap: 6px; color: #10b981; font-size: 12px; font-weight: 600;">
                <div style="width: 6px; height: 6px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
                Disponible ahora
              </div>
            </div>
          </div>
        `)
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
                alt="Carya - Carga de Vehículos Eléctricos en Bogotá"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button onClick={() => scrollToSection('valet-charge')} className="text-sm font-medium text-gray-800 hover:text-emerald-500 transition-colors">
                Valet Charge
              </button>
              <button onClick={() => scrollToSection('chargers')} className="text-sm font-medium text-gray-800 hover:text-emerald-500 transition-colors">
                Ubicaciones
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
                Reserva Ahora
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
                <button onClick={() => scrollToSection('valet-charge')} className="text-left text-gray-800 hover:text-emerald-500 transition-colors py-2 text-sm font-medium">
                  Valet Charge
                </button>
                <button onClick={() => scrollToSection('chargers')} className="text-left text-gray-800 hover:text-emerald-500 transition-colors py-2 text-sm font-medium">
                  Ubicaciones
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
                  Reserva Ahora
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
            Carga tu vehículo eléctrico mientras vives tu vida
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 font-light max-w-2xl mx-auto px-4">
            Servicio exclusivo <strong>Valet Charge</strong> en Bogotá: Deja tu carro, nosotros lo cargamos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button 
              onClick={() => scrollToSection('valet-charge')}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white text-gray-900 font-medium text-base sm:text-lg rounded-lg transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              Conoce Valet Charge
            </button>
            <button 
              onClick={() => scrollToSection('chargers')}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium text-base sm:text-lg rounded-lg transition-all border border-white/30"
            >
              Ver ubicaciones
            </button>
          </div>
        </div>

        <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroImage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentHeroImage ? 'bg-white w-8' : 'bg-white/50'}`}
              aria-label={`Ver imagen ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Valet Charge Section */}
      <section id="valet-charge" className="py-16 sm:py-24 md:py-32 relative bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-gray-900">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Valet Charge</span>: La Revolución
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              El primer servicio de carga valet para vehículos eléctricos en Colombia. 
              <strong> Deja tu carro con las llaves, nosotros lo cargamos mientras tú vives tu vida.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Deja tu carro</h3>
              <p className="text-gray-600 leading-relaxed">
                Llega a Hacienda Santa Bárbara o Conecta 26 y entrega tu vehículo con las llaves a nuestro equipo Valet Charge.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Nosotros cargamos</h3>
              <p className="text-gray-600 leading-relaxed">
                Mientras tú trabajas, compras o disfrutas, nuestro equipo se encarga de cargar tu vehículo de forma rápida y segura.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Regresa al 100%</h3>
              <p className="text-gray-600 leading-relaxed">
                Tu carro estará <strong>siempre al 100% de carga</strong> cuando regreses. Garantizado. Listo para rodar.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">¿Por qué elegir Valet Charge?</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Ahorra tiempo valioso</h4>
                  <p className="text-gray-600">No esperes junto a tu carro. Usa ese tiempo para lo que realmente importa.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">100% de carga garantizada</h4>
                  <p className="text-gray-600">Siempre, sin excepciones. Tu carro estará listo cuando lo necesites.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Ubicaciones premium</h4>
                  <p className="text-gray-600">En los mejores centros comerciales y empresariales de Bogotá.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Personal capacitado</h4>
                  <p className="text-gray-600">Equipo profesional especializado en vehículos eléctricos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Chargers Section */}
      <section id="chargers" className="py-16 sm:py-24 md:py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 text-gray-900">
              Nuestras <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">ubicaciones</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-4">
              2 estaciones estratégicas en Bogotá con servicio <strong>Valet Charge</strong>
            </p>
            <p className="text-base text-gray-500">
              Carga rápida disponible 24/7 • Compatible con todas las marcas de vehículos eléctricos
            </p>
          </div>

          {/* Location Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Hacienda Santa Bárbara</h3>
                <div className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Disponible
                </div>
              </div>
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Cra. 7 #115-60, Usaquén, Bogotá
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 border border-emerald-200">
                  ⚡ Valet Charge
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-700 border border-blue-200">
                  ⚡ Carga Rápida
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-700 border border-purple-200">
                  🅿️ Parking
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ubicado en uno de los centros comerciales más exclusivos del norte de Bogotá. 
                Carga mientras disfrutas de restaurantes, tiendas y entretenimiento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-emerald-200 hover:border-emerald-400 transition-all">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Conecta 26</h3>
                <div className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Disponible
                </div>
              </div>
              <p className="text-gray-700 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Av. Cra. 68 #26-50, Puente Aranda, Bogotá
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-emerald-700 border border-emerald-200">
                  ⚡ Valet Charge
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-700 border border-blue-200">
                  ⚡ Carga Rápida
                </span>
                <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-700 border border-purple-200">
                  🅿️ Parking
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ideal para profesionales y empresas. Ubicado en un centro empresarial de fácil acceso. 
                Carga tu vehículo mientras trabajas o realizas tus gestiones.
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="relative w-full h-96 sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Map Overlay Info */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-200/50 z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-semibold text-gray-900">{chargingStations.length} Estaciones Activas</span>
              </div>
              <p className="text-sm text-gray-600">Con servicio Valet Charge en Bogotá</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2</h3>
              <p className="text-gray-600">Estaciones premium</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Car className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Carga garantizada</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Clock className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Disponibilidad total</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
              <Star className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">VIP</h3>
              <p className="text-gray-600">Servicio valet</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/8349487/pexels-photo-8349487.jpeg')`,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 sm:mb-8 max-w-4xl">
            Compatible con todas las marcas
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Tesla, BYD, Nissan Leaf, Chevrolet Bolt, BMW i3, Renault Zoe, Hyundai, Kia y más
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-xl">
            Conectores tipo 1, tipo 2 y CCS disponibles • Carga del 20% al 80% en 30-45 minutos
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
                La app de <span className="text-emerald-400">Carya</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                Reserva tu espacio Valet Charge, encuentra estaciones disponibles, monitorea tu carga en tiempo real 
                y paga sin contacto. Todo desde tu teléfono.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-gray-200">Reserva tu servicio Valet Charge con anticipación</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-gray-200">Monitorea el estado de carga en tiempo real</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <p className="text-gray-200">Pago seguro con tarjeta o billetera digital</p>
                </div>
              </div>
              
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
                  alt="App móvil de Carya para reservar Valet Charge y encontrar estaciones de carga"
                  className="rounded-3xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Important for AI Search Engines */}
      <section className="py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-4xl sm:text-5xl font-semibold mb-12 text-center text-gray-900">
            Preguntas <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">frecuentes</span>
          </h2>
          
          <div className="space-y-6">
            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Dónde puedo cargar mi carro eléctrico en Bogotá?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Carya cuenta con estaciones de carga rápida en dos ubicaciones estratégicas de Bogotá: 
                <strong> Hacienda Santa Bárbara</strong> en Usaquén y <strong>Centro Empresarial Conecta 26</strong> en 
                Puente Aranda. Ambas estaciones ofrecen nuestro exclusivo servicio Valet Charge.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Qué es el servicio Valet Charge?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Valet Charge es nuestro servicio revolucionario donde <strong>dejas tu vehículo eléctrico con las llaves</strong>, 
                nosotros nos encargamos de cargarlo mientras realizas tus actividades, y cuando regreses <strong>tu carro 
                estará 100% cargado</strong> y listo para usar. Es la forma más conveniente de cargar tu vehículo eléctrico en Bogotá.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Cómo cargar un vehículo eléctrico en Bogotá?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Con Carya es muy fácil: 1) Llega a una de nuestras estaciones en Hacienda Santa Bárbara o Conecta 26, 
                2) Deja tu vehículo con nuestro equipo Valet Charge, 3) Ve a trabajar, comprar o realizar tus actividades, 
                4) Regresa y recibe tu carro 100% cargado. También puedes usar nuestras estaciones de autocarga rápida disponibles 24/7.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Qué marcas de carros eléctricos pueden cargar en Carya?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nuestras estaciones son compatibles con <strong>todas las marcas de vehículos eléctricos e híbridos 
                enchufables</strong> incluyendo Tesla, BYD, Nissan Leaf, Chevrolet Bolt, BMW i3, Renault Zoe, Hyundai Ioniq, 
                Kia EV6, y muchos más. Contamos con conectores tipo 1, tipo 2 y CCS.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Cuánto tiempo tarda la carga rápida?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nuestros cargadores rápidos pueden cargar la mayoría de vehículos eléctricos del 20% al 80% en 
                aproximadamente <strong>30-45 minutos</strong>. Con el servicio Valet Charge, no tienes que esperar: 
                deja tu carro y regresa cuando estés listo, estará al 100% de carga.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer">
                ¿Cuál es el horario de atención?
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nuestras estaciones de carga rápida están disponibles <strong>24 horas al día, 7 días a la semana</strong>. 
                El servicio Valet Charge opera en horarios de atención del centro comercial Hacienda Santa Bárbara y del 
                Centro Empresarial Conecta 26.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 md:py-32 relative bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 sm:mb-8 text-gray-900">
            ¿Listo para <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">cargar diferente?</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-12 leading-relaxed">
            Únete a la revolución de la movilidad eléctrica en Bogotá. 
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
              Respuesta en menos de 24 horas • Servicio en español e inglés
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 py-8 sm:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' stroke='%2310b981' stroke-width='3' fill='none'/%3E%3Cpath d='M30 50 L45 35 L60 50 L45 65 Z' fill='%2310b981'/%3E%3Ccircle cx='70' cy='50' r='8' fill='%2310b981'/%3E%3C/svg%3E"
                alt="Carya - Red de Carga Eléctrica Bogotá"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </div>
            
            <div className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
              © 2026 Carya. La red de carga para vehículos eléctricos más innovadora de Colombia.
            </div>
            
            <a 
              href="mailto:contact@carya.com.co"
              className="text-gray-600 hover:text-emerald-500 transition-colors text-xs sm:text-sm"
            >
              contact@carya.com.co
            </a>
          </div>
          
          {/* Additional Footer Info for SEO */}
          <div className="text-center text-xs text-gray-500 pt-6 border-t border-gray-200">
            <p className="mb-2">
              <strong>Ubicaciones:</strong> Hacienda Santa Bárbara (Usaquén) • Centro Empresarial Conecta 26 (Puente Aranda)
            </p>
            <p>
              Carga rápida para Tesla, BYD, Nissan, Chevrolet, BMW, Renault, Hyundai, Kia y todas las marcas de vehículos eléctricos
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}