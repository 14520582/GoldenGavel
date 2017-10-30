/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Product from "./components/Product/";
import Login from "./components/Login/";

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Product: { screen: Product },
        Login: {screen: Login}
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
