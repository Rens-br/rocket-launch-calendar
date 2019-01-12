import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import CardList from 'App/Components/RocketLaunchCalendar/CardList'
import Colors from 'App/Theme/Colors'
import { Spinner } from 'native-base'

class NewsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      refreshing: false,
      currentPage: 1,
    }
  }

  componentDidMount() {
    this.getNews()
  }

  getNews = () => {
    this.setState((previousState) => ({ currentPage: 1 }))
    this.props.fetchNews(this.state.currentPage)
    this.createCardList()
  }

  addNews = () => {
    this.setState((previousState) => ({ currentPage: previousState.currentPage + 1 }))
    this.props.fetchNews(this.state.currentPage + 1)
    this.addCards(this.state.currentPage + 1)
  }

  createCardList = () => {
    if (
      this.props.articles === undefined ||
      this.props.articles === null ||
      this.props.articles.Page !== 1
    ) {
      let t = this
      setTimeout(function() {
        t.createCardList()
      }, 1000)
      return
    }
    let c = []
    for (let i = 0; i < this.props.articles.News.length; i++) {
      c.push({
        type: 'Article',
        date: this.props.articles.News[i].date_added,
        data: this.props.articles.News[i],
      })
    }
    this.setState((previousState) => ({ cards: c }))
    this.render()
  }

  addCards = (page) => {
    let t = this
    if (this.props.articles.Page !== page) {
      setTimeout(function() {
        t.addCards(page)
      }, 1000)
      return
    }
    for (let i = 0; i < this.props.articles.News.length; i++) {
      this.state.cards.push({
        type: 'Article',
        date: this.props.articles.News[i].date_added,
        data: this.props.articles.News[i],
      })
    }
  }

  render() {
    if (
      this.state.cards !== null &&
      this.state.cards !== undefined &&
      this.state.cards.length !== 0
    ) {
      return (
        <View style={styles.newsScreen}>
          <CardList
            cardData={this.state.cards}
            refresh={this.getNews}
            refreshing={this.props.loading === undefined ? false : this.props.loading}
            ref={(ref) => {
              this.flatListRef = ref
            }}
            onEndReachedThreshold={1}
            endReached={this.addNews}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.loadingSpinner}>
          <Spinner color={Colors.launchDay} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  newsScreen: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
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
  fetchNews: (page) => dispatch(SpaceFlightNewsActions.fetchNews(page)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsScreen)
