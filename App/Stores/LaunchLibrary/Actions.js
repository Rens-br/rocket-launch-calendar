import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchLibraryLaunch: ['Start', 'End'],
  fetchLibraryLaunchSuccess: ['Launch'],
  saveLibraryLaunches: null,
  fetchLibraryLaunchLoading: null,
  fetchLibraryLaunchError: ['Error'],
})

export const LaunchLibraryTypes = Types
export default Creators
