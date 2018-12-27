import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'native-base'
import { Divider } from 'react-native-paper'
import SettingsToggle from 'App/Components/RocketLaunchCalendar/SettingsToggle'
import SettingsSelection from 'App/Components/RocketLaunchCalendar/SettingsSelection'
import Colors from '../../Theme/Colors'

export default class SettingsScreen extends React.Component {
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
            onToggle={(t) => {
              console.log(t)
            }}
            initialState={false}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <SettingsToggle
            text={'Notification Vibration'}
            onToggle={(t) => {
              console.log(t)
            }}
            initialState={true}
          />
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <SettingsSelection numeric text={'Notification Interval'} options={['10']} />
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
