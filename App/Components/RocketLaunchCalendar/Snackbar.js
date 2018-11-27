import { Component } from 'react'

import React from 'react'
import { Snackbar as Snack, Button } from 'react-native-paper'
import { View } from 'react-native'

export default class Snackbar extends Component {
  state = {
    visible: true,
  }

  render() {
    return (
        <Snack
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
        >
          Link copied to clipboard!
        </Snack>
    )
  }
}