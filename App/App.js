import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import createStore from 'App/Stores'
import RootScreen from './Containers/Root/RootScreen'
import { pushNotifications } from 'App/Services/Index'

const { store, persistor } = createStore()

export default class App extends Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true
    pushNotifications.configure()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootScreen />
        </PersistGate>
      </Provider>
    )
  }
}
