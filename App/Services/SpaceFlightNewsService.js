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

function fetchNews(props) {
  console.log(props)
  const url = '/articles?limit=10'
  return SpaceFlightNewsApiClient.get(url.toString()).then((response) => {
    if (response.ok) {
      return response.data
    }
    return null
  })
}

export const SpaceFlightNewsService = {
  fetchNews,
}
