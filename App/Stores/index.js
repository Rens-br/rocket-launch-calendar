import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from 'App/Sagas'
import { reducer as PoCReducer } from './PoC/Reducers'

export default () => {
  const rootReducer = combineReducers({
    poc: PoCReducer,
  })

  return configureStore(rootReducer, rootSaga)
}
