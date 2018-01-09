import React, { Component } from "react";
import { Platform, StyleSheet,View,Image,TouchableHighlight,Modal,TextInput,Dimensions,FlatList,TouchableOpacity, ActivityIndicator } from "react-native";
import DateTime from '../../util/DateTime'
import Currency from '../../util/Currency'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Title,
  Icon,
  Right,
  Content,
  Thumbnail,
  ActionSheet,
  Text,
  Toast,
} from "native-base";
import styles from './styles'
import moment from 'moment'
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import ToAPI from '../../server/ToAPI'
const paypal = require('../../assets/paypal.png')
const masterCard = require('../../assets/mastercard.png')
const cod = require('../../assets/cod.png')
const visa = require('../../assets/visa.png')
const increase = require('../../assets/increase.png')
const decrease = require('../../assets/decrease.png')
const freeship = require('../../assets/shipping.png')
var bidder=[{name: 'ngan1111111111111111111111111',  bids:1000000000000}, {name: 'ngan2',  bids:200}, {name: 'ngan3',  bids:300}]
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureIndex: 0,
      seller: null,
      recommended: null
	 };
  }
  componentWillMount(){
  }
  componentDidMount(){
    ToAPI.getNewItem(8,(items) =>{
      this.setState({
        recommended: items
      })
    })
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  convertDate2String(miliSecond){
  	var date = new Date(miliSecond);
  	return date.getDate().toString()+ '-'+ (date.getMonth()+1).toString()+'-'+ date.getFullYear().toString();
  }
  checkPayMethod(method){
	  return this.props.product.payment.indexOf(method)
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.whitebackground}>
      			<View style={styles.imagesViewParent}>
        				<TouchableOpacity
        						onPress={() => this.props.viewFullImage()}
        					>
        					<Image
        					style={styles.imagesView}
        					source={{uri: this.props.product.image[this.state.pictureIndex]}}>
                    <View style={styles.boxCondition}>
                      <Text style={styles.conditionText}>{this.props.product.condition}</Text>
                    </View>
                    <View style={styles.nameProductContainer}>
                      <Text numberOfLines={2} style={styles.nameProduct}>{this.props.product.name}</Text>
                    </View>
        					</Image>
        				</TouchableOpacity>
                <View style={styles.besideImageView}>
                  <TouchableOpacity
                  onPress={() => {
                    this.props.changePicture(0)
                    this.setState({pictureIndex: 0})
                  }}
                  >
                  <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 0 ? 0.3 : 1}]} source={{uri: this.props.product.image[0]}}/>
                  </TouchableOpacity>
                  {this.props.product.image[1] &&
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changePicture(1)
                      this.setState({pictureIndex: 1})
                    }}
                  >
                    <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 1 ? 0.3 : 1}]} source={{uri: this.props.product.image[1]}}/>
                  </TouchableOpacity>
                  }
                  {this.props.product.image[2] &&
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changePicture(2)
                      this.setState({pictureIndex: 2})
                    }}
                  >
                    <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 2 ? 0.3 : 1}]} source={{uri: this.props.product.image[2]}}/>
                  </TouchableOpacity>
                  }
                  {this.props.product.image[3] &&
                  <TouchableOpacity
                    onPress={() => {
                      this.props.changePicture(3)
                      this.setState({pictureIndex: 3})
                    }}
                  >
                    <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 3 ? 0.3 : 1}]} source={{uri: this.props.product.image[3]}}/>
                  </TouchableOpacity>
                  }
                </View>
      			</View>
            <View style={styles.rowHeadDetails}>
              <View style={styles.rowInfo}>
                <Text>Current Bid: </Text>
      			    <Text style={styles.textBid}>{Currency.convertNumberToCurrency(this.props.product.currentbid)+ ' VNĐ'}</Text>
              </View>
              <View style={[styles.rowInfo, {paddingLeft: 6, alignItems: 'center'}]}>
                <Icon name ='md-arrow-round-up' style={[styles.up, {fontSize: 20, paddingRight: 5}]}/>
                <Text style={styles.up}>{(((this.props.product.currentbid*1.0/this.props.product.startingbid) - 1)*100).toFixed(0) + '%'}</Text>
              </View>
            </View>
            <View style={styles.rowHeadDetails}>
              <View style={styles.rowInfo}>
                <Text>Starting Bid: </Text>
                <Text style={[styles.textBid, {color: 'black', fontWeight: 'normal', fontSize: 20}]}>{Currency.convertNumberToCurrency(this.props.product.startingbid) + ' VNĐ'}</Text>
              </View>
              <View style={[styles.rowInfo, {paddingLeft: 6, alignItems: 'center'}]}>
                <Icon name ='md-time' style={{color: '#E65100', fontSize: 20, paddingRight: 7}}/>
                <Text style={styles.remainTime}>{DateTime.convertToStringTime(this.props.product.endtime)}</Text>
              </View>
            </View>
            <View style={styles.rowHeadDetails}>
              <View style={styles.rowInfo}>
                <Text>Bid Increment: </Text>
                <Text style={[styles.textBid, {color: 'black', fontWeight: 'bold', fontSize: 20}]}>{Currency.convertNumberToCurrency(this.props.product.bidincrement) + ' VNĐ'}</Text>
              </View>
              <View style={[styles.rowInfo, {paddingLeft: 6, alignItems: 'center'}]}>
                <Image source={require('../../assets/gavel.png')} style={{height: 18, width: 18, margin: 5}}/>
                <Text style={[styles.remainTime, {color: '#FF8F00'}]}>{this.props.product.numberofbid + ' bids'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text>Seller</Text>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("AnotherProfile", {user: this.props.seller})
              }}>
                <View style={[styles.row, {marginTop: 0}]}>
                  <Thumbnail small source={this.props.seller ? {uri: this.props.seller.photoURL} : null} />
                  <Text style={{width: deviceWidth/1.8, paddingLeft: 10, fontWeight: 'bold', fontSize: 18}} numberOfLines={1}>{this.props.seller ? this.props.seller.displayName : ''}</Text>
                </View>
              </TouchableOpacity>
              <Button
                bordered
                onPress={() => this.props.navigation.navigate("AnotherStore", {seller: this.props.seller})}
              >
                <Icon name="home" />
              </Button>
            </View>
          </View>
          <View style={styles.section}>
            <Text>Payment</Text>
            <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 5}}>
              <Image
                style={styl=styles.imagePayment}
                source={ (this.checkPayMethod('PayPal') != -1) ? paypal : null}
              />
              <Image
                style={styl=styles.imagePayment}
                source={ (this.checkPayMethod('Visa') != -1) ? visa : null}
              />
              <Image
                style={styl=styles.paymentCOD}
                source={ (this.checkPayMethod('COD') !=-1) ? cod : null}
              />
              <Image
                style={styl=styles.imagePayment}
                source={ (this.checkPayMethod('MasterCard') != -1) ? masterCard : null}
              />
              <Image
                style={styl=styles.imagePayment}
                source={ (this.props.product.shipping == 'Free') ? freeship : null}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text>Description</Text>
            <Text style={styles.textInfo}>{this.props.product.description}</Text>
          </View>
          <View style={styles.section}>
            <Text>Time</Text>
            <Text style={styles.textInfo}>{moment(new Date(this.props.product.starttime)).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            <Icon style={{marginLeft: deviceWidth*2/100}} name="md-arrow-round-down" />
            <Text style={styles.textInfo}>{moment(new Date(this.props.product.endtime)).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          </View>
          <View style={[styles.section, {paddingLeft: 0, paddingRight: 0}]}>
            <Text style={{marginLeft: deviceWidth*5/100, marginBottom: 8}}>Recommended</Text>
            {
              this.state.recommended && <View>
                <FlatList
                  data={this.state.recommended}
                  horizontal={true}
                  removeClippedSubviews={true}
                  extraData= {this.state}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.key}
                  renderItem={this._renderItemRecommended}
                />
              </View>
            }
            {
              !this.state.recommended && <View style={styles.loadingCategory}>
                <ActivityIndicator/>
              </View>
            }
          </View>
          </Content>
      </Container>
    );
  }
  _renderItemRecommended = ({item}) => (
    <View style={styles.containerBid}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate("Product", {product: item})}>
      <Image style={styles.imageBid} source={{uri: item.image[0]}}>
        <View style={[styles.rowinfobid1, styles.statusHeader]}>
          <Text>{DateTime.convertToStringTime(item.endtime)}</Text>
          <View style={styles.row}>
            <Image source={require('../../assets/gavel.png')} style={{margin: 4}}/>
            <Text style={styles.colortext}>{item.numberofbid}</Text>
          </View>
        </View>
        <View style={styles.containernameproduct1}>
          <Text numberOfLines={1} style={[styles.nameproduct1, {fontSize: 18}]}>{item.name}</Text>
        </View>
      </Image>
      <View style={styles.rowinfobid1}>
        <Text style={styles.textinfobid}>Current Bid:</Text>
        <Text style={[styles.titleCategories, {color: '#FFA000'}]}>{Currency.convertNumberToCurrency(item.currentbid) + ' đ'}</Text>
      </View>
      <View style={styles.rowinfobid1}>
        <Text style={styles.textinfobid}>Bid Increment:</Text>
        <Text style={styles.titleCategories}>{Currency.convertNumberToCurrency(item.bidincrement) + ' đ'}</Text>
      </View>
      <View style={styles.rowinfobid1}>
        <Text style={styles.textinfobid}>Starting Bid:</Text>
        <Text>{Currency.convertNumberToCurrency(item.startingbid) + ' đ'}</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
  _renderItem =({item,index})=>(
	<View style={{flexDirection:'row',justifyContent:'space-between'}}>
		<Text style={{width: deviceWidth/5}} numberOfLines={1}>{index+1}</Text>
		<Text style={{marginLeft: deviceWidth*10/100, width: deviceWidth/3}} numberOfLines={1}>{item.name}</Text>
		<Text style={{width: deviceWidth/5}} numberOfLines={1}>{item.bids}</Text>
	</View>
  )
}
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser)),
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ProductDetails)
