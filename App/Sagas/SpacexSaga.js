import { put, call } from 'redux-saga/effects'
import SpacexActions from 'App/Stores/SpaceX/Actions'
import { SpacexService } from 'App/Services/SpacexService'

export function* fetchSpacexLaunch() {
  const Launch = yield call(SpacexService.fetchLaunch)
  console.log(Launch)
  if (Launch) {
    yield put(SpacexActions.fetchSpacexLaunchSuccess(Launch))
  } else {
    console.log('Error fetching spacex api')
  }
}
