import { put, call } from 'redux-saga/effects'
import LaunchLibraryActions from 'App/Stores/LaunchLibrary/Actions'
import { LaunchLibraryService } from 'App/Services/LaunchLibraryService'

export function* fetchLibraryLaunch(params) {
  yield put(LaunchLibraryActions.fetchLibraryLaunchLoading())
  const Launch = yield call(LaunchLibraryService.fetchLaunch, params.Start, params.End)
  if (Launch) {
    yield put(
      LaunchLibraryActions.fetchLibraryLaunchSuccess({
        launches: Launch,
        start: params.Start,
        end: params.End,
      })
    )
  } else {
    yield put(LaunchLibraryActions.fetchLibraryLaunchError('Error fetching LaunchLibrary api'))
    console.log('Error fetching LaunchLibrary api')
  }
}
