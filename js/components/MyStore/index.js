import React, { Component } from "react";
import { Platform, StyleSheet, } from "react-native";

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
  Tabs,
  TabHeading,
  List,
  ListItem,
  Picker,
  Form,
  View,
  H3,
  Item as FormItem
} from "native-base";
import ToAPI from '../../server/ToAPI'
import { connect } from 'react-redux'
import Sell from './Sell'
import Buy from './Buy'
class MyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  _onChangeTab = ({i, ref, from}) => {
    this.setState({index: i})
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded hasTabs androidStatusBarColor='#FF8F00' style={{backgroundColor: '#FFA000'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>My Store</Title>
          </Body>
          <Right />
        </Header>
        <Tabs initialPage={0} onChangeTab={this._onChangeTab}>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Icon style={this.state.index == 0 ? styles.active : styles.normal} name="md-easel" />
              <Text style={this.state.index == 0 ? styles.active : styles.normal} >Sell</Text>
            </TabHeading>
          }>
            <Sell/>
          </Tab>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Icon style={this.state.index == 1 ? styles.active : styles.normal} name="md-cart"/>
              <Text style={this.state.index == 1 ? styles.active : styles.normal}>Buy</Text>
            </TabHeading>
          }>
            <Buy/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
  active: {
    color: 'white'
  },
  tabHeading: {
    backgroundColor: '#FFA000'
  },
  normal: {
    color: '#FFECB3'
  },
});
function mapStateToProps (state) {
	return {
		infouser: state.infouser
	}
}
export default connect(
  mapStateToProps,
)(MyStore)
