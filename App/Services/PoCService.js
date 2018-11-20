import { create } from 'apisauce'
import { Config } from 'App/Config'

const LaunchLibraryApiClient = create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

function addZeroToSingle(n){
  return n > 9 ? "" + n: "0" + n;
}

function fetchLaunch(props) {
  if(props[0].month == null){
    return null
  }
  const url = 'launch/2018-' + addZeroToSingle(props[0].month).toString() + '-01/2018-' + addZeroToSingle(props[0].month).toString() + '-32'
  return LaunchLibraryApiClient.get(url.toString()).then((response) => {
    if (response.ok) {

      return response.data.launches
    }
    return null
  })
}

export const PoCService = {
  fetchLaunch,
}
