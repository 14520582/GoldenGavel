import React, { Component } from "react";
import { Platform, StyleSheet, View, Dimensions,Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Thumbnail,
  Left,
  List,
  ListItem,
  Picker,
  Form,
  H3,
  Item as FormItem
} from "native-base";
import ToAPI from '../server/ToAPI'
import moment from 'moment'
const deviceWidth = Dimensions.get('window').width;
class NotificationRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: {
        photoURL: null,
        name: ''
      }
    };
  }
  componentWillMount () {
    ToAPI.getUserInfo(this.props.item.sender,(sender) => {
      this.setState({sender: sender})
    })
  }
  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.item.status === 'New' ? '#FFF8E1' : 'white'}]}>
        <Thumbnail large source={{uri: this.state.sender.photoURL}} />
        <View style={styles.content}>
          <View style={{width: deviceWidth - 100}}>
            <Text numberOfLines={2}>
              <Text style={styles.h1}>{this.state.sender.displayName}</Text>
              <Text> just bidded for the item: </Text>
              <Text style={styles.h1}>{this.props.item.content.nameitem}</Text>
            </Text>
          </View>
          <View style={styles.textcontainer}>
            <Thumbnail style={{height: 25, width: 25}} source={require('../assets/auction.png')} />
            <Text style={this.props.item.status === 'New' ? styles.newtime : styles.seentime}>{moment(new Date(this.props.item.date)).calendar()}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  newtime: {
    paddingLeft: 5,
    color: '#FF6F00'
  },
  seentime: {
    paddingLeft: 5,
  },
  h1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    paddingLeft: 10,
  },
  textcontainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
  }
});
export default NotificationRow;
