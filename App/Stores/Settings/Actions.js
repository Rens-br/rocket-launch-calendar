import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setNotificationIntervals: ['intervals'],
  toggleVibration: null,
  toggleSound: null,
})

export const SettingsTypes = Types
export default Creators
