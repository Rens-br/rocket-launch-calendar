import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import CardList from 'App/Components/RocketLaunchCalendar/CardList'

class NewsScreen extends React.Component {

  cards = []

  componentDidMount() {
    this.fetchNews()
  }

  fetchNews = () => {
    this.props.fetchNews(this.props.currentDate)
    this.createCardList()
  }

  createCardList = () => {
    for (let i = 0; i < this.props.articles.length; i++){
      this.cards.push({type: 'Article', date: this.props.articles[i].date_added, data: this.props.articles[i]})
    }
  }

  render() {
    return (
      <View style={styles.newsScreen}>
        <CardList cardData={this.cards}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  newsScreen: {
    flex: 1,
  },
})

NewsScreen.propsTypes = {
  currentDate: PropTypes.object,
}

const mapStateToProps = (state) => ({
  currentDate: state.main.currentDate,
  articles: state.spaceFlightNews.articles,
})

const mapDispatchToProps = (dispatch) => ({
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsScreen)
