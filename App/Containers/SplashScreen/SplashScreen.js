import React from 'react'
import { Text, View, WebView, StyleSheet, Platform } from 'react-native'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView
          style={styles.WebViewStyle}
          source={{ uri: 'https://www.youtube.com/watch?v=kJmtg5PmCw0&t=196s' }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
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
    backgroundColor: '#fff',
  },
})
