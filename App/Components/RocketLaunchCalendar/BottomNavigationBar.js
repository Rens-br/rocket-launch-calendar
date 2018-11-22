import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Text } from 'native-base'

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
          flexDirection: 'row',
        }}
      >
        <Button light>
          <Text> Light </Text>
        </Button>
      </View>
    )
  }
}
