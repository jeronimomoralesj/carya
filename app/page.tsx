'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Mail, MapPin, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import logo from "../public/logo.png"
export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navBackground, setNavBackground] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setNavBackground(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBackground ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Image 
                src={logo}
                height={30}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">
                Nosotros
              </button>
              <button onClick={() => scrollToSection('vision')} className="text-gray-300 hover:text-white transition-colors">
                Visión
              </button>
              <a href="/team" className="text-gray-300 hover:text-white transition-colors">
                Equipo
              </a>
              <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">
                Contacto
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Únete
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/98 backdrop-blur-md border-b border-gray-800 py-6 px-6">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('about')} className="text-left text-gray-300 hover:text-white transition-colors py-2">
                  Nosotros
                </button>
                <button onClick={() => scrollToSection('vision')} className="text-left text-gray-300 hover:text-white transition-colors py-2">
                  Visión
                </button>
                <a href="/team" className="text-left text-gray-300 hover:text-white transition-colors py-2">
                  Equipo
                </a>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-300 hover:text-white transition-colors py-2">
                  Contacto
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all text-center"
                >
                  Únete
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072')`,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        
        {/* Gradient accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight leading-none">
            CARYA
          </h1>
          
          <p className="text-2xl md:text-4xl text-gray-300 mb-6 font-light">
            El futuro de la movilidad eléctrica
          </p>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
            Construyendo la primera red de carga rápida en Colombia
          </p>
          
          <button 
            onClick={() => scrollToSection('contact')}
            className="group px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Contáctanos
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            Sobre <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Carya</span>
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              Somos un equipo apasionado por transformar la movilidad en Colombia. Estamos en las primeras 
              etapas de construcción de la infraestructura que permitirá la adopción masiva de vehículos eléctricos 
              en nuestro país.
            </p>
            
            <p>
              Colombia está en el momento perfecto para liderar la transición energética en América Latina. 
              Con el crecimiento del mercado de vehículos eléctricos, necesitamos infraestructura confiable 
              y accesible. Eso es exactamente lo que estamos construyendo.
            </p>

            <div className="grid md:grid-cols-3 gap-8 pt-12">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                <MapPin className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
                <p className="text-gray-400">Bogotá, Colombia</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                <Clock className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fundación</h3>
                <p className="text-gray-400">2026</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
                <Users className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Misión</h3>
                <p className="text-gray-400">Movilidad sostenible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 relative bg-gradient-to-b from-black via-emerald-950/5 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
            Nuestra <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">visión</span>
          </h2>
          
          <div className="space-y-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Fase 1: Bogotá</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Comenzaremos con la capital, instalando estaciones de carga rápida en ubicaciones estratégicas. 
                Nuestro objetivo es crear una red confiable que permita a los conductores de vehículos eléctricos 
                moverse con confianza por toda la ciudad.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Fase 2: Expansión nacional</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Una vez establecidos en Bogotá, expandiremos a las principales ciudades: Medellín, Cali, 
                Barranquilla y Cartagena. Conectaremos estas ciudades con corredores de carga que harán 
                posible los viajes de larga distancia.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-emerald-400">Fase 3: Red completa</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Nuestro sueño es tener presencia en todo el país, haciendo que la movilidad eléctrica sea 
                tan conveniente como la gasolina. Queremos que cualquier persona en Colombia pueda elegir 
                un vehículo eléctrico sin preocupaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Construyamos el <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">futuro</span> juntos
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            ¿Quieres ser parte de la revolución eléctrica en Colombia? Estamos buscando socios, inversionistas 
            y aliados que compartan nuestra visión.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:contact@carya.com.co"
              className="group flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-6 h-6" />
              contact@carya.com.co
            </a>
            
            <p className="text-gray-400 text-sm">
              Responderemos a tu mensaje en menos de 24 horas
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image 
                src={logo}
                height={40}
              />
            </div>
            
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2026 Carya. Impulsando la movilidad eléctrica en Colombia.
            </div>
            
            <a 
              href="mailto:contact@carya.com.co"
              className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
            >
              contact@carya.com.co
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}