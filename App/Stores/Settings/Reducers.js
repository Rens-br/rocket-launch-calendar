import { createReducer } from 'reduxsauce'
import { SettingsTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const setNotificationIntervals = (state, { intervals }) => {
  return {
    notificationIntervals: intervals,
    notificationSound: state.notificationSound,
    notificationVibration: state.notificationVibration,
  }
}

export const toggleVibration = (state) => {
  return {
    notificationIntervals: state.notificationIntervals,
    notificationSound: state.notificationSound,
    notificationVibration: !state.notificationVibration,
  }
}

export const toggleSound = (state) => {
  return {
    notificationIntervals: state.notificationIntervals,
    notificationSound: !state.notificationSound,
    notificationVibration: state.notificationVibration,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [SettingsTypes.SET_NOTIFICATION_INTERVALS]: setNotificationIntervals,
  [SettingsTypes.TOGGLE_VIBRATION]: toggleVibration,
  [SettingsTypes.TOGGLE_SOUND]: toggleSound,
})
