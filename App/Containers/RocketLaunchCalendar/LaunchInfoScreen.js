import { Text, Icon, Tab, Tabs, StyleProvider } from 'native-base'
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Colors from 'App/Theme/Colors'
import getTheme from 'App/native-base-theme/components'
import material from 'App/native-base-theme/variables/material'

class TestScreen extends React.Component {
  componentDidMount() {}

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.RefreshDates} style={styles.iconBarIconLeft}>
              <Icon name="arrow-left" type="Feather" style={styles.iconBarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.weekBox}>
            <View>
              <Text style={styles.weekBoxWeekText}>Falcon 1 | FalconSAT-2</Text>
              <Text style={styles.weekBoxDateText}>March 24, 2006 22:30:00 UT</Text>
            </View>
          </View>
          <StyleProvider style={getTheme(material)}>
            <Tabs style={{ marginTop: 60 }}>
              <Tab heading="Info">
                <Text>t</Text>
              </Tab>
              <Tab heading="Mission">
                <Text>q</Text>
              </Tab>
              <Tab heading="Links">
                <Text>e</Text>
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
    flex: 0.2,
    elevation: 10,
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
  iconBarIcon: {
    color: Colors.text,
  },
  weekBox: {
    flex: 0.6,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -10,
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestScreen)
