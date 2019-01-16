import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Card, Paragraph, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import { Spinner } from 'native-base'

export default class CardList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      cards: null,
    }
  }

  UpdateList() {
    this.forceUpdate()
  }

  setCards = () => {
    if (this.state.cards !== this.props.cardData) {
      this.setState({ cards: this.props.cardData })
    }
  }

  render() {
    this.props.ref = this
    this.setCards()
    if (this.state.cards == null || this.state.cards === undefined) return null
    else {
      return (
        <FlatList
          data={this.state.cards}
          keyExtractor={(item) => item.data._id}
          ref={(ref) => {
            this.flatListRef = ref
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.loadingSpinner}>
                <Spinner color={Colors.launchDay} />
              </View>
            )
          }}
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
                  style={styles.card}
                >
                  <Card.Cover source={{ uri: item.data.featured_image }} />
                  <Card.Content>
                    <Title style={styles.cardTitle}>{item.data.title}</Title>
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

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 22,
    lineHeight: 24,
    marginTop: 10,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.contentBackground,
  },
})

const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
}
