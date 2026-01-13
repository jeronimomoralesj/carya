'use client'

import { ArrowLeft, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import logo from "../../public/logo.png"
export default function Team() {
  const team = [
    {
      name: 'Andres Meneses',
      role: 'Fundador',
      image: '',
      bio: 'Ingeniero con pasión por la energía sostenible. Experiencia en startups tecnológicas y visión de transformar la movilidad en Colombia.',
      linkedin: '#',
      email: 'nombre@carya.com.co'
    },
    {
      name: 'Jeronimo Morales',
      role: 'Fundador',
      image: '',
      bio: 'Experta en infraestructura eléctrica y desarrollo de redes. Liderando la arquitectura técnica de Carya.',
      linkedin: '#',
      email: 'cofundador@carya.com.co'
    },
    {
      name: 'Samuel Giraldo',
      role: 'Fundador',
      image: '',
      bio: 'Especialista en logística y expansión. Coordinando la instalación de nuestra red de estaciones.',
      linkedin: '#',
      email: 'operaciones@carya.com.co'
    },
    {
      name: 'Andres Vergel',
      role: 'Fundador',
      image: '',
      bio: 'Construyendo alianzas estratégicas con fabricantes automotrices y partners clave en toda Colombia.',
      linkedin: '#',
      email: 'negocios@carya.com.co'
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={logo}
                height={30}
                alt='logo'
              />
            </Link>

            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Nuestro <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">equipo</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Un grupo de profesionales apasionados por construir el futuro de la energía en Colombia
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, idx) => (
              <div 
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-emerald-500/50 transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col md:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-800 group-hover:border-emerald-500/50 transition-colors">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-emerald-400 mb-4 font-medium">{member.role}</p>
                    <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
                    
                    {/* Social Links */}
                    <div className="flex gap-4">
                      <a 
                        href={member.linkedin}
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                      >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn
                      </a>
                      <a 
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                      >
                        <Mail className="w-5 h-5" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Quieres unirte a nosotros?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Estamos buscando talento excepcional para ayudarnos a construir la infraestructura 
            energética del futuro en Colombia.
          </p>
          <a 
            href="mailto:contact@carya.com.co"
            className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Mail className="w-6 h-6" />
            Envíanos tu CV
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Image 
                src={logo}
                height={30}
                alt='logo'
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