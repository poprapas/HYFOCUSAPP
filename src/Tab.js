import React from "react";
import { Platform, Image, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from "./Home"
import JobScreen from "./Jobs"
import EatScreen from "./Eat"
import TravelScreen from "./Travel"
import RoomScreen from "./Room"
import Story from './Story'
import People from './People'
import Events from './Event'
import Video from './Video'
import Review from './Review'
import Setting from './Setting'
import SideMenu from './SideMenu'
import About from "./About"
import New from "./New"
import Favorite from "./Favorite"

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNav() {
    return (
        <Tab.Navigator
            initialRouteName="หน้าแรก"
            tabBarOptions={
                Platform.OS == 'android' ? {
                    showIcon: true,
                    scrollEnabled: false,
                    labelStyle: { fontSize: 10, margin: 0 },
                    indicatorStyle: { backgroundColor: '#ffffff' },
                    activeTintColor: '#fff',
                    style: { backgroundColor: 'black' }
                } : {
                        style: { backgroundColor: 'black' },
                        activeTintColor: 'white',
                        inactiveTintColor: '#a0a0a0',
                    }
            }
        >
            <Tab.Screen
                name="หางาน"
                component={JobScreen}
                options={{
                    tabBarLabel: 'หางาน',
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/work-icon.png')}
                            style={{ height: 27, width: 27, opacity: focused ? 1 : 0.5 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ของกิน"
                component={EatScreen}
                options={{
                    tabBarLabel: 'ของกิน',
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/eat-icon.png')}
                            style={{ height: 27, width: 27, opacity: focused ? 1 : 0.5 }}
                        />
                    )
                }} />
            <Tab.Screen
                name="หน้าแรก"
                component={HomeScreen}
                options={{
                    tabBarLabel: "หน้าแรก",
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/home-icon.png')}
                            style={{ height: 27, width: 27, opacity: focused ? 1 : 0.5 }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="ที่เที่ยว"
                component={TravelScreen}
                options={{
                    tabBarLabel: "ที่เที่ยว",
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/travel-icon.png')}
                            style={{ height: 27, width: 27, opacity: focused ? 1 : 0.5 }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="ที่พัก"
                component={RoomScreen}
                options={{
                    tabBarLabel: "ที่พัก",
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/images/hotel-icon.png')}
                            style={{ height: 27, width: 27, opacity: focused ? 1 : 0.5 }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

function DrawerNav() {
    return (
        <Drawer.Navigator
            initialRouteName="Tab"
            drawerWidth={300}
            drawerContent={props => <SideMenu {...props} />}
        >
            <Drawer.Screen name="Tab" component={TabNav} />
            <Drawer.Screen name="Video" component={Video} />
            <Drawer.Screen name="Review" component={Review} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="SideMenu" component={SideMenu} />
            <Drawer.Screen name="Story" component={Story} />
            <Drawer.Screen name="People" component={People} />
            <Drawer.Screen name="New" component={New} />
            <Drawer.Screen name="Event" component={Events} />
            <Drawer.Screen name="Setting" component={Setting} />
            <Drawer.Screen name="Favorite" component={Favorite} />
        </Drawer.Navigator>
    )
}

export default DrawerNav