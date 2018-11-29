import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MainActions from 'App/Stores/Main/Actions'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import SpacexActions from 'App/Stores/SpaceX/Actions'
import LaunchLibraryActions from 'App/Stores/LaunchLibrary/Actions'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import Colors from 'App/Theme/Colors'
import NavigationService from 'App/Services/NavigationService'
import CardList from 'App/Components/RocketLaunchCalendar/CardList'

class TestScreen extends React.Component {

  cards = []

  componentDidMount() {
    this.setDate()
  }

  setDate = () => {
    this.props.setCurrentDate()
    this.props.fetchNews()
    this.props.fetchSpacexLaunch()
    console.log(this.props.articles)
    this.createCardList()
    this.props.fetchLibraryLaunch()
  }

  createCardList = () => {
    for (let i = 0; i < this.props.spacexLaunches.length; i++){
      this.cards.push({type: 'Launch', date: this.props.spacexLaunches[i].launch_date_unix , data: this.props.spacexLaunches[i]})
    }
    for (let i = 0; i < this.props.articles.length; i++){
      this.cards.push({type: 'Article', date: this.props.articles[i].date_added, data: this.props.articles[i]})
    }

    this.cards.sort(function(a, b){return a.date - b.date})
  }

  createNewsCard(){
    if(this.props.articles[0] != 'undefined'){
      return(
      <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: this.props.articles[1].url, title: this.props.articles[1].title, source: this.props.articles[1].news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 20 }}>
        <Card.Cover source={{ uri: this.props.articles[1].featured_image }}/>
        <Card.Content>
          <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{this.props.articles[1].title}</Title>
          <Paragraph style={{ color: Colors.disabledText }}>{this.props.articles[1].news_site_long}</Paragraph>
        </Card.Content>
      </Card>)
    }
  }

  render() {
    return (
      <View style={styles.mainScreen}>
        <CardList cardData={this.cards}/>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
  },
})

TestScreen.propsTypes = {
  currentDate: PropTypes.object,
}

const mapStateToProps = (state) => ({
  currentDate: state.main.currentDate,
  articles: state.spaceFlightNews.articles,
  spacexLaunches: state.spacex.launches,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentDate: () => dispatch(MainActions.setCurrentDate()),
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
  fetchSpacexLaunch: () => dispatch(SpacexActions.fetchSpacexLaunch()),
  fetchLibraryLaunch: () => dispatch(LaunchLibraryActions.fetchLibraryLaunch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestScreen)
