import React from 'react'
import { View, WebView, StyleSheet, Platform, Clipboard } from 'react-native'
import { Header, Left, Title, Subtitle, Right, Body, Button, Icon, Text } from 'native-base'
import { Switch, Divider } from 'react-native-paper'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.content}>
          <Text style={{ color: Colors.launchDay, marginBottom: 4, marginLeft: 10, marginTop: 8 }}>Notifications</Text>
          <View
            style={{
              height: 50,
              margin: 2,
              marginRight: 10,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 20, color: Colors.text }}>Notification Sound</Text>
              <Switch
                style={{ flex: 0 }}
                color={Colors.launchDay}
                value={true}
                onValueChange={() => {}}
              />
            </View>
          </View>
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <View
            style={{
              height: 50,
              margin: 2,
              marginRight: 10,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 20, color: Colors.text }}>
                Notification Vibration
              </Text>
              <Switch
                style={{ flex: 0 }}
                color={Colors.launchDay}
                value={true}
                onValueChange={() => {}}
              />
            </View>
          </View>
          <Divider style={{ height: 2, backgroundColor: Colors.background }} />
          <View
            style={{
              height: 50,
              margin: 2,
              marginRight: 10,
              marginLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ flex: 1, fontSize: 20, color: Colors.text }}>
              Notification Interval
            </Text>
            <Text style={{ flex: 1, fontSize: 14, color: Colors.disabledText }}>5, 10, 30</Text>
          </View>
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
