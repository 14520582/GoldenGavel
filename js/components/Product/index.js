import React, { Component } from "react";
import { Platform, StyleSheet,View,Image,TouchableHighlight,Modal,TextInput,Dimensions,BackHandler,FlatList,TouchableOpacity } from "react-native";
import DateTime from '../../util/DateTime'
import Currency from '../../util/Currency'
import ProductDetails from './ProductDetails'
import BidHistory from './BidHistory'
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
  Tab,
  Fab,
  Tabs,
  TabHeading,
  Right,
  Content,
  Footer,
  ActionSheet,
  Text,
  Toast,
} from "native-base";
import styles from './styles'
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
class Product extends Component {
  constructor(props) {
    super(props);
    this._BackHandler = this._BackHandler.bind(this)
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
    index: 0,
		productID : this.props.navigation.state.params.product.key,
		productCategory : this.props.navigation.state.params.product.category,
    seller: null,
    isEnded: false,
	 };
  }
  _BackHandler = () => {
    this.props.navigation.goBack(null)
    return true;
  }
  componentDidMount (){
    BackHandler.addEventListener('hardwareBackPress', this._BackHandler)
  }
  componentWillUnMount (){
    BackHandler.removeEventListener('hardwareBackPress', this._BackHandler)
  }
  _onChangeTab = ({i, ref, from}) => {
    this.setState({index: i})
  }
  componentWillMount(){
    ToAPI.getItem(this.state.productID,this.state.productCategory,(item) =>{
		  this.setState({product:item, bid : item.currentbid + item.bidincrement, isEnded: DateTime.isEnded(item.endtime)})
      ToAPI.getUserInfo(item.owner,(data) => {
        this.setState({seller: data})
      })
    })
    // ToAPI.getItem('-KyWKV7CmvxwpTUofhez','Sunglasses',(item) =>{
		//  this.setState({product:item, bid : item.currentbid + item.bidincrement})
    //  ToAPI.getUserInfo(item.owner,(data) => {
    //    this.setState({seller: data})
    //  })
    // })
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
  viewFullImage = () => {
    this.setState({modalPicture:true})
  }
  changePicture = (index) => {
    this.setState({pictureIndex:index})
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded hasTabs androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
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
        <Tabs initialPage={0} locked={true} onChangeTab={this._onChangeTab}>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Text style={this.state.index == 0 ? styles.active : styles.normal} >Information</Text>
            </TabHeading>
          }>
            <ProductDetails product={this.state.product} navigation = {this.props.navigation} seller = {this.state.seller} viewFullImage={this.viewFullImage} changePicture={this.changePicture}/>
          </Tab>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Text style={this.state.index == 1 ? styles.active : styles.normal}>Bid History</Text>
            </TabHeading>
          }>
            <BidHistory navigation= {this.props.navigation} productid={this.state.product.key}/>
          </Tab>
        </Tabs>
    		<Modal
    			animationType="fade"
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
    						<Icon name="md-close"/>
    					</TouchableOpacity>
    					<View style = {{marginTop: 20,}}>
    						<Text style={styles.lableModal}>{'Your bid:'}</Text>
    						<View style={[styles.row, {alignSelf: 'center'}]}>
    							<Text style={{fontSize: 25,color: '#f44336',fontWeight: 'bold'}}>{Currency.convertNumberToCurrency(this.state.bid) + ' VNĐ'}</Text>
    							<View style={{marginLeft: 15}}>
    								<TouchableOpacity
    									onPress={() => this.setState({bid: this.state.bid+this.state.product.bidincrement})}
    								>
    									<Image style = {styles.imageUpDown} source={increase}/>
    								</TouchableOpacity>

    								<TouchableOpacity
    									onPress={() => this.setState({bid: this.state.bid > this.state.product.currentbid ? this.state.bid-this.state.product.bidincrement : this.state.product.currentbid + this.state.product.bidincrement})}
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
    						<Button
    							onPress={() => {
                    if(this.state.bid >this.state.product.currentbid) {
                      ToAPI.bid(this.props.infouser.uid, this.state.product, this.state.bid)
                      this.setState({modalVisible:false,})
                      Toast.show({text: 'Bidded successfully',type: 'success', position: 'top',duration: 4000})
                    }else
                    Toast.show({text: 'Your bid is invalid. Please re-enter!',position: 'top',duration: 4000})
                  }}
    							 style={{backgroundColor: '#F4511E', height:deviceHeight/15, marginTop: 15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center',alignSelf:'center'}}
    						  >
    							<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',fontWeight:'bold'}}>{'BID NOW'}</Text>
    						</Button>
    				</View>
    			</View>
    		</Modal>
    		<Modal
    			animationType="fade"
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
        {
        <TouchableOpacity
          onPress={() => {
            if(!this.state.isEnded){
              if(this.state.product.owner !== this.props.infouser.uid)
              {
                this.setState({modalVisible:true})
              }
              else {
                ToAPI.endBid(this.state.productCategory, this.state.productID)
                this.setState({isEnded:true})
              }}
        }}
        >
          <Footer style={styles.footerButton}>
          {
            !this.state.isEnded && <Text style={styles.buttonText}>{this.state.product.owner !== this.props.infouser.uid ? 'BID NOW' : 'END NOW'}</Text>
          }
          {
            this.state.isEnded && <Text style={styles.buttonText}>ENDED</Text>
          }
          </Footer>
        </TouchableOpacity>
      }
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
