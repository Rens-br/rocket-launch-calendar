import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { Divider } from 'react-native-paper'
import SettingsToggle from 'App/Components/RocketLaunchCalendar/SettingsToggle'
import SettingsSelection from 'App/Components/RocketLaunchCalendar/SettingsSelection'
import Colors from '../../Theme/Colors'
import SettingsActions from '../../Stores/Settings/Actions'
import { connect } from 'react-redux'

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ color: Colors.launchDay, marginBottom: 4, marginLeft: 10, marginTop: 8 }}>
            Notifications
          </Text>
          <SettingsToggle
            text={'Notification Sound'}
            onToggle={this.props.toggleSound}
            initialState={this.props.notificationSound}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <SettingsToggle
            text={'Notification Vibration'}
            onToggle={this.props.toggleVibration}
            initialState={this.props.notificationVibration}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <SettingsSelection
            numeric
            text={'Notification Interval'}
            options={this.props.notificationIntervals}
            onChangeValue={(a) => this.props.setNotificationIntervals(a)}
            suffix={'Minutes'}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <Text style={{ color: Colors.launchDay, marginBottom: 4, marginLeft: 10, marginTop: 8 }}>
            News
          </Text>
          <SettingsSelection canBeEmpty text={'Shown tags'} options={[]} defaultState={'All'} />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <SettingsSelection
            canBeEmpty
            text={'Shown news sources'}
            options={[]}
            defaultState={'All'}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
  header: {
    flex: 0.1,
    elevation: 0.4,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.text,
    fontSize: 32,
  },
  content: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
})

const mapStateToProps = (state) => ({
  notificationIntervals: state.settings.notificationIntervals,
  notificationSound: state.settings.notificationSound,
  notificationVibration: state.settings.notificationVibration,
})

const mapDispatchToProps = (dispatch) => ({
  setNotificationIntervals: (intervals) =>
    dispatch(SettingsActions.setNotificationIntervals(intervals)),
  toggleVibration: () => dispatch(SettingsActions.toggleVibration()),
  toggleSound: () => dispatch(SettingsActions.toggleSound()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)
