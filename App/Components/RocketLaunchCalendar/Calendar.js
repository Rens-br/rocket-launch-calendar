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
          if (item === true) {
            return (
              <View style={styles.dayHolder}>
                <View style={styles.dateHolder}>
                  <Text style={styles.dayText}>Monday</Text>
                  <Text style={styles.dateText}>December 1st, 2018</Text>
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
                  <Text style={styles.dayText}>Monday</Text>
                  <Text style={styles.dateText}>December 1st, 2018</Text>
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
    backgroundColor: Colors.normalDay,
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
