import React, { Component } from "react";
import { Image, View, StatusBar, Text,StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { Container, Button, H3, Header, Title, Body, Left, Right, Input,Item, Icon } from "native-base";


class PushProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return (
      <Container style={styles.container}>
      </Container>
		);
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
)(PushProduct)
