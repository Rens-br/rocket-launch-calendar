import React, { Component } from 'react'
import { Alert, Text, FlatList, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'

export default class CardList extends Component {
  cards = this.props.cardData

  setcards = () => {
    this.cards = this.props.cardData
    this.cards.sort(function(a, b) {
      return a.date - b.date
    })
    console.log(this.cards)
  }

  render() {
    this.setcards()
    if (this.cards == null || this.cards == undefined) return null
    else {
      return (
        <FlatList
          data={this.cards}
          renderItem={({ item }) => {
            return (
              <Card onPress={() => {
                NavigationService.navigate('WebViewScreen', {
                  url: item.data.url,
                  title: item.data.title,
                  source: item.data.news_site_long,
                })
              }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 20 }}>
                <Card.Cover source={{ uri: item.data.featured_image }}/>
                <Card.Content>
                  <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{item.data.title}</Title>
                  <Paragraph style={{ color: Colors.disabledText }}>{item.data.news_site_long}</Paragraph>
                </Card.Content>
              </Card>)
          }
          }
        />
      )
    }
  }
}