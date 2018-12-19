import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { Spinner, Icon } from 'native-base'
import MainActions from 'App/Stores/Main/Actions'
import SpaceFlightNewsActions from 'App/Stores/SpaceFlightNews/Actions'
import SpacexActions from 'App/Stores/SpaceX/Actions'
import LaunchLibraryActions from 'App/Stores/LaunchLibrary/Actions'
import Calendar from 'App/Components/RocketLaunchCalendar/Calendar'
import Colors from 'App/Theme/Colors'
import { DatePicker } from 'App/Components/RocketLaunchCalendar/DatePicker'
import NavigationService from 'App/Services/NavigationService'

class CalendarScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      calendarType: 0,
      currentMonday: new Date(),
      dates: [],
      weekNumber: 0,
    }
  }

  componentDidMount() {
    this.GetCurrentMonday()
    this.GetWeekNumber(new Date())
  }

  GetWeekNumber = (week) => {
    let d = new Date(Date.UTC(week.getFullYear(), week.getMonth(), week.getDate()))

    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
    this.setState((previousState) => ({ weekNumber: weekNo }))
  }

  GetNextMonday = () => {
    console.log(this.state)
    let nDate = new Date(
      this.state.currentMonday.getFullYear(),
      this.state.currentMonday.getMonth(),
      this.state.currentMonday.getDate() + 7
    )

    this.setState((previousState) => ({
      currentMonday: nDate,
      dates: [],
    }))

    this.GetWeekNumber(nDate)

    if (this.props.savedLaunches === undefined) {
      this.GetMonthLaunches(nDate)
    } else {
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
  }

  GetPreviousMonday = (week) => {
    console.log(this.state)
    let nDate = new Date(
      this.state.currentMonday.getFullYear(),
      this.state.currentMonday.getMonth(),
      this.state.currentMonday.getDate() - 7
    )

    this.setState((previousState) => ({
      currentMonday: nDate,
      dates: [],
    }))

    this.GetWeekNumber(nDate)

    if (
      nDate < new Date(this.props.savedLibraryLaunches.start) ||
      nDate > new Date(this.props.savedLibraryLaunches.end)
    ) {
      if (
        nDate < new Date(this.props.libraryLaunches.start) ||
        nDate > new Date(this.props.libraryLaunches.end)
      ) {
        this.GetMonthLaunches(new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() - 35))
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

  SetCurrentMonday = (date) => {
    var day = date.getDate()
    var weekday = date.getDay()
    if (weekday === 0) date.setDate(day - 6)
    else date.setDate(day - (weekday - 1))

    this.setState((previousState) => ({
      currentMonday: date,
      dates: [],
    }))

    this.GetWeekNumber(date.toString())

    if (
      date < new Date(this.props.savedLibraryLaunches.start) ||
      date > new Date(this.props.savedLibraryLaunches.end)
    ) {
      if (
        date < new Date(this.props.libraryLaunches.start) ||
        date > new Date(this.props.libraryLaunches.end)
      ) {
        this.GetMonthLaunches(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 35))
      }
    }
  }

  GetMonthLaunches = (date, size) => {
    this.props.fetchLibraryLaunch(
      date,
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + 35)
    )
  }

  GetDates = () => {
    let useSavedDates = false
    if (this.props.savedLibraryLaunches !== undefined) {
      if (
        this.state.currentMonday >= new Date(this.props.savedLibraryLaunches.start) &&
        this.state.currentMonday <= new Date(this.props.savedLibraryLaunches.end)
      ) {
        useSavedDates = true
      }
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
        launches: l,
      })
    }
    this.setState((previousState) => ({ dates: dates }))
  }

  onPressItem(item) {
    NavigationService.navigate('LaunchInfoScreen', { item })
  }

  CreateCalendar() {
    if (this.state.currentMonday === null || this.props.libraryLoading) {
      return (
        <View style={styles.loadingSpinner}>
          <Spinner color={Colors.launchDay} />
        </View>
      )
    } else if (this.state.dates.length === 0) {
      this.GetDates()
    } else {
      console.log(this.state)
      if (this.state.calendarType === 0) {
        return (
          <View style={styles.calendarView}>
            <Calendar
              dates={this.state.dates}
              style={styles.calendar}
              pressItem={this.onPressItem}
            />
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
    return (
      <View style={styles.mainView}>
        <View style={styles.header}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.RefreshDates} style={styles.iconBarIconLeft}>
              <Icon name="refresh-ccw" type="Feather" style={styles.iconBarIcon} />
            </TouchableOpacity>
            <DatePicker
              defaultDate={this.state.currentMonday}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={true}
              animationType={'fade'}
              androidMode={'default'}
              onDateChange={this.SetCurrentMonday}
              icon={'calendar'}
              iconType={'Feather'}
              iconColor={Colors.text}
              style={styles.iconBarIconRight}
            />
          </View>
          <View style={styles.weekBox}>
            <TouchableOpacity onPress={this.GetPreviousMonday}>
              <Icon name="chevron-left" type="Feather" style={styles.weekBoxChevron} />
            </TouchableOpacity>
            <View>
              <Text style={styles.weekBoxWeekText}>Week {this.state.weekNumber}</Text>
              <Text style={styles.weekBoxDateText}>
                {this.state.currentMonday.toDateString().substring(4, 10)}
                {' - '}
                {new Date(
                  this.state.currentMonday.getFullYear(),
                  this.state.currentMonday.getMonth(),
                  this.state.currentMonday.getDate() + 6
                )
                  .toDateString()
                  .substring(4, 10)}
              </Text>
            </View>
            <TouchableOpacity onPress={this.GetNextMonday}>
              <Icon name="chevron-right" type="Feather" style={styles.weekBoxChevron} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
        </View>
        {this.CreateCalendar()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.contentBackground,
  },
  mainView: {
    flex: 1,
  },
  calendarView: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
  calendar: {
    alignItems: 'center',
  },
  header: { flex: 0.2 },
  iconBar: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    flex: 0.3,
  },
  iconBarIconLeft: {
    flex: 1,
  },
  iconBarIconRight: {
    flex: 0,
  },
  iconBarIcon: {
    color: Colors.text,
  },
  weekBox: {
    flex: 0.6,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  weekBoxChevron: {
    fontSize: 48,
    color: Colors.text,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
  },
  weekBoxWeekText: {
    fontSize: 32,
    color: Colors.text,
    textAlign: 'center',
  },
  weekBoxDateText: {
    fontSize: 14,
    color: Colors.disabledText,
    textAlign: 'center',
    marginTop: -5,
  },
  divider: {
    backgroundColor: Colors.disabledText,
    flex: 0.02,
    width: '80%',
    alignSelf: 'center',
    marginTop: 5,
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
