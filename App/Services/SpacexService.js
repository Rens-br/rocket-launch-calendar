import { create } from 'apisauce'
import { Config } from 'App/Config'

const SpacexApiClient = create({
  baseURL: Config.SPACEX_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchLaunch() {
  const url = 'launches?start=2018-11-1&end=2018-11-30'
  return SpacexApiClient.get(url.toString()).then((response) => {
    console.log(response)
    if (response.ok) {
      return response.data
    }
    return null
  })
}

export const SpacexService = {
  fetchLaunch,
}
