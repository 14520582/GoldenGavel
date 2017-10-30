/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/Home";
import Setting from "./components/Setting";
import Login from "./components/Login";
import MyStore from "./components/MyStore";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Login: {screen: Login },
    Setting: { screen: Setting },
    Profile: { screen: Profile },
    MyStore: {screen: MyStore },
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default Drawer;
