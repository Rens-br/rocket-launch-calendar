import { create } from 'apisauce'
import { Config } from 'App/Config'

const SpaceFlightNewsApiClient = create({
  baseURL: Config.SPACE_FLIGHT_NEWS_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchNews(Page) {
  console.log(Page)
  const url = '/articles?limit=10&page=' + Page.toString()
  return SpaceFlightNewsApiClient.get(url.toString()).then((response) => {
    if (response.ok) {
      console.log(response.data)
      return response.data
    }
    return null
  })
}

export const SpaceFlightNewsService = {
  fetchNews,
}
