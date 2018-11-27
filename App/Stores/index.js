import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as SpaceFlightNewsReducer } from './SpaceFlightNews/Reducers'
import { reducer as MainReducer } from './Main/Reducers'

export default () => {
  const rootReducer = combineReducers({
    main: MainReducer,
    spaceFlightNews: SpaceFlightNewsReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
