import React, { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

function NotificationToast() {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.notifications.length > 0) {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          payload: state.notifications[0].id
        })
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [state.notifications, dispatch])

  if (state.notifications.length === 0) return null

  const notification = state.notifications[0]

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border max-w-sm ${
        notification.type === 'success'
          ? 'bg-green-50 border-green-200 text-green-800'
          : notification.type === 'error'
          ? 'bg-red-50 border-red-200 text-red-800'
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        {notification.type === 'success' ? (
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
        ) : notification.type === 'error' ? (
          <XCircle size={20} className="text-red-600 flex-shrink-0" />
        ) : (
          <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
        )}
        
        <p className="font-medium flex-1">{notification.message}</p>
        
        <button
          onClick={() => dispatch({
            type: 'REMOVE_NOTIFICATION',
            payload: notification.id
          })}
          className="text-current hover:opacity-70 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default NotificationToast