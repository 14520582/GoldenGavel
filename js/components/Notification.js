import React, { Component } from "react";
import { Platform, StyleSheet, Modal, Dimensions, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import { connect } from 'react-redux'
import { infoUserUpdate } from '../actions/infouser'
import { updateNotificationNumber, updateMessageNumber } from '../actions/notification'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Input,
  Text,
  Right,
  Body,
  FooterTab,
  Footer,
  Left,
  List,
  Item,
  ListItem,
  Thumbnail,
  Badge,
  Picker,
  Form,
  View,
  H3,
  Item as FormItem
} from "native-base";
import ToAPI from '../server/ToAPI'
import NotificationList from './NotificationList'
import moment from 'moment'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showMessageBox: false,
      message: '',
      height: deviceHeight/3,
      content: null,
    };
  }
  openMessageBox = (visible, content) => {
    this.setState({
      showMessageBox: visible,
      isSending: false,
      content: content ? content : null
    })
  }
  componentWillMount() {
    //alert(JSON.stringify(this.props.notification))
    //ToAPI.sendMessage('UoTmb0glpPfMGoWKDw6OC2rs3Rw1', 'RtkcoKBxk1cJMycPK3o4ssa1IGw2', 'có đó không?')
  }
  measureView(event) {
  this.setState({
          height: event.nativeEvent.layout.height
      })
  }
  onSendMessage(){
    this.setState({isSending: true})
    ToAPI.sendMessage(this.props.infouser.uid, this.state.content.uid, this.state.message, (result) => {
      this.setState({isSending: false})
      this.openMessageBox(false)
    })
  }
  renderMessageBox() {
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showMessageBox}
        onRequestClose={() => {this.setState({showMessageBox: false})}}
        >

        <View style={styles.modal}>
        <View style={{height: this.state.height + 155,backgroundColor: 'white', borderRadius: 4, borderWidth: 0.5, borderColor: '#37474F'}}>
          <View style={styles.containercontent}>
          <TouchableOpacity onPress={() => this.openMessageBox(false)}>
            <Icon style={styles.iconclose} name='md-close'/>
          </TouchableOpacity>
          <View style={styles.containermessage}>
            <TouchableOpacity onPress={() => {
              this.openMessageBox(false)
              this.props.navigation.navigate("AnotherProfile", {user: this.state.content})
            }}>
              <View style={styles.userinfo}>
                <Thumbnail style={{height: 45, width: 45}} source={this.state.content ? {uri: this.state.content.photoURL} : null} />
                <Text style={{paddingLeft: 10, fontWeight: 'bold', fontSize: 18}} numberOfLines={1}>{this.state.content ? this.state.content.displayName : ''}</Text>
              </View>
            </TouchableOpacity>
            <Text onLayout={(event) => this.measureView(event)} style={{paddingTop: 5, paddingLeft: 5, fontSize: 18}}>{this.state.content ? this.state.content.message : null}</Text>
            <Text style={{marginRight: 3, padding: 5, fontStyle: 'italic', alignSelf: 'flex-end', color: '#0288D1'}}>{this.state.content ? moment(new Date(this.state.content.date)).calendar() : null}</Text>
          </View>
          </View>
          <Item>
            <Icon style={{paddingLeft: 12, paddingRight: 12, color: '#FFC107', fontSize: 30}} name='md-chatboxes'/>
            <Input style={{height: 50}}
              value={this.state.message}
              placeholderTextColor = '#9E9E9E'
              placeholder="Add a message..."
              onChangeText={(text) => {
                this.setState({message: text})
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
    )
  }
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
            <Title>Notification</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <NotificationList type={this.state.index == 0 ? 'Notification' : 'Message'} navigation={this.props.navigation} openMessageBox={this.openMessageBox}/>
        </Content>
        <Footer>
          <FooterTab style={styles.footer}>
            <Button style={this.state.index == 0 ? styles.activebutton : {}} badge={this.props.notification.notification !== 0 ? true : false} vertical onPress={() => this.setState({index: 0})}>
              {
                this.props.notification.notification !== 0 && <Badge><Text>{this.props.notification.notification}</Text></Badge>
              }
              <Icon style={this.state.index == 0 ? styles.active : styles.normal} name="md-notifications" />
              <Text style={this.state.index == 0 ? styles.active : styles.normal}>Notifications</Text>
            </Button>
            <Button style={this.state.index == 1 ? styles.activebutton : {}} badge={this.props.notification.message !== 0 ? true : false} vertical onPress={() => this.setState({index: 1})}>
              {
                this.props.notification.message !== 0 && <Badge><Text>{this.props.notification.message}</Text></Badge>
              }
              <Icon style={this.state.index == 1 ? styles.active : styles.normal} active name="md-chatboxes" />
              <Text style={this.state.index == 1 ? styles.active : styles.normal}>Message</Text>
            </Button>
          </FooterTab>
        </Footer>
      {this.renderMessageBox()}
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
  containermessage: {
    justifyContent: 'space-between',
    flex: 1
  },
  containercontent: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: 'black'
  },
  iconclose: {
    alignSelf: 'flex-end',
    paddingRight: 4
  },
  userinfo: {
    alignItems: 'center',
    flexDirection: 'row',
     paddingLeft: 10
  },
  activebutton: {
    backgroundColor: '#FFB300'
  },
  active: {
    color: 'white',
  },
  sendIcon: {
    color: '#90A4AE'
  },
  normal: {
    color: '#FFE082',
  },
  footer: {
    backgroundColor: "#FFA000"
  },
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
    notification: state.notification
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchUpdateNotificationNumber: (notification) => dispatch(updateNotificationNumber(notification)),
    dispatchUpdateMessageNumber: (message) => dispatch(updateMessageNumber(message))
	}
}
export default connect(
  mapStateToProps,
    mapDispatchToProps,
) (Notification)
