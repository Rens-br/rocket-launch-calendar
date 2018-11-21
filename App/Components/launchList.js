import React, { Component } from 'react'
import { Alert, Text, FlatList } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'

export default class LaunchList extends Component {
  launches = this.props.launches

  setLaunches = () => {
    this.launches = this.props.launches
  }

  removeLaunch = (index) => {
    this.launches.slice(index, 1)
  }

  render() {
    this.setLaunches()
    if (this.launches == null || this.launches === undefined) return null
    else {
      console.log(this.launches)
      return (
        <FlatList
          data={this.launches}
          renderItem={({item}) => <Card>
              <Card.Cover source={{ uri: item.rocket.imageURL }}/>
              <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>
                  {item.windowstart}
                </Paragraph>
              </Card.Content>
            </Card>}
        />
      )
    }
  }
}