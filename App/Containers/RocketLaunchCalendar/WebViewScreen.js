import React from 'react'
import { View, WebView, StyleSheet, Platform, Clipboard } from 'react-native'
import { Header, Left, Title, Subtitle, Right, Body, Button, Icon } from 'native-base'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'
import { Snackbar } from 'react-native-paper'

export default class WebViewScreen extends React.Component {
  state = {
    snackbarVisible: false,
    navigation: null,
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
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
