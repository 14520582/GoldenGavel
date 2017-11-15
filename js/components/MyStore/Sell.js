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
  List,
  ListItem,
  Picker,
  Form,
  View,
  H3,
  Item as FormItem
} from "native-base";
import BriefProduct from '../BriefProduct'
class Sell extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <BriefProduct/>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "white"
  },
});
export default Sell;
