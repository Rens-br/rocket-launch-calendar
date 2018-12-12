import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MainActions from 'App/Stores/Main/Actions'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import SpacexActions from 'App/Stores/SpaceX/Actions'
import LaunchLibraryActions from 'App/Stores/LaunchLibrary/Actions'
import { Button } from 'react-native-paper'
import Calendar from 'App/Components/RocketLaunchCalendar/Calendar'

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarType: 0,
      currentMonday: null,
    }
  }

  componentDidMount() {
    this.GetCurrentMonday()
  }

  GetNextMonday = () => {
    this.setState((previousState) => ({
      currentMonday: new Date(
        previousState.currentMonday.getFullYear(),
        previousState.currentMonday.getMonth(),
        previousState.currentMonday.getDate() + 7
      ),
    }))
  }

  GetPreviousMonday = () => {
    this.setState((previousState) => ({
      currentMonday: new Date(
        previousState.currentMonday.getFullYear(),
        previousState.currentMonday.getMonth(),
        previousState.currentMonday.getDate() - 7
      ),
    }))
  }

  GetCurrentMonday = () => {
    this.setState((previousState) => ({ currentMonday: null }))
    var date = new Date()
    var day = date.getDate()
    var weekday = date.getDay()
    if (weekday === 0) date.setDate(day - 6)
    else date.setDate(day - (weekday - 1))
    this.setState((previousState) => ({ currentMonday: date }))
    console.log(this.state)
  }

  CreateCalendar() {
    if (this.state.currentMonday === null) {
      return <Text>Test</Text>
    } else {
      let dates = []
      for (let i = 0; i < 7; i++) {
        dates.push({
          day: i,
          launchDay: false,
          date: new Date(
            this.state.currentMonday.getFullYear(),
            this.state.currentMonday.getMonth(),
            this.state.currentMonday.getDate() + i
          ),
        })
      }
      console.log(dates)

      if (this.state.calendarType === 0) {
        return (
          <View>
            <Button onPress={this.GetNextMonday}>Next week</Button>
            <Button onPress={this.GetPreviousMonday}>Previous week</Button>
            <View>
              <Calendar dates={dates} style={styles.calendar} />
            </View>
          </View>
        )
      } else if (this.state.calendarType === 1) {
        return (
          <View>
            <Text>2</Text>
          </View>
        )
      }
    }
  }

  render() {
    return <View style={styles.mainScreen}>{this.CreateCalendar()}</View>
  }
}

const styles = StyleSheet.create({
  calendar: {
    alignItems: 'center',
  },
})

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
