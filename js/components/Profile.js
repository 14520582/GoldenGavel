import React, { Component } from "react";
import { Platform, StyleSheet,TouchableOpacity,TextInput,Modal} from "react-native";
import imgPhone from '../assets/call.png'
import imgChat from '../assets/mess.png'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import ToAPI from '../server/ToAPI'
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
  Input,
  Item,
  Item as FormItem,
  Thumbnail
} from "native-base";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalVisible: false,
      phone: null,
      facebook: null,
      twitter: null,
      address:null
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  savedata = () => {
    if(this.state.phone === null && this.state.address === null){
      alert("Bạn cần nhập số điện thoại và địa chỉ");
    } 
    else{
      ToAPI.setPhone(this.props.infouser.uid, this.state.phone)
      ToAPI.setFacebook(this.props.infouser.uid, this.state.facebook)
      ToAPI.setTwitter(this.props.infouser.uid, this.state.twitter)
      ToAPI.setAddress(this.props.infouser.uid, this.state.address)
      this.setState({modalVisible:false});
    }

  }
  render() {
    return (
      <Container style={styles.container}>
        <Header noShadow={true} searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>     
          <Right>
          <Button
              transparent
              onPress={() => this.setState({modalVisible:true})}
            >
              <Icon name="create" />
            </Button>
          </Right>
        </Header>
        <View style={styles.header}>
        <View style = {styles.icon}>
          <TouchableOpacity transparent >
          <Thumbnail small source={imgPhone} />
          </TouchableOpacity>
          <Thumbnail large style = {styles.avatar} source={{uri: this.props.infouser.photoURL}} />
          <TouchableOpacity transparent >
          <Thumbnail small source={imgChat} />
          </TouchableOpacity>
        </View>
        <View>
        <Text style={{fontSize: 17, color:'#000000'}}>{this.props.infouser.displayName}</Text>
        </View>
      </View>
        <View style={styles.footer}>
          <List>
          <ListItem>              
              <View style = {styles.listItemStyle}>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                  <Icon style = {{fontSize: 18, color: '#ef5350'}} name="call"/>
                  <Text style={styles.listItem}>   Phone</Text>
                </View>
                <Text style={{fontSize: 15, color:'#424242'}}>{this.props.infouser.phoneNumber}</Text>
              </View>                                 
            </ListItem>
            <ListItem>              
              <View style = {styles.listItemStyle}>              
                <View style={{ flexDirection: 'row', alignItems:'center'}}>                 
                    <Icon style = {{fontSize: 18, color: '#F57F17'}} name="mail"/>
                     <Text style={styles.listItem} >   Email</Text>                                    
                </View>                                         
                <Text style={{fontSize: 15, color:'#424242'}}>{this.props.infouser.email}</Text>
              </View>                         
            </ListItem>
            <ListItem>             
             <View style = {styles.listItemStyle}>
              <View style={{ flexDirection: 'row', alignItems:'center'}}>
                <Icon style = {{fontSize: 18, color: '#32CDFD'}} name="logo-twitter"/>
                <Text style={styles.listItem}>   Twitter</Text>
              </View>
                <Text style={{fontSize: 15, color:'#424242'}}>{this.props.infouser.twitter}</Text>
              </View>                                                 
            </ListItem>
            <ListItem>             
              <View style = {styles.listItemStyle}>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                  <Icon style = {{fontSize: 17, color: '#3B5998'}} name="logo-facebook"/>
                  <Text style={styles.listItem}>   Facebook</Text>
                </View>
                <Text style={{fontSize: 15, color:'#424242'}}>{this.props.infouser.facebook}</Text>
              </View>                                                  
            </ListItem>
            <ListItem>              
              <View style = {styles.listItemStyle}>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                  <Icon style = {{fontSize: 17, color: '#66BB6A'}} name="pin"/>
                  <Text style={styles.listItem}>   Address</Text>
                </View>
                <Text style={{fontSize: 15, color:'#424242'}}>{this.props.infouser.address}</Text>
              </View>                                              
            </ListItem>
          </List>
        </View>
        <Modal 
          animationType="slide"
          transparent={true}
          visible = {this.state.modalVisible} 
          onRequestClose={() => {this.setState({modalVisible:false})}}>          
         <Container style={styles.container}>
         <Header noShadow={true} searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
         <Left>
           <Button
             transparent
             onPress={() => {this.setState({modalVisible:false})}}>
             <Icon name="arrow-back" />
           </Button>
         </Left>
         <Body>
           <Title>Update Profile</Title>
         </Body>     
         <Right/>
       </Header>
          <Content>
            <View style={{flexDirection: 'row', flex: 0.5}}>
              <TouchableOpacity transparent>
                <Thumbnail large style = {styles.avatar} source={{uri: this.props.infouser.photoURL}} />  
              </TouchableOpacity>              
              <Input style={{ alignSelf:'center', fontSize:17}} placeholder={this.props.infouser.displayName}/>
            </View>         
            <Form>
              <Item>
                <Input 
                  style={{fontSize:15}} 
                  onChangeText={(phone) => this.setState({phone})}
                  value={this.state.phone}
                  keyboardType='numeric'
                  returnKeyType='next'
                  placeholder="Phone" />
              </Item>
              <Item>
                <Input 
                  style={{fontSize:15}}
                  onChangeText={(facebook) => this.setState({facebook})}
                  value={this.state.facebook}
                  returnKeyType='next' 
                  placeholder="Facebook" />
              </Item>
              <Item>
                <Input 
                  style={{fontSize:15}}
                  onChangeText={(twitter) => this.setState({twitter})}
                  value={this.state.twitter}
                  returnKeyType='next' 
                  placeholder="Twitter" />
              </Item>
              <Item last>
                <Input 
                  style={{fontSize:15}}
                  onChangeText={(address) => this.setState({address})}
                  value={this.state.address}
                  returnKeyType='next'
                  placeholder="Address" />
              </Item>
            </Form>
            <Button style = {styles.saveButton} onPress = {this.savedata}>
            <Text>Save</Text>
          </Button>
          </Content>
         </Container>
        </Modal>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFAFA"
  },
  header: {
    backgroundColor: "#F5F5F5",
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 0.7,
    //backgroundColor:'#FF8F00'
  },
  footer: {
    backgroundColor: "#FBFAFA",
    flex: 1.5
  },
  avatar: { 
    margin: 10,
    alignSelf:'center'
  },
  listItem: {
    fontSize: 17,
    color: '#000000'
  },
  listItemStyle: {
    flexDirection: 'column'
  },
  saveButton: {
    backgroundColor:'#FB8C00',
    alignSelf:'center',
    justifyContent:'center',
    //height: 80,
    width: 240,
    marginTop: 15,
    borderRadius: 7
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

