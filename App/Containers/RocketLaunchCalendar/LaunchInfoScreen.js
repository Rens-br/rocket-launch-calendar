import { Text } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

class TestScreen extends React.Component {
  componentDidMount() {}

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View>
        <Text>{this.props.navigation.state.params.item.date.toString()}</Text>
        <View>
          <Text>test</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
