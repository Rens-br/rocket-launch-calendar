import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Switch } from 'react-native-paper'
import Colors from '../../Theme/Colors'

export default class SettingsToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: false,
    }
  }

  componentDidMount() {
    this.setState(() => ({
      isEnabled: this.props.initialState,
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>{this.props.text}</Text>
          <Switch
            style={styles.switch}
            color={Colors.launchDay}
            value={this.state.isEnabled}
            onValueChange={() => {
              this.props.onToggle(!this.state.isEnabled)
              this.setState(() => ({
                isEnabled: !this.state.isEnabled,
              }))
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    fontSize: 20,
    color: Colors.text,
  },
  switch: {
    flex: 0,
  },
})
