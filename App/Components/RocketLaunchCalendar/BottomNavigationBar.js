import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
export default class BottomNavigationBar extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="home" type="Feather" />
            <Text>Activity</Text>
          </Button>
          <Button vertical>
            <Icon name="calendar" type="Feather" />
            <Text>Calendar</Text>
          </Button>
          <Button vertical active>
            <Icon active name="settings" type="Feather" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
