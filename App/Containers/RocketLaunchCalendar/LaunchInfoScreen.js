import { Text, Icon, Tab, Tabs, StyleProvider } from 'native-base'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Colors from 'App/Theme/Colors'
import getTheme from 'App/native-base-theme/components'
import material from 'App/native-base-theme/variables/material'
import NavigationService from 'App/Services/NavigationService'

class TestScreen extends React.Component {
  componentDidMount() {}

  ExitScreen = () => {
    NavigationService.navigateAndReset('CalendarScreen')
  }

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.ExitScreen} style={styles.iconBarIconLeft}>
              <Icon name="arrow-left" type="Feather" style={styles.iconBarIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.RefreshDates} style={styles.iconBarIconRight}>
              <Icon name="bell" type="Feather" style={styles.iconBarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.weekBox}>
            <View>
              <Text style={styles.weekBoxWeekText}>Falcon 1 | FalconSAT-2</Text>
              <Text style={styles.weekBoxDateText}>March 24, 2006 22:30:00 UT</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <StyleProvider style={getTheme(material)}>
            <Tabs>
              <Tab heading="Info">
                <View style={{ flex: 1, backgroundColor: Colors.launchDay }} />
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
  weekBox: {
    flex: 0.6,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30,
  },
  weekBoxWeekText: {
    fontSize: 24,
    color: Colors.text,
    textAlign: 'center',
    backgroundColor: Colors.background,
  },
  weekBoxDateText: {
    fontSize: 14,
    color: Colors.disabledText,
    textAlign: 'center',
  },
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
