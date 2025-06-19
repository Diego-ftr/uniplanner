'use client'

import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useApp } from '@/contexts/AppContext'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Calendar, Clock, BookOpen, CheckCircle, Circle, Sparkles } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import './calendar.css'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date
  taskToEdit?: any
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, selectedDate, taskToEdit }) => {
  const { addTask, updateTask } = useApp()
  const [formData, setFormData] = useState({
    title: taskToEdit?.title || '',
    description: taskToEdit?.description || '',
    type: taskToEdit?.type || 'task',
    date: taskToEdit?.date ? format(new Date(taskToEdit.date), 'yyyy-MM-dd') : (selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')),
    time: taskToEdit?.date ? format(new Date(taskToEdit.date), 'HH:mm') : '09:00',
    points: taskToEdit?.points || 10,
    completed: taskToEdit?.completed || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const taskData = {
      ...formData,
      date: `${formData.date}T${formData.time}:00`,
      completed: formData.completed,
      color: formData.type === 'exam' ? '#ef4444' : formData.type === 'assignment' ? '#f59e0b' : '#3b82f6'
    }

    if (taskToEdit) {
      updateTask({ ...taskData, id: taskToEdit.id })
      toast.success('Tarea actualizada correctamente')
    } else {
      addTask(taskData)
      toast.success('Tarea creada correctamente')
    }

    onClose()
  }

  const getPointsForType = (type: string) => {
    switch (type) {
      case 'exam': return 50
      case 'assignment': return 30
      default: return 10
    }
  }

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-xl z-50 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Ej: Estudiar para el parcial"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                  placeholder="Detalles adicionales..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const newType = e.target.value
                    setFormData({ 
                      ...formData, 
                      type: newType,
                      points: getPointsForType(newType)
                    })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="task">Tarea</option>
                  <option value="exam">Examen</option>
                  <option value="assignment">Trabajo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Puntos: {formData.points} pts
                  </span>
                </div>
              </div>

              {taskToEdit && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.completed || false}
                      onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Marcar como completada
                    </span>
                  </label>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  {taskToEdit ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function CalendarComponent() {
  const { state, toggleTaskCompletion, deleteTask } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [taskToEdit, setTaskToEdit] = useState<any>()
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

  const renderTaskItem = (task: any) => (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center justify-between p-4 rounded-lg border ${
        task.completed 
          ? 'bg-green-50 border-green-200' 
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      } transition-colors`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleCompleteTask(task.id)}
          className="transition-transform hover:scale-110"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400" />
          )}
        </button>
        
        <div>
          <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {task.title}
          </h4>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(task.date), 'dd MMM yyyy', { locale: es })}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(task.date), 'HH:mm')}
            </span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              task.type === 'exam' 
                ? 'bg-red-100 text-red-700' 
                : task.type === 'assignment'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {task.type === 'exam' ? 'Examen' : task.type === 'assignment' ? 'Trabajo' : 'Tarea'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600 bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-full">
          {task.points} pts
        </span>
        <button
          onClick={() => {
            setTaskToEdit(task)
            setIsModalOpen(true)
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          ✏️
        </button>
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de eliminar esta tarea?')) {
              deleteTask(task.id)
              toast.success('Tarea eliminada')
            }
          }}
          className="text-red-500 hover:text-red-700"
        >
          🗑️
        </button>
      </div>
    </motion.div>
  )

  const calendarEvents = state.tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.date,
    backgroundColor: task.completed ? '#10b981' : task.color,
    borderColor: task.completed ? '#059669' : task.color,
    extendedProps: {
      ...task
    }
  }))

  const handleDateClick = (info: any) => {
    setSelectedDate(new Date(info.date))
    setTaskToEdit(undefined)
    setIsModalOpen(true)
  }

  const handleEventClick = (info: any) => {
    const task = info.event.extendedProps
    setTaskToEdit(task)
    setIsModalOpen(true)
  }

  // Categorizar tareas por tiempo
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const allTasks = [...state.tasks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  const pastTasks = allTasks.filter(task => {
    const taskDate = new Date(task.date)
    taskDate.setHours(0, 0, 0, 0)
    return taskDate < today
  })
  
  const todayTasks = allTasks.filter(task => {
    const taskDate = new Date(task.date)
    taskDate.setHours(0, 0, 0, 0)
    return taskDate.getTime() === today.getTime()
  })
  
  const futureTasks = allTasks.filter(task => {
    const taskDate = new Date(task.date)
    taskDate.setHours(0, 0, 0, 0)
    return taskDate > today
  })

  const handleCompleteTask = (taskId: string) => {
    toggleTaskCompletion(taskId)
    const task = state.tasks.find(t => t.id === taskId)
    if (task && !task.completed) {
      toast.success(`¡Genial! +${task.points} puntos`)
    }
  }

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mi Calendario</h2>
          <p className="text-gray-600">Organiza tus tareas y exámenes</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            {viewMode === 'calendar' ? <BookOpen className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
            {viewMode === 'calendar' ? 'Ver Lista' : 'Ver Calendario'}
          </button>
          
          <button
            onClick={() => {
              setTaskToEdit(undefined)
              setSelectedDate(new Date())
              setIsModalOpen(true)
            }}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Tarea
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            locale="es"
            weekends={true}
            events={calendarEvents}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            height="auto"
            buttonText={{
              today: 'Hoy',
              month: 'Mes',
              week: 'Semana'
            }}
            dayMaxEvents={3}
            eventDisplay="block"
            eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Si no hay tareas */}
          {allTasks.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <p className="text-gray-500 py-8">No tienes tareas registradas</p>
            </div>
          )}

          {/* Tareas de Hoy */}
          {todayTasks.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-500" />
                Tareas de Hoy ({todayTasks.length})
              </h3>
              <div className="space-y-3">
                {todayTasks.map(renderTaskItem)}
              </div>
            </div>
          )}

          {/* Tareas Futuras */}
          {futureTasks.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Próximas Tareas ({futureTasks.length})
              </h3>
              <div className="space-y-3">
                {futureTasks.map(renderTaskItem)}
              </div>
            </div>
          )}

          {/* Tareas Pasadas */}
          {pastTasks.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Tareas Pasadas ({pastTasks.length})
              </h3>
              <div className="space-y-3">
                {pastTasks.map(renderTaskItem)}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setTaskToEdit(undefined)
        }}
        selectedDate={selectedDate}
        taskToEdit={taskToEdit}
      />
    </div>
  )
}