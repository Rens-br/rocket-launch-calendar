import Colors from 'App/Theme/Colors'
import { Text, View } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Divider } from 'react-native-paper'
import LinkList from '../RocketLaunchCalendar/LinkList'
import NavigationService from 'App/Services/NavigationService'

export default class LinkContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      urls: [],
    }
  }

  openPage(a) {
    NavigationService.navigate('WebViewScreen', {
      url: a.link,
      title: a.pageName,
    })
  }

  componentDidMount() {
    let u = []
    u = this.props.launch.lsp.infoURLs
    u.push(this.props.launch.lsp.wikiURL)

    this.setState({ urls: u })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Divider style={styles.Divider} />
          <LinkList
            links={this.state.urls}
            title={'Launch Service Provider'}
            onPressLink={this.openPage}
          />
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
})
