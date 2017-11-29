import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, SectionList,Text,View } from "react-native";

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
import BriefProduct from '../BriefProduct'
import ToAPI from '../../server/ToAPI'
import { connect } from 'react-redux'
import styles from './styles'
import { infoUserUpdate } from '../../actions/infouser'
class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      end: [],
      ongoing: []
    };
  }
  componentWillMount(){
    ToAPI.getMyProduct(this.props.infouser.uid,(data) =>{
      data.sort((a, b) => b.starttime - a.starttime)
      this.filteringProduct(data)
    })
  }
  filteringProduct(data) {
    let now = new Date()
    let end = []
    let ongoing = []
    data.forEach((item) => {
      if(item.endtime < now.getTime())
        end.push(item)
      else
        ongoing.push(item)
    })
    this.setState({
      end: end,
      ongoing: ongoing
    })
  }
  _renderItem = ({item}) => {
      return (
        <View>
          <BriefProduct item = {item}/>
        </View>
      )
  }
  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <Icon style={this.props.isEnd ? styles.end : styles.ongoing} name='md-ionitron'/>
        <Text>{this.props.isEnd ? 'Ended' : 'On going'}</Text>
      </View>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content stickyHeaderIndices={[0]}>
          <View>
            <View style={styles.header}>
              <Icon style={this.props.isEnd ? styles.end : styles.ongoing} name='md-ionic'/>
              <Text style={styles.textHeader}>{this.props.isEnd ? 'Ended' : 'On going'}</Text>
            </View>
          </View>
            <FlatList
              data = {this.props.isEnd ? this.state.end : this.state.ongoing}
              removeClippedSubviews={true}
              extraData= {this.state}
              keyExtractor={(item) => item.key}
              renderItem = {this._renderItem}
            />
        </Content>
      </Container>
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
)(Sell)
