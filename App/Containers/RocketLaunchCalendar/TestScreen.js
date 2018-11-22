import React from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import MainActions from 'App/Stores/Main/Actions'
import { Card, Title, Paragraph, Text } from 'react-native-paper'
import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

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
          <Card style={{ borderRadius: 8, width: '90%', alignSelf: 'center' }}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
            <Card.Content>
              <Title>Card title</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
          </Card>
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
