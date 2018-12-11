import { put, call } from 'redux-saga/effects'
import LaunchLibraryActions from 'App/Stores/LaunchLibrary/Actions'
import { LaunchLibraryService } from 'App/Services/LaunchLibraryService'

export function* fetchLibraryLaunch() {
  const Launch = yield call(LaunchLibraryService.fetchLaunch)
  if (Launch) {
    yield put(LaunchLibraryActions.fetchLibraryLaunchSuccess(Launch))
  } else {
    console.log('Error fetching LaunchLibrary api')
  }
}
