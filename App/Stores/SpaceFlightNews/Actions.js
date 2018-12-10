import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: ['page'],
  fetchNewsLoading: null,
  fetchNewsSuccess: ['News'],
  saveNews: ['News', 'Date'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
