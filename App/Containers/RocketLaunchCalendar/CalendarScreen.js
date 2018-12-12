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
import Calendar from 'App/Components/RocketLaunchCalendar/Calendar'

class CalendarScreen extends React.Component {
  componentDidMount() {}

  state = {
    calendarType: 0,
    month: 1,
  }

  increaseMonth = () => {
    this.state.month = ((this.state.month + 1) % 12)
    this.forceUpdate()
  }

  CreateCalendar() {
    if(this.state.calendarType === 0){
      return(
        <View>
          <Button onPress={this.increaseMonth}>Next Month</Button>
          <Text>{new Date(2018, this.state.month +1, 0).getDate()}</Text>
          <View>
            <Calendar dates={[true,false,false,true,false,true,true]} style={{alignItems: 'center'}}/>
          </View>
        </View>
      )
    }
    else if(this.state.calendarType === 1){
      return(
        <View>
          <Text>2</Text>
        </View>
      )
    }
  }

  render() {
    return <View style={styles.mainScreen}>{this.CreateCalendar()}</View>
  }
}

const styles = StyleSheet.create({})

CalendarScreen.propsTypes = {
  currentDate: PropTypes.object,
}

const mapStateToProps = (state) => ({
  currentDate: state.main.currentDate,
  articles: state.spaceFlightNews.articles,
  spacexLaunches: state.spacex.launches,
  libraryLaunches: state.launchLibrary.launches,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentDate: () => dispatch(MainActions.setCurrentDate()),
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
  fetchSpacexLaunch: () => dispatch(SpacexActions.fetchSpacexLaunch()),
  fetchLibraryLaunch: () => dispatch(LaunchLibraryActions.fetchLibraryLaunch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen)
