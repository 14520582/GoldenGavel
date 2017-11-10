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
              var start = new Date();
              let rd = Math.floor(Math.random() * 9) + 1
              let product = {
                name: 'N'+ Math.random()*1000/10,
                description: 'description',
                currentbid: rd*300000,
                payment: 'payment',
                category: '',
                endtime: start.getTime() + 86400000*rd,
                starttime: start.getTime(),
                image: ['https://firebasestorage.googleapis.com/v0/b/goldengavel-5dca5.appspot.com/o/fashion4.jpg?alt=media&token=f840342a-2d5b-4284-93b3-461dd9f39163','2','3','4'],
                numberofbid: rd,
                startingbid: rd*100000,
                bidincrement: rd*10000,
              }
              ToAPI.pushProduct(product,this.props.infouser.uid)
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
