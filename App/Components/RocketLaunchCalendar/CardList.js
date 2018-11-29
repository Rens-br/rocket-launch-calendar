import React, { Component } from 'react'
import { Alert, Text, FlatList, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import NavigationService from '../../Services/NavigationService'
import Colors from '../../Theme/Colors'

export default class CardList extends Component {
  cards = this.props.cardData

  setcards = () => {
    this.cards = this.props.cardData
  }

  description(desc){
    if(desc == 'undefined' || desc == null){
      return(<Paragraph style={{ color: Colors.textDark }}>no description available</Paragraph>)
    }
    else{
      return(<Paragraph style={{ color: Colors.textDark }}>{desc.substring(0,95)}...</Paragraph>)
    }
  }

  createCard(data){
    if(data.type == "article"){
      return(
        <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: data.data.url, title: data.data.title, source: data.data.news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 20 }}>
          <Card.Cover source={{ uri: data.data.featured_image }}/>
          <Card.Content>
            <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{data.data.title}</Title>
            <Paragraph style={{ color: Colors.disabledText }}>{data.data.news_site_long}</Paragraph>
          </Card.Content>
        </Card>)}
    else {
      return(
        <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: this.props.articles[0].url, title: this.props.articles[0].title, source: this.props.articles[0].news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 30 }}>
          <Card.Cover source={{ uri: 'https://farm5.staticflickr.com/4654/25254688767_b67e0bf2ac_k.jpg' }}/>
          <Card.Content>
            <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{data.data.mission_name}</Title>
            {this.description(data.data.details)}
          </Card.Content>
        </Card>
      )
    }
  }

  render() {
    this.setcards()
    if (this.cards == null || this.cards == undefined) return null
    else {
      console.log(this.cards)
      return (
        <FlatList
          data={this.cards}
          renderItem={({item}) =>
          {
            console.log(item.type)
            if(item.type == "Article"){
            return(
              <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: item.data.url, title: item.data.title, source: item.data.news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 20 }}>
                <Card.Cover source={{ uri: item.data.featured_image }}/>
                <Card.Content>
                  <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{item.data.title}</Title>
                  <Paragraph style={{ color: Colors.disabledText }}>{item.data.news_site_long}</Paragraph>
                </Card.Content>
              </Card>)}
          else {
            return(
              <Card onPress={ () => { NavigationService.navigate('WebViewScreen', { url: this.props.articles[0].url, title: this.props.articles[0].title, source: this.props.articles[0].news_site_long }) }} style={{ borderRadius: 8, width: '90%', alignSelf: 'center', marginTop: 30 }}>
                <Card.Content>
                  <Title style={{ fontSize: 22, lineHeight: 24, marginTop: 10 }}>{item.data.mission_name}</Title>
                  {this.description(item.data.details)}
                </Card.Content>
              </Card>
            )
          }}}
        />
      )
    }
  }
}