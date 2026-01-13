import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carya - Red de Carga Eléctrica en Colombia',
  description: 'La red de carga rápida más avanzada de Colombia. Conectando ciudades, impulsando el cambio hacia la movilidad eléctrica.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}