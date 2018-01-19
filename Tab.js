import React from "react";
import {
    Platform,
    Image,
} from 'react-native';
import { TabNavigator, DrawerNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from "./Home"
import JobScreen from "./Jobs"
import EatScreen from "./Eat"
import TravelScreen from "./Travel"
import RoomScreen from "./Room"
import Story from './Story'
import People from './People'
import Room from './Room'
import Events from './Event'
import Video from './Video'
import Review from './Review'
import Contact from './Contact'
import Setting from './Setting'
import SideMenu from './SideMenu'
import About from "./About"
import NewSport from "./NewSport"
import NewSocial from "./NewSocial"
import NewEducation from "./NewEducation"
import NewEconomy from "./NewEconomy"
import NewEntertainment from "./NewEntertainment"
import NewCrime from "./NewCrime"
import NewScience from "./NewScience"
import NewAdvertise from "./NewAdvertise"
import NewBusiness from "./NewBusiness"

const Tab = TabNavigator({
    หางาน: {
        screen: JobScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/images/work-icon.png')}
                    style={{ height: 31, width: 31, tintColor: tintColor }}
                />
            )
        }
    },
    ของกิน: {
        screen: EatScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/images/eat-icon.png')}
                    style={{ height: 27, width: 27, tintColor: tintColor }}
                />
            )
        }
    },
    หน้าแรก: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/images/home-icon.png')}
                    style={{ height: 27, width: 27, tintColor: tintColor }}
                />
            )
        }
    },
    ที่เที่ยว: {
        screen: TravelScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/images/travel-icon.png')}
                    style={{ height: 27, width: 27, tintColor: tintColor }}
                />
            )
        }
    },
    ที่พัก: {
        screen: RoomScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./assets/images/hotel-icon.png')}
                    style={{ height: 27, width: 27, tintColor: tintColor }}
                />
            )
        }
    },

}, {
        initialRouteName: 'หน้าแรก',
        animationEnabled: true,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        tabBarOptions:
            Platform.OS == 'android' ? {
                showIcon: true,
                scrollEnabled: false,
                labelStyle: { fontSize: 10, margin: 0 },
                indicatorStyle: { backgroundColor: '#ffffff' },
                style: {
                    backgroundColor: 'black'

                }
            }
                :
                {
                    style: { backgroundColor: 'black' },
                    activeTintColor: 'white',
                    inactiveTintColor: '#a0a0a0',
                }
    });

export default Drawer = DrawerNavigator({
    Tab: {
        screen: Tab,
        navigationOptions: {
            headerMode: 'none'
        }
    },
    Video: { screen: Video },
    Review: { screen: Review },
    About: { screen: About },
    SideMenu: { screen: SideMenu },
    Story: { screen: Story },
    People: { screen: People },
    NewSport: { screen: NewSport },
    NewSocial: { screen: NewSocial },
    NewEducation: { screen: NewEducation },
    NewEconomy: { screen: NewEconomy },
    NewEntertainment: { screen: NewEntertainment },
    NewCrime: { screen: NewCrime },
    NewScience: { screen: NewScience },
    NewAdvertise: { screen: NewAdvertise },
    NewBusiness: { screen: NewBusiness },
    Event: { screen: Events },
    Setting: { screen: Setting }
}, {
        initialRouteName: 'Tab',
        drawerWidth: 300,
        drawerPosition: 'left',
        contentComponent: SideMenu,
        contentOptions: {
            activeTintColor: '#e91e63',
        },
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

