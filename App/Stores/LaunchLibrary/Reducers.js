import { createReducer } from 'reduxsauce'
import { LaunchLibraryTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const fetchLibraryLaunchSuccess = (state, { Launch }) => {
  return {
    launches: Launch,
    lastUpdate: state.lastUpdate,
    savedLaunches: state.savedLaunches,
    loading: false,
    error: '',
  }
}

export const saveLibraryLaunches = (state) => {
  return {
    launches: state.launches,
    lastUpdate: new Date(),
    savedLaunches: state.launches,
    loading: state.loading,
    error: '',
  }
}

export const fetchLibraryLaunchLoading = (state) => {
  return {
    launches: [],
    lastUpdate: null,
    savedLaunches: state.savedLaunches,
    loading: true,
    error: '',
  }
}

export const fetchLibraryLaunchError = (state, { Error }) => {
  return {
    launches: [],
    lastUpdate: null,
    savedLaunches: state.savedLaunches,
    loading: false,
    error: Error,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [LaunchLibraryTypes.FETCH_LIBRARY_LAUNCH_SUCCESS]: fetchLibraryLaunchSuccess,
  [LaunchLibraryTypes.SAVE_LIBRARY_LAUNCHES]: saveLibraryLaunches,
  [LaunchLibraryTypes.FETCH_LIBRARY_LAUNCH_LOADING]: fetchLibraryLaunchLoading,
})
