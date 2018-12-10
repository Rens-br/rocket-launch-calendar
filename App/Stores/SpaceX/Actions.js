import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchSpacexLaunch: null,
  fetchSpacexLaunchSuccess: ['Launch'],
  saveSpacexLaunches: ['Launch', 'Date'],
})

export const SpacexTypes = Types
export default Creators
