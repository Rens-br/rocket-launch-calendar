import React, { Component } from 'react'
import { Alert, Text, FlatList, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'

export default class CardList extends Component {

  state = {
    isRefreshing: false,
    cards: this.props.cardData,
  }

  setCards = () => {
    this.state.cards = this.props.cardData

    console.log(this.state.cards)
  }

  render() {
    this.setCards()
    if (this.state.cards == null || this.state.cards == undefined) return null
    else {
      return (
        <FlatList
          data={this.state.cards}
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
          onRefresh={this.props.refresh}
          refreshing={this.props.refreshing}
          onEndReached={this.props.endReached}
          onEndReachedThreshold={0.5}
        />
      )
    }
  }
}