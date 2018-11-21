import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'

export default class BottomNavigationBar extends Component {
  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#3a4148',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'horizontal',
        }}
      >
        <Button title="Refresh" />
        <Button title="Refresh" />
        <Button title="Refresh" />
      </View>
    )
  }
}
