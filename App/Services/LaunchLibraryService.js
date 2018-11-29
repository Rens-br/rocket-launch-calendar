import { create } from 'apisauce'
import { Config } from 'App/Config'

const LaunchLibraryApiClient = create({
  baseURL: Config.LAUNCH_LIBRARY_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function fetchLaunch() {
  console.log('service')
  const url = 'launch/2018-11-01/2018-11-30'
  return LaunchLibraryApiClient.get(url.toString()).then((response) => {
    console.log(response)
    if (response.ok) {
      return response.data
    }
    return null
  })
}

export const LaunchLibraryService = {
  fetchLaunch,
}
