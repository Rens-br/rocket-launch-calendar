import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: null,
  fetchNewsSuccess: ['News'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
