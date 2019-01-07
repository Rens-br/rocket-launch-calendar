import React from 'react'
import { View, WebView, StyleSheet, Platform, Clipboard } from 'react-native'
import {
  Header,
  Left,
  Title,
  Subtitle,
  Right,
  Body,
  Button,
  Icon,
  StyleProvider,
} from 'native-base'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import { Snackbar } from 'react-native-paper'
import getTheme from 'App/native-base-theme/components'
import material from 'App/native-base-theme/variables/material'

export default class WebViewScreen extends React.Component {
  state = {
    snackbarVisible: false,
    navigation: null,
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StyleProvider style={getTheme(material)}>
          <Header
            style={{ backgroundColor: Colors.background }}
            androidStatusBarColor={Colors.background}
          >
            <Left>
              <Button transparent>
                <Icon
                  name="arrow-back"
                  onPress={() => {
                    NavigationService.navigateAndReset('NewsScreen')
                  }}
                />
              </Button>
            </Left>
            <Body>
              <Title
                onLongPress={() => {
                  this.setState({ snackbarVisible: true })
                  Clipboard.setString(navigation.getParam('url', 'www.google.com'))
                }}
              >
                {navigation.getParam('title', '')}
              </Title>
              <Subtitle
                onLongPress={() => {
                  this.setState({ snackbarVisible: true })
                  Clipboard.setString(navigation.getParam('url', 'www.google.com'))
                }}
              >
                {navigation.getParam('source', '')}
              </Subtitle>
            </Body>
            <Right />
          </Header>
        </StyleProvider>
        <WebView
          style={styles.WebViewStyle}
          source={{ uri: navigation.getParam('url', 'www.google.com') }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        <Snackbar
          visible={this.state.snackbarVisible}
          onDismiss={() => this.setState({ snackbarVisible: false })}
        >
          Link copied to clipboard!
        </Snackbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  container: {
    flex: 1,
  },
})
