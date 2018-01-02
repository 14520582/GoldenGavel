/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { View } from 'react-native'
import firebase from 'react-native-firebase'
import Drawer from "./Drawer";
import Product from "./components/Product/";
import AnotherProfile from "./components/AnotherProfile/";
import AnotherStore from "./components/AnotherStore/";
import MyStore from "./components/MyStore/";
import Search from "./components/Search/";
import Login from "./components/Login/";
import CategoryListProduct from "./components/CategoryListProduct/";
import SplashScreen from "./components/SplashScreen/";
import Categories from "./components/Categories/";
import PushProduct from "./components/PushProduct/";
import Notification from "./components/Notification/";
import configureStore from './config/configureStore'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
const {persistor, store} = configureStore()
// let fireBaseconfig = {
// 	 apiKey: "AIzaSyDewMWRFnO_WfglLILyb2k_5LigRFb5Yfk",
// 	 appId: "1:684519341231:android:b4a9a8f670496137",
// 	 databaseURL: "https://goldengavel-5dca5.firebaseio.com",
// 	 projectId: "goldengavel-5dca5",
// 	 storageBucket: "goldengavel-5dca5.appspot.com",
// 	 messagingSenderId: "684519341231",
// 	 persistence: true,
// };
// firebase.initializeApp(fireBaseconfig,'app')
const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Product: { screen: Product },
        Search: { screen: Search },
        PushProduct: { screen: PushProduct },
        Notification: { screen: Notification },
        CategoryListProduct: { screen: CategoryListProduct },
        MyStore: { screen: MyStore},
        AnotherStore: { screen: AnotherStore},
        AnotherProfile: { screen: AnotherProfile},
        Categories: { screen: Categories },
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
