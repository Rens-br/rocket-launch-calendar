import { createReducer } from 'reduxsauce'
import { SpaceFlightNewsTypes } from './Actions'
import { INITIAL_STATE } from './InitialState'

export const fetchNewsSuccess = (state, { News }) => {
  return {
    articles: News,
    lastUpdate: state.lastUpdate,
    savedArticles: state.savedArticles,
    loading: false,
  }
}

export const fetchNewsLoading = (state) => {
  return {
    articles: state.articles,
    lastUpdate: state.lastUpdate,
    savedArticles: state.savedArticles,
    loading: true,
  }
}

export const saveNews = (state, { News, Date }) => {
  return {
    articles: state.articles,
    lastUpdate: Date,
    savedArticles: News,
  }
}

export const reducer = createReducer(INITIAL_STATE, {
  [SpaceFlightNewsTypes.FETCH_NEWS_SUCCESS]: fetchNewsSuccess,
  [SpaceFlightNewsTypes.FETCH_NEWS_LOADING]: fetchNewsLoading,
  [SpaceFlightNewsTypes.SAVE_NEWS]: saveNews,
})
