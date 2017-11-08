import React, { Component } from "react";
import { Platform, StyleSheet, } from "react-native";

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
  ListItem,
  Picker,
  Form,
  View,
  H3,
  Item as FormItem
} from "native-base";
import ToAPI from '../server/ToAPI'
import { connect } from 'react-redux'
class MyStore extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>My Business</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Button rounded
            onPress={() => {
              // let product = {
              //   name: '',
              //   description: '',
              //   payment: '',
              //   endtime: '',
              //   starttime: '',
              //   image: ['1','2','3','4'],
              //   startingbid: 909483,
              //   bidincrement: 10000,
              // }
              // ToAPI.pushProduct(product,this.props.infouser.uid)
            }}>
            <Text>Creat a auction</Text>
          </Button>
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
export default connect(
  mapStateToProps,
)(MyStore)
