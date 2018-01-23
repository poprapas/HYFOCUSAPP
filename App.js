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

import VideoDetail from "./VideoDetail"
import ReviewDetail from "./ReviewDetail"
import StoryDetail from "./StoryDetail"
import JobDetail from "./JobDetail"
import EatDetail from "./EatDetail"
import TravelDetail from "./TravelDetail"
import PeopleDetail from "./PeopleDetail"
import RoomDetail from "./RoomDetail"
import NewDetail from "./NewDetail"
import EventDetail from "./EventDetail"
import Tab from './Tab'

const AppNavigator = StackNavigator({
  Tab: { screen: Tab },
  VideoDetail: { screen: VideoDetail },
  NewDetail: { screen: NewDetail },
  ReviewDetail: { screen: ReviewDetail },
  StoryDetail: { screen: StoryDetail },
  JobDetail: { screen: JobDetail },
  EatDetail: { screen: EatDetail },
  TravelDetail: { screen: TravelDetail },
  PeopleDetail: { screen: PeopleDetail },
  RoomDetail: { screen: RoomDetail },
  EventDetail: { screen: EventDetail },
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
