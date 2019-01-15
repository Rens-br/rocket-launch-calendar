import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews(params) {
  yield put(SpaceFlightNewsActions.fetchNewsLoading())
  console.log(params.Page)
  const News = yield call(SpaceFlightNewsService.fetchNews, params.Page)

  if (News) {
    let n = News
    if (params.BlockList !== null && params.BlockList !== undefined && params.BlockList.length) {
      for (let i = 0; i < n.length; i++) {
        for (let j = 0; j < params.BlockList.length; j++) {
          if (n[i].tags.includes(params.BlockList[j].toLowerCase())) {
            console.log(n[i])
            n.splice(i, 1)
          }
        }
      }
    }

    console.log(n)

    yield put(SpaceFlightNewsActions.fetchNewsSuccess({ News: n, Page: params.Page }))
  } else {
    console.log('Error fetching news api')
  }
}
