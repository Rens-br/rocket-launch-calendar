import { Icon } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Colors from '../../Theme/Colors'

function extractHostdomain(url) {
  let hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  hostname = hostname.split(':')[0]
  hostname = hostname.split('?')[0]

  return hostname
}

function extractWebsiteName(url) {
  let hostname
  if (url.indexOf('www.') !== -1 || url.indexOf('en.') !== -1) {
    hostname = url.toString().split('.')[1]
  } else {
    hostname = url.slice(url.indexOf('//') + 2, url.indexOf('.'))
  }
  return hostname
}

export default class LinkList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    let nList = []
    if (this.props.links !== undefined && this.props.links !== null) {
      nList = this.props.links.slice()
    }
    if (this.props.extraLinks !== undefined && this.props.extraLinks !== null) {
      for (let i = 0; i < this.props.extraLinks.length; i++) {
        let link = this.props.extraLinks[i]
        if (link !== undefined && link !== null && nList.indexOf(link) === -1) nList.push(link)
      }
    }

    for (let j = 0; j < nList.length; j++) {
      let link = nList[j]
      if (link === '') nList.splice(nList.indexOf(link), 1)
    }
    this.setState({ list: nList })
  }

  getIcon(name) {
    if (icons.get(name)) {
      return icons.get(name)
    } else {
      return 'web'
    }
  }

  renderLinks(list) {
    return list.map((buttonInfo, key) => (
      <TouchableRipple
        key={key}
        onPress={this.props.onPressLink.bind(this, {
          link: buttonInfo,
          pageName: extractHostdomain(buttonInfo),
        })}
        rippleColor="rgba(0, 0, 0, .1)"
      >
        <View style={styles.linkContent}>
          <Icon
            name={this.getIcon(extractWebsiteName(buttonInfo))}
            type="MaterialCommunityIcons"
            style={{ color: Colors.text }}
          />
          <Text style={styles.linkText}>{extractHostdomain(buttonInfo)}</Text>
        </View>
      </TouchableRipple>
    ))
  }

  render() {
    if (this.state.list !== undefined && this.state.list.length !== 0) {
      return (
        <View
          style={(styles.container, { height: 30 + 41 * this.state.list.length, width: '90%' })}
        >
          <View style={styles.content}>
            <Text style={styles.infoType}>{this.props.title}</Text>
            {this.renderLinks(this.state.list)}
          </View>
        </View>
      )
    } else return null
  }
}

const icons = new Map([
  ['youtube', 'youtube-play'],
  ['youtu', 'youtube-play'],
  ['facebook', 'facebook-box'],
  ['twitter', 'twitter'],
  ['instagram', 'instagram'],
  ['wikipedia', 'wikipedia'],
  ['linkedin', 'linkedin'],
])

const styles = StyleSheet.create({
  container: {
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: '5%',
  },
  linkContent: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  linkText: {
    color: Colors.text,
    textAlignVertical: 'center',
    marginLeft: 12,
  },
  infoType: {
    color: Colors.disabledText,
  },
})
