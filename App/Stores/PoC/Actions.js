import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchLaunch: ['month'],
  fetchLaunchSuccess: ['Launch'],
})

export const PoCTypes = Types
export default Creators
