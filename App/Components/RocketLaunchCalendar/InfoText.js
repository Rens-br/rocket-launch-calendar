import React, { Component } from 'react'
import { StyleSheet, View, Text, Modal, FlatList } from 'react-native'
import Colors from '../../Theme/Colors'
import { TouchableRipple } from 'react-native-paper'
import { Item, Input, Icon } from 'native-base'
export default class InfoText extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  renderSubText() {
    if (this.props.subText)
      return (
        <Text style={{ marginTop: -12, marginBottom: 8, fontSize: 16, color: Colors.text }}>
          {this.props.subText}
        </Text>
      )
  }

  render() {
    if (this.state.isOpen) {
      return this.showModal()
    } else {
      return (
        <View style={(styles.container, { height: this.props.subText ? 70 : 50, marginLeft: 10 })}>
          <View style={styles.content}>
            <Text style={styles.infoType}>{this.props.infoType}</Text>
            <Text style={styles.title}>{this.props.info}</Text>
            {this.renderSubText()}
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: Colors.text,
  },
  infoType: {
    marginTop: 0,
    flex: 0.5,
    fontSize: 14,
    color: Colors.disabledText,
  },
})
