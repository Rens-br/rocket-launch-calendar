import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as PoCReducer } from './PoC/Reducers'
import { reducer as MainReducer } from './Main/Reducers'

export default () => {
  const rootReducer = combineReducers({
    main: MainReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
