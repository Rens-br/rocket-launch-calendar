import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text, StyleProvider, View } from 'native-base'
import Colors from 'App/Theme/Colors'
import { StyleSheet } from 'react-native'

export default class InfoContent extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.contentBackground }}>
        <Text> t </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
