import React from "react";
import {
    Platform,
    Image,
} from 'react-native';
import { TabNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from "./Home"
import JobScreen from "./Jobs"
import EatScreen from "./Eat"
import TravelScreen from "./Travel"
import RoomScreen from "./Room"

export default AppNavigator = TabNavigator({
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
                    style: { backgroundColor: 'black', },
                    activeTintColor: 'white',
                    inactiveTintColor: '#a0a0a0',
                }
    });

