'use client'

import { motion } from 'framer-motion'
import { UserPlus, Calendar, BarChart3, Rocket } from 'lucide-react'
import { useState } from 'react'

const steps = [
  {
    icon: UserPlus,
    title: 'Crea tu cuenta',
    description: 'Regístrate en menos de 30 segundos con tu correo universitario',
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Calendar,
    title: 'Configura tu horario',
    description: 'Importa tu calendario académico o créalo manualmente',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Personaliza tu experiencia',
    description: 'Ajusta tus preferencias de estudio y objetivos personales',
    color: 'from-pink-500 to-yellow-500',
  },
  {
    icon: Rocket,
    title: '¡Empieza a triunfar!',
    description: 'Disfruta de una vida universitaria más organizada y equilibrada',
    color: 'from-yellow-500 to-orange-500',
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comienza tu viaje hacia el éxito académico en solo 4 simples pasos
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 to-orange-500"
              initial={{ height: 0 }}
              animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                onViewportEnter={() => setActiveStep(index)}
                className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}`}
              >
                <div className={`flex items-center ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}
                  >
                    {/* Step Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md relative overflow-hidden group">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      {/* Step Number */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                        className={`absolute -top-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                      >
                        {index + 1}
                      </motion.div>

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex p-4 bg-gradient-to-br ${step.color} rounded-xl shadow-lg mb-4`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>

                    {/* Center Circle for Timeline */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-gray-200 rounded-full hidden lg:block z-10"
                      animate={{
                        borderColor: activeStep >= index ? '#3B82F6' : '#E5E7EB',
                        backgroundColor: activeStep >= index ? '#3B82F6' : '#FFFFFF',
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                  backgroundSize: '50px 50px',
                }}
                className="absolute inset-0"
              />
            </div>

            <h3 className="text-3xl font-bold mb-4 relative z-10">
              ¿Quieres ver cómo funciona?
            </h3>
            <p className="text-xl mb-8 opacity-90 relative z-10">
              Mira nuestra demo interactiva y descubre todas las funcionalidades
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
            >
              Ver Demo Interactiva
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}