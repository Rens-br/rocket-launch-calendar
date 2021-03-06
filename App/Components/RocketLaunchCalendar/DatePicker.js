import { Text, variables, Icon } from 'native-base'
import React from 'react'
import {
  Modal,
  View,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
} from 'react-native'

export class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      defaultDate: new Date(),
      chosenDate: undefined,
      disabled: true,
    }
  }

  componentDidMount = () => {
    this.setState({
      defaultDate: this.props.defaultDate ? this.props.defaultDate : new Date(),
      disabled: !!this.props.disabled,
    })
    if (!this.props.placeHolderText && this.props.defaultDate) {
      this.setState({ chosenDate: this.props.defaultDate })
    }
  }

  setDate(date) {
    this.setState({ chosenDate: new Date(date) })
    if (this.props.onDateChange) {
      this.props.onDateChange(date)
    }
  }

  showDatePicker() {
    if (Platform.OS === 'android') {
      this.openAndroidDatePicker()
    } else {
      this.setState({ modalVisible: true })
    }
  }

  async openAndroidDatePicker() {
    try {
      const newDate = await DatePickerAndroid.open({
        date: this.state.chosenDate ? this.state.chosenDate : this.state.defaultDate,
        minDate: this.props.minimumDate,
        maxDate: this.props.maximumDate,
        mode: this.props.androidMode,
      })
      const { action, year, month, day } = newDate
      if (action === 'dateSetAction') {
        let selectedDate = new Date(year, month, day)
        this.setState({ chosenDate: selectedDate })
        this.props.onDateChange(selectedDate)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }

  formatChosenDate(date) {
    if (this.props.formatChosenDate) {
      return this.props.formatChosenDate(date)
    }
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/')
  }

  render() {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={this.showDatePicker.bind(this)}>
            <Icon
              name={this.props.icon}
              type={this.props.iconType}
              style={{ color: this.props.iconColor }}
            />
          </TouchableOpacity>
          <View>
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType={this.props.animationType}
              transparent={this.props.modalTransparent}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
            >
              <Text
                onPress={() => this.setState({ modalVisible: false })}
                style={{ backgroundColor: variables.datePickerBg, flex: 1 }}
              />
              <DatePickerIOS
                date={this.state.chosenDate ? this.state.chosenDate : this.state.defaultDate}
                onDateChange={this.setDate.bind(this)}
                minimumDate={this.props.minimumDate}
                maximumDate={this.props.maximumDate}
                mode="date"
                locale={this.props.locale}
                timeZoneOffsetInMinutes={this.props.timeZoneOffsetInMinutes}
              />
            </Modal>
          </View>
        </View>
      </View>
    )
  }
}
