import { Text, Icon, Tab, Tabs, StyleProvider, Spinner } from 'native-base'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Colors from 'App/Theme/Colors'
import getTheme from 'App/native-base-theme/components'
import material from 'App/native-base-theme/variables/material'
import NavigationService from 'App/Services/NavigationService'
import InfoContent from 'App/Components/LaunchInfoScreenContent/InfoContent'
import { pushNotifications } from 'App/Services/Index'

class TestScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      launch: null,
      nameSize: 24,
    }
  }

  componentDidMount() {
    let launch = this.props.navigation.state.params.item.launches[0].launch
    let s = 24
    if (launch.name.length > 28) {
      s = 16
    }

    this.setState((previousState) => ({
      launch: launch,
      nameSize: s,
    }))
  }

  ExitScreen = () => {
    NavigationService.navigateAndReset('CalendarScreen')
  }

  RenderInfoContent() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.contentBackground }}>
        <Text> t </Text>
      </View>
    )
  }

  setLaunchNotification = () => {
    pushNotifications.scheduledNotification({
      date: new Date(Date.now() + 10 * 1000),
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: 'My big text that will be shown when notification is expanded',
      subText: 'This is a subText',
      color: 'green',
      vibrate: true,
      vibration: 300,
      title: this.state.launch.name,
      message: 'Rocket will be launched in '(this.state.launch.netstamp - Date.now() / 1000),
      playSound: true,
      soundName: 'default',
    })
  }

  render() {
    console.log(this.state.launch)
    if (this.state.launch !== null) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.iconBar}>
              <TouchableOpacity onPress={this.ExitScreen} style={styles.iconBarIconLeft}>
                <Icon name="arrow-left" type="Feather" style={styles.iconBarIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.setLaunchNotification}
                style={styles.iconBarIconRight}
              >
                <Icon name="bell" type="Feather" style={styles.iconBarIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.titleBox}>
              <View>
                <Text style={({ fontSize: this.state.nameSize }, styles.launchNameText)}>
                  {this.state.launch.name}
                </Text>
                <Text style={styles.launchDateText}>
                  {new Date(this.state.launch.netstamp * 1000).toString().substring(0, 24)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <StyleProvider style={getTheme(material)}>
              <Tabs>
                <Tab heading="Info">
                  <InfoContent />
                </Tab>
                <Tab heading="Mission">
                  <View style={{ flex: 1, backgroundColor: Colors.primary }} />
                </Tab>
                <Tab heading="Links">
                  <View style={{ flex: 1, backgroundColor: Colors.success }} />
                </Tab>
              </Tabs>
            </StyleProvider>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.loadingSpinner}>
          <Spinner color={Colors.launchDay} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    elevation: 0.4,
    backgroundColor: Colors.background,
  },
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
  titleBox: {
    flex: 0.6,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
  },
  launchNameText: {
    width: '90%',
    alignSelf: 'center',
    color: Colors.text,
    textAlign: 'center',
  },
  launchDateText: {
    fontSize: 14,
    color: Colors.disabledText,
    textAlign: 'center',
  },
  loadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.contentBackground,
  },
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
