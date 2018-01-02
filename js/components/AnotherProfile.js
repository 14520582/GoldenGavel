import React, { Component } from "react";
import { Platform, Dimensions, StyleSheet, TouchableOpacity, TextInput, Modal, Alert,BackHandler, ActivityIndicator, Linking} from "react-native";
import imgPhone from '../assets/phone.png'
import imgChat from '../assets/paper-plane.png'
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import ToAPI from '../server/ToAPI'
import LinearGradient from 'react-native-linear-gradient';
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
    this._BackHandler = this._BackHandler.bind(this)
    this.state ={
      modalVisible: false,
      isSending: false,
      message: ''
    }
  }
  _BackHandler = () => {
    this.props.navigation.goBack()
    return true;
  }
  componentDidMount (){
    BackHandler.addEventListener('hardwareBackPress', this._BackHandler)
  }
  componentWillUnMount (){
    BackHandler.removeEventListener('hardwareBackPress', this._BackHandler)
  }
  componentWillMount() {
  }
  call(phonenumber) {
    let url = 'tel:' + phonenumber
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Alert.alert(null, 'Phone number is invalid')
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  onSendMessage(){
    this.setState({isSending: true})
    ToAPI.sendMessage(this.props.infouser.uid, this.props.navigation.state.params.user.uid, this.state.message, (result) => {
      this.setState({isSending: false, modalVisible: false})
    })
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header noShadow={true} searchBar  rounded androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
        <LinearGradient
          colors={['#FFA000', '#FFC107', '#FFD54F', '#FFECB3', '#FFFFFF']}
          style={styles.header}>
            <View style = {styles.icon}>
              <TouchableOpacity onPress={() => {this.call(this.props.navigation.state.params.user.phoneNumber)}}>
                <Thumbnail style={styles.actionicon} source={imgPhone} />
              </TouchableOpacity>
                <Thumbnail style = {styles.avatar} source={{uri: this.props.navigation.state.params.user.photoURL}} />
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <Thumbnail style={styles.actionicon} source={imgChat} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{fontSize: 19, color:'#000000', fontWeight: 'bold'}}>{this.props.navigation.state.params.user.displayName}</Text>
            </View>
          </LinearGradient>
          <View style={styles.footer}>
            <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#ef5350'}} name="call"/>
                    <Text style={styles.listItem}>Phone</Text>
                  </View>
                  <Text style={styles.infoitem}>{this.props.navigation.state.params.user.phoneNumber}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                      <Icon style = {{fontSize: 20, color: '#FF5722'}} name="mail"/>
                       <Text style={styles.listItem}>Email</Text>
                  </View>
                  <Text style={styles.infoitem}>{this.props.navigation.state.params.user.email}</Text>
                </View>
              </ListItem>
              <ListItem>
               <View>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                  <Icon style = {{fontSize: 18, color: '#32CDFD'}} name="logo-twitter"/>
                  <Text style={styles.listItem}>Twitter</Text>
                </View>
                  <Text style={styles.infoitem}>{this.props.navigation.state.params.user.twitter}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#3B5998', paddingLeft: 2}} name="logo-facebook"/>
                    <Text style={styles.listItem}>Facebook</Text>
                  </View>
                  <Text style={[styles.infoitem, {paddingLeft: 2}]}>{this.props.navigation.state.params.user.facebook}</Text>
                </View>
              </ListItem>
              <ListItem>
                <View>
                  <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Icon style = {{fontSize: 20, color: '#66BB6A', paddingLeft: 2}} name="pin"/>
                    <Text style={styles.listItem}>Address</Text>
                  </View>
                  <Text style={[styles.infoitem, {paddingLeft: 2}]}>{this.props.navigation.state.params.user.address}</Text>
                </View>
              </ListItem>
          </View>
        </Content>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setState({modalVisible: false})}}
          >
          <View style={styles.modal}>
          <View style={styles.messagebox}>
            <TouchableOpacity onPress={() => this.setState({modalVisible: false})}>
              <Icon style={styles.iconclose} name='md-close'/>
            </TouchableOpacity>
            <View style={styles.userinfo}>
              <Text style={{fontSize: 18, fontStyle: 'italic', paddingRight: 8}}>Send to:</Text>
              <Thumbnail style={{height: 45, width: 45}} source={{uri: this.props.navigation.state.params.user.photoURL}} />
              <Text style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 18}} numberOfLines={1}>{this.props.navigation.state.params.user.displayName}</Text>
            </View>
            <Item>
              <Icon style={{paddingLeft: 12, paddingRight: 12, color: '#FFC107', fontSize: 30}} name='md-chatboxes'/>
              <Input style={{height: 50}}
                value={this.state.message}
                autoCorrect={false}
                placeholderTextColor = '#9E9E9E'
                placeholder="Add a message..."
                onChangeText={(message) => {
                  this.setState({message})
                }}
              />
              {
                !this.state.isSending && <TouchableOpacity onPress={() => this.onSendMessage()}>
                  <View style={{borderLeftWidth: 0.5, borderColor: 'black'}}>
                    <Icon style={{paddingLeft: 12, paddingRight: 12}} name='md-paper-plane'/>
                  </View>
                </TouchableOpacity>
              }
              {
                this.state.isSending && <View style={{paddingRight: 12}}>
                  <ActivityIndicator/>
                </View>
              }
            </Item>
            </View>
            </View>
        </Modal>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  modal: {
    justifyContent: 'center',
    margin: 10,
    flex:1
  },
  messagebox: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#37474F'
  },
  header: {
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
    paddingBottom: 20,
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
  iconclose: {
    alignSelf: 'flex-end',
    paddingRight: 4
  },
  actionicon: {
    margin: 10,
    height: 60,
    width: 60,
    borderRadius: 33,
  },
  avatar: {
    margin: 10,
    alignSelf:'center',
    height: 120,
    width: 120,
    borderRadius: 66,
  },
  infoitem: {
    fontSize: 17,
    color:'#424242',
    paddingTop: 5,
  },
  userinfo: {
    alignItems: 'center',
    flexDirection: 'row',
     paddingLeft: 10
  },
  listItem: {
    fontSize: 17,
    paddingLeft: 10,
    fontStyle: 'italic',
    color: '#FF6F00'
  },
});
function mapStateToProps (state) {
  return {
    infouser: state.infouser,
  }
}
export default connect(
  mapStateToProps,
) (Profile)
