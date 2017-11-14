import React, { Component } from "react";
import { Platform, StyleSheet,View,Image,TouchableHighlight,Modal,TextInput,Dimensions } from "react-native";
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
  Text
} from "native-base";
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
		productName: 'Product name',
		sourceImage: 'http://angular.github.io/react-native-renderer/assets/react.png',
		material: 'material',
		size: 'size',
		weight: 'weight',
		totalWeight: 'total weight',
		currentHighBid: 300,
		modalVisible: false,
		isFirstProduce: true,
		isLastProduce: false,
		
	};
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
			<Text style ={{fontSize:18, fontWeight:'bold',color: '#212121'}}>{this.state.productName}</Text>
			<View style={{justifyContent: 'center',alignContent: 'center',alignItems: 'center',}}>
				<Image
				style={{height:deviceHeight*(4/11), width:deviceWidth-deviceHeight*2/11}}
				source={{uri: this.state.sourceImage}}
				/>
			</View>
			<View style={{backgroundColor: '#0097A7', justifyContent: 'center',alignContent: 'center',alignItems: 'center',}}>
				<Text style={{fontSize:18, fontWeight:'bold',color: '#FAFAFA',justifyContent: 'center',alignContent: 'center'}}>{this.state.material}</Text>
				<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center'}}>{this.state.size}</Text>
				<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center'}}>{this.state.weight}</Text>
				<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center'}}>{this.state.totalWeight}</Text>
			</View>
			<View style={{justifyContent: 'center',alignContent: 'center',alignItems: 'center'}}>
				<Text style={{paddingBottom:deviceHeight/30, paddingTop:deviceHeight/30, fontSize:18,fontWeight:'bold',color: '#D84315'}}>{'Current high bid: $' +(this.state.currentHighBid).toString()}</Text>
			</View>
			<View style = {{flex: 3,flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center'}}>
				<Button
					onPress={() =>
					  ActionSheet.show(
						{
						  options: BUTTONS,
						  cancelButtonIndex: CANCEL_INDEX,
						  destructiveButtonIndex: DESTRUCTIVE_INDEX,
						  title: "Options"
						},
						buttonIndex => {
						  this.setState({ clicked: BUTTONS[buttonIndex] });
						}
					  )}
					 style={{backgroundColor: '#F9A825', height:deviceHeight/15, width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center'}}
				  >
					<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',alignItems: 'center'}}>{'   Add to\nwatch list'}</Text>
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
			<Text style={{fontSize:18,color: '#212121',paddingBottom:deviceHeight/30, paddingTop:10,fontWeight:'bold'}}>{'About the Wine'}</Text>
			<View style = {{flex: 2,flexDirection: 'row',justifyContent: 'space-around',alignItems: 'center',marginBottom:deviceHeight/30}}>
				<View style = {{flex: 2,flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'center',marginLeft: 20}}>
					<Button 
						onPress={() =>
						ActionSheet.show(
						{
						  options: BUTTONS,
						  cancelButtonIndex: CANCEL_INDEX,
						  destructiveButtonIndex: DESTRUCTIVE_INDEX,
						  title: "Options"
						},
						buttonIndex => {
						  this.setState({ clicked: BUTTONS[buttonIndex] });
						}
					  )}
						style ={{height:deviceHeight/15,width: deviceHeight/15,borderRadius: deviceHeight/30,justifyContent: 'center',alignItems: 'center',backgroundColor: this.state.isFirstProduce ? '#CFD8DC' : '#F4511E',}}
					>
						<Text style={{fontSize:15,color: '#212121',paddingBottom:10, paddingTop:10,fontWeight:'bold'}} >{'<'}</Text>
					</Button>
					<Text style= {{paddingLeft: 10}}>{'Previous'}</Text>
				</View>
				<View style = {{flex: 2,flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'center', marginRight: 20}}>
					<Text style = {{paddingRight:10}}>{'Next'}</Text>
					<Button 
						onPress={() =>
						ActionSheet.show(
						{
						  options: BUTTONS,
						  cancelButtonIndex: CANCEL_INDEX,
						  destructiveButtonIndex: DESTRUCTIVE_INDEX,
						  title: "Options"
						},
						buttonIndex => {
						  this.setState({ clicked: BUTTONS[buttonIndex] });
						}
						)}
						style ={{ height:deviceHeight/15,width: deviceHeight/15,borderRadius: deviceHeight/30,justifyContent: 'center',alignItems: 'center',backgroundColor: this.state.isLastProduce ? '#CFD8DC' : '#F4511E'}}
					>
						<Text style={{fontSize:15,color: '#212121',paddingBottom:10, paddingTop:10,fontWeight:'bold'}}>{'>'}</Text>
					</Button>
				</View>
			</View>
 
        </Content>
		
		<Modal
			animationType="slide"
			transparent={true}
			visible={this.state.modalVisible}
			onRequestClose={() => {this.setState({modalVisible:false})}}
			>
			<View style={{height: deviceHeight*6/15,backgroundColor: '#FFE0B2', marginTop:deviceHeight/3, marginRight:20, marginLeft:20}}>
				<View style = {{marginTop: 20,}}>
					<Text style={{fontSize:15,color: '#212121',paddingLeft:30, fontWeight:'bold'}}>{'Enter your bid:'}</Text>
					<TextInput style = {{fontSize:20,paddingLeft:30,}}
						value = {this.state.height}
					/>
				</View>
				<View style = {{marginTop: 20,}}>
					<Text style={{fontSize:15,color: '#212121',paddingLeft:30, fontWeight:'bold'}}>{'Last bid:'}</Text>
					<TextInput style = {{fontSize:20,paddingLeft:30,}}
						value = {'$' +(this.state.currentHighBid).toString()}
					/>
				</View>
				<View style={{justifyContent: 'center',alignContent: 'center',alignItems: 'center'}}>
					<Button
						onPress={() =>
						  ActionSheet.show(
							{
							  options: BUTTONS,
							  cancelButtonIndex: CANCEL_INDEX,
							  destructiveButtonIndex: DESTRUCTIVE_INDEX,
							  title: "Options"
							},
							buttonIndex => {
							  this.setState({ clicked: BUTTONS[buttonIndex] });
							}
						  )}
						 style={{backgroundColor: '#1565C0',height:deviceHeight/15,width:deviceWidth *6/16,justifyContent: 'center',alignContent: 'center', alignItems: 'center',marginTop:25, marginLeft : deviceWidth*5/16-20}}
					  >
						<Text style={{fontSize:15, color: '#FAFAFA',justifyContent: 'center',alignContent: 'center',fontWeight:'bold'}}>{'BID NOW'}</Text>
					</Button>
				</View>
			</View>
		</Modal>
      </Container>
	  
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
});