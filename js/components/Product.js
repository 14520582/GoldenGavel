import React, { Component } from "react";
import { Platform, StyleSheet,View,Image,TouchableHighlight,Modal,TextInput,Dimensions,FlatList,TouchableOpacity } from "react-native";
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
const freeship = require('../assets/shipping.png')
var product={
        "bidincrement" : 40000,
        "category" : "Jewelry",
        "condition" : "New",
        "currentbid" : 1200000,
        "description" : "description",
        "endtime" : 1515585874660,
        "image" : [ "https://firebasestorage.googleapis.com/v0/b/goldengavel-5dca5.appspot.com/o/jewelry1.jpg?alt=media&token=436b4a32-d882-4938-9341-f9da83e46bc6", "https://firebasestorage.googleapis.com/v0/b/goldengavel-5dca5.appspot.com/o/jewelry1-0.jpg?alt=media&token=8d72550d-2573-4b96-918c-38a4941b0c3e", "https://firebasestorage.googleapis.com/v0/b/goldengavel-5dca5.appspot.com/o/jewelry1-1.jpg?alt=media&token=3834271b-479a-46ab-9784-fafa9e98b1a0", "https://firebasestorage.googleapis.com/v0/b/goldengavel-5dca5.appspot.com/o/jewelry1-2.jpg?alt=media&token=d65d42ab-71e4-4302-a24f-6830885ec96e" ],
        "name" : "N40.5326992738992",
        "numberofbid" : 4,
        "owner" : "RtkcoKBxk1cJMycPK3o4ssa1IGw2",
        "payment" : [ "MasterCard", "PayPal", "Visa" ],
        "shipping" : "Free",
        "startingbid" : 400000,
        "starttime" : 1510240274660
      }
var bidder=[{name: 'ngan1111111111111111111111111',  bids:1000000000000}, {name: 'ngan2',  bids:200}, {name: 'ngan3',  bids:300}]
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
		picture : product.image[1],
		modalVisible: false,
		bid : 0,
		
		
	 };
	 this.setPicture=this.setPicture.bind(this);
  }
  componentWillMount(){
    ToAPI.getItem('-KyWKPsOwPOsRkJzy1_F',(item) =>{
		 alert('Start')
    })
  }

  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  
  convertDate2String(miliSecond){
	var date = new Date(miliSecond);
	return date.getDate().toString()+ '-'+ (date.getMonth()+1).toString()+'-'+ date.getFullYear().toString();
  }
  
  distanceTime(end){
	  var today = new Date();
	  time = (end - today)/1000;
	  day = 0
	  hour = 0
	  minute = 0
	  second = Math.floor(time%60)
	  minute = Math.floor(time/60)
	  if(minute >=60){
		  hour=Math.floor(minute/60);
		  minute=minute%60;
			if(hour>=24){
				day=Math.floor(hour/24);
				hour=hour%24				
			}
		}
		stringHour = hour.toString()
		stringMinute = minute.toString()
		stringSecond = second.toString()
		if(hour < 10) stringHour = '0'+hour
		if(minute < 10) stringMinute = '0'+ minute
		if(second < 10) stringSecond = '0'+second
	  stringTime = ''
		if(Math.floor(hour/24)> 1) {stringTime = Math.floor(hour/24)+ ' Days ' + stringHour + ':' +stringMinute+ ':' +stringSecond;}
		else{
			if (Math.floor(hour/24)== 1)  {stringTime = Math.floor(hour/24)+' Day '  + stringHour + ':' +stringMinute+ ':' +stringSecond;}
			else {stringTime =  + stringHour + ':' +stringMinute+ ':' +stringSecond;}
		}
	  return stringTime;
  }
  
  
  checkPayMethod(method){
	  return product.payment.indexOf(method)
	  
  }
  
  setPicture(uri){
	  this.setState({picture:uri})
	  return
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
        <Content padder>
			<View style={styles.imagesViewParent}>
				<View style={styles.imagesView}>
					<Image
					style={{height:deviceHeight*(4/11), width:deviceWidth-deviceWidth*10/100}}
					source={{uri: this.state.picture}}
					resizeMode={'contain'}
					/>
				</View>
				<View style={styles.subImageViews}>
					
					<TouchableOpacity style={styles.smallImage}
						onPress={() => this.setPicture(product.image[1])}
					>
						<Image style = {styles.smallImage} source={{uri: product.image[1]}}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.smallImage}
						onPress={() => this.setPicture(product.image[2])}
					>
						<Image style = {styles.smallImage} source={{uri: product.image[2]}}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.smallImage}
						onPress={() => this.setPicture(product.image[3])}
					>
						<Image style = {styles.smallImage} source={{uri: product.image[3]}}/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.smallImage}
						onPress={() => this.setPicture(product.image[4])}
					>
						<Image style = {styles.smallImage} source={{uri: product.image[4]}}/>
					</TouchableOpacity>
					
				</View>
			</View>
			<Text numberOfLines={2} style={styles.nameProduct}>{product.name}</Text>
			<Text style={styles.textBid}>{'Current bid: $'+(product.currentbid).toString()}</Text>
			<View style = {styles.viewButton}>
				<Button
					onPress={() =>
							alert(JSON.stringify(product))
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
			<View style={styles.viewInfo} >
				
				<View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
					<Text style={styles.textInfo}>{'Start time: '+this.convertDate2String(product.starttime)}</Text>
					<Text style={styles.textInfo}>{this.distanceTime(product.endtime)}</Text>
				</View>
				<Text style={styles.textInfo}>{'Description: '+product.description}</Text>
				<Text style={styles.textInfo}>{'Seller: '+product.owner}</Text>
				<Text style={styles.textInfo}>{'Condition: '+product.condition}</Text>
				<View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
					<Text style={styles.textInfo}>{'Start bid: '+product.startingbid}</Text>
					<Text style={styles.textInfo}>{'Bid increament: '+product.bidincrement}</Text>
				</View>
				<View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
					<Text style={styles.textInfo}>{'Payment: '}</Text>
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
						source={ (product.shipping == 'Free') ? freeship : null}
					/>
		
				</View>
			</View>
			
			<Text style={{marginLeft:deviceWidth*5/100, fontWeight:'bold'}}>{'Number of bid: ' +(product.numberofbid).toString()}</Text>
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
			<View style={{ justifyContent: 'center', alignItems:'center',alignContent: 'center',marginLeft: deviceWidth*10/100,marginRight: deviceWidth*10/100,alignSelf:'center',flex:1}}>
				<View style={{height: deviceHeight/3,backgroundColor: '#FFE0B2',alignSelf:'center'}}>
					<View style = {{marginTop: 20,}}>
						<Text style={styles.lableModal}>{'Enter your bid:'}</Text>
						<View style={{flexDirection:'row', marginRight: deviceWidth*10/100,marginLeft: deviceWidth*10/100,}}>
						<TextInput style = {styles.textModal}
								keyboardType = 'numeric'
								//value={this.state.currentBid.toString()}
								onChangeText = {(bid) => this.setState({bid})}
							/>
							<Text style={{fontSize: 20,color: '#f44336',fontWeight: 'bold',alignSelf:'flex-end'}}>{this.state.bid <= product.currentbid ? '*': null}</Text>
						</View>
					</View>
					<View style = {{marginTop: 20,flexDirection:'row'}}>
						<Text style={styles.lableModal}>{'Last bid:'}</Text>
						<Text style = {styles.textModal}>{'$'+product.currentbid}</Text>		
					</View>
					<View style={styles.viewButton}>
						<Button
							onPress={() =>
								this.state.bid > product.currentbid ? this.setState({modalVisible:false,}) : Toast.show({text: 'Your bid is invalid. Please re-enter!',position: 'bottom',duration: 4000})
							 }
							 style={{backgroundColor: '#F4511E', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center',alignSelf:'center'}}
						  >
							<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',fontWeight:'bold'}}>{'BID NOW'}</Text>
						</Button>
					</View>
				</View>
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
	fontSize:18,
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
	justifyContent: 'center',
	alignContent: 'center',
	alignItems: 'center', 
	position: 'absolute',
	marginRight: deviceWidth*5/100,
	marginRight: deviceWidth*3/100,


	},
	subImageViews:{
	justifyContent: 'space-between',
	alignContent: 'center',
	alignItems: 'center',
	alignSelf: 'flex-end',
	flexDirection:'row',
	marginTop: 	deviceHeight*(4/11) -(deviceWidth-deviceWidth*2/11)/7,
	width:(deviceWidth-deviceHeight*10/11)/7,
	},
	smallImage:{
		height:(deviceWidth-deviceHeight*2/11)/7, 
		width:(deviceWidth-deviceHeight*2/11)/7,
	},
	
	viewInfo: {
		marginTop: deviceWidth*5/100,
		marginLeft: deviceWidth*5/100,
		marginRight: deviceWidth*5/100,
		borderColor: '#607D8B',
		borderTopWidth: 1,
		borderBottomWidth:1,
		
	},
	
	textBid:{
		marginTop: deviceWidth*5/100,
		fontSize: 20,
		color: '#f44336',
		fontWeight: 'bold',
		alignSelf:'center',
	},
	textInfo:{
		fontSize: 15,
		color: '#757575'
	},
	
	imagePayment:{
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
		fontSize:15,
		color: '#212121',
		paddingLeft:30, 
			
	},
	textModal:{
		fontSize:15,
		paddingLeft:deviceWidth*5/100,
		fontWeight:'bold',	
		width: deviceWidth*60/100
	},

});
