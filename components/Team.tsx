'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { useState } from 'react'

const team = [
  {
    name: 'Ayline Muñoz',
    role: 'CEO & Co-fundadora',
    image: '/api/placeholder/300/300',
    bio: 'Estudiante de Psicología apasionada por el bienestar estudiantil',
    color: 'from-pink-500 to-purple-500',
    socials: {
      github: '#',
      linkedin: '#',
      twitter: '#',
    }
  },
  {
    name: 'Carlos Paredes',
    role: 'CTO & Co-fundador',
    image: '/api/placeholder/300/300',
    bio: 'Ingeniero en Software con experiencia en EdTech',
    color: 'from-blue-500 to-cyan-500',
    socials: {
      github: '#',
      linkedin: '#',
      mail: '#',
    }
  },
  {
    name: 'Angela Muñoz',
    role: 'Head of Design & Co-fundadora',
    image: '/api/placeholder/300/300',
    bio: 'Diseñadora UX/UI enfocada en experiencias educativas',
    color: 'from-yellow-500 to-orange-500',
    socials: {
      linkedin: '#',
      twitter: '#',
      mail: '#',
    }
  },
]

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export default function Team() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <section id="team" className="py-20 px-4 bg-white">
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
            Conoce al equipo detrás de
            <span className="bg-gradient-to-r from-pink-600 to-yellow-600 bg-clip-text text-transparent"> UniPlanner</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estudiantes y profesionales comprometidos con transformar la educación universitaria
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl">
                {/* Card Container */}
                <motion.div
                  animate={{
                    rotateY: hoveredMember === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                  className="relative h-[400px]"
                >
                  {/* Front Side */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 h-full flex flex-col items-center justify-center shadow-lg">
                      {/* Profile Image */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative mb-4"
                      >
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} p-1`}>
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-bold text-gray-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        {/* Floating particles */}
                        {hoveredMember === index && (
                          <>
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                  scale: [0, 1, 0],
                                  opacity: [0, 1, 0],
                                  rotate: 360,
                                }}
                                transition={{ 
                                  duration: 2,
                                  delay: i * 0.2,
                                  repeat: Infinity,
                                }}
                                className={`absolute w-3 h-3 bg-gradient-to-br ${member.color} rounded-full`}
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateX(60px)`,
                                }}
                              />
                            ))}
                          </>
                        )}
                      </motion.div>
                      
                      {/* Name and Role */}
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className={`font-semibold bg-gradient-to-r ${member.color} bg-clip-text text-transparent`}>
                        {member.role}
                      </p>
                      
                      {/* Hover Indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: hoveredMember === index ? 1 : 0,
                          y: hoveredMember === index ? 0 : 10
                        }}
                        className="mt-4 text-sm text-gray-500"
                      >
                        Click para conocer más
                      </motion.div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className={`bg-gradient-to-br ${member.color} rounded-2xl p-6 h-full flex flex-col justify-between shadow-lg text-white`}>
                      {/* Bio */}
                      <div>
                        <h3 className="text-2xl font-bold mb-3">{member.name}</h3>
                        <p className="text-white/90 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-4">
                        {Object.entries(member.socials).map(([platform, link]) => {
                          const Icon = socialIcons[platform as keyof typeof socialIcons]
                          return (
                            <motion.a
                              key={platform}
                              href={link}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </motion.a>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Te gustaría ser parte de nuestro equipo?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Siempre estamos buscando talento apasionado por la educación
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-yellow-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Ver posiciones abiertas
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}