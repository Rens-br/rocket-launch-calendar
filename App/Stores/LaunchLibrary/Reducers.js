import { createReducer } from 'reduxsauce'
import { LaunchLibraryTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const fetchLibraryLaunchSuccess = (state, { Launch }) => {
  return {
    launches: Launch,
    lastUpdate: state.lastUpdate,
    savedLaunches: state.savedLaunches,
  }
}

export const saveLibraryLaunches = (state, { Launch, Date }) => {
  return {
    launches: state.launches,
    lastUpdate: Date,
    savedLaunches: Launch,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [LaunchLibraryTypes.FETCH_LIBRARY_LAUNCH_SUCCESS]: fetchLibraryLaunchSuccess,
  [LaunchLibraryTypes.SAVE_LIBRARY_LAUNCHES]: saveLibraryLaunches,
})
