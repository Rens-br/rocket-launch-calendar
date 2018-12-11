import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews(props) {
  yield put(SpaceFlightNewsActions.fetchNewsLoading())
  console.log(props.page)
  const News = yield call(SpaceFlightNewsService.fetchNews, props.page)

  if (News) {
    yield put(SpaceFlightNewsActions.fetchNewsSuccess(News))
  } else {
    console.log('Error fetching news api')
  }
}
