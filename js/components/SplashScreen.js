import React, { Component } from "react";
import { Image, View, StatusBar, Text,StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { updateNotificationNumber, updateMessageNumber } from '../actions/notification'
import { Container, Button, H3, Header, Title, Body, Left, Right, Input,Item, Icon } from "native-base";
import ToAPI from '../server/ToAPI'
import Auth from '../util/Auth'
import firebase from 'react-native-firebase'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
  componentWillMount() {
		//alert(JSON.stringify(this.props.notification))
		//alert(JSON.stringify(this.props.notificaton))
    this.checkLogin()
  }
	componentDidMount() {
	}
	render() {
		return (
      <Container style={styles.container}>
      </Container>
		);
	}
  checkLogin() {
    if(this.props.infouser) {
			FCM.subscribeToTopic('Message_' + this.props.infouser.uid);
			FCM.subscribeToTopic('Notification_' + this.props.infouser.uid);
			ToAPI.getUserInfo(this.props.infouser.uid,(user) => {
				if(user){
					this.props.dispatchInfoUserUpdate(user)
				}
				else {
					Auth.logout(this.props.navigation)
					//this.props.navigation.navigate('Login')
				}
			})
			ToAPI.getNotification(this.props.infouser.uid,(notifications) => {
				let num = 0
				notifications.map((value) => {
					if(value.status === 'New')
					 num++
				})
				this.props.dispatchUpdateNotificationNumber(num)
			})
			ToAPI.getMessage(this.props.infouser.uid,(messages) => {
				let num = 0
				messages.map((value) => {
					if(value.status === 'New')
					 num++
				})
				this.props.dispatchUpdateMessageNumber(num)
			})
			// firebase.messaging().requestPermissions();
			// firebase.messaging().getToken().then(token => {
			//  	firebase.database().ref().child('Token').set(token)
			// });
			// firebase.messaging().subscribeToTopic('Notification_' + this.props.infouser.uid);
			// firebase.messaging().subscribeToTopic('Message_' + this.props.infouser.uid);
			this.props.navigation.navigate('Home')
    }else{
      this.props.navigation.navigate('Login')
    }
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFAFA"
  },
});
function mapStateToProps (state) {
	return {
		notification: state.notification,
		infouser: state.infouser,
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser)),
		dispatchUpdateNotificationNumber: (notification) => dispatch(updateNotificationNumber(notification)),
		dispatchUpdateMessageNumber: (message) => dispatch(updateMessageNumber(message))
	}
}
export default connect(
	mapStateToProps,
	 mapDispatchToProps,
) (SplashScreen)
