import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews(params) {
  yield put(SpaceFlightNewsActions.fetchNewsLoading())
  console.log(params.Page)
  const News = yield call(SpaceFlightNewsService.fetchNews, params.Page)

  if (News) {
    yield put(SpaceFlightNewsActions.fetchNewsSuccess({ News: News, Page: params.Page }))
  } else {
    console.log('Error fetching news api')
  }
}
