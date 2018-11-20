import { createReducer } from 'reduxsauce'
import { PoCTypes } from './Actions'
import { Map } from 'immutable'

const initialState = []
export const fetchLaunchSuccess = (state, { Launch }) => {
  return {
    Launches: Launch
  }
}

export const reducer = createReducer(initialState, {
  [PoCTypes.FETCH_LAUNCH_SUCCESS]: fetchLaunchSuccess,
})
