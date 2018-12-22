import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: ['Page'],
  fetchNewsLoading: null,
  fetchNewsSuccess: ['News'],
  saveNews: ['News', 'Date'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
