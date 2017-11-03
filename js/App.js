/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { View } from 'react-native'
import Drawer from "./Drawer";
import Product from "./components/Product/";
import Login from "./components/Login/";
import SplashScreen from "./components/SplashScreen/";
import configureStore from './config/configureStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
const {persistor, store} = configureStore()

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Product: { screen: Product },
        SplashScreen: { screen: SplashScreen },
        Login: {screen: Login}
    },
    {
        initialRouteName: "SplashScreen",
        headerMode: "none",
    }
);
export default () => (
  <Provider store={store}>
    <PersistGate
      loading={<View></View>}
      persistor={persistor}>
      <Root>
        <AppNavigator />
      </Root>
    </PersistGate>
  </Provider>
)
// export default () =>
//     <Root>
//         <AppNavigator />
//     </Root>;
