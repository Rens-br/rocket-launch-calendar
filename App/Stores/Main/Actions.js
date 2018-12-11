import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  setCurrentDate: null,
})

export const MainTypes = Types
export default Creators
