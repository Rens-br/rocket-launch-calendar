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

export const setNewsTags = (state, { tags }) => {
  return {
    notificationIntervals: state.notificationIntervals,
    notificationSound: state.notificationSound,
    notificationVibration: state.notificationVibration,
    newsTags: tags,
    newsSources: state.newsSources,
  }
}

export const setNewsSources = (state, { sources }) => {
  return {
    notificationIntervals: state.notificationIntervals,
    notificationSound: state.notificationSound,
    notificationVibration: state.notificationVibration,
    newsTags: state.newsTags,
    newsSources: sources,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [SettingsTypes.SET_NOTIFICATION_INTERVALS]: setNotificationIntervals,
  [SettingsTypes.TOGGLE_VIBRATION]: toggleVibration,
  [SettingsTypes.TOGGLE_SOUND]: toggleSound,
  [SettingsTypes.SET_NEWS_TAGS]: setNewsTags,
  [SettingsTypes.SET_NEWS_SOURCES]: setNewsSources,
})
