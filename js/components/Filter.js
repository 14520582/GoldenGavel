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
class Filter extends Component {
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    height: 120,
    backgroundColor: 'white'
  },
});
export default Filter;
