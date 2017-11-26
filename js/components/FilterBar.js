import React, { Component } from "react";
import { Platform, StyleSheet, View, Dimensions,Image } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Segment,
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
const deviceWidth = Dimensions.get('window').width;
class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount () {
    //alert(this.gatepayment["MasterCard"])
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.button}>
              <Icon style={styles.icon} name='md-swap'/>
          </View>
          <View style={styles.button}>
              <Icon style={styles.icon} name='md-funnel'/>
          </View>
          <View style={styles.button}>
              <Icon style={styles.icon} name='md-apps'/>
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    height: 50,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    alignItems: 'center',
    flexDirection: 'row'
  },
  segment: {
    height: 50,
    backgroundColor: 'white',
  },
  icon: {
    color: 'black'
  },
  button: {
    flex: 1,
    borderRightWidth: 0.5,
    alignItems: 'center',
    borderColor: 'grey',
    justifyContent:'center',
  }
});
export default FilterBar;
