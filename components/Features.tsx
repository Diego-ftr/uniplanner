'use client'

import { motion } from 'framer-motion'
import { Calendar, Brain, Users, BarChart3, Clock, Shield, Zap, Palette } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Calendar,
    title: 'Planificación Inteligente',
    description: 'Organiza tu horario de clases, tareas y exámenes con IA que se adapta a tu ritmo de estudio.',
    color: 'from-blue-500 to-purple-500',
    bgColor: 'bg-blue-50',
    delay: 0.1
  },
  {
    icon: Brain,
    title: 'Seguimiento de Salud Mental',
    description: 'Monitorea tu nivel de estrés y recibe recomendaciones personalizadas para mantener el equilibrio.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    delay: 0.2
  },
  {
    icon: Users,
    title: 'Grupos de Estudio',
    description: 'Conecta con compañeros que tienen horarios similares y forma grupos de estudio efectivos.',
    color: 'from-pink-500 to-orange-500',
    bgColor: 'bg-pink-50',
    delay: 0.3
  },
  {
    icon: BarChart3,
    title: 'Análisis de Rendimiento',
    description: 'Visualiza tu progreso académico con gráficas interactivas y métricas detalladas.',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-50',
    delay: 0.4
  },
  {
    icon: Clock,
    title: 'Recordatorios Inteligentes',
    description: 'Notificaciones personalizadas que se adaptan a tus patrones de estudio y preferencias.',
    color: 'from-yellow-500 to-blue-500',
    bgColor: 'bg-yellow-50',
    delay: 0.5
  },
  {
    icon: Shield,
    title: 'Privacidad Garantizada',
    description: 'Tus datos académicos y personales están protegidos con encriptación de nivel bancario.',
    color: 'from-blue-500 to-purple-500',
    bgColor: 'bg-gray-50',
    delay: 0.6
  }
]

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4"
          >
            <Zap className="h-6 w-6 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Funcionalidades que 
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent"> transforman</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas diseñadas pensando en tu éxito académico y bienestar emocional
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                animate={{
                  rotateX: hoveredIndex === index ? -10 : 0,
                  rotateY: hoveredIndex === index ? 10 : 0,
                  z: hoveredIndex === index ? 50 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  transformStyle: "preserve-3d",
                  transformPerspective: 1000,
                }}
                className="relative h-full"
              >
                <div className={`${feature.bgColor} rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100`}>
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  />
                  
                  {/* Icon Container */}
                  <motion.div
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Floating particles on hover */}
                    {hoveredIndex === index && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: -30,
                              x: (i - 1) * 20
                            }}
                            transition={{ 
                              duration: 1,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                            className={`absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-br ${feature.color} rounded-full`}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 10
                    }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <span className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      Explorar más →
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Palette className="h-5 w-5" />
            <span>Personaliza tu experiencia</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}