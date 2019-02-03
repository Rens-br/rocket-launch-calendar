import InfoContent from 'App/Components/LaunchInfoScreenContent/InfoContent'
import LinkContent from 'App/Components/LaunchInfoScreenContent/LinkContent'
import getTheme from 'App/native-base-theme/components'
import material from 'App/native-base-theme/variables/material'
import { pushNotifications } from 'App/Services/Index'
import NavigationService from 'App/Services/NavigationService'
import MainActions from 'App/Stores/Main/Actions'
import Colors from 'App/Theme/Colors'
import { Icon, Spinner, StyleProvider, Tab, Tabs, Text } from 'native-base'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      launch: null,
      date: null,
      notificationTimes: [5, 10, 30],
      notificationIds: [],
      isSubscribed: false,
      canSubscribe: true,
    }
  }

  componentDidMount() {
    let launch = this.props.navigation.state.params.l.launch
    let date = this.props.navigation.state.params.l.date
    let canSubscribe = true

    let notifications = []
    let subscribed = false

    if (new Date(date) < new Date()) {
      canSubscribe = false
    }

    if (this.props.notificationIntervals !== null || this.props.notificationIntervals.length) {
      this.setState({ notificationTimes: this.props.notificationIntervals })
    }

    if (this.props.notifications !== undefined) {
      for (var i = 0; i < this.props.notifications.length; i++) {
        if (this.props.notifications[i].launchId === launch.id) {
          notifications = this.props.notifications[i].notificationIds
          subscribed = true
        }
      }
    }

    this.setState({
      launch: launch,
      date: date,
      notificationIds: notifications,
      isSubscribed: subscribed,
      canSubscribe: canSubscribe,
    })
  }

  ExitScreen = () => {
    NavigationService.navigateBack()
  }

  setDayNotification() {
    let date = new Date(this.state.date)
    date.setHours(0, 0, 0)
    pushNotifications.scheduledNotification({
      date: date,
      autoCancel: true,
      smallIcon: 'ic_notification',
      largeIcon: '',
      bigText:
        'The ' +
        this.state.launch.rocket.name +
        ' will be launched today! Check the app for more information',
      color: Colors.launchDay,
      vibrate: this.props.notificationVibration,
      vibration: 300,
      title: this.state.launch.name + ' launch is today!',
      message: 'Check the app for the exact time',
      playSound: this.props.notificationSound,
      soundName: 'default',
      id: this.state.launch.id.toString() + (0).toString(),
    })
  }

  unsubscribeLaunch = () => {
    this.props.removeNotificationsById(this.state.launch.id)
    pushNotifications.cancelLaunchNotifications(this.state.notificationIds)
    this.setState((previousState) => ({
      isSubscribed: false,
    }))
  }

  subscribeLaunch = () => {
    if (this.state.isSubscribed) {
      this.unsubscribeLaunch()
    } else {
      if (this.state.launch.netstamp !== 0) {
        if (new Date() <= new Date(this.state.launch.netstamp * 1000)) {
          this.setState((previousState) => ({
            isSubscribed: true,
          }))

          this.setLaunchNotification()
        } else {
          Alert.alert(
            'Error subscribing to launch',
            "This launch has already happened so you can't set a notification for it",
            [{ text: 'OK' }],
            { cancelable: true }
          )
        }
      } else {
        Alert.alert(
          'Error subscribing to launch',
          "We don't have an exact time for this launch yet, do you want to set a notification for the day?",
          [
            {
              text: 'OK',
              onPress: () => {
                this.setDayNotification()
                this.setState((previousState) => ({
                  isSubscribed: true,
                  notificationIds: [this.state.launch.id.toString() + (0).toString()],
                }))
                this.props.addNotification({
                  launchId: this.state.launch.id,
                  launchDate: this.state.launch.netstamp,
                  notificationIds: [this.state.launch.id.toString() + (0).toString()],
                })
              },
            },
            { text: 'Cancel' },
          ],
          { cancelable: true }
        )
      }
    }
  }
  //this.state.launch.netstamp * 1000 - this.state.notificationTimes[i] * 60000
  setLaunchNotification = () => {
    let ids = []

    for (let i = 0; i < this.state.notificationTimes.length; i++) {
      pushNotifications.scheduledNotification({
        date: new Date(Date.now() + this.state.notificationTimes[i] * 600),
        autoCancel: true,
        smallIcon: 'ic_notification',
        largeIcon: '',
        bigText:
          'The ' +
          this.state.launch.rocket.name +
          ' will be launched in ' +
          this.state.notificationTimes[i] +
          ' minutes!',
        color: Colors.launchDay,
        vibrate: this.props.notificationVibration,
        vibration: 300,
        title: this.state.launch.name + ' -  T-' + this.state.notificationTimes[i] + ' minutes',
        message: 'Rocket will be launched in ' + this.state.notificationTimes[i] + ' minutes!',
        playSound: this.props.notificationSound,
        soundName: 'default',
        id: this.state.launch.id.toString() + (i + 1).toString(),
      })
      ids.push(this.state.launch.id.toString() + (i + 1).toString())
    }
    this.setState((previousState) => ({
      isSubscribed: true,
      notificationIds: ids,
    }))
    this.props.addNotification({
      launchId: this.state.launch.id,
      launchDate: this.state.launch.netstamp,
      notificationIds: ids,
    })
  }

  render() {
    if (this.state.launch !== null) {
      return (
        <View style={styles.flexOne}>
          <View style={styles.header}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.ExitScreen} style={styles.iconBarIcon}>
                <Icon name="arrow-left" type="Feather" style={styles.iconBarIcon} />
              </TouchableOpacity>
              <View style={styles.flexOne}>
                <Text style={styles.launchNameText}>{this.state.launch.name}</Text>
                <Text style={styles.launchDateText}>
                  {new Date(this.state.date).toString().substring(0, 24)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={this.state.canSubscribe ? this.subscribeLaunch : null}
                style={styles.iconBarIcon}
              >
                <Icon
                  name={this.state.isSubscribed ? 'bell-off' : 'bell'}
                  type="Feather"
                  style={this.state.canSubscribe ? styles.iconBarIcon : styles.iconBarIconDisabled}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.flexOne}>
            <StyleProvider style={getTheme(material)}>
              <Tabs>
                <Tab heading="Info">
                  <InfoContent launch={this.state.launch} />
                </Tab>
                <Tab heading="Links">
                  <LinkContent launch={this.state.launch} />
                </Tab>
              </Tabs>
            </StyleProvider>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.loadingSpinner}>
          <Spinner color={Colors.launchDay} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    elevation: 0.4,
    backgroundColor: Colors.background,
  },
  iconBar: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    flex: 0.3,
  },
  flexOne: {
    flex: 1,
  },
  iconBarIcon: {
    color: Colors.text,
    flex: 0,
  },
  iconBarIconDisabled: {
    color: Colors.disabledText,
    flex: 0,
  },
  launchNameText: {
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
  },
  launchDateText: {
    fontSize: 14,
    color: Colors.disabledText,
    textAlign: 'center',
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.contentBackground,
  },
})

const mapStateToProps = (state) => ({
  notifications: state.main.notifications,
  notificationIntervals: state.settings.notificationIntervals,
  notificationVibration: state.settings.notificationVibration,
  notificationSound: state.settings.notificationSound,
})

const mapDispatchToProps = (dispatch) => ({
  addNotification: (notification) => dispatch(MainActions.addNotification(notification)),
  removeNotificationsById: (id) => dispatch(MainActions.removeNotificationsById(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
