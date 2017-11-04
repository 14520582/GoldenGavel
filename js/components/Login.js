import React, { Component } from "react";
import { Image, View, StatusBar,StyleSheet, Dimensions, ScrollView, ActivityIndicator } from "react-native";

import { Container, Button, H3, Header, Title, Body, Left, Right, Input,Item, Icon,Text } from "native-base";

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import ToAPI from '../server/ToAPI'
const deviceHeight = Dimensions.get("window").height;
const backGround = require("../assets/bg-login.jpg");
const logo = require("../assets/goldengavel-logo.png");
import configureStore from '../config/configureStore'
const {persistor, store} = configureStore()
// let fireBaseconfig = {
// 	 apiKey: "AIzaSyDHGf9OI9x1GexWtCDgZqNcsIYy4U0t0nc",
// 	 authDomain: "goldengavel-5dca5.firebaseapp.com",
// 	 databaseURL: "https://goldengavel-5dca5.firebaseio.com",
// 	 projectId: "goldengavel-5dca5",
// 	 storageBucket: "goldengavel-5dca5.appspot.com",
// 	 messagingSenderId: "684519341231",
// 	 persistence: true,
// };
// firebase.initializeApp(fireBaseconfig,'app')
class Login extends Component {
	// eslint-disable-line
	constructor(props) {
		super(props);
		this.unsubscribe = null;
		this.state = {
			username: "",
			password: "",
			isLoading: false,
		};
	}
	componentWillMount(){

	}
	render() {
		return (
				<Image
					style={styles.container}
					source={backGround}
				>
					<View style={styles.containerLogo}>
						<Image
							style={styles.logo}
							source={logo}
						/>
						<View style={{alignItems: 'center', justifyContent: 'center'}}>
							<Text style={styles.title}>Golden Gavel</Text>
							<Text style={{paddingLeft: 10, color: 'white'}}>Auction at your fingertips</Text>
						</View>
					</View>
					{
					!this.state.isLoading && <View style={styles.containerForm}>
						<Item rounded style={{marginTop: 5, backgroundColor: 'white'}}>
							<Icon name="md-mail-open" />
							<Input placeholder='E-Mail or Username'/>
						</Item>
						<Item rounded style={{marginTop: 5, backgroundColor: 'white'}}>
							<Icon style={{fontSize: 27, paddingLeft: 14}} name="md-lock" />
							<Input placeholder='Password' secureTextEntry = {true}/>
						</Item>
						<View style={{paddingTop: 20}}>
							<Text style={{paddingBottom: 5,fontWeight: 'bold', color: 'white'}}>Forgot your password?</Text>
							<Button rounded style={styles.button}
									onPress={() => this.onLoginAccount()}>
								<Text>Sign in</Text>
							</Button>
							<View style={{paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{color: 'white'}}>or</Text>
							</View>
							<View style={{paddingTop: 5}}>
								<Button rounded iconLeft style={styles.buttonFB}
									onPress={() => this.onLoginFacebook()}>
									<Icon name='logo-facebook'/>
									<Text>Sign in with Facebook</Text>
								</Button>
							</View>
							<View style={{paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								<Text style={{color: 'white'}}>Dont have a account yet?</Text>
								<Text style={{fontWeight: 'bold', color: 'white'}}> Sign up</Text>
							</View>
						</View>
					</View>
					}
					{
						this.state.isLoading && <View>
							<ActivityIndicator color='white' size='large'/>
						</View>
					}
				</Image>
		);
	}
	onLoginAccount(){
		//ToAPI.setUserInfo('sd')
	}
	onLoginFacebook(){
		this.setState ({
				isLoading: true
		})
		LoginManager.logInWithReadPermissions(['public_profile', 'email'])
	  .then((result) => {
	    if (result.isCancelled) {
	      return Promise.reject(new Error('The user cancelled the request'));
	    }

	    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
	    // get the access token
	    return AccessToken.getCurrentAccessToken();
	  })
	  .then(data => {
	    // create a new firebase credential with the token
	    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

	    // login with credential
	    return firebase.auth().signInWithCredential(credential);
	  })
	  .then((currentUser) => {
				let userinfo ={
					displayName: currentUser.displayName,
					email: currentUser.email,
					phoneNumber: "09877554333",
					photoURL: currentUser.photoURL,
					uid: currentUser.uid,
					address: "",
					facebook: "facebook.com/temp",
					twitter: "twitter.com/temp",
				}
				ToAPI.setUserInfo(userinfo)
				this.props.dispatchInfoUserUpdate(userinfo)
				this.props.navigation.navigate('Home')
	  })
	  .catch((error) => {
			this.setState ({
					isLoading: false
			})
	  });
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    alignItems: 'center',
		justifyContent: 'center'
  },
	containerForm: {
		padding: 20,
		justifyContent: 'center',
    alignItems: 'center',
  },
	buttonText: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
		backgroundColor: '#FFA000'
	},
	buttonFB: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 250,
		backgroundColor: '#3b5998'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		color: 'white',
		paddingLeft: 10
	},
	containerLogo:{
		justifyContent: 'center',
		flexDirection: 'row',
	},
	logo: {
		width: 90,
		height: 90,
		resizeMode: 'contain',
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
)(Login)
