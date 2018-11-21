import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PoCActions from 'App/Stores/PoC/Actions'
import LaunchList from 'App/Components/launchList'
import LaunchCard from '../../Components/LaunchCard'
import BottomNavigationBar from '../../Components/RocketLaunchCalendar/BottomNavigationBar'
import ApplicationStyles from '../../Theme/ApplicationStyles'
import Colors from '../../Theme/Colors'

class PoCScreen extends React.Component {

  componentDidMount() {
    this.fetchLaunches()
  }
  state = {
    currentMonth:  1,
  }

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  fetchLaunches = () => {
    this.props.fetchLaunch(this.state.currentMonth + 1)
  }

  nextMonth = () => {
    this.state.currentMonth = ((this.state.currentMonth + 1) % 12)
    this.fetchLaunches()
  }

  createCalendar = () => {
    this.props.Launches.map((prop, key) => {
      return (
        <Text>{prop.name}</Text>
      )})}

  render()
  {
    return (
      <View style={styles.mainScreen}>
        <Button onPress={this.fetchLaunches} title="Refresh" />
        <Button onPress={this.nextMonth} title={'current month: ' + this.months[this.state.currentMonth]} />
        <BottomNavigationBar/>
      </View>
    )

}}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

PoCScreen.propsTypes = {
  Launches: PropTypes.object,
}

const mapStateToProps = (state) => ({
  Launches: state.poc.Launches
})

const mapDispatchToProps = (dispatch) => ({
  fetchLaunch: (month) => dispatch(PoCActions.fetchLaunch(month)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PoCScreen)
