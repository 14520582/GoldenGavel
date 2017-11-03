import React, { Component } from "react";
import { Platform, StyleSheet,View, } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Right,
  Body,
  Left,
  List,
	Item,
  ListItem,
  Picker,
  Form,
	Input,
  H3,
  Item as FormItem
} from "native-base";
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import { infoUserUpdate } from '../actions/infouser'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
				<Left style={{flexDirection: 'row', alignItems: 'center'}}>
  				<Button
  					transparent
  					onPress={() => this.props.navigation.navigate("DrawerOpen")}
  				>
  					<Icon name="menu" />
  				</Button>
          <Title style={{paddingLeft: 10}}>Home</Title>
				</Left>
				<Item>
					<Icon name="search" />
					<Input style={{height: 60}} placeholder="Search" />
				</Item>
        </Header>
        <Content>
        </Content>
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
	mapDispatchToProps,
)(Home)
