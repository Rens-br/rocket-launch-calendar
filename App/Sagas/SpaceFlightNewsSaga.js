import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews() {
  const News = yield call(SpaceFlightNewsService.fetchNews)

  if (News) {
    console.log(News)
    yield put(SpaceFlightNewsActions.fetchNewsSuccess(News))
  } else {
    console.log('Error fetching news api')
  }
}
