import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MainActions from 'App/Stores/Main/Actions'

class TestScreen extends React.Component {

  componentDidMount() {
    this.setDate()
  }

  setDate = () => {
    this.props.setCurrentDate()
    console.log(this.props.currentDate)
  }

  render()
  {
    return (
      <View style={styles.mainScreen}>
        <Button onPress={this.setDate} title={'refresh'} />
        <Text>{this.props.currentDate}</Text>
      </View>
    )

  }}

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
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentDate: () => dispatch(MainActions.setCurrentDate()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
