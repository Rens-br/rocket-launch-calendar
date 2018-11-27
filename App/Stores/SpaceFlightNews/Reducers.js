import { createReducer } from 'reduxsauce'
import { SpaceFlightNewsTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const fetchNewsSuccess = (state, { News }) => {
  return {
    articles: News,
    lastUpdate: new Date(),
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [SpaceFlightNewsTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
})
