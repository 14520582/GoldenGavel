import React, { Component } from "react";
import { Platform, StyleSheet, View, Dimensions,Image } from "react-native";
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
const isCOD = null
class BriefProduct extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: img }}/>
          </View>
          <View style={styles.infoContainer}>
            <Text numberOfLines={2} style={styles.nameProduct}>Rolex Cosmograph Daytona Ice Blue Dial Platinum Mens Watch 116506IBLSO</Text>
            {
              !isCOD && <View style={styles.row}>
                 <Image style={styles.paymentIcon} source={mastercard}/>
                 <View style={styles.paymentIconContainer}>
                  <Image style={styles.paymentIcon} source={paypal}/>
                 </View>
                 <View style={styles.paymentIconContainer}>
                  <Image style={styles.paymentIcon} source={visa}/>
                 </View>
                 <View style={styles.paymentIconContainer}>
                  <Image style={styles.paymentIcon} source={shipping}/>
                 </View>
              </View>
            }
            {
              isCOD && <Image style={styles.paymentCOD} source={cod}/>
            }
            <View style={styles.details}>
              <View>
                <View style={styles.row}>
                  <Icon name ='md-arrow-dropup' style={styles.arrowup}/>
                  <Text style={styles.numbids}>121</Text>
                </View>
                <Text style={styles.redText}>3h 20m</Text>
                <View style={styles.row}>
                  <Text style={styles.nameProduct}>Like new</Text>
                </View>
              </View>
              <View  style={styles.priceContainer}>
                <Text style={styles.redText}>2,000,000 VNĐ</Text>
                <Text>500,000 VNĐ</Text>
                <View style={styles.row}>
                  <Icon name ='md-add-circle' style={styles.addcircle}/>
                  <Text style={styles.increment}>50,000 VNĐ</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rightContainer}>
           <Icon name ='md-arrow-dropright'/>
          </View>
        </View>
        <View style={styles.separate}/>
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
    height: 35,
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
