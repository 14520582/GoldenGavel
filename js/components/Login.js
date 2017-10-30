import React, { Component } from "react";
import { Image, View, StatusBar, Text } from "react-native";

import { Container, Button, H3, Header, Title, Body, Left, Right } from "native-base";


class Login extends Component {
	// eslint-disable-line

	render() {
		return (
			<Container>
        <Text>LoginView</Text>
        <Button
							style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
							onPress={() => this.props.navigation.navigate("Home")}
				>
        <Text>Lets Go!</Text>
				</Button>
			</Container>
		);
	}
}

export default Login;
