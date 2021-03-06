import { createReducer } from 'reduxsauce'
import { MainTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const setCurrentDate = (state) => {
  const date = new Date()
  return {
    currentDate: [date.getDate(), date.getMonth() + 1, date.getFullYear()],
    notifications: state.notifications,
  }
}

export const addNotification = (state, { notification }) => {
  let l = []
  if (state.notifications !== undefined) {
    l = state.notifications
  }
  l.push(notification)
  console.log(l)
  return {
    currentDate: state.currentDate,
    notifications: l,
  }
}

export const removeNotificationsById = (state, { id }) => {
  let l = state.notifications
  for (var i = 0; i < l.length; i++) {
    if (l[i].launchId === id) {
      l.splice(i, 1)
    }
  }
  console.log(l)
  return {
    currentDate: state.currentDate,
    notifications: l,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [MainTypes.SET_CURRENT_DATE]: setCurrentDate,
  [MainTypes.ADD_NOTIFICATION]: addNotification,
  [MainTypes.REMOVE_NOTIFICATIONS_BY_ID]: removeNotificationsById,
})
