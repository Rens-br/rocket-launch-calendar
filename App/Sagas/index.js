import { takeLatest } from 'redux-saga/effects'
import { PoCTypes } from 'App/Stores/PoC/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { fetchLaunch } from './PoCSaga'
import { startup } from './StartupSaga'
import { fetchNews } from './SpaceFlightNewsSaga'
import { SpaceFlightNewsTypes } from '../Stores/SpaceFlightNews/Actions'

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PoCTypes.FETCH_LAUNCH, fetchLaunch),
    takeLatest(SpaceFlightNewsTypes.FETCH_NEWS, fetchNews),
  ]
}
