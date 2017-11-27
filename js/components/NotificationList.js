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
      data: null
    };
  }
  _renderItem = ({item}) => {
    return(
        <View>
          <TouchableOpacity onPress={() => {
            if(item.type === 'Bid') {
              if(item.status === 'New')
              ToAPI.seen(this.props.infouser.uid, item.key)
              ToAPI.getItem(item.content.keyitem, item.content.category, (product) => {
                this.props.navigation.navigate('Product', {product: product})
              })
            }
          }}>
            <NotificationRow item={item}/>
          </TouchableOpacity>
        </View>
      )
  }
  componentWillMount (){
    if(this.props.type === 'Notification')
      {
        ToAPI.getNotification(this.props.infouser.uid,(notifications) => {
          this.setState({data: notifications})
          let num = 0
          notifications.map((value) => {
            if(value.status === 'New')
             num++
          })
          this.props.dispatchUpdateNotificationNumber(num)
        })
      }
  }
  render() {
    return (
      <View>
        {
          this.state.data && <FlatList
              data = {this.state.data}
              extraData= {this.state}
              keyExtractor={(item) => item.key}
              renderItem = {this._renderItem}
          />
        }
        {
          !this.state.data && <View style={styles.container}>
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
