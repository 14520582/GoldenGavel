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
import ToAPI from '../../server/ToAPI'
import moment from 'moment'
import Currency from '../../util/Currency'
import styles from './styles'
const deviceWidth = Dimensions.get('window').width;
class BidHistoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidder: null
    };
  }
  componentWillMount () {
    ToAPI.getUserInfo(this.props.item.uid,(bidder) => {
      this.setState({bidder: bidder})
    })
  }
  render() {
    return (
      <View style={styles.rowBidHistory}>
        <View style={styles.rank}>
          {
            this.props.index == 0 && <Image style={styles.placeIcon} source={require('../../assets/cup.png')}/>
          }
          {
            this.props.index == 1 && <Thumbnail style={styles.placeIcon} source={require('../../assets/silver-medal.png')}/>
          }
          {
            this.props.index == 2 && <Thumbnail style={styles.placeIcon} source={require('../../assets/bronze-medal.png')}/>
          }
          {
            this.props.index > 2 && <Text style={styles.place}>{this.props.index + 1}</Text>
          }
        </View>
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("AnotherProfile", {user: this.state.bidder})
        }}>
          <Thumbnail style={styles.thumnail} source={{uri: this.state.bidder ? this.state.bidder.photoURL : null}} />
        </TouchableOpacity>
        <View>
          <View style={styles.rowBidDetails}>
            <Thumbnail style={styles.gavelIcon} source={require('../../assets/auction.png')}/>
            <Text style={styles.textInfo}>{Currency.convertNumberToCurrency(this.props.item.bid) + ' VNĐ'}</Text>
          </View>
          <Text style={styles.date}>{moment(new Date(this.props.item.date)).calendar()}</Text>
        </View>
      </View>
    );
  }
}
export default BidHistoryRow;
