import React, { Component } from "react";
import { Platform, StyleSheet,TouchableOpacity} from "react-native";
import imgPhone from '../assets/phone.png'
import imgChat from '../assets/email.png'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
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
  Item as FormItem,
  Thumbnail
} from "native-base";

class Profile extends Component {
  constructor(props) {
		super(props);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>View Profile</Title>
          </Body>
          <Right> 
          <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <View style={styles.header}>
          <View style = {styles.icon}>
            <TouchableOpacity transparent >
            <Thumbnail small style = {styles.avatar} source={imgPhone} />
            </TouchableOpacity>
            <TouchableOpacity transparent >
            <Thumbnail large style = {styles.avatar} source={{uri: this.props.infouser.photoURL}} />
            </TouchableOpacity>
            <TouchableOpacity transparent >
            <Thumbnail small style = {styles.avatar} source={imgChat} />
            </TouchableOpacity>
          </View>
          <View>
          <Text style={{fontWeight: 'bold'}}>{this.props.infouser.displayName}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <List>
            <ListItem>
              <View style = {styles.listItemStyle}>
                <Text note style={styles.listItem} >Email</Text>
                <Text>{this.props.infouser.email}</Text>
              </View>             
            </ListItem>
            <ListItem>
              <View style = {styles.listItemStyle}>
                <Text note style={styles.listItem}>Phone</Text>
                <Text>{this.props.infouser.phoneNumber}</Text>
              </View>        
            </ListItem>
            <ListItem>
              <View style = {styles.listItemStyle}>
               <Text note style={styles.listItem}>Twitter</Text>
               <Text>{this.props.infouser.twitter}</Text>
              </View>        
            </ListItem>
            <ListItem>
              <View style = {styles.listItemStyle}>
                <Text note style={styles.listItem}>Facebook</Text>  
                <Text>{this.props.infouser.facebook}</Text>
              </View>        
            </ListItem>
          </List>
        </View>
        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
  header: {
    backgroundColor: "#FFA000",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  footer: {
    backgroundColor: "#FBFAFA",
    flex: 1.5
  },
  avatar: {
    margin: 10
  },
  listItem: {
    color: '#ff1744',
    fontSize: 12
  },
  listItemStyle: {
    flexDirection: 'column'
  }
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
    firebase: state.fibase
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
) (Profile)