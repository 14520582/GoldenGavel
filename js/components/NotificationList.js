import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions} from "react-native";
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
  View,
  Input,
  H3,
  Item as FormItem,
  Thumbnail
} from "native-base";
import NotificationRow from './NotificationRow'
import ToAPI from '../server/ToAPI'
import { connect } from 'react-redux'
const deviceHeight = Dimensions.get('window').height;
import { infoUserUpdate } from '../actions/infouser'
import { updateNotificationNumber, updateMessageNumber } from '../actions/notification'
class NotificationList extends Component {
  constructor(props) {
		super(props);
    this.state = {
      messages: null,
      notifications: null,
    };
  }
  _renderItem = ({item}) => {
    return(
        <View>
          <TouchableOpacity onPress={() => {
              if(item.status === 'New')
              ToAPI.seen(this.props.infouser.uid, item.key, this.props.type)
              if(item.type === 'Bid') {
                ToAPI.getItem(item.content.keyitem, item.content.category, (product) => {
                  this.props.navigation.navigate('Product', {product: product})
                })
              }
              if(item.type === 'Message') {
                ToAPI.getUserInfo(item.sender,(sender) => {
                  let content={
                    senderName: sender.displayName,
                    senderPhoto: sender.photoURL,
                    senderUid: item.sender,
                    message: item.content.message,
                    date: item.date
                  }
                  this.props.openMessageBox(true,content)
                })
              }
          }}>
            <NotificationRow item={item}/>
          </TouchableOpacity>
        </View>
      )
  }
  componentWillMount (){
        ToAPI.getNotification(this.props.infouser.uid,(notifications) => {
            this.setState({notifications: notifications})
          let num = 0
          notifications.map((value) => {
            if(value.status === 'New')
             num++
          })
          this.props.dispatchUpdateNotificationNumber(num)
        })
        ToAPI.getMessage(this.props.infouser.uid,(messages) => {
            this.setState({messages: messages})
          let num = 0
          messages.map((value) => {
            if(value.status === 'New')
             num++
          })
          this.props.dispatchUpdateMessageNumber(num)
        })
  }
  render() {
    return (
      <View>
        {
          this.state.notifications && this.state.messages && <FlatList
              data = {this.props.type === 'Notification' ? this.state.notifications : this.state.messages}
              extraData= {this.state}
              keyExtractor={(item) => item.key}
              renderItem = {this._renderItem}
          />
        }
        {
          !this.state.notifications && !this.state.messages && <View style={styles.container}>
            <ActivityIndicator/>
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    paddingTop: deviceHeight/2 - 150,
    alignItems:'center',
    justifyContent: 'center'
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
) (NotificationList)
