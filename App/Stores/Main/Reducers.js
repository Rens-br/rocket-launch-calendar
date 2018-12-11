import { createReducer } from 'reduxsauce'
import { MainTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const setCurrentDate = (state) => {
  const date = new Date()
  return {
    currentDate: [date.getDate(), date.getMonth() + 1, date.getFullYear()],
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [MainTypes.SET_CURRENT_DATE]: setCurrentDate,
})
