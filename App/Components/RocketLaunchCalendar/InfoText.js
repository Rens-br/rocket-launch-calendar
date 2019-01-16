import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../Theme/Colors'

export default class InfoText extends Component {
  renderSubText() {
    if (this.props.subText) {
      let sub = this.props.subText
      sub = sub.slice(0, 50)
      sub += sub.length >= 50 ? '...' : ''
      return <Text style={styles.subText}>{sub}</Text>
    }
  }

  render() {
    return (
      <View style={(styles.container, { flex: 0.2, marginLeft: 16 })}>
        <View style={styles.content}>
          <Text style={styles.infoType}>{this.props.infoType}</Text>
          <Text style={styles.info}>{this.props.info}</Text>
          {this.renderSubText()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  info: {
    color: Colors.text,
    fontSize: 18,
  },
  infoType: {
    color: Colors.disabledText,
  },
  subText: {
    color: Colors.text,
  },
})
