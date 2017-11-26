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
  Left,
  List,
  ListItem,
  Picker,
  Form,
  H3,
  Item as FormItem
} from "native-base";
const deviceWidth = Dimensions.get('window').width;
const img = 'https://images-na.ssl-images-amazon.com/images/I/61bjUy3staL._UX342_.jpg'
const paypal = require('../assets/paypal.png')
const visa = require('../assets/visa.png')
const mastercard = require('../assets/mastercard.png')
const shipping = require('../assets/shipping.png')
const cod = require('../assets/cod.png')
import Currency from '../util/Currency'
import DateTime from '../util/DateTime'
const isCOD = null
class BriefProduct extends Component {
  constructor(props) {
    super(props);
    this.gatepayment = {
      "PayPal" : paypal,
      "MasterCard" : mastercard,
      "Visa" : visa
    }
    this.state = {
    };
  }
  componentWillMount () {
    //alert(this.gatepayment["MasterCard"])
  }
  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate("Product", {product: this.props.item})}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: this.props.item.image[0] }}/>
          </View>
          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={[styles.nameProduct, {fontSize: 18}]}>{this.props.item.name}</Text>
            {
              Array.isArray(this.props.item.payment) && <View style={styles.row}>
                 {
                   this.props.item.payment.map((item, index) => {
                     return (
                       <View key={index} style={index == 0 ? {} : styles.paymentIconContainer}>
                        <Image style={styles.paymentIcon} source={this.gatepayment[item]}/>
                       </View>
                     )
                   })
                 }
                 {
                   this.props.item.shipping === 'Free' && <View style={styles.paymentIconContainer}>
                    <Image style={styles.paymentIcon} source={shipping}/>
                   </View>
                 }
              </View>
            }
            {
              this.props.item.payment === 'COD' && <Image style={styles.paymentCOD} source={cod}/>
            }
            {
              this.props.item.payment === 'Unknown' && <View>
                 <Text>Payment method unknown</Text>
              </View>
            }
            <View style={styles.details}>
              <View>
                <View style={styles.row}>
                  <Icon name ='md-arrow-dropup' style={styles.arrowup}/>
                  <Text style={styles.numbids}>{this.props.item.numberofbid}</Text>
                </View>
                <Text style={styles.redText}>{DateTime.convertToStringTime(this.props.item.endtime)}</Text>
                <View style={styles.row}>
                  <Text style={styles.nameProduct}>{this.props.item.condition}</Text>
                </View>
              </View>
              <View  style={styles.priceContainer}>
                <Text style={styles.redText}>{Currency.convertNumberToCurrency(this.props.item.currentbid) + ' VNĐ'}</Text>
                <Text>{Currency.convertNumberToCurrency(this.props.item.startingbid) + ' VNĐ'}</Text>
                <View style={styles.row}>
                  <Icon name ='md-add-circle' style={styles.addcircle}/>
                  <Text style={styles.increment}>{Currency.convertNumberToCurrency(this.props.item.bidincrement) + ' VNĐ'}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rightContainer}>
           <Icon name ='md-arrow-dropright'/>
          </View>
        </View>
        <View style={styles.separate}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    flexDirection: 'row',
    flex: 3
  },
  priceContainer: {
    alignItems: 'flex-end'
  },
  separate: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#E0E0E0'
  },
  numbids: {
    color: '#FFA000',
    paddingLeft: 5
  },
  arrowup:{
    color: '#FFA000',
    fontSize: 20
  },
  increment: {
    paddingLeft: 5
  },
  addcircle:{
    color: '#9CCC65',
    fontSize: 20
  },
  paymentIconContainer:{
    paddingLeft: 10
  },
  redText: {
    color: 'red'
  },
  paymentIcon: {
    resizeMode: 'stretch',
    height: 40,
    width: 40
  },
  paymentCOD: {
    resizeMode: 'stretch',
    height: 30,
    width: 89
  },
  nameProduct: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1.8,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  rightContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: deviceWidth/3,
    height: deviceWidth/3,
    resizeMode: 'stretch'
  }
});
export default BriefProduct;
