import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchNews: null,
  fetchNewsSuccess: ['news'],
})

export const SpaceFlightNewsTypes = Types
export default Creators
