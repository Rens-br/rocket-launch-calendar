import NavigationService from 'App/Services/NavigationService'
import Colors from 'App/Theme/Colors'
import { View } from 'native-base'
import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import LinkList from '../RocketLaunchCalendar/LinkList'

export default class LinkContent extends Component {
  openPage(a) {
    NavigationService.navigate('WebViewScreen', {
      url: a.link,
      title: a.pageName,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <LinkList
            links={this.props.launch.vidURLs}
            extraLinks={[this.props.launch.vidURL]}
            title={'Videos'}
            onPressLink={this.openPage}
          />
          <LinkList
            links={this.props.launch.infoURLs}
            extraLinks={[this.props.launch.infoURL]}
            title={'Info'}
            onPressLink={this.openPage}
          />
          <LinkList
            links={
              this.props.launch.missions[0] !== undefined
                ? [this.props.launch.missions[0].wikiURL]
                : undefined
            }
            title={'Mission'}
            onPressLink={this.openPage}
          />
          <LinkList
            links={
              this.props.launch.missions[0] !== undefined &&
              this.props.launch.missions[0].agencys !== null &&
              this.props.launch.missions[0].agencys !== undefined
                ? this.props.launch.missions[0].agencys[0].infoURLs
                : undefined
            }
            extraLinks={
              this.props.launch.missions[0] !== undefined &&
              this.props.launch.missions[0].agencys !== null &&
              this.props.launch.missions[0].agencys !== undefined
                ? [this.props.launch.missions[0].agencys[0].wikiURL]
                : undefined
            }
            title={'Agency'}
            onPressLink={this.openPage}
          />
          <LinkList
            links={this.props.launch.rocket.infoURLs}
            extraLinks={[this.props.launch.rocket.infoURL, this.props.launch.rocket.wikiURL]}
            title={'Rocket'}
            onPressLink={this.openPage}
          />
          <LinkList
            links={this.props.launch.lsp.infoURLs}
            extraLinks={[this.props.launch.lsp.wikiURL]}
            title={'Launch Service Provider'}
            onPressLink={this.openPage}
          />
        </ScrollView>
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
    height: 1000,
    width: '100%',
    alignSelf: 'center',
  },
})
