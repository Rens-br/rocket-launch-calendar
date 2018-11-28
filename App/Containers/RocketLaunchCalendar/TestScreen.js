import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MainActions from 'App/Stores/Main/Actions'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import SpacexActions from 'App/Stores/SpaceX/Actions'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import Colors from 'App/Theme/Colors'
import NavigationService from 'App/Services/NavigationService'

class TestScreen extends React.Component {

  componentDidMount() {
    this.setDate()
  }

  setDate = () => {
    this.props.setCurrentDate()
    this.props.fetchNews()
    this.props.fetchSpacexLaunch()
    console.log(this.props.articles)
  }

  createNewsCard(){
    if(this.props.articles[0] != 'undefined'){
      return(
      <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: this.props.articles[0].url, title: this.props.articles[0].title, source: this.props.articles[0].news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center' }}>
        <Card.Cover source={{ uri: this.props.articles[0].featured_image }}/>
        <Card.Content>
          <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{this.props.articles[0].title}</Title>
          <Paragraph style={{ color: Colors.disabledText }}>{this.props.articles[0].news_site_long}</Paragraph>
        </Card.Content>
      </Card>)
    }
  }

  render() {
    return (
      <View style={styles.mainScreen}>
        {this.createNewsCard()}
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
  launches: state.spacex.launches,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentDate: () => dispatch(MainActions.setCurrentDate()),
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
  fetchSpacexLaunch: () => dispatch(SpacexActions.fetchSpacexLaunch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TestScreen)
