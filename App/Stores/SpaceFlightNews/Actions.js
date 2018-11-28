import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: null,
  fetchNewsSuccess: ['News'],
  saveNews: ['News', 'Date'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
