import { put, call } from 'redux-saga/effects'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import { SpaceFlightNewsService } from 'App/Services/SpaceFlightNewsService'

export function* fetchNews(params) {
  yield put(SpaceFlightNewsActions.fetchNewsLoading())
  const News = yield call(SpaceFlightNewsService.fetchNews, params.Page)

  if (News) {
    let checkedNews = []

    for (let i = 0; i < News.length; i++) {
      if (
        params.BlockedSources !== null &&
        params.BlockedSources !== undefined &&
        params.BlockedSources.length
      ) {
        for (let j = 0; j < params.BlockedSources.length; j++) {
          if (News[i] !== undefined) {
            if (
              News[i].news_site !== undefined &&
              News[i].news_site.toLowerCase() !== params.BlockedSources[j].toLowerCase()
            ) {
              if (
                params.BlockedTags !== null &&
                params.BlockedTags !== undefined &&
                params.BlockedTags.length
              ) {
                for (let j = 0; j < params.BlockedTags.length; j++) {
                  if (News[i] !== undefined) {
                    if (!News[i].tags.includes(params.BlockedTags[j].toLowerCase())) {
                      checkedNews.push(News[i])
                    }
                  }
                }
              } else {
                checkedNews.push(News[i])
              }
            }
          }
        }
      } else {
        if (
          params.BlockedTags !== null &&
          params.BlockedTags !== undefined &&
          params.BlockedTags.length
        ) {
          for (let j = 0; j < params.BlockedTags.length; j++) {
            if (News[i] !== undefined) {
              if (!News[i].tags.includes(params.BlockedTags[j].toLowerCase())) {
                checkedNews.push(News[i])
              }
            }
          }
        } else {
          checkedNews.push(News[i])
        }
      }
    }

    yield put(SpaceFlightNewsActions.fetchNewsSuccess({ News: checkedNews, Page: params.Page }))
  } else {
    console.log('Error fetching news api')
  }
}
