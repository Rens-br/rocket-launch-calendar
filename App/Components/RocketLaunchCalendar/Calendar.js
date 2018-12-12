import React, { Component } from 'react'
import { Text, FlatList, View, StyleSheet } from 'react-native'
import Colors from '../../Theme/Colors'
import { Icon } from 'native-base'

export default class Calendar extends Component {
  render() {
    return (
      <FlatList
        data={this.props.dates}
        renderItem={({ item }) => {
          if (item.launchDay === true) {
            return (
              <View style={styles.dayHolder}>
                <View style={styles.dateHolder}>
                  <Text style={styles.dayText}>{days[item.day]}</Text>
                  <Text style={styles.dateText}>
                    {months[item.date.getMonth()]} {item.date.getDate()}, {item.date.getFullYear}
                  </Text>
                </View>
                <View style={styles.launchDay}>
                  <Icon name="rocket" type="FontAwesome" style={styles.launchIcon} />
                </View>
              </View>
            )
          } else {
            return (
              <View style={styles.dayHolder}>
                <View style={styles.dateHolder}>
                  <Text style={styles.dayText}>{days[item.day]}</Text>
                  <Text style={styles.dateText}>
                    {months[item.date.getMonth()]} {item.date.getDate()}, {item.date.getFullYear()}
                  </Text>
                </View>
                <View style={styles.normalDay} />
              </View>
            )
          }
        }}
      />
    )
  }
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'Setember',
  'October',
  'November',
  'December',
]

const styles = StyleSheet.create({
  dayHolder: {
    alignSelf: 'center',
    marginTop: 5,
    width: '90%',
    height: 70,
    backgroundColor: Colors.text,
    borderRadius: 10,
    flexDirection: 'row',
  },
  dateHolder: {
    flex: 1,
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 28,
    marginLeft: 10,
    color: Colors.textDark,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 10,
    color: Colors.disabledText,
  },
  launchDay: {
    backgroundColor: Colors.launchDay,
    justifyContent: 'center',
    width: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  normalDay: {
    backgroundColor: Colors.disabledText,
    width: 70,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  launchIcon: {
    alignSelf: 'center',
    fontSize: 50,
    color: Colors.text,
  },
})
