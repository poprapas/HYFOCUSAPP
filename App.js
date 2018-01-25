/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry,
  StatusBar
} from 'react-native';

import tabNavigator from './Navigator'
import { StackNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen'

import JobDetail from "./JobDetail"
import RoomDetail from "./RoomDetail"
import NewDetail from "./NewDetail"
import Tab from './Tab'
import ContentDetail from "./ContentDetail"

const AppNavigator = StackNavigator({
  Tab: { screen: Tab },
  NewDetail: { screen: NewDetail },
  JobDetail: { screen: JobDetail },
  RoomDetail: { screen: RoomDetail },
  ContentDetail: { screen: ContentDetail },
},
  {
    initialRouteName: "Tab",
    swipeEnabled: false,
    headerMode: "float",
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerBackTitleStyle: {
        color: 'white'
      }
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [0, 1, 1, 0.3, 0]
        });

        return { opacity, transform: [{ translateX }] }
      }
    })
  });


export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
        <AppNavigator />
    );
  }
}
