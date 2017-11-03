import React, { Component } from "react";
import { Image, View, StatusBar, Text,StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { Container, Button, H3, Header, Title, Body, Left, Right, Input,Item, Icon } from "native-base";


class SplashScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
  componentWillMount() {
		//alert(JSON.stringify(this.props.infouser))
    this.checkLogin()
  }
	render() {
		return (
      <Container style={styles.container}>
      </Container>
		);
	}
  checkLogin() {
    if(this.props.infouser){
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
)(SplashScreen)
