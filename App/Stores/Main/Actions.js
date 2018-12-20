import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setCurrentDate: null,
  addNotification: ['notification'],
  removeNotificationsById: ['id'],
})

export const MainTypes = Types
export default Creators
