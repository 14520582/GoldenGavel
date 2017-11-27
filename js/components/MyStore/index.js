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
import ToAPI from '../../server/ToAPI'
import { connect } from 'react-redux'
import styles from './styles'
import Sell from './Sell'
import Buy from './Buy'
class MyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      showFilter: false,
      isEnd: false,
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
          <Right>
            <Button
              transparent
              onPress={() => this.setState({showFilter: !this.state.showFilter})}
            >
              <Icon style={{fontSize: 35}} name={this.state.showFilter ? 'md-arrow-dropup' : 'md-arrow-dropdown'} />
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("PushProduct")}
            >
              <Icon style={{fontSize: 35}} name="md-cloud-upload" />
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
              <Text>End</Text>
            </Button>
          </Segment>
        }
        <Tabs initialPage={0} onChangeTab={this._onChangeTab}>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Icon style={this.state.index == 0 ? styles.active : styles.normal} name="md-easel" />
              <Text style={this.state.index == 0 ? styles.active : styles.normal} >Sell</Text>
            </TabHeading>
          }>
            <Sell isEnd={this.state.isEnd}/>
          </Tab>
          <Tab heading = {
            <TabHeading style={styles.tabHeading}>
              <Icon style={this.state.index == 1 ? styles.active : styles.normal} name="md-cart"/>
              <Text style={this.state.index == 1 ? styles.active : styles.normal}>Buy</Text>
            </TabHeading>
          }>
            <Buy isEnd={this.state.isEnd}/>
          </Tab>
        </Tabs>
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
)(MyStore)
