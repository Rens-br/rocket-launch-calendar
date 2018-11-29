import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: ['date'],
  fetchNewsSuccess: ['News'],
  saveNews: ['News', 'Date'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
