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

function fetchLaunch(startDate, endDate) {
  if (startDate === undefined || startDate === null) return null
  const url =
    'launch/' +
    startDate.getFullYear() +
    '-' +
    addZeroToSingle(startDate.getMonth() + 1) +
    '-' +
    addZeroToSingle(startDate.getDate()) +
    '/' +
    endDate.getFullYear() +
    '-' +
    addZeroToSingle(endDate.getMonth() + 1) +
    '-' +
    addZeroToSingle(endDate.getDate())

  return LaunchLibraryApiClient.get(url.toString()).then((response) => {
    if (response.ok) {
      const l = []
      for (let i = 0; i < response.data.launches.length; i++) {
        l.push({
          launch: response.data.launches[i],
          date: new Date(response.data.launches[i].windowend),
        })
      }
      return l
    }
    return null
  })
}

function addZeroToSingle(n) {
  return n > 9 ? '' + n : '0' + n
}

export const LaunchLibraryService = {
  fetchLaunch,
}
