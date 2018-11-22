import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import Colors from 'App/Theme/Colors'
import { StyleSheet } from 'react-native'
import NavigationService from 'App/Services/NavigationService'

export default class BottomNavigationBar extends Component {
  state = [
    {enabled: true, screenName: 'MainScreen'},
    {enabled: false, screenName: 'SplashScreen'},
    {enabled: false, screenName: 'MainScreen'},
  ]

  changeScreen(screen){
    if(this.state[screen].enabled) return

    for(let i = 0; i < this.state.length; i++){
      i == screen ? this.state[i].enabled = true : this.state[i].enabled = false
    }
    NavigationService.navigateAndReset(this.state[screen].screenName)
    this.forceUpdate()
  }

  render() {
    return (
      <Footer>
        <FooterTab style={{ backgroundColor: Colors.background }}>
          <Button vertical onPress={() => this.changeScreen(0)}>
            <Icon name="home" type="Feather" style={this.state[0].enabled ? styles.enabled : styles.disabled} />
            <Text style={this.state[0].enabled ? styles.enabled : styles.disabled}>Activity</Text>
          </Button>
          <Button vertical onPress={() => this.changeScreen(1)}>
            <Icon name="calendar" type="Feather" style={this.state[1].enabled ? styles.enabled : styles.disabled}/>
            <Text style={this.state[1].enabled ? styles.enabled : styles.disabled}>Calendar</Text>
          </Button>
          <Button vertical onPress={() => this.changeScreen(2)}>
            <Icon name="settings" type="Feather" style={this.state[2].enabled ? styles.enabled : styles.disabled}/>
            <Text style={this.state[2].enabled ? styles.enabled : styles.disabled}>Settings</Text>
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