import { takeLatest } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchSpacexLaunch } from './SpacexSaga'
import { startup } from './StartupSaga'
import { fetchNews } from './SpaceFlightNewsSaga'
import { fetchLibraryLaunch } from './LaunchLibrarySaga'
import { SpaceFlightNewsTypes } from '../Stores/SpaceFlightNews/Actions'
import { SpacexTypes } from '../Stores/SpaceX/Actions'
import { LaunchLibraryTypes } from '../Stores/LaunchLibrary/Actions'

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(SpaceFlightNewsTypes.FETCH_NEWS, fetchNews),
    takeLatest(SpacexTypes.FETCH_SPACEX_LAUNCH, fetchSpacexLaunch),
    takeLatest(LaunchLibraryTypes.FETCH_LIBRARY_LAUNCH, fetchLibraryLaunch),
  ]
}
