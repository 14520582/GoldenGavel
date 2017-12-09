import React, { Component } from "react";
import { Platform, StyleSheet,View,Image,TouchableHighlight,Modal,TextInput,Dimensions,FlatList,TouchableOpacity } from "react-native";
import DateTime from '../util/DateTime'
import Currency from '../util/Currency'
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
  ActionSheet,
  Text,
  Toast,
} from "native-base";


var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import ToAPI from '../server/ToAPI'
const paypal = require('../assets/paypal.png')
const masterCard = require('../assets/mastercard.png')
const cod = require('../assets/cod.png')
const visa = require('../assets/visa.png')
const increase = require('../assets/increase.png')
const decrease = require('../assets/decrease.png')
const freeship = require('../assets/shipping.png')
var bidder=[{name: 'ngan1111111111111111111111111',  bids:1000000000000}, {name: 'ngan2',  bids:200}, {name: 'ngan3',  bids:300}]
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
		product:{
        "bidincrement" : 0,
        "category" : "",
        "condition" : "",
        "currentbid" : 0,
        "description" : "",
        "endtime" : 0,
        "image" : [  ],
        "name" : "",
        "numberofbid" : 0,
        "owner" : "0",
        "payment" : [],
        "shipping" : "0",
        "startingbid" : 0,
        "starttime" : 0
      },
		pictureIndex: 0,
		modalVisible: false,
		modalPicture:false,
		bid : 0,
		productID : this.props.navigation.state.params.product.key,
		productCategory : this.props.navigation.state.params.product.category,


	 };
  }
  componentWillMount(){
    ToAPI.getItem(this.state.productID.toString(),this.state.productCategory.toString(),(item) =>{
		 this.setState({product:item, bid : item.currentbid})
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
	  return this.state.product.payment.indexOf(method)

  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Product</Title>
          </Body>
          <Right />
        </Header>
        <Content>
			<View style={styles.imagesViewParent}>
  				<TouchableOpacity
  						onPress={() => this.setState({modalPicture:true})}
  					>
  					<Image
  					style={styles.imagesView}
  					source={{uri: this.state.product.image[this.state.pictureIndex]}}
  					/>
  				</TouchableOpacity>
          <View style={styles.besideImageView}>
            <TouchableOpacity
            onPress={() => this.setState({pictureIndex:0})}
            >
            <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 0 ? 0.3 : 1}]} source={{uri: this.state.product.image[0]}}/>
            </TouchableOpacity>
            {this.state.product.image[1] &&
            <TouchableOpacity
              onPress={() => this.setState({pictureIndex:1})}
            >
              <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 1 ? 0.3 : 1}]} source={{uri: this.state.product.image[1]}}/>
            </TouchableOpacity>
            }
            {this.state.product.image[2] &&
            <TouchableOpacity
              onPress={() => this.setState({pictureIndex:2})}
            >
              <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 2 ? 0.3 : 1}]} source={{uri: this.state.product.image[2]}}/>
            </TouchableOpacity>
            }
            {this.state.product.image[3] &&
            <TouchableOpacity
              onPress={() => this.setState({pictureIndex:3})}
            >
              <Image style = {[styles.smallImage, {opacity: this.state.pictureIndex == 3 ? 0.3 : 1}]} source={{uri: this.state.product.image[3]}}/>
            </TouchableOpacity>
            }
          </View>
			</View>
			<Text numberOfLines={2} style={styles.nameProduct}>{this.state.product.name}</Text>
			<Text style={styles.textBid}>{'Current bid: '+ Currency.convertNumberToCurrency(this.state.product.currentbid)+ ' VNĐ'}</Text>
			{this.props.infouser.uid != this.state.product.owner &&
				<View style = {styles.viewButton}>
					<Button
						onPress={() =>
								alert(JSON.stringify(this.state.product))
								}
						 style={{backgroundColor: '#F9A825', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center'}}
					  >
						<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',alignItems: 'center'}}>{'Buy Now'}</Text>
					</Button>
					<Button
						onPress={() =>
							this.setState({modalVisible:true})
							}
						style={{backgroundColor: '#F4511E', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center'}}
					  >
						<Text style={{fontSize:15,color: '#FAFAFA' ,justifyContent: 'center',alignContent: 'center'}}>{'BID NOW'}</Text>
					</Button>
				</View>
			}
				{this.props.infouser.uid  == this.state.product.owner &&
					<View style = {styles.viewButton}>
						<Button
							onPress={() =>
									alert(JSON.stringify(this.state.product))
									}
							 style={{backgroundColor: '#F9A825', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center'}}
						  >
							<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',alignItems: 'center'}}>{'End Now'}</Text>
						</Button>
					</View>
				}

			<View style={styles.viewInfo} >

				<View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop:deviceWidth*2/100}}>
					<View style = {{flexDirection: 'row',}}>
						<Text style={styles.textTitle}>{'Start time: '}</Text>
						<Text style={styles.textInfo}>{this.convertDate2String(this.state.product.starttime)}</Text>
					</View>
					<Text style={styles.textInfo}>{DateTime.convertToStringTime(this.state.product.endtime)}</Text>
				</View>
				<View style = {{flexDirection: 'row'}}>
					<Text style={styles.textTitle}>{'Description: '}</Text>
					<Text style={styles.textInfo}>{this.state.product.description}</Text>
				</View>
				<View style = {{flexDirection: 'row'}}>
					<Text style={styles.textTitle}>{'Seller: '}</Text>
					<Text style={styles.textInfo}>{this.state.product.owner}</Text>
				</View>
				<View style = {{flexDirection: 'row'}}>
					<Text style={styles.textTitle}>{'Condition: '}</Text>
					<Text style={styles.textInfo}>{this.state.product.condition}</Text>
				</View>
				<View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
					<View style = {{flexDirection: 'row'}}>
						<Text style={styles.textTitle}>{'Start bid: '}</Text>
						<Text style={styles.textInfo}>{Currency.convertNumberToCurrency(this.state.product.startingbid) + ' Đ'}</Text>
					</View>
					<View style = {{flexDirection: 'row'}}>
						<Text style={styles.textTitle}>{'Bid increament: '}</Text>
						<Text style={styles.textInfo}>{Currency.convertNumberToCurrency(this.state.product.bidincrement) + ' Đ'}</Text>
					</View>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
					<View style = {{alignSelf: 'center'}}>
						<Text style={styles.textTitle}>{'Payment: '}</Text>
					</View>
					<Image
						style={styl=styles.imagePayment}
						source={ (this.checkPayMethod('PayPal') != -1) ? paypal : null}
					/>
					<Image
						style={styl=styles.imagePayment}
						source={ (this.checkPayMethod('Visa') != -1) ? visa : null}
					/>
					<Image
						style={styl=styles.imagePayment}
						source={ (this.checkPayMethod('COD') !=-1) ? cod : null}
					/>
					<Image
						style={styl=styles.imagePayment}
						source={ (this.checkPayMethod('MasterCard') != -1) ? masterCard : null}
					/>
					<Image
						style={styl=styles.imagePayment}
						source={ (this.state.product.shipping == 'Free') ? freeship : null}
					/>

				</View>
			</View>
			<View style = {{flexDirection: 'row',marginTop: deviceWidth*1/100, marginLeft: deviceWidth*3/100}}>
				<Text style={styles.textTitle}>{'Number of bid: '}</Text>
				<Text style={styles.textInfo}>{(this.state.product.numberofbid).toString()}</Text>
			</View>
			<View style={{marginLeft:deviceWidth*5/100,marginRight:deviceWidth*5/100}}>
				<View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1}}>
					<Text style={{ width: deviceWidth/5}} numberOfLines={1}>{'No.'}</Text>
					<Text style={{marginLeft: deviceWidth*10/100, width: deviceWidth/3, }} numberOfLines={1}>{'Name'}</Text>
					<Text style={{width: deviceWidth/5}} numberOfLines={1}>{'Bids'}</Text>
				</View>
				<FlatList
					data={bidder}
					numColumns={1}
					keyExtractor={(item,index) => item.name}
					renderItem={this._renderItem}

				/>
			</View>
			<View style={{height: deviceHeight*10/100}}>
			</View>

        </Content>

		<Modal
			animationType="slide"
			transparent={true}
			visible={this.state.modalVisible}
			onRequestClose={() => {this.setState({modalVisible:false})}}
			>
			<View style={{ justifyContent: 'center', alignItems:'center',alignContent: 'center',alignSelf:'center',flex:1}}>
				<View style={{height: deviceHeight*2/5,width: deviceWidth*94/100,backgroundColor: '#FFFFFF',alignSelf:'center', borderWidth:1}}>
					<TouchableOpacity style = {{alignSelf: 'flex-end', marginRight: deviceWidth*3/100, marginTop: deviceWidth*2/100}}
						onPress={() =>
						this.setState({modalVisible:false})
						}>
						<Text>{'X'}</Text>
					</TouchableOpacity>
					<View style = {{marginTop: 20,}}>
						<Text style={styles.lableModal}>{'Your bid:'}</Text>
						<View style={{flexDirection:'row', marginRight: deviceWidth*20/100,marginLeft: deviceWidth*20/100,justifyContent:'space-between',marginTop:15}}>
							<Text style={{fontSize: 25,color: '#f44336',fontWeight: 'bold',alignSelf:'flex-start'}}>{Currency.convertNumberToCurrency(this.state.bid) + ' VNĐ'}</Text>
							<View style={{alignSelf:'flex-end', }}>

								<TouchableOpacity style={styles.imageUpDown}
									onPress={() => this.setState({bid: this.state.bid+this.state.product.bidincrement})}
								>
									<Image style = {styles.imageUpDown} source={increase}/>
								</TouchableOpacity>

								<TouchableOpacity style={styles.imageUpDown}
									onPress={() => this.setState({bid: this.state.bid > this.state.product.currentbid ? this.state.bid-this.state.product.bidincrement:this.state.product.currentbid})}
								>
									<Image style = {styles.imageUpDown} source={decrease}/>
								</TouchableOpacity>

							</View>
						</View>
					</View>
					<View style = {{marginTop: 20,flexDirection:'row'}}>
						<Text style={styles.lableModal}>{'Current bid:'}</Text>
						<Text style = {styles.textModal}>{Currency.convertNumberToCurrency(this.state.product.currentbid) + ' VNĐ'}</Text>
					</View>
					<View style={styles.viewButton}>
						<Button
							onPress={() =>
								this.state.bid >this.state.product.currentbid ? this.setState({modalVisible:false,}) : Toast.show({text: 'Your bid is invalid. Please re-enter!',position: 'bottom',duration: 4000})
							 }
							 style={{backgroundColor: '#F4511E', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center',alignSelf:'center'}}
						  >
							<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',fontWeight:'bold'}}>{'BID NOW'}</Text>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
		<Modal
			animationType="slide"
			transparent={true}
			visible={this.state.modalPicture}
			onRequestClose={() => {this.setState({modalPicture:false})}}
			>
					<View style={{flex:1,backgroundColor: "#FBFAFA"}}>
						<Image
						style={{flex: 1,resizeMode: 'contain'}}
						source={{uri: this.state.product.image[this.state.pictureIndex]}}
						>
            <Header searchBar rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: 'rgba(255, 160, 0,0.9)'}}>
              <Left>
                <Button transparent onPress={() => this.setState({modalPicture:false})}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>{this.state.pictureIndex + 1}/{this.state.product.image.length}</Title>
              </Body>
              <Right />
            </Header>
						</Image>
					</View>
		</Modal>
      </Container>

    );
  }
  _renderItem =({item,index})=>(
	<View style={{flexDirection:'row',justifyContent:'space-between'}}>
		<Text style={{width: deviceWidth/5}} numberOfLines={1}>{index+1}</Text>
		<Text style={{marginLeft: deviceWidth*10/100, width: deviceWidth/3}} numberOfLines={1}>{item.name}</Text>
		<Text style={{width: deviceWidth/5}} numberOfLines={1}>{item.bids}</Text>
	</View>
  )
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
	nameProduct: {
	fontSize:20,
	fontWeight:'bold',
	color: '#212121',
	marginTop: deviceWidth*5/100,
	marginLeft: deviceWidth*5/100,
	marginRight: deviceWidth*5/100,


	},
	imagesViewParent:{
  	justifyContent: 'center',
  	alignContent: 'center',
  	alignItems: 'center',
  	flexDirection: 'row',
	},
	imagesView:{
    resizeMode: 'stretch',
    height: deviceWidth/4*3,
    width: deviceWidth/4*3,
    position: "relative",
	},
  besideImageView: {
    width: deviceWidth/4,
    height: deviceWidth/4*3,
    justifyContent: 'center',
    alignItems: 'center'
  },
	subImageViews:{
  	justifyContent: 'space-between',
  	alignContent: 'center',
  	alignItems: 'center',
  	alignSelf: 'flex-end',
  	flexDirection:'row',
  	marginTop: 	deviceHeight*(4/11),
  	width:(deviceWidth-deviceHeight*10/11)/7,

	},
	smallImage:{
		height: (deviceWidth/4*3)/4,
		width: (deviceWidth/4*3)/4,
	},
	imageUpDown:{
		height:(deviceWidth-deviceHeight*2/11)/15,
		width:(deviceWidth-deviceHeight*2/11)/15,

	},

	viewInfo: {
		marginTop: deviceWidth*5/100,
		marginLeft: deviceWidth*3/100,
		marginRight: deviceWidth*3/100,
		borderColor: '#607D8B',
		borderTopWidth: 1,
		borderBottomWidth:1,

	},

	textBid:{
		marginTop: deviceWidth*3/100,
		fontSize: 20,
		color: '#f44336',
		fontWeight: 'bold',
		alignSelf:'center',
	},
	textInfo:{
		fontSize: 17,
		fontWeight: 'bold',
		marginRight: deviceWidth*2/100,

	},
	textTitle:{
		fontSize: 17,
		color: '#757575',
		fontStyle: 'italic',
		marginLeft: deviceWidth*2/100,
	},
	imagePayment:{
		alignSelf: 'center',
		height:(deviceWidth-deviceHeight*2/11)/8,
		width:(deviceWidth-deviceHeight*2/11)/8,
		marginLeft: deviceWidth*3/100,
		resizeMode: 'contain'
	},
	viewButton:{
		marginTop: deviceWidth*5/100,
		marginLeft: deviceWidth*5/100,
		marginRight: deviceWidth*5/100,
		flex: 3,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	lableModal:{
		fontSize:17,
		color: '#212121',
		paddingLeft:30,

	},
	textModal:{
		fontSize:17,
		paddingLeft:deviceWidth*5/100,
		fontWeight:'bold',
		width: deviceWidth*60/100
	},

});
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
)(Product)
