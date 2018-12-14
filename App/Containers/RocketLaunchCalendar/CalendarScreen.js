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
      dates: [],
    }
  }

  componentDidMount() {
    this.GetCurrentMonday()
  }

  GetNextMonday = () => {
    let nDate = new Date(
      this.state.currentMonday.getFullYear(),
      this.state.currentMonday.getMonth(),
      this.state.currentMonday.getDate() + 7
    )

    this.setState((previousState) => ({
      currentMonday: nDate,
      dates: [],
    }))

    if (
      nDate < new Date(this.props.savedLibraryLaunches.start) ||
      nDate > new Date(this.props.savedLibraryLaunches.end)
    ) {
      if (
        nDate < new Date(this.props.libraryLaunches.start) ||
        nDate > new Date(this.props.libraryLaunches.end)
      ) {
        this.GetMonthLaunches(nDate)
      }
    }
  }

  GetPreviousMonday = () => {
    let nDate = new Date(
      this.state.currentMonday.getFullYear(),
      this.state.currentMonday.getMonth(),
      this.state.currentMonday.getDate() - 7
    )

    this.setState((previousState) => ({
      currentMonday: nDate,
      dates: [],
    }))

    if (
      nDate < new Date(this.props.savedLibraryLaunches.start) ||
      nDate > new Date(this.props.savedLibraryLaunches.end)
    ) {
      if (
        nDate < new Date(this.props.libraryLaunches.start) ||
        nDate > new Date(this.props.libraryLaunches.end)
      ) {
        console.log(nDate)
        this.GetMonthLaunches(nDate)
      }
    }
  }

  GetCurrentMonday = () => {
    this.setState((previousState) => ({ currentMonday: null }))
    var date = new Date()
    var day = date.getDate()
    var weekday = date.getDay()
    if (weekday === 0) date.setDate(day - 6)
    else date.setDate(day - (weekday - 1))
    this.setState((previousState) => ({ currentMonday: date }))
    this.props.fetchLibraryLaunch(
      date,
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 35)
    )
  }

  GetMonthLaunches = (date) => {
    this.props.fetchLibraryLaunch(
      date,
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 35)
    )
  }

  GetDates = () => {
    let useSavedDates = false
    if (
      this.state.currentMonday >= new Date(this.props.savedLibraryLaunches.start) &&
      this.state.currentMonday <= new Date(this.props.savedLibraryLaunches.end)
    ) {
      useSavedDates = true
    }

    if (this.props.savedLibraryLaunches === undefined) {
      this.props.saveLibraryLaunches()
      return null
    }
    const dates = []
    for (let i = 0; i < 7; i++) {
      let d = new Date(
        this.state.currentMonday.getFullYear(),
        this.state.currentMonday.getMonth(),
        this.state.currentMonday.getDate() + i
      )
      let l = []
      if (useSavedDates) {
        for (let i = 0; i < this.props.savedLibraryLaunches.launches.length; i++) {
          if (
            new Date(this.props.savedLibraryLaunches.launches[i].date).toDateString() ===
            d.toDateString()
          ) {
            l.push(this.props.savedLibraryLaunches.launches[i])
          }
        }
      } else {
        console.log(this.props.libraryLaunches.launches)
        for (let j = 0; j < this.props.libraryLaunches.launches.length; j++) {
          if (this.props.libraryLaunches.launches[j].date.toDateString() === d.toDateString()) {
            l.push(this.props.libraryLaunches.launches[j])
          }
        }
      }
      let e = false
      if (l.length !== 0) e = true
      dates.push({
        day: i,
        launchDay: e,
        date: d,
      })
    }
    console.log(dates)
    this.setState((previousState) => ({ dates: dates }))
  }

  CreateCalendar() {
    if (this.state.currentMonday === null || this.props.libraryLoading) {
      return <Text style={{ fontSize: 40, color: '#fafafa' }}>Loading</Text>
    } else if (this.state.dates.length === 0) {
      this.GetDates()
    } else {
      console.log(this.state)
      if (this.state.calendarType === 0) {
        return (
          <View>
            <Button onPress={this.GetNextMonday}>Next week</Button>
            <Button onPress={this.GetPreviousMonday}>Previous week</Button>
            <View>
              <Calendar dates={this.state.dates} style={styles.calendar} />
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
  savedLibraryLaunches: state.launchLibrary.savedLaunches,
  libraryLoading: state.launchLibrary.loading,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentDate: () => dispatch(MainActions.setCurrentDate()),
  fetchNews: () => dispatch(SpaceFlightNewsActions.fetchNews()),
  fetchSpacexLaunch: () => dispatch(SpacexActions.fetchSpacexLaunch()),
  fetchLibraryLaunch: (Start, End) => dispatch(LaunchLibraryActions.fetchLibraryLaunch(Start, End)),
  saveLibraryLaunches: () => dispatch(LaunchLibraryActions.saveLibraryLaunches()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarScreen)
