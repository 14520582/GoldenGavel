import React, { Component } from "react";
import { Platform, StyleSheet,BackHandler } from "react-native";

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
  Tab,
  Fab,
  Tabs,
  TabHeading,
  List,
  ListItem,
  Picker,
  Form,
  View,
  H3,
  Segment,
  Item as FormItem
} from "native-base";
import ToAPI from '../server/ToAPI'
import { connect } from 'react-redux'
import styles from './MyStore/styles'
import Sell from './MyStore/Sell'
class AnotherStore extends Component {
  constructor(props) {
    super(props);
    this._BackHandler = this._BackHandler.bind(this)
    this.state = {
      index: 0,
      showFilter: false,
      isEnd: false,
    };
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
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded hasTabs androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{'Store: ' + this.props.navigation.state.params.seller.displayName}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.setState({showFilter: !this.state.showFilter})}
            >
              <Icon style={{fontSize: 35}} name={this.state.showFilter ? 'md-arrow-dropup' : 'md-arrow-dropdown'} />
            </Button>
           </Right>
        </Header>
        {
        this.state.showFilter && <Segment style={styles.tabHeading}>
            <Button first style={this.state.isEnd ? styles.normalButton : styles.activeButton}
            onPress={() => this.setState({isEnd: !this.state.isEnd})}>
              <Text>On going</Text>
            </Button>
            <Button style={this.state.isEnd ? styles.activeButton : styles.normalButton}
            onPress={() => this.setState({isEnd: !this.state.isEnd})}>
              <Text>Ended</Text>
            </Button>
          </Segment>
        }
        <Sell isEnd={this.state.isEnd} seller= {this.props.navigation.state.params.seller} navigation={this.props.navigation}/>
      </Container>
    );
  }
}
function mapStateToProps (state) {
	return {
		infouser: state.infouser
	}
}
export default connect(
  mapStateToProps,
)(AnotherStore)
