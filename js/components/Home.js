import React, { Component } from "react";
import { Platform, StyleSheet,View, } from "react-native";

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
	Input,
  H3,
  Item as FormItem
} from "native-base";

class Home extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded style={{backgroundColor: '#FFA000'}}>
				<Item>
				<Button
					transparent
					onPress={() => this.props.navigation.navigate("DrawerOpen")}
				>
					<Icon name="menu" />
				</Button>
				</Item>
				<Item>
					<Icon name="search" />
					<Input placeholder="Search" />
				</Item>
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
	container: {
    backgroundColor: "#FBFAFA"
  },
});
export default Home;
