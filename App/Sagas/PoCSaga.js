import { put, call } from 'redux-saga/effects'
import PoCActions from 'App/Stores/PoC/Actions'
import { PoCService } from 'App/Services/PoCService'

export function* fetchLaunch(month) {
  const Launch = yield call(PoCService.fetchLaunch, [month])
  console.log(Launch)
  if (Launch) {
    yield put(PoCActions.fetchLaunchSuccess(Launch))
  } else {
    console.log('Error fetching api')
  }
}
