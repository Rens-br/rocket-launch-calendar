import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Text } from 'native-base'
import Colors from '../../Theme/Colors'
import NavigationService from 'App/Services/NavigationService'

export default class CalendarDayScreen extends React.Component {
  renderLaunches(launches) {
    return (
      <FlatList
        data={launches}
        keyExtractor={(item) => item.launch.id}
        renderItem={({ item }) => {
          let date = new Date(item.date).toTimeString()
          let lsp = item.launch.lsp.name
          lsp = lsp.slice(0, 30)
          lsp += lsp.length >= 30 ? '...' : ''
          return (
            <Card
              onPress={() => {
                NavigationService.navigate('LaunchInfoScreen', { l: item })
              }}
              style={styles.card}
            >
              <Card.Content>
                <Title style={styles.cardTitle}>{item.launch.name}</Title>
                <View style={styles.cardContent}>
                  <Paragraph style={styles.cardLsp}>{lsp}</Paragraph>
                  <Paragraph style={styles.cardTime}>
                    Time: {item.launch.netstamp === 0 ? 'Unknown' : date.slice(0, 8)}
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>
          )
        }}
      />
    )
  }

  render() {
    let item = this.props.navigation.state.params.item
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{days[item.day]}</Text>
          <Text style={styles.subtitle}>
            {months[item.date.getMonth()]} {item.date.getDate()}, {item.date.getFullYear()}
          </Text>
        </View>
        <View style={styles.content}>
          {this.renderLaunches(this.props.navigation.state.params.item.launches)}
        </View>
      </View>
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
  container: {
    flex: 1,
    backgroundColor: Colors.contentBackground,
  },
  header: {
    flex: 0.1,
    elevation: 0.4,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: Colors.text,
    fontSize: 24,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.disabledText,
    fontSize: 16,
  },
  content: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  card: {
    borderRadius: 12,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardLsp: {
    color: Colors.disabledText,
    flex: 1,
  },
  cardTime: {
    color: Colors.disabledText,
    textAlign: 'right',
    flex: 0.5,
  },
})
