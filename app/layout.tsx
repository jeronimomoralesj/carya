import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carya - Red de Carga Rápida para Vehículos Eléctricos en Bogotá | Valet Charge',
  description: 'Carya es la red de carga rápida para vehículos eléctricos más innovadora de Bogotá. Con nuestro servicio exclusivo Valet Charge en Hacienda Santa Bárbara y Conecta 26, tu carro estará 100% cargado cuando regreses. Carga garantizada para Tesla, BYD, Nissan Leaf y más.',
  keywords: [
    'carga vehículos eléctricos Bogotá',
    'cargar carro eléctrico Bogotá',
    'estación de carga EV Bogotá',
    'Valet Charge Colombia',
    'carga rápida carros eléctricos',
    'Tesla carga Bogotá',
    'BYD carga Colombia',
    'Hacienda Santa Bárbara carga eléctrica',
    'Conecta 26 carga eléctrica',
    'dónde cargar carro eléctrico Bogotá',
    'cómo cargar vehículo eléctrico',
    'red de carga EV Colombia',
    'estación de carga valet parking',
    'carga eléctrica mientras compras',
    'charging station Bogotá'
  ],
  authors: [{ name: 'Carya Colombia' }],
  creator: 'Carya',
  publisher: 'Carya',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://carya.com.co'),
  alternates: {
    canonical: 'https://carya.com.co',
  },
  openGraph: {
    title: 'Carya - Carga Rápida para Vehículos Eléctricos en Bogotá',
    description: 'Servicio exclusivo Valet Charge: deja tu carro, nosotros lo cargamos. Ubicados en Hacienda Santa Bárbara y Conecta 26. Tu vehículo eléctrico 100% cargado cuando regreses.',
    url: 'https://carya.com.co',
    siteName: 'Carya',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carya - Red de Carga para Vehículos Eléctricos en Bogotá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carya - Carga Rápida EV en Bogotá | Valet Charge',
    description: 'Deja tu carro, nosotros lo cargamos. Servicio Valet Charge en Hacienda Santa Bárbara y Conecta 26.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CO">
      <head>
        {/* Structured Data for Google and AI Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://carya.com.co/#organization',
                  name: 'Carya',
                  url: 'https://carya.com.co',
                  logo: 'https://carya.com.co/logo.png',
                  description: 'La red de carga rápida para vehículos eléctricos más innovadora de Bogotá con servicio exclusivo Valet Charge',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Bogotá',
                    addressRegion: 'Bogotá D.C.',
                    addressCountry: 'CO',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+57-XXX-XXX-XXXX',
                    contactType: 'customer service',
                    email: 'contact@carya.com.co',
                    availableLanguage: ['Spanish'],
                    areaServed: 'CO',
                  },
                  sameAs: [
                    'https://www.facebook.com/caryacolombia',
                    'https://www.instagram.com/caryacolombia',
                    'https://twitter.com/caryacolombia',
                    'https://www.linkedin.com/company/caryacolombia',
                  ],
                },
                {
                  '@type': 'Service',
                  '@id': 'https://carya.com.co/#service',
                  name: 'Valet Charge - Servicio de Carga para Vehículos Eléctricos',
                  description: 'Servicio exclusivo de carga valet para vehículos eléctricos. Deja tu carro con las llaves y regresa a un vehículo 100% cargado.',
                  provider: {
                    '@id': 'https://carya.com.co/#organization',
                  },
                  serviceType: 'Carga de Vehículos Eléctricos',
                  areaServed: {
                    '@type': 'City',
                    name: 'Bogotá',
                  },
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Servicios de Carga EV',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Valet Charge',
                          description: 'Servicio de carga con valet parking incluido',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Carga Rápida',
                          description: 'Estaciones de carga rápida disponibles 24/7',
                        },
                      },
                    ],
                  },
                },
                {
                  '@type': 'AutomotiveBusiness',
                  '@id': 'https://carya.com.co/#hacienda-santa-barbara',
                  name: 'Carya - Hacienda Santa Bárbara',
                  description: 'Estación de carga rápida con servicio Valet Charge en Hacienda Santa Bárbara',
                  image: 'https://carya.com.co/hacienda-santa-barbara.jpg',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Hacienda Santa Bárbara',
                    addressLocality: 'Usaquén',
                    addressRegion: 'Bogotá D.C.',
                    postalCode: '110111',
                    addressCountry: 'CO',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 4.6951,
                    longitude: -74.0331,
                  },
                  url: 'https://carya.com.co',
                  telephone: '+57-XXX-XXX-XXXX',
                  openingHoursSpecification: [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ],
                      opens: '00:00',
                      closes: '23:59',
                    },
                  ],
                  amenityFeature: [
                    {
                      '@type': 'LocationFeatureSpecification',
                      name: 'Valet Charge Service',
                      value: true,
                    },
                    {
                      '@type': 'LocationFeatureSpecification',
                      name: 'Fast Charging',
                      value: true,
                    },
                  ],
                },
                {
                  '@type': 'AutomotiveBusiness',
                  '@id': 'https://carya.com.co/#conecta-26',
                  name: 'Carya - Centro Empresarial Conecta 26',
                  description: 'Estación de carga rápida con servicio Valet Charge en Conecta 26',
                  image: 'https://carya.com.co/conecta-26.jpg',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Centro Empresarial Conecta',
                    addressLocality: 'Puente Aranda',
                    addressRegion: 'Bogotá D.C.',
                    postalCode: '111611',
                    addressCountry: 'CO',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 4.6284,
                    longitude: -74.1195,
                  },
                  url: 'https://carya.com.co',
                  telephone: '+57-XXX-XXX-XXXX',
                  openingHoursSpecification: [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                      ],
                      opens: '00:00',
                      closes: '23:59',
                    },
                  ],
                  amenityFeature: [
                    {
                      '@type': 'LocationFeatureSpecification',
                      name: 'Valet Charge Service',
                      value: true,
                    },
                    {
                      '@type': 'LocationFeatureSpecification',
                      name: 'Fast Charging',
                      value: true,
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: '¿Dónde puedo cargar mi carro eléctrico en Bogotá?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Carya cuenta con estaciones de carga rápida en dos ubicaciones estratégicas de Bogotá: Hacienda Santa Bárbara en Usaquén y Centro Empresarial Conecta 26 en Puente Aranda. Ambas estaciones ofrecen nuestro exclusivo servicio Valet Charge.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: '¿Qué es el servicio Valet Charge?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Valet Charge es nuestro servicio revolucionario donde dejas tu vehículo eléctrico con las llaves, nosotros nos encargamos de cargarlo mientras realizas tus actividades, y cuando regreses tu carro estará 100% cargado y listo para usar. Es la forma más conveniente de cargar tu vehículo eléctrico en Bogotá.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: '¿Cómo cargar un vehículo eléctrico en Bogotá?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Con Carya es muy fácil: 1) Llega a una de nuestras estaciones en Hacienda Santa Bárbara o Conecta 26, 2) Deja tu vehículo con nuestro equipo Valet Charge, 3) Ve a trabajar, comprar o realizar tus actividades, 4) Regresa y recibe tu carro 100% cargado. También puedes usar nuestras estaciones de autocarga rápida disponibles 24/7.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: '¿Qué marcas de carros eléctricos pueden cargar en Carya?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nuestras estaciones son compatibles con todas las marcas de vehículos eléctricos e híbridos enchufables incluyendo Tesla, BYD, Nissan Leaf, Chevrolet Bolt, BMW i3, Renault Zoe, Hyundai Ioniq, Kia EV6, y muchos más. Contamos con conectores tipo 1, tipo 2 y CCS.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: '¿Cuánto tiempo tarda la carga rápida?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Nuestros cargadores rápidos pueden cargar la mayoría de vehículos eléctricos del 20% al 80% en aproximadamente 30-45 minutos. Con el servicio Valet Charge, no tienes que esperar: deja tu carro y regresa cuando estés listo.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
        
        {/* Additional meta tags for AI search engines */}
        <meta name="geo.region" content="CO-DC" />
        <meta name="geo.placename" content="Bogotá" />
        <meta name="geo.position" content="4.6951;-74.0331" />
        <meta name="ICBM" content="4.6951, -74.0331" />
        
        {/* Language and locale */}
        <link rel="alternate" hrefLang="es-CO" href="https://carya.com.co" />
        <link rel="alternate" hrefLang="es" href="https://carya.com.co" />
        <link rel="alternate" hrefLang="x-default" href="https://carya.com.co" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}