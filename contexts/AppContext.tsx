'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface Task {
  id: string
  title: string
  description?: string
  date: string
  type: 'task' | 'exam' | 'assignment'
  completed: boolean
  points: number
  color?: string
}

export interface Medal {
  id: string
  title: string
  description: string
  icon: string
  requiredPoints: number
  unlocked: boolean
  unlockedDate?: string
}

export interface WeeklyProgress {
  weekStartDate: string
  tasksCompleted: number
  totalTasks: number
  pointsEarned: number
}

interface AppState {
  tasks: Task[]
  medals: Medal[]
  totalPoints: number
  weeklyProgress: WeeklyProgress[]
  currentStreak: number
  bestStreak: number
}

type AppAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK_COMPLETION'; payload: string }
  | { type: 'UNLOCK_MEDAL'; payload: string }
  | { type: 'UPDATE_WEEKLY_PROGRESS' }
  | { type: 'LOAD_STATE'; payload: AppState }
  | { type: 'UPDATE_STREAK' }

const initialMedals: Medal[] = [
  {
    id: '1',
    title: 'Primer Paso',
    description: 'Completa tu primera tarea',
    icon: '🎯',
    requiredPoints: 10,
    unlocked: false
  },
  {
    id: '2',
    title: 'Semana Productiva',
    description: 'Completa 5 tareas en una semana',
    icon: '📅',
    requiredPoints: 50,
    unlocked: false
  },
  {
    id: '3',
    title: 'Estudiante Dedicado',
    description: 'Mantén una racha de 7 días',
    icon: '🔥',
    requiredPoints: 100,
    unlocked: false
  },
  {
    id: '4',
    title: 'Maestro del Tiempo',
    description: 'Completa 20 tareas',
    icon: '⏰',
    requiredPoints: 200,
    unlocked: false
  },
  {
    id: '5',
    title: 'Excelencia Académica',
    description: 'Completa 10 exámenes',
    icon: '🏆',
    requiredPoints: 500,
    unlocked: false
  },
  {
    id: '6',
    title: 'Leyenda UniPlanner',
    description: 'Alcanza 1000 puntos',
    icon: '👑',
    requiredPoints: 1000,
    unlocked: false
  }
]

const initialState: AppState = {
  tasks: [],
  medals: initialMedals,
  totalPoints: 0,
  weeklyProgress: [],
  currentStreak: 0,
  bestStreak: 0
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }

    case 'TOGGLE_TASK_COMPLETION': {
      const updatedTasks = state.tasks.map(task => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed }
        }
        return task
      })

      const task = state.tasks.find(t => t.id === action.payload)
      if (!task) return state

      const pointsDelta = task.completed ? -task.points : task.points
      const newTotalPoints = Math.max(0, state.totalPoints + pointsDelta)

      // Check for medal unlocks
      const updatedMedals = state.medals.map(medal => {
        if (!medal.unlocked && newTotalPoints >= medal.requiredPoints) {
          return { ...medal, unlocked: true, unlockedDate: new Date().toISOString() }
        }
        return medal
      })

      return {
        ...state,
        tasks: updatedTasks,
        totalPoints: newTotalPoints,
        medals: updatedMedals
      }
    }

    case 'UNLOCK_MEDAL':
      return {
        ...state,
        medals: state.medals.map(medal =>
          medal.id === action.payload
            ? { ...medal, unlocked: true, unlockedDate: new Date().toISOString() }
            : medal
        )
      }

    case 'UPDATE_WEEKLY_PROGRESS': {
      const today = new Date()
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 7)

      const weekTasks = state.tasks.filter(task => {
        const taskDate = new Date(task.date)
        return taskDate >= weekStart && taskDate < weekEnd
      })

      const weekProgress: WeeklyProgress = {
        weekStartDate: weekStart.toISOString(),
        tasksCompleted: weekTasks.filter(t => t.completed).length,
        totalTasks: weekTasks.length,
        pointsEarned: weekTasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)
      }

      const existingProgressIndex = state.weeklyProgress.findIndex(
        p => p.weekStartDate === weekProgress.weekStartDate
      )

      const updatedProgress = [...state.weeklyProgress]
      if (existingProgressIndex >= 0) {
        updatedProgress[existingProgressIndex] = weekProgress
      } else {
        updatedProgress.push(weekProgress)
      }

      return {
        ...state,
        weeklyProgress: updatedProgress
      }
    }

    case 'UPDATE_STREAK': {
      // Calculate current streak based on consecutive days with completed tasks
      const sortedTasks = [...state.tasks]
        .filter(t => t.completed)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      let currentStreak = 0
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today)
        checkDate.setDate(today.getDate() - i)
        checkDate.setHours(0, 0, 0, 0)

        const hasTaskOnDate = sortedTasks.some(task => {
          const taskDate = new Date(task.date)
          taskDate.setHours(0, 0, 0, 0)
          return taskDate.getTime() === checkDate.getTime()
        })

        if (hasTaskOnDate) {
          currentStreak++
        } else if (i > 0) {
          break
        }
      }

      const bestStreak = Math.max(state.bestStreak, currentStreak)

      return {
        ...state,
        currentStreak,
        bestStreak
      }
    }

    case 'LOAD_STATE':
      return action.payload

    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  addTask: (task: Omit<Task, 'id'>) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  toggleTaskCompletion: (taskId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('uniplannerState')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: 'LOAD_STATE', payload: parsedState })
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('uniplannerState', JSON.stringify(state))
  }, [state])

  // Update weekly progress and streak whenever tasks change
  useEffect(() => {
    dispatch({ type: 'UPDATE_WEEKLY_PROGRESS' })
    dispatch({ type: 'UPDATE_STREAK' })
  }, [state.tasks])

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    }
    dispatch({ type: 'ADD_TASK', payload: newTask })
  }

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task })
  }

  const deleteTask = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }

  const toggleTaskCompletion = (taskId: string) => {
    dispatch({ type: 'TOGGLE_TASK_COMPLETION', payload: taskId })
  }

  const value: AppContextType = {
    state,
    dispatch,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}