import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, SectionList,Text,View,ActivityIndicator } from "react-native";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Right,
  Body,
  Left,
  List,
  ListItem,
  Picker,
  Form,
  H3,
  Item as FormItem
} from "native-base";
import BidHistoryRow from './BidHistoryRow'
import ToAPI from '../../server/ToAPI'
import { connect } from 'react-redux'
import styles from './styles'
import { infoUserUpdate } from '../../actions/infouser'
class BidHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bidlist: null
    };
  }
  componentWillMount(){
    ToAPI.getDetailsBid(this.props.productid, (bidlist) => {
      this.setState({bidlist})
    })
  }
  _renderItem = ({item, index, arr}) => {
    return(
        <BidHistoryRow navigation= {this.props.navigation} item = {item} index = {index}/>
      )
  }
  render() {
    return (
      <View style={styles.section}>
        {
          this.state.bidlist && <FlatList
              data = {this.state.bidlist}
              extraData= {this.state}
              keyExtractor={(item) => item.key}
              renderItem = {this._renderItem}
          />
        }
        {
          !this.state.bidlist && <View style={styles.loading}>
            <ActivityIndicator/>
          </View>
        }
      </View>
    );
  }
}
function mapStateToProps (state) {
	return {
		infouser: state.infouser,
	}
}
function mapDispatchToProps (dispatch) {
	return{
		dispatchInfoUserUpdate: (infouser) => dispatch(infoUserUpdate(infouser)),
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BidHistory)
