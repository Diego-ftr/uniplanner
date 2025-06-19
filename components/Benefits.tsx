'use client'

import { motion } from 'framer-motion'
import { Check, Zap, Shield, Heart, Clock, TrendingUp, Users, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Clock,
    title: 'Ahorra tiempo valioso',
    description: 'Reduce hasta 3 horas semanales en planificación',
  },
  {
    icon: TrendingUp,
    title: 'Mejora tu rendimiento',
    description: 'Incrementa tu promedio académico hasta un 25%',
  },
  {
    icon: Heart,
    title: 'Cuida tu salud mental',
    description: 'Reduce niveles de estrés y ansiedad académica',
  },
  {
    icon: Users,
    title: 'Conecta con compañeros',
    description: 'Encuentra grupos de estudio compatibles',
  },
  {
    icon: Shield,
    title: 'Seguridad garantizada',
    description: 'Tus datos protegidos con encriptación avanzada',
  },
  {
    icon: Zap,
    title: 'Actualizaciones constantes',
    description: 'Nuevas funciones cada mes basadas en feedback',
  },
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 bg-white">
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
            className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4"
          >
            <Sparkles className="h-6 w-6 text-green-600" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Beneficios que 
            <span className="bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent"> marcan la diferencia</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo UniPlanner transforma tu experiencia universitaria
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon and Check */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl shadow-lg"
                  >
                    <benefit.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-2 bg-green-100 rounded-full"
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 relative z-10">
                  {benefit.description}
                </p>

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient 3s ease infinite',
                    padding: '2px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            ¿Listo para transformar tu vida universitaria?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Zap className="h-5 w-5" />
            <span>Comienza gratis hoy</span>
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}