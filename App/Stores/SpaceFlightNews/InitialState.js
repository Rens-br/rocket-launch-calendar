import { Map } from 'immutable'

export const INITIAL_STATE = Map({
  articles: [],
  savedArticles: [],
  loading: false,
  lastUpdate: null,
})
