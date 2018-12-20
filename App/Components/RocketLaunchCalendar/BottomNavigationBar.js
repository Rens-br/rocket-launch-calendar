import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text, StyleProvider } from 'native-base'
import Colors from 'App/Theme/Colors'
import { StyleSheet } from 'react-native'
import NavigationService from 'App/Services/NavigationService'

export default class BottomNavigationBar extends Component {
  state = {
    buttons: [
      { enabled: true, screenName: 'NewsScreen' },
      { enabled: false, screenName: 'CalendarScreen' },
      { enabled: false, screenName: 'SettingsScreen' },
    ],
  }

  changeScreen(screen) {
    if (this.state.buttons[screen].enabled) return

    for (let i = 0; i < this.state.buttons.length; i++) {
      this.state.buttons[i].enabled = i === screen
    }
    NavigationService.navigateAndReset(this.state.buttons[screen].screenName)
    this.forceUpdate()
  }

  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: Colors.background }}>
          <Button vertical onPress={() => this.changeScreen(0)}>
            <Icon
              name="file-text"
              type="Feather"
              style={this.state.buttons[0].enabled ? styles.enabled : styles.disabled}
            />
            <Text style={this.state.buttons[0].enabled ? styles.enabled : styles.disabled}>
              News
            </Text>
          </Button>
          <Button vertical onPress={() => this.changeScreen(1)}>
            <Icon
              name="calendar"
              type="Feather"
              style={this.state.buttons[1].enabled ? styles.enabled : styles.disabled}
            />

            <Text style={this.state.buttons[1].enabled ? styles.enabled : styles.disabled}>
              Calendar
            </Text>
          </Button>
          <Button vertical onPress={() => this.changeScreen(2)}>
            <Icon
              name="settings"
              type="Feather"
              style={this.state.buttons[2].enabled ? styles.enabled : styles.disabled}
            />
            <Text style={this.state.buttons[2].enabled ? styles.enabled : styles.disabled}>
              Settings
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

const styles = StyleSheet.create({
  enabled: {
    color: Colors.text,
  },
  disabled: {
    color: Colors.disabledText,
  },
})
