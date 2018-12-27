import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { Card, Paragraph, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
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
    if (this.state.cards == null || this.state.cards === undefined) return null
    else {
      return (
        <FlatList
          data={this.state.cards}
          keyExtractor={(item) => item.data._id}
          renderItem={({ item }) => {
            return (
              <PaperProvider theme={theme}>
                <Card
                  onPress={() => {
                    NavigationService.navigate('WebViewScreen', {
                      url: item.data.url,
                      title: item.data.title,
                      source: item.data.news_site_long,
                    })
                  }}
                  style={{ borderRadius: 12, width: '90%', alignSelf: 'center', marginTop: 20 }}
                >
                  <Card.Cover source={{ uri: item.data.featured_image }} />
                  <Card.Content>
                    <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>
                      {item.data.title}
                    </Title>
                    <Paragraph style={{ color: Colors.disabledText }}>
                      {item.data.news_site_long}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </PaperProvider>
            )
          }}
          onRefresh={this.props.refresh}
          refreshing={this.props.refreshing}
          onEndReached={this.props.endReached}
          onEndReachedThreshold={0.5}
        />
      )
    }
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
}
