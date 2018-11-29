import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchLibraryLaunch: null,
  fetchLibraryLaunchSuccess: ['Launch'],
  saveLibraryLaunches: ['Launch', 'Date'],
})

export const LaunchLibraryTypes = Types
export default Creators
