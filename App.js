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
} from 'react-native';

import tabNavigator from './Navigator'
import { StackNavigator, DrawerNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen'


import Photo from "./Photo"
import Video from "./Video"
import VideoDetail from "./VideoDetail"
import Review from "./Review"
import ReviewDetail from "./ReviewDetail"
import Home from "./Home"
import DrawerMenuScreen from "./DrawerMenuScreen"
import SideMenu from "./SideMenu"
import Story from "./Story"
import StoryDetail from "./StoryDetail"
import Jobs from "./Jobs"
import JobDetail from "./JobDetail"
import Eat from "./Eat"
import EatDetail from "./EatDetail"
import Travel from "./Travel"
import TravelDetail from "./TravelDetail"
import People from "./People"
import PeopleDetail from "./PeopleDetail"
import Room from "./Room"
import About from "./About"
import Contact from "./Contact"
import NewDetail from "./NewDetail"
import NewSport from "./NewSport"
import NewSocial from "./NewSocial"
import NewEducation from "./NewEducation"
import NewEconomy from "./NewEconomy"
import NewEntertainment from "./NewEntertainment"
import NewCrime from "./NewCrime"
import NewScience from "./NewScience"
import NewAdvertise from "./NewAdvertise"
import NewBusiness from "./NewBusiness"
import Event from "./Event"
import EventDetail from "./EventDetail"

const AppNavigator = StackNavigator({
  Tab: { screen: tabNavigator },
  Home: { screen: Home },
  Photo: { screen: Photo },
  Video: { screen: Video },
  VideoDetail: { screen: VideoDetail },
  Review: { screen: Review },
  ReviewDetail: { screen: ReviewDetail },
  About: { screen: About },
  DrawerMenuScreen: { screen: DrawerMenuScreen },
  SideMenu: { screen: SideMenu },
  Story: { screen: Story },
  StoryDetail: { screen: StoryDetail },
  Jobs: { screen: Jobs },
  JobDetail: { screen: JobDetail },
  Eat: { screen: Eat },
  EatDetail: { screen: EatDetail },
  Travel: { screen: Travel },
  TravelDetail: { screen: TravelDetail },
  People: { screen: People },
  PeopleDetail: { screen: PeopleDetail },
  Room: { screen: Room },
  About: { screen: About },
  Contact: { screen: Contact },
  NewDetail: { screen: NewDetail },
  NewSport: { screen: NewSport },
  NewSocial: { screen: NewSocial },
  NewEducation: { screen: NewEducation },
  NewEconomy: { screen: NewEconomy },
  NewEntertainment: { screen: NewEntertainment },
  NewCrime: { screen: NewCrime },
  NewScience: { screen: NewScience },
  NewAdvertise: { screen: NewAdvertise },
  NewBusiness: { screen: NewBusiness },
  Event: { screen: Event },
  EventDetail: { screen: EventDetail },
},
  {
    initialRouteName: "Tab",
    swipeEnabled: false,
    headerMode: "none",
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
