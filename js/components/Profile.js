import React, { Component } from "react";
import { Platform, Dimensions, StyleSheet, TouchableOpacity, TextInput, Modal, Alert, ActivityIndicator} from "react-native";
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import ToAPI from '../server/ToAPI'
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const ImagePicker = require('react-native-image-picker');
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
const options = {
  title: 'Option',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      modalVisible: false,
      name: null,
      phone: null,
      facebook: null,
      twitter: null,
      address: null,
      updating: false
    }
  }
  componentWillMount() {
    this.setState({
      name: this.props.infouser.displayName,
      phone: this.props.infouser.phoneNumber,
      facebook: this.props.infouser.facebook,
      twitter: this.props.infouser.twitter,
      address:this.props.infouser.address,
    })
  }
  setModalVisible() {
    this.setState({
      modalVisible: true,
      name: this.props.infouser.displayName,
      phone: this.props.infouser.phoneNumber,
      facebook: this.props.infouser.facebook,
      twitter: this.props.infouser.twitter,
      address:this.props.infouser.address,
    })
  }
  saveData = () => {
    if(this.state.phone.trim() === '' || this.state.name.trim() === ''){
      Alert.alert(null,'Please ensure you filled out name and phone number')
    }
    else{
      let userinfo = {
        displayName: this.state.name,
        email: this.props.infouser.email,
        phoneNumber: this.state.phone,
        photoURL: this.props.infouser.photoURL,
        uid: this.props.infouser.uid,
        address: this.state.address,
        facebook: this.state.facebook,
        twitter: this.state.twitter,
      }
      ToAPI.setUserInfo(userinfo)
      this.setState({modalVisible:false})
    }

  }
  updateProfilePhoto() {
    ImagePicker.showImagePicker(options,(response) => {
      console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      this.setState({updating: true, modalVisible:false})
      ToAPI.setProfilePicture(this.props.infouser.uid, response.path, (result) => {
        if(result){
         this.setState({updating: false})
       }
      })
    }
    });
  }
  render() {
    return (
      <Container pointerEvents={this.state.updating ? 'none' : 'auto'} style={styles.container}>
        <Header noShadow={true} hasTabs androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.navigate("DrawerOpen")
              }}
            >
              <Icon name="menu"/>
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.setModalVisible()}
            >
              <Icon name="create" />
            </Button>
          </Right>
        </Header>
        <Content>
        <LinearGradient
          colors={['#FFA000', '#FFC107', '#FFD54F', '#FFECB3', '#FFFFFF']}
          style={styles.header}>
            <Thumbnail style = {styles.avatar} source={{uri: this.props.infouser.photoURL}} />
            <View>
              <Text style={{fontSize: 19, color:'#000000', fontWeight: 'bold'}}>{this.props.infouser.displayName}</Text>
            </View>
          </LinearGradient>
          <View style={styles.footer}>
            <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#ef5350'}} name="call"/>
                    <Text style={styles.listItem}>Phone</Text>
                  </View>
                  <Text style={styles.infoitem}>{this.props.infouser.phoneNumber}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                      <Icon style = {{fontSize: 20, color: '#FF5722'}} name="mail"/>
                       <Text style={styles.listItem}>Email</Text>
                  </View>
                  <Text style={styles.infoitem}>{this.props.infouser.email}</Text>
                </View>
              </ListItem>
              <ListItem>
               <View>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                  <Icon style = {{fontSize: 18, color: '#32CDFD'}} name="logo-twitter"/>
                  <Text style={styles.listItem}>Twitter</Text>
                </View>
                  <Text style={styles.infoitem}>{this.props.infouser.twitter}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#3B5998', paddingLeft: 2}} name="logo-facebook"/>
                    <Text style={styles.listItem}>Facebook</Text>
                  </View>
                  <Text style={[styles.infoitem, {paddingLeft: 2}]}>{this.props.infouser.facebook}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#66BB6A', paddingLeft: 2}} name="pin"/>
                    <Text style={styles.listItem}>Address</Text>
                  </View>
                  <Text style={[styles.infoitem, {paddingLeft: 2}]}>{this.props.infouser.address}</Text>
                </View>
              </ListItem>
          </View>
        </Content>
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
                 <Icon name="md-close" />
               </Button>
             </Left>
             <Body>
               <Title>Update Profile</Title>
             </Body>
             <Right>
               <Button
                 transparent
                 onPress={() => {
                   this.saveData()
                 }}>
                 <Icon name="md-checkmark" />
               </Button>
             </Right>
          </Header>
          <Content keyboardShouldPersistTaps='always'>
            <View style={{alignItems: 'center',paddingBottom : 8, paddingTop: 8}}>
              <Thumbnail large style = {styles.avataredit} source={{uri: this.props.infouser.photoURL}}/>
              <TouchableOpacity onPress={() => {
                this.updateProfilePhoto()
              }}>
                <Text style={{ color:'#0277BD', fontSize:17}}>Change photo</Text>
              </TouchableOpacity>
            </View>
            <Form>
              <Item>
                <Icon style = {styles.iconedit} name="contact"/>
                <Input
                  style={styles.textedit}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  returnKeyType='next'
                  autoCorrect={false}
                  placeholderTextColor = '#9E9E9E'
                  placeholder="Name" />
              </Item>
              <Item>
                <Icon style = {styles.iconedit} name="call"/>
                <Input
                  style={styles.textedit}
                  onChangeText={(phone) => this.setState({phone})}
                  value={this.state.phone}
                  keyboardType='numeric'
                  returnKeyType='next'
                  autoCorrect={false}
                  placeholderTextColor = '#9E9E9E'
                  placeholder="Phone" />
              </Item>
              <Item>
                <Icon style = {styles.iconedit} name="logo-facebook"/>
                <Input
                  style={styles.textedit}
                  onChangeText={(facebook) => this.setState({facebook})}
                  value={this.state.facebook}
                  returnKeyType='next'
                  autoCorrect={false}
                  placeholderTextColor = '#9E9E9E'
                  placeholder="Facebook" />
              </Item>
              <Item>
                <Icon style = {{fontSize: 18}} name="logo-twitter"/>
                <Input
                  style={styles.textedit}
                  onChangeText={(twitter) => this.setState({twitter})}
                  value={this.state.twitter}
                  returnKeyType='next'
                  autoCorrect={false}
                  placeholderTextColor = '#9E9E9E'
                  placeholder="Twitter" />
              </Item>
              <Item>
                <Icon style = {[styles.iconedit, {paddingLeft: 3}]} name="pin"/>
                <Input
                  style={styles.textedit}
                  onChangeText={(address) => this.setState({address})}
                  value={this.state.address}
                  returnKeyType='next'
                  autoCorrect={false}
                  placeholderTextColor = '#9E9E9E'
                  placeholder="Address" />
              </Item>
            </Form>
          </Content>
         </Container>
        </Modal>
        {
          this.state.updating && <View style={styles.updating}>
            <ActivityIndicator size="large"/>
          </View>
        }
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  updating: {
    position: 'absolute',
    top: deviceHeight/2 - 13,
    left: deviceWidth/2 - 13,
    alignItems:'center',
    justifyContent: 'center'
  },
  iconedit: {
    fontSize: 20,
    alignSelf: 'center'
  },
  textedit:{
    fontSize: 17,
    paddingTop: 10
  },
  placeholder:{
    fontStyle: 'italic',
    fontSize: 17
  },
  header: {
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: "#fff",
  },
  avatar: {
    margin: 10,
    alignSelf:'center',
    height: 120,
    width: 120,
    borderRadius: 66,
  },
  avataredit: {
    margin: 10,
    alignSelf:'center',
    height: 100,
    width: 100,
    borderRadius: 55,
  },
  infoitem: {
    fontSize: 17,
    color:'#424242',
    paddingTop: 5,
  },
  listItem: {
    fontSize: 17,
    paddingLeft: 10,
    fontStyle: 'italic',
    color: '#FF6F00'
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
