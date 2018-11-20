import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Title, Paragraph, Card } from 'react-native-paper'

export default class LaunchCard extends Component {
  render() {
    return (
      <Card
        onPress={() => {
          Alert.alert('The Chameleon is Pressed')
        }}
      >
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content>
          <Title>Pressable Chameleon</Title>
          <Paragraph>This is a pressable chameleon. If you press me, I will alert.</Paragraph>
        </Card.Content>
      </Card>
    )
  }
}
