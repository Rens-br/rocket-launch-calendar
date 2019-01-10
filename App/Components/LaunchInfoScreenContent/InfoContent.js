import InfoText from 'App/Components/RocketLaunchCalendar/InfoText'
import Colors from 'App/Theme/Colors'
import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'

export default class InfoContent extends Component {
  renderMission(missions) {
    if (missions !== undefined && missions !== null && missions.length !== 0) {
      return (
        <View style={styles.missionFilledContent}>
          <InfoText infoType={'Mission'} info={missions[0].name} subText={missions[0].typeName} />
          <Divider style={styles.divider} />
          <InfoText
            infoType={'Agency'}
            info={missions[0].agencies === null ? 'Unknown' : missions[0].agencies[0].name}
          />
          <Divider style={styles.divider} />
          <View style={styles.missionDescContent}>
            <Text style={styles.missionDescType}>Description</Text>
            <Text style={styles.missionDescInfo}>{missions[0].description}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.missionEmptyContent}>
          <InfoText infoType={'Mission'} info={'Unknown'} />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <InfoText infoType={'Launch Service Provider'} info={this.props.launch.lsp.name} />
          <Divider style={styles.divider} />
          <InfoText
            infoType={'Rocket'}
            info={
              this.props.launch.rocket === undefined ? 'Unknown' : this.props.launch.rocket.name
            }
          />
          <Divider style={styles.divider} />
          <InfoText
            infoType={'Location'}
            info={this.props.launch.location.pads[0].name.substring(
              0,
              this.props.launch.location.pads[0].name.indexOf(',')
            )}
            subText={
              this.props.launch.location === undefined ? '' : this.props.launch.location.name
            }
          />
          <Divider style={styles.divider} />
          {this.renderMission(this.props.launch.missions)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
  content: {
    marginTop: 12,
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: Colors.background,
    marginTop: 20,
    marginBottom: 4,
  },
  missionFilledContent: {
    flex: 1.9,
  },
  missionEmptyContent: {
    flex: 1,
  },
  missionDescContent: {
    flex: 1,
    margin: 10,
    marginTop: 4,
  },
  missionDescType: {
    color: Colors.disabledText,
    fontSize: 14,
  },
  missionDescInfo: {
    color: Colors.text,
    fontSize: 16,
  },
})
