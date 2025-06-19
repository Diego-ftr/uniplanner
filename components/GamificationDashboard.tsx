'use client'

import React, { useEffect, useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Trophy, Target, TrendingUp, Award, Star, Gift, Crown } from 'lucide-react'
import confetti from 'canvas-confetti'

interface LevelInfo {
  level: number
  title: string
  minPoints: number
  maxPoints: number
  color: string
  icon: React.ReactNode
}

const levels: LevelInfo[] = [
  { level: 1, title: 'Novato', minPoints: 0, maxPoints: 100, color: 'from-gray-400 to-gray-600', icon: <Star className="w-6 h-6" /> },
  { level: 2, title: 'Aprendiz', minPoints: 100, maxPoints: 250, color: 'from-green-400 to-green-600', icon: <Target className="w-6 h-6" /> },
  { level: 3, title: 'Estudiante', minPoints: 250, maxPoints: 500, color: 'from-blue-400 to-blue-600', icon: <TrendingUp className="w-6 h-6" /> },
  { level: 4, title: 'Académico', minPoints: 500, maxPoints: 1000, color: 'from-purple-400 to-purple-600', icon: <Award className="w-6 h-6" /> },
  { level: 5, title: 'Maestro', minPoints: 1000, maxPoints: 2000, color: 'from-yellow-400 to-yellow-600', icon: <Trophy className="w-6 h-6" /> },
  { level: 6, title: 'Leyenda', minPoints: 2000, maxPoints: Infinity, color: 'from-pink-400 to-pink-600', icon: <Crown className="w-6 h-6" /> }
]

export default function GamificationDashboard() {
  const { state } = useApp()
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [previousLevel, setPreviousLevel] = useState<number | null>(null)

  const currentLevel = levels.find(l => state.totalPoints >= l.minPoints && state.totalPoints < l.maxPoints) || levels[0]
  const nextLevel = levels[currentLevel.level] || null
  
  const levelProgress = nextLevel 
    ? ((state.totalPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel')
    if (savedLevel && parseInt(savedLevel) < currentLevel.level) {
      setShowLevelUp(true)
      setPreviousLevel(parseInt(savedLevel))
      
      // Celebration effect
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      setTimeout(() => setShowLevelUp(false), 5000)
    }
    localStorage.setItem('userLevel', currentLevel.level.toString())
  }, [currentLevel.level])

  // Daily challenges
  const dailyChallenges = [
    { id: 1, title: 'Completa 3 tareas', progress: Math.min(state.tasks.filter(t => t.completed).length, 3), total: 3, reward: 50 },
    { id: 2, title: 'Estudia 2 horas', progress: 0, total: 2, reward: 30 },
    { id: 3, title: 'Mantén tu racha', progress: state.currentStreak > 0 ? 1 : 0, total: 1, reward: 20 }
  ]

  // Power-ups
  const powerUps = [
    { id: 1, name: 'Doble XP', icon: '⚡', description: 'Duplica los puntos por 1 hora', cost: 100, owned: false },
    { id: 2, name: 'Congelador', icon: '❄️', description: 'Pausa el tiempo límite', cost: 150, owned: false },
    { id: 3, name: 'Motivación Extra', icon: '🔥', description: '+50% productividad', cost: 200, owned: true }
  ]

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 bg-gradient-to-br ${currentLevel.color} rounded-lg text-white`}>
              {currentLevel.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Nivel {currentLevel.level}: {currentLevel.title}</h3>
              <p className="text-sm text-gray-600">{state.totalPoints} puntos totales</p>
            </div>
          </div>
          {nextLevel && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Siguiente nivel</p>
              <p className="font-semibold text-gray-900">{nextLevel.minPoints - state.totalPoints} pts</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${currentLevel.color} relative`}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{currentLevel.minPoints} pts</span>
            <span>{Math.round(levelProgress)}%</span>
            {nextLevel && <span>{nextLevel.minPoints} pts</span>}
          </div>
        </div>
      </motion.div>

      {/* Daily Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-500" />
          Desafíos Diarios
        </h3>
        
        <div className="space-y-3">
          {dailyChallenges.map(challenge => {
            const isCompleted = challenge.progress >= challenge.total
            return (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCompleted 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                      {challenge.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    +{challenge.reward} pts
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Power-ups Store */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Tienda de Power-ups
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {powerUps.map(powerUp => (
            <motion.div
              key={powerUp.id}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all ${
                powerUp.owned 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-3xl mb-2">{powerUp.icon}</div>
              <h4 className="font-medium text-gray-900">{powerUp.name}</h4>
              <p className="text-xs text-gray-600 mb-3">{powerUp.description}</p>
              {powerUp.owned ? (
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium">
                  Usar
                </button>
              ) : (
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    state.totalPoints >= powerUp.cost
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={state.totalPoints < powerUp.cost}
                >
                  {powerUp.cost} pts
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-2xl text-center"
            >
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">¡Subiste de Nivel!</h2>
              <p className="text-xl">Ahora eres {currentLevel.title}</p>
              <p className="text-lg mt-2">Nivel {currentLevel.level}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}