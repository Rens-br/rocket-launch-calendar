import React, { Component } from 'react'
import { Footer, FooterTab, Button, Icon, Text, StyleProvider, View } from 'native-base'
import { Divider } from 'react-native-paper'
import Colors from 'App/Theme/Colors'
import { StyleSheet } from 'react-native'
import InfoText from 'App/Components/RocketLaunchCalendar/InfoText'

export default class InfoContent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <InfoText infoType={'Launch Service Provider'} info={'Arianespace'} />
          <Divider
            style={{
              height: 2,
              backgroundColor: Colors.background,
              marginTop: 4,
              marginBottom: 4,
            }}
          />
          <InfoText infoType={'Rocket'} info={'Vega'} />
          <Divider
            style={{
              height: 2,
              backgroundColor: Colors.background,
              marginTop: 4,
              marginBottom: 4,
            }}
          />
          <InfoText
            infoType={'Location'}
            info={'Ariane Launch Area 1'}
            subText={'Kourou, French Guiana'}
          />
          <Divider
            style={{
              height: 2,
              backgroundColor: Colors.background,
              marginTop: 4,
              marginBottom: 4,
            }}
          />
          <InfoText infoType={'Agency'} info={'European Space Agency'} />
          <Divider
            style={{
              height: 2,
              backgroundColor: Colors.background,
              marginTop: 4,
              marginBottom: 4,
            }}
          />
          <InfoText infoType={'Mission'} info={'ADM-Aeolus'} subText={'Earth science'} />
          <Divider
            style={{
              height: 2,
              backgroundColor: Colors.background,
              marginTop: 4,
              marginBottom: 4,
            }}
          />
          <View style={{ flex: 1, margin: 10, marginTop: 4 }}>
            <Text style={{ color: Colors.disabledText, fontSize: 14 }}>Description</Text>
            <Text style={{ color: Colors.text, fontSize: 16 }}>
              ADM-Aeolus is an Earth observation satellite build by Airbus Defense and Space for
              ESA. Its goal is to directly observe wind profiles from space on a global scale and
              provide data that could improve weather forecasting and advance understanding of
              atmospherics dynamics and climate. The Aeolus satellite weighs around 1366 kg and will
              fly in low sun-synchronous orbit at about 400 km altitude. There it will be monitoring
              weather around the world for 3 years.
            </Text>
          </View>
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
})
