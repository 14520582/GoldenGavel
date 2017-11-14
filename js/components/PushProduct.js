import React, { Component } from "react";
import { Image, View, StatusBar, Text,StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { Container, Button, H3, Header, Content, Title,Form, Body, Left, Right, Input,Item, Icon, Label,Picker } from "native-base";
const deviceWidth = Dimensions.get('window').width;
const addimage = require('../assets/add-camera.png')
class PushProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image1: null,
			image2: null,
			image3: null,
			image4: null,
			category: undefined,
			height: 100,
		};
	}
	onValueChange2(value: string) {
	 this.setState({
		 category: value
	 });
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
          <Right />
        </Header>
        <Content padder>
					<View style={styles.containerRowImage}>
						<Image source ={ this.state.image1 ? {uri: this.state.image1} : addimage} style={styles.containerImage}/>
						<Image source ={addimage} style={styles.containerImage}/>
						<Image source ={addimage} style={styles.containerImage}/>
						<Image source ={addimage} style={styles.containerImage}/>
					</View>
					<Item rounded style={{borderRadius: 4}}>
            <Input style={{fontWeight:'bold', fontSize: 18}} placeholder='Product Name' />
          </Item>
					<View style={styles.row}>
						<Text style={styles.titleSection}>Starting Bid</Text>
						<Item rounded style={{width: 200, borderRadius: 4}}>
            	<Input placeholder='100,000' />
          	</Item>
					</View>
					<View style={styles.row}>
						<Text style={styles.titleSection}>Bid Increment</Text>
						<Item rounded style={{width: 200, borderRadius: 4}}>
            	<Input placeholder='10,000' />
          	</Item>
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
							<Item label="Wallet" value="key0" />
							<Item label="ATM Card" value="key1" />
							<Item label="Debit Card" value="key2" />
							<Item label="Credit Card" value="key3" />
							<Item label="Net Banking" value="key4" />
					</Picker>
					</View>
					<Text style={[styles.titleSection, {paddingBottom: 10, paddingTop: 15}]}>Description</Text>
					<Item rounded style={{borderRadius: 4}}>
            <Input style={[styles.textinput, {height: this.state.height}]}
							multiline = {true}
							onContentSizeChange={(event) => {
									if(event.nativeEvent.contentSize.height > 100)
									this.setState({ height: event.nativeEvent.contentSize.height })
									if(event.nativeEvent.contentSize.height < 100)
									this.setState({ height: 100 })
							}}
						 	placeholder='Briefly describe your product...'/>
          </Item>
					<View style={[styles.row, {marginBottom: 20}]}>
					<Text style={styles.titleSection}>Payment</Text>
					<Picker
							mode="dropdown"
							placeholder="Select One"
							selectedValue={this.state.category}
							style={{width: 200}}
							onValueChange={this.onValueChange2.bind(this)}
						>
							<Item label="Wallet" value="key0" />
							<Item label="ATM Card" value="key1" />
							<Item label="Debit Card" value="key2" />
							<Item label="Credit Card" value="key3" />
							<Item label="Net Banking" value="key4" />
					</Picker>
					</View>
        </Content>
      </Container>
		);
	}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFAFA"
  },
	textinput: {
		padding: 5,
		textAlignVertical: 'top'
	},
	titleSection: {
		fontSize: 17,
		color: '#757575',
		fontStyle: 'italic'
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
	containerImage:{
		width: deviceWidth/4 - 15,
		height: deviceWidth/4 - 15,
		borderWidth: 1,
		margin: 5,
		resizeMode: 'contain',
		alignItems: 'center',
		justifyContent: 'center'
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
