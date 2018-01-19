import React, { Component } from 'react';
import {
	Button,
	Platform,
	ScrollView,
	Dimensions,
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home2 from './Home';
import Story from './Story';
import Jobs from './Jobs';
import Eat from './Eat';
import Travel from './Travel';
import People from './People';
import Room from './Room';
import Event from './Event'
import Video from './Video';
import Review from './Review';
import About from './About';
import Contact from './Contact';
import Setting from './Setting';
import Tab from './Navigator';
import SideMenu from './SideMenu';


const { width, height } = Dimensions.get("window");

export default Drawer = DrawerNavigator({
	Video: {
		screen: Video
	},
	Jobs: {
		screen: Jobs
	},
	Eat: {
		screen: Eat
	},
	// Tab: {
	// 	screen: Tab
	// }
	// Home: {
	// 	screen: Home
	// }
}, {
		//initialRouteName: 'Home',
		drawerWidth: 300,
		drawerPosition: 'left',
		contentComponent: props => <SideMenu {...this.props} />,
		contentOptions: {
			activeTintColor: '#e91e63',
		},
		drawerOpenRoute: 'DrawerOpen',
		drawerCloseRoute: 'DrawerClose',
		drawerToggleRoute: 'DrawerToggle'
	}
);