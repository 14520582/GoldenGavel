import React, { Component } from "react";
import { Image, View, StatusBar, Text,StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { Container, Button, H3, Header, Content, Title,Form, Body, Left, Fab, Right,Radio, ListItem, Input,Item, Icon, Label,Picker } from "native-base";
import DatePicker from 'react-native-datepicker'
const deviceWidth = Dimensions.get('window').width;
const addimage = require('../assets/add-camera.png')
import ToAPI from '../server/ToAPI'
const paypal = require('../assets/paypal.png')
const visa = require('../assets/visa.png')
const mastercard = require('../assets/mastercard.png')
const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Option',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class PushProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image1: null,
			image2: null,
			image3: null,
			image4: null,
			payment: 'Transfer',
			category: 0,
			height: 100,
			name: '',
			description: '',
			endtime:	new Date(),
			startingbid: "",
			bidincrement: "",
			mastercard: true,
			paypal: false,
			shipping: "Unknown",
			visa: false,
			categories: null,
		};
	}
	onValueChange2(value: string) {
	 this.setState({
		 category: value
	 });
 	}
	onValueChange1(value: string) {
	 this.setState({
		 shipping: value
	 });
 	}
	onValueChange(value: string) {
	 this.setState({
		 payment: value
	 });
 	}
  pushProduct() {
    let payment=[];
    if(this.state.payment == 'Transfer') {
      if(this.state.mastercard)
        payment.push('Mastercard')
      if(this.state.mastercard)
        payment.push('Paypal')
      if(this.state.mastercard)
        payment.push('Visa')
    }
    let product = {
      name: this.state.name,
      startingbid: this.state.startingbid,
      bidincrement: this.state.bidincrement,
      endtime: this.state.endtime,
      startingtime: new Date(),
      payment: this.state.payment == 'Transfer' ? payment : this.state.payment,
      description: this.state.description,
      category: this.state.categories[this.state.category],
      image: [image1,image2,image3,image4],
      shipping: this.state.shipping
    }
    ToAPI.pushProduct(product,this.props.infouser.uid)
  }
  checkValid(){
  }
	getPhoto(index) {
		ImagePicker.showImagePicker(options, (response) => {
	  	console.log('Response = ', response);

	  if (response.didCancel) {
	    console.log('User cancelled image picker');
	  }
	  else if (response.error) {
	    console.log('ImagePicker Error: ', response.error);
	  }
	  else if (response.customButton) {
	    console.log('User tapped custom button: ', response.customButton);
	  }
	  else {
			switch (index) {
				case 1:
					this.setState({
						image1: response.uri
					});
				break;
				case 2:
					this.setState({
						image2: response.uri
					});
				break;
				case 3:
					this.setState({
						image3: response.uri
					});
				break;
				case 4:
					this.setState({
						image4: response.uri
					});
				break;
				default:
			}
	  }
		});
	}
	componentWillMount() {
		 ToAPI.getCategories((categories) =>{
			this.setState({
				categories: categories
			})
		})
	}
	changeToCurrency(money) {
		let value = money.toString()
		if (value != "") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1" + ',');
    }
		return value
	}
  removeImage(index) {
    switch (index) {
      case 1:
        this.setState({
          image1: null
        });
      break;
      case 2:
        this.setState({
          image2: null
        });
      break;
      case 3:
        this.setState({
          image3: null
        });
      break;
      case 4:
        this.setState({
          image4: null
        });
      break;
      default:
    }
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
            <Title>Push an item</Title>
          </Body>
          <Right>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon style={{fontSize: 25}}name="md-paper-plane" />
						</Button>
					</Right>
        </Header>
        <Content padder>
					<View style={styles.containerRowImage}>
						<TouchableOpacity onPress={() => this.getPhoto(1)}>
							<Image source ={this.state.image1 ? {uri: this.state.image1} : addimage} style={styles.containerImage}>
                {
                  this.state.image1 && <Button transparent onPress={() => this.removeImage(1)}>
      							<Icon style={styles.removeIcon} name="md-close" />
      						</Button>
                }
              </Image>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.getPhoto(2)}>
							<Image source ={this.state.image2 ? {uri: this.state.image2} : addimage} style={styles.containerImage}>
              {
                this.state.image2 && <Button transparent onPress={() => this.removeImage(2)}>
                  <Icon style={styles.removeIcon} name="md-close" />
                </Button>
              }
              </Image>
            </TouchableOpacity>
						<TouchableOpacity onPress={() => this.getPhoto(3)}>
							<Image source ={this.state.image3 ? {uri: this.state.image3} : addimage} style={styles.containerImage}>
              {
                this.state.image3 && <Button transparent onPress={() => this.removeImage(3)}>
                  <Icon style={styles.removeIcon} name="md-close" />
                </Button>
              }
              </Image>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.getPhoto(4)}>
							<Image source ={this.state.image4 ? {uri: this.state.image4} : addimage} style={styles.containerImage}>
              {
                this.state.image4 && <Button transparent onPress={() => this.removeImage(4)}>
                  <Icon style={styles.removeIcon} name="md-close" />
                </Button>
              }
              </Image>
						</TouchableOpacity>
					</View>
					<Item rounded style={{borderRadius: 4}}>
            <Input
							style={{fontWeight:'bold', fontSize: 18}}
							placeholder='Product Name'
							value={this.state.name}
						/>
          </Item>
					<View style={[styles.row, {justifyContent: 'space-between'}]}>
						<Text style={styles.titleSection}>Starting Bid</Text>
						<View style={styles.row}>
							<Item rounded style={{width: 170, borderRadius: 4}}>
	            	<Input placeholder='...'
								value={this.changeToCurrency(this.state.startingbid)}
								onChangeText={(text) => {
									this.setState({startingbid: text})
								}}/>
	          	</Item>
							<Text style={{paddingLeft: 5}}>VNĐ</Text>
						</View>
					</View>
					<View style={[styles.row, {justifyContent: 'space-between'}]}>
						<Text style={styles.titleSection}>Bid Increment</Text>
						<View style={styles.row}>
							<Item rounded style={{width: 170, borderRadius: 4}}>
	            	<Input placeholder='...'
								value={this.changeToCurrency(this.state.bidincrement)}
								onChangeText={(text) => {
									this.setState({bidincrement: text})
								}}/>
	          	</Item>
							<Text style={{paddingLeft: 5}}>VNĐ</Text>
						</View>
					</View>
					<View style={[styles.row, {paddingTop: 15}]}>
						<Text style={styles.titleSection}>End Time</Text>
						<DatePicker
			        style={{width: 203}}
			        date={this.state.endtime}
			        mode="datetime"
			        placeholder="select date"
			        format="DD-MM-YYYY HH:mm"
			        minDate="17-11-2017"
			        maxDate="17-12-2017"
			        confirmBtnText="Confirm"
			        cancelBtnText="Cancel"
			        customStyles={{
			          dateIcon: {
			            position: 'absolute',
			            left: 175,
			            top: 4,
			            marginLeft: 0
			          },
			          dateInput: {
			            marginRight: 32,
									borderRadius: 4,
			          }
			          // ... You can check the source to find the other keys.
			        }}
			        onDateChange={(date) => {this.setState({endtime: date})}}
			      />
					</View>
					<View style={styles.row}>
					<Text style={styles.titleSection}>Category</Text>
					<Picker
							mode="dropdown"
							placeholder="Select One"
							selectedValue={this.state.category}
							style={{width: 200}}
							onValueChange={this.onValueChange2.bind(this)}
						>
						{
							this.state.categories && this.state.categories.map((item, index) => <Item label={item.category} key={index} value={index} />)
						}
					</Picker>
					</View>
					<Text style={[styles.titleSection, {paddingBottom: 10, paddingTop: 15}]}>Description</Text>
					<Item rounded style={{borderRadius: 4}}>
            <Input style={[styles.textinput, {height: this.state.height}]}
							multiline = {true}
              value={this.state.description}
              onChangeText={(text) => {
                this.setState({description: text})
              }}
							onContentSizeChange={(event) => {
									if(event.nativeEvent.contentSize.height > 100)
									this.setState({ height: event.nativeEvent.contentSize.height })
									if(event.nativeEvent.contentSize.height < 100)
									this.setState({ height: 100 })
							}}
						 	placeholder='Briefly describe your product...'/>
          </Item>
					<View style={styles.row}>
					<Text style={styles.titleSection}>Payment</Text>
					<Picker
							mode="dropdown"
							placeholder="Select One"
							selectedValue={this.state.payment}
							style={{width: 200}}
							onValueChange={this.onValueChange.bind(this)}
						>
							<Item label="Transfer" value="Transfer" />
							<Item label="COD" value="COD" />
							<Item label="Other" value="Other" />
					</Picker>
					</View>
					{
					 this.state.payment=='Transfer' && <View>
						<View style={styles.row}>
							<TouchableOpacity onPress={() => this.setState({mastercard: !this.state.mastercard})}>
								<View style={styles.row1}>
								<Image style={styles.paymentIcon} source={mastercard}/>
								<Radio selected={this.state.mastercard} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.setState({paypal: !this.state.paypal})}>
								<View style={styles.row1}>
									<Image style={styles.paymentIcon} source={paypal}/>
									<Radio selected={this.state.paypal} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.setState({visa: !this.state.visa})}>
								<View style={styles.row1}>
									<Image style={styles.paymentIcon} source={visa}/>
									<Radio selected={this.state.visa} />
								</View>
							</TouchableOpacity>
						</View>
					</View>
					}
					<View style={[styles.row, {marginBottom: 20}]}>
						<Text style={styles.titleSection}>Shipping</Text>
						<Picker
								mode="dropdown"
								placeholder="Select One"
								selectedValue={this.state.shipping}
								style={{width: 200}}
								onValueChange={this.onValueChange1.bind(this)}
							>
								<Item label="Unknown" value="Unknown" />
								<Item label="Free" value="Free" />
						</Picker>
					</View>
        </Content>
      </Container>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
	textinput: {
		padding: 5,
		textAlignVertical: 'top'
	},
	paymentIcon: {
		resizeMode: 'stretch',
		height: 40,
		width: 40,
		marginRight: 10
	},
	titleSection: {
		fontSize: 17,
		color: '#757575',
		fontStyle: 'italic'
	},
	row1:{
		flexDirection: 'row',
		alignItems: 'center',
	},
	row:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 8,
	},
	containerRowImage:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
  removeIcon:{
		left: -10,
    top: -8,
    color: 'red'
	},
	containerImage:{
		width: deviceWidth/4 - 15,
		height: deviceWidth/4 - 15,
		borderWidth: 1,
		margin: 5,
		resizeMode: 'contain',
	},
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser))
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PushProduct)
