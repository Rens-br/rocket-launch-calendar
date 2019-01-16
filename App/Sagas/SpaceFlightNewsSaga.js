import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews(params) {
  yield put(SpaceFlightNewsActions.fetchNewsLoading())
  const News = yield call(SpaceFlightNewsService.fetchNews, params.Page)

  if (News) {
    let dirtyNews = [].concat(News)

    for (let i = 0; i < News.length; i++) {
      if (
        params.BlockedSources !== undefined &&
        params.BlockedSources.length &&
        News[i].news_site !== undefined
      ) {
        for (let j = 0; j < params.BlockedSources.length; j++) {
          if (News[i].news_site.toLowerCase() === params.BlockedSources[j].toLowerCase()) {
            if (dirtyNews.includes(News[i])) {
              dirtyNews.splice(dirtyNews.indexOf(News[i], 1))
            }
          }
        }
      }
      if (
        params.BlockedTags !== undefined &&
        params.BlockedTags.length &&
        News[i].tags !== undefined
      ) {
        for (let k = 0; k < params.BlockedTags.length; k++) {
          if (News[i].tags.includes(params.BlockedTags[k].toLowerCase())) {
            if (dirtyNews.includes(News[i])) {
              dirtyNews.splice(dirtyNews.indexOf(News[i], 1))
            }
          }
        }
      }
    }

    yield put(SpaceFlightNewsActions.fetchNewsSuccess({ News: dirtyNews, Page: params.Page }))
  } else {
    console.log('Error fetching news api')
  }
}
