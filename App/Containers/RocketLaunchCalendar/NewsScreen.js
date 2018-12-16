import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import CardList from 'App/Components/RocketLaunchCalendar/CardList'
import Colors from 'App/Theme/Colors'

class NewsScreen extends React.Component {
  state = {
    cards: [],
    refreshing: false,
    currentPage: 1,
  }

  componentDidMount() {
    this.getNews()
  }

  getNews = () => {
    this.state.currentPage = 1
    this.props.fetchNews(this.state.currentPage)
    this.createCardList()
    console.log('fetch')
  }

  addNews = () => {
    this.state.currentPage++
    this.props.fetchNews(this.state.currentPage)
    this.addCards()
  }

  createCardList = () => {
    this.state.cards = []
    if (this.props.articles == 'undefined') return
    for (let i = 0; i < this.props.articles.length; i++){
      this.state.cards.push({
        type: 'Article',
        date: this.props.articles[i].date_added,
        data: this.props.articles[i],
      })
    }
  }

  addCards = () => {
    for (let i = 0; i < this.props.articles.length; i++) {
      this.state.cards.push({
        type: 'Article',
        date: this.props.articles[i].date_added,
        data: this.props.articles[i],
      })
    }
  }

  render() {
    return (
      <View style={styles.newsScreen}>
        <CardList
          cardData={this.state.cards}
          refresh={this.getNews}
          refreshing={this.props.loading}
          endReached={this.addNews}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newsScreen: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
})

NewsScreen.propsTypes = {
  currentDate: PropTypes.object,
}

const mapStateToProps = (state) => ({
  currentDate: state.main.currentDate,
  articles: state.spaceFlightNews.articles,
  loading: state.spaceFlightNews.loading,
})

const mapDispatchToProps = (dispatch) => ({
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsScreen)
