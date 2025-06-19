'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar as CalendarIcon, Trophy, TrendingUp, Sparkles, Gamepad2 } from 'lucide-react'
import Link from 'next/link'
import Calendar from '@/components/Calendar'
import ProgressTracker from '@/components/ProgressTracker'
import Medals from '@/components/Medals'
import GamificationDashboard from '@/components/GamificationDashboard'
import { useApp } from '@/contexts/AppContext'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'progress' | 'medals' | 'gamification'>('calendar')
  const { state } = useApp()

  const tabs = [
    { id: 'calendar', label: 'Calendario', icon: CalendarIcon, component: Calendar },
    { id: 'progress', label: 'Progreso', icon: TrendingUp, component: ProgressTracker },
    { id: 'medals', label: 'Medallas', icon: Trophy, component: Medals },
    { id: 'gamification', label: 'Gamificación', icon: Gamepad2, component: GamificationDashboard }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Calendar

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Volver</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <img src="/mascota.png" alt="UniPlanner" className="w-8 h-8" />
                <h1 className="text-xl font-bold text-gray-900">UniPlanner Demo</h1>
              </div>
            </div>
            
            {/* Points Display */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">{state.totalPoints} pts</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ActiveComponent />
        </motion.div>

        {/* Demo Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            🎯 Modo Demo Interactivo
          </h3>
          <p className="text-gray-700 mb-4">
            Esta es una demostración completamente funcional. Todas las acciones se guardan localmente en tu navegador.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/70 rounded-lg p-3">
              <CalendarIcon className="w-6 h-6 text-pink-500 mx-auto mb-1" />
              <p className="font-medium">Crea Tareas</p>
              <p className="text-gray-600">Haz clic en cualquier día</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-1" />
              <p className="font-medium">Completa Objetivos</p>
              <p className="text-gray-600">Marca tareas como completadas</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="font-medium">Gana Medallas</p>
              <p className="text-gray-600">Desbloquea logros</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}