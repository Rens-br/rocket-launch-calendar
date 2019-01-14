import React, { Component } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import Colors from '../../Theme/Colors'
import { TouchableRipple } from 'react-native-paper'
import { Icon, Input, Item } from 'native-base'

export default class SettingsToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      isOpen: false,
      text: '',
      numeric: false,
      canBeEmpty: false,
    }
  }

  componentDidMount() {
    let o = this.props.options !== undefined ? this.props.options : []
    this.setState(() => ({
      options: o,
      numeric: this.props.numeric,
      canBeEmpty: this.props.canBeEmpty,
    }))
  }

  toggleModal = () => {
    this.setState((previousState) => ({
      isOpen: !previousState.isOpen,
    }))
  }

  AddValue = () => {
    let value = this.state.text
    if (value === '' || value === undefined || value === null) return
    if (this.state.numeric) {
      value = parseInt(value)
    }
    if (this.state.options.includes(value)) {
      return
    }
    let o = this.state.options
    o.push(value)
    this.setState(() => ({
      options: o,
      text: '',
    }))

    this.props.onChangeValue(o)
  }

  RemoveValue = (value) => {
    if (this.state.options.includes(this.state.text)) {
      return
    }
    if (!this.state.canBeEmpty && this.state.options.length === 1) {
      return
    }
    let o = this.state.options
    o.splice(o.indexOf(value), 1)
    this.setState({
      options: o,
    })
  }

  showModal = () => {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState(() => ({ isOpen: false }))
          }}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>{this.props.text}</Text>
          </View>
          <View style={styles.modalMain}>
            <View style={styles.modalContent}>
              <Item style={{ color: Colors.launchDay }}>
                <Input
                  keyboardType={this.state.numeric ? 'numeric' : 'default'}
                  style={{ color: Colors.text }}
                  placeholder="Add interval"
                  value={this.state.text}
                  onChangeText={(text) =>
                    this.setState(() => ({
                      text: text,
                    }))
                  }
                />
                <TouchableRipple onPress={this.AddValue} rippleColor={Colors.launchDay}>
                  <Icon style={{ color: Colors.text }} active name="plus" type="Feather" />
                </TouchableRipple>
              </Item>
              <FlatList
                data={this.state.options}
                renderItem={({ item }) => {
                  return (
                    <Item style={{ color: Colors.launchDay }}>
                      <Text style={styles.listText}>
                        {item.toString() + ' ' + this.props.suffix}
                      </Text>
                      <TouchableRipple
                        onPress={() => this.RemoveValue(item)}
                        rippleColor={Colors.launchDay}
                      >
                        <Icon style={{ color: Colors.text }} active name="minus" type="Feather" />
                      </TouchableRipple>
                    </Item>
                  )
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    if (this.state.isOpen) {
      return this.showModal()
    } else {
      return (
        <View style={styles.container}>
          <TouchableRipple
            style={styles.content}
            onPress={this.toggleModal}
            rippleColor={Colors.launchDay}
          >
            <View style={styles.content}>
              <Text style={styles.title}>{this.props.text}</Text>
              <Text style={styles.options}>
                {this.state.options.length === 0
                  ? this.props.defaultState
                  : this.state.options.toString()}
              </Text>
            </View>
          </TouchableRipple>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  headerTitle: {
    marginTop: 16,
    textAlign: 'center',
    color: Colors.text,
    fontSize: 28,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: Colors.text,
  },
  options: {
    flex: 1,
    fontSize: 14,
    color: Colors.disabledText,
  },
  modalHeader: {
    flex: 0.1,
    backgroundColor: Colors.background,
  },
  modalMain: {
    alignSelf: 'center',
    backgroundColor: Colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  modalContent: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  listText: {
    color: Colors.text,
    flex: 1,
    fontSize: 18,
    margin: 5,
    marginTop: 12,
    marginBottom: 12,
  },
})
