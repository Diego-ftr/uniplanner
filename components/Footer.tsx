'use client'

import { motion } from 'framer-motion'
import { Calendar, Brain, Heart, Github, Linkedin, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  producto: [
    { name: 'Funcionalidades', href: '#features' },
    { name: 'Precios', href: '#' },
    { name: 'Demo', href: '#' },
    { name: 'Actualizaciones', href: '#' },
  ],
  empresa: [
    { name: 'Sobre nosotros', href: '#team' },
    { name: 'Blog', href: '#' },
    { name: 'Carreras', href: '#' },
    { name: 'Prensa', href: '#' },
  ],
  recursos: [
    { name: 'Centro de ayuda', href: '#' },
    { name: 'Guías', href: '#' },
    { name: 'API', href: '#' },
    { name: 'Comunidad', href: '#' },
  ],
  legal: [
    { name: 'Privacidad', href: '#' },
    { name: 'Términos', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'Licencias', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', color: 'hover:text-gray-900' },
  { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
  { icon: Twitter, href: '#', color: 'hover:text-sky-500' },
  { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
  { icon: Youtube, href: '#', color: 'hover:text-red-500' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center mb-16 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
          
          <h3 className="text-3xl font-bold mb-4 relative z-10">
            Mantente actualizado
          </h3>
          <p className="text-xl mb-8 opacity-90 relative z-10">
            Recibe las últimas novedades y consejos para mejorar tu vida universitaria
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="h-5 w-5" />
              <span>Suscribirse</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 mb-4"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Image 
                  src="/mascota.png" 
                  alt="UniPlanner Mascot" 
                  width={40} 
                  height={40}
                  className="rounded-full"
                />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent">
                UniPlanner
              </span>
            </motion.div>
            <p className="text-gray-600 mb-6">
              Tu compañero inteligente para una vida universitaria equilibrada y exitosa.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-gray-600 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <div key={category}>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="font-semibold text-gray-900 mb-4 capitalize"
              >
                {category}
              </motion.h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                © 2025 UniPlanner. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-400 mt-1 opacity-50">
                hecho por Diego ❤️
              </p>
            </div>
            
            {/* Animated Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center space-x-2 text-gray-600"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500" />
              </motion.div>
              <span className="italic">
                "El éxito comienza con la organización"
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}