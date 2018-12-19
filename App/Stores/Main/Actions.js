import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setCurrentDate: null,
  addNotification: ['notification'],
})

export const MainTypes = Types
export default Creators
