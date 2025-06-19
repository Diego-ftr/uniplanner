'use client'

import React from 'react'
import { useApp } from '@/contexts/AppContext'
import { motion } from 'framer-motion'
import { TrendingUp, Target, Flame, Calendar, Award, Zap } from 'lucide-react'
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ProgressTracker() {
  const { state } = useApp()

  // Calculate current week progress
  const now = new Date()
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 })

  const currentWeekTasks = state.tasks.filter(task => {
    const taskDate = new Date(task.date)
    return isWithinInterval(taskDate, { start: weekStart, end: weekEnd })
  })

  const completedWeekTasks = currentWeekTasks.filter(t => t.completed)
  const weekProgress = currentWeekTasks.length > 0 
    ? (completedWeekTasks.length / currentWeekTasks.length) * 100 
    : 0

  const weekPoints = completedWeekTasks.reduce((sum, task) => sum + task.points, 0)

  // Calculate daily progress for the week
  const dailyProgress = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + i)
    
    const dayTasks = state.tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate.toDateString() === day.toDateString()
    })

    const completedDayTasks = dayTasks.filter(t => t.completed)
    
    return {
      day: format(day, 'EEE', { locale: es }),
      date: day,
      total: dayTasks.length,
      completed: completedDayTasks.length,
      points: completedDayTasks.reduce((sum, t) => sum + t.points, 0)
    }
  })

  // Stats cards data
  const stats = [
    {
      label: 'Puntos Totales',
      value: state.totalPoints,
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      label: 'Racha Actual',
      value: `${state.currentStreak} días`,
      icon: Flame,
      color: 'from-red-400 to-pink-500',
      bgColor: 'from-red-50 to-pink-50'
    },
    {
      label: 'Tareas Completadas',
      value: state.tasks.filter(t => t.completed).length,
      icon: Target,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      label: 'Medallas',
      value: state.medals.filter(m => m.unlocked).length,
      icon: Award,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu Progreso</h2>
        <p className="text-gray-600">Mantén el ritmo y alcanza tus metas 🚀</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden bg-white rounded-xl shadow-lg p-6"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-50`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-2xl font-bold text-gray-900"
                >
                  {stat.value}
                </motion.div>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Progreso Semanal</h3>
            <p className="text-sm text-gray-600">
              {format(weekStart, 'dd MMM', { locale: es })} - {format(weekEnd, 'dd MMM', { locale: es })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{Math.round(weekProgress)}%</p>
            <p className="text-sm text-gray-600">{weekPoints} puntos</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weekProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-600 relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">
              {completedWeekTasks.length} de {currentWeekTasks.length} tareas
            </span>
            <span className="text-sm font-medium text-gray-900">
              Meta: 100%
            </span>
          </div>
        </div>

        {/* Daily Breakdown */}
        <div className="grid grid-cols-7 gap-2">
          {dailyProgress.map((day, index) => {
            const isToday = day.date.toDateString() === now.toDateString()
            const hasTasks = day.total > 0
            const completionRate = hasTasks ? (day.completed / day.total) * 100 : 0

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`text-center p-3 rounded-lg transition-all ${
                  isToday 
                    ? 'bg-gradient-to-br from-pink-100 to-purple-100 ring-2 ring-pink-500' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className={`text-xs font-medium ${isToday ? 'text-pink-600' : 'text-gray-600'}`}>
                  {day.day}
                </p>
                <div className="mt-2 mb-1">
                  {hasTasks ? (
                    <div className="relative w-10 h-10 mx-auto">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="#e5e7eb"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${completionRate} ${100 - completionRate}`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#a855f7" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-900">
                          {day.completed}/{day.total}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 mx-auto rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">0</span>
                    </div>
                  )}
                </div>
                {day.points > 0 && (
                  <p className="text-xs text-gray-600">+{day.points}</p>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Motivational Message */}
      {state.currentStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-6 text-center"
        >
          <Flame className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">
            ¡{state.currentStreak} días de racha! 🔥
          </h3>
          <p className="text-pink-100">
            {state.currentStreak < 7 
              ? 'Sigue así, vas por buen camino'
              : state.currentStreak < 30
              ? '¡Increíble constancia! No te detengas'
              : '¡Eres imparable! Tu dedicación es admirable'}
          </p>
        </motion.div>
      )}
    </div>
  )
}