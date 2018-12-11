import { createReducer } from 'reduxsauce'
import { SpacexTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const fetchSpacexLaunchSuccess = (state, { Launch }) => {
  return {
    launches: Launch,
    lastUpdate: state.lastUpdate,
    savedLaunches: state.savedLaunches,
  }
}

export const saveSpacexLaunches = (state, { Launch, Date }) => {
  return {
    launches: state.launches,
    lastUpdate: Date,
    savedLaunches: Launch,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [SpacexTypes.FETCH_SPACEX_LAUNCH_SUCCESS]: fetchSpacexLaunchSuccess,
  [SpacexTypes.SAVE_SPACEX_LAUNCHES]: saveSpacexLaunches,
})
