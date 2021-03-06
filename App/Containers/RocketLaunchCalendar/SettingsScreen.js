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
  componentDidMount() {
    if (this.props.notificationIntervals === undefined) {
      this.props.setNotificationIntervals([5, 15, 30])
      this.forceUpdate()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.categoryTitle}>Notifications</Text>
          <SettingsToggle
            text={'Notification Sound'}
            onToggle={this.props.toggleSound}
            initialState={this.props.notificationSound}
          />
          <Divider style={styles.divider} />
          <SettingsToggle
            text={'Notification Vibration'}
            onToggle={this.props.toggleVibration}
            initialState={this.props.notificationVibration}
          />
          <Divider style={styles.divider} />
          <SettingsSelection
            numeric
            text={'Notification Interval'}
            options={this.props.notificationIntervals}
            onChangeValue={(a) => this.props.setNotificationIntervals(a)}
            suffix={'Minutes'}
            textPlaceholder={'Add interval'}
          />
          <Divider style={styles.divider} />
          <Text style={styles.categoryTitle}>News</Text>
          <SettingsSelection
            canBeEmpty
            text={'Blocked tags'}
            options={this.props.newsTags}
            defaultState={'None'}
            onChangeValue={(a) => this.props.setNewsTags(a)}
            textPlaceholder={'Add tag'}
          />
          <Divider style={styles.divider} />
          <SettingsSelection
            canBeEmpty
            text={'Blocked news sources'}
            options={this.props.newsSources}
            defaultState={'None'}
            onChangeValue={(a) => this.props.setNewsSources(a)}
            textPlaceholder={'Add news source'}
          />
          <Divider style={styles.divider} />
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
  divider: {
    height: 2,
    backgroundColor: Colors.background,
  },
  categoryTitle: {
    color: Colors.launchDay,
    marginBottom: 4,
    marginLeft: 10,
    marginTop: 8,
  },
})

const mapStateToProps = (state) => ({
  notificationIntervals: state.settings.notificationIntervals,
  notificationSound: state.settings.notificationSound,
  notificationVibration: state.settings.notificationVibration,
  newsTags: state.settings.newsTags,
  newsSources: state.settings.newsSources,
})

const mapDispatchToProps = (dispatch) => ({
  setNotificationIntervals: (intervals) =>
    dispatch(SettingsActions.setNotificationIntervals(intervals)),
  toggleVibration: () => dispatch(SettingsActions.toggleVibration()),
  toggleSound: () => dispatch(SettingsActions.toggleSound()),
  setNewsTags: (tags) => dispatch(SettingsActions.setNewsTags(tags)),
  setNewsSources: (sources) => dispatch(SettingsActions.setNewsSources(sources)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen)
