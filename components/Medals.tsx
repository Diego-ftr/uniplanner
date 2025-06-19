'use client'

import React, { useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Lock, Sparkles, X, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import confetti from 'canvas-confetti'

interface MedalDetailsProps {
  medal: any
  isOpen: boolean
  onClose: () => void
}

const MedalDetails: React.FC<MedalDetailsProps> = ({ medal, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl z-50 p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="text-6xl mb-4">{medal.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{medal.title}</h3>
              <p className="text-gray-600 mb-4">{medal.description}</p>
              
              {medal.unlocked ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Desbloqueada</span>
                  </div>
                  {medal.unlockedDate && (
                    <p className="text-sm text-gray-500">
                      Conseguida el {format(new Date(medal.unlockedDate), 'dd MMMM yyyy', { locale: es })}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Lock className="w-5 h-5" />
                    <span className="font-medium">Bloqueada</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Requiere {medal.requiredPoints} puntos
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Medals() {
  const { state } = useApp()
  const [selectedMedal, setSelectedMedal] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const unlockedCount = state.medals.filter(m => m.unlocked).length
  const totalCount = state.medals.length
  const progressPercentage = (unlockedCount / totalCount) * 100

  const handleMedalClick = (medal: any) => {
    setSelectedMedal(medal)
    setShowDetails(true)
    
    if (medal.unlocked && !sessionStorage.getItem(`medal-celebrated-${medal.id}`)) {
      // Celebrate newly unlocked medals
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      sessionStorage.setItem(`medal-celebrated-${medal.id}`, 'true')
    }
  }

  // Group medals by tier
  const medalTiers = [
    { name: 'Bronce', medals: state.medals.slice(0, 2), color: 'from-amber-600 to-amber-700' },
    { name: 'Plata', medals: state.medals.slice(2, 4), color: 'from-gray-400 to-gray-500' },
    { name: 'Oro', medals: state.medals.slice(4, 6), color: 'from-yellow-400 to-yellow-500' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Medallas y Logros</h2>
        <p className="text-gray-600">Desbloquea recompensas completando tareas</p>
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg text-white">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Progreso Total</h3>
              <p className="text-sm text-gray-600">{unlockedCount} de {totalCount} medallas</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(progressPercentage)}%
          </div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          />
        </div>
      </motion.div>

      {/* Medal Tiers */}
      {medalTiers.map((tier, tierIndex) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: tierIndex * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${tier.color}`} />
            <h3 className="text-lg font-semibold text-gray-900">Nivel {tier.name}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tier.medals.map((medal, index) => {
              const isUnlocked = medal.unlocked
              const progress = Math.min((state.totalPoints / medal.requiredPoints) * 100, 100)

              return (
                <motion.div
                  key={medal.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tierIndex * 0.1 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleMedalClick(medal)}
                  className={`relative p-6 rounded-lg cursor-pointer transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {/* Medal Icon */}
                  <div className={`text-5xl mb-3 ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                    {medal.icon}
                  </div>

                  {/* Medal Info */}
                  <h4 className={`font-semibold mb-1 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {medal.title}
                  </h4>
                  <p className={`text-sm mb-3 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {medal.description}
                  </p>

                  {/* Progress or Status */}
                  {isUnlocked ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Desbloqueada</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progreso</span>
                        <span className="font-medium text-gray-700">
                          {state.totalPoints}/{medal.requiredPoints} pts
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlock Effect */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Next Medal to Unlock */}
      {state.medals.some(m => !m.unlocked) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-2">Próxima Medalla</h3>
          {(() => {
            const nextMedal = state.medals.find(m => !m.unlocked)
            if (!nextMedal) return null
            
            const pointsNeeded = nextMedal.requiredPoints - state.totalPoints
            
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{nextMedal.icon}</div>
                  <div>
                    <p className="font-medium">{nextMedal.title}</p>
                    <p className="text-sm text-pink-100">
                      Te faltan {pointsNeeded} puntos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{Math.round((state.totalPoints / nextMedal.requiredPoints) * 100)}%</p>
                  <p className="text-sm text-pink-100">Completado</p>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}

      <MedalDetails
        medal={selectedMedal}
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false)
          setSelectedMedal(null)
        }}
      />
    </div>
  )
}