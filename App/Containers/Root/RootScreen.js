<<<<<<< HEAD
import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import { View, StatusBar } from 'react-native'
import styles from './RootScreenStyle'
import TestScreen from 'App/Containers/RocketLaunchCalendar/TestScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { createStackNavigator } from 'react-navigation'
import BottomNavigationBar from '../../Components/RocketLaunchCalendar/BottomNavigationBar'
import Colors from 'App/Theme/Colors'
import WebViewScreen from 'App/Containers/RocketLaunchCalendar/WebViewScreen'
import NewsScreen from 'App/Containers/RocketLaunchCalendar/NewsScreen'

const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: TestScreen,
    WebViewScreen: WebViewScreen,
    NewsScreen: NewsScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.background },
  }
)

class RootScreen extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNav
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        <StatusBar backgroundColor={Colors.background} />
        <BottomNavigationBar />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
=======
import React, { Component } from 'react'
import NavigationService from 'App/Services/NavigationService'
import { View, StatusBar } from 'react-native'
import styles from './RootScreenStyle'
import TestScreen from 'App/Containers/RocketLaunchCalendar/TestScreen'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { createStackNavigator } from 'react-navigation'
import BottomNavigationBar from '../../Components/RocketLaunchCalendar/BottomNavigationBar'
import Colors from 'App/Theme/Colors'
import WebViewScreen from 'App/Containers/RocketLaunchCalendar/WebViewScreen'
import NewsScreen from 'App/Containers/RocketLaunchCalendar/NewsScreen'
import CalendarScreen from 'App/Containers/RocketLaunchCalendar/CalendarScreen'

const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    MainScreen: TestScreen,
    WebViewScreen: WebViewScreen,
    NewsScreen: NewsScreen,
    CalendarScreen: CalendarScreen,
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    cardStyle: { backgroundColor: Colors.background },
  }
)

class RootScreen extends Component {
  componentDidMount() {
    this.props.startup()
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNav
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
        <StatusBar backgroundColor={Colors.background} />
        <BottomNavigationBar />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
>>>>>>> master
