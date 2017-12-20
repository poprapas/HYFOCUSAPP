import React, { Component } from 'react';
import { 
	Button, 
	Platform, 
	ScrollView,
	Dimensions,
} from 'react-native';
import { DrawerNavigator, SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

import SideMenu from './SideMenu';

const DrawerMenuScreen = DrawerNavigator({
	Story: {
		screen: Story,
		
	},
	Jobs: {
		screen: Jobs,
		
	},
	Eat: {
		screen: Eat,
		
	},
	Travel: {
		screen: Travel,
		
	},
	People: {
		screen: People,
		
	},
	Room: {
		screen: Room,
		
	},
	Event: {
		screen: Event,
		
	},
	Video: {
		screen: Video,
		
	},
	Review: {
		screen: Review,
		
	},
	About: {
		screen: About,
		
	},
	Contact: {
		screen: Contact,
		
	},
}, {
		drawerWidth: 300,
		drawerPosition: 'left',
		contentComponent: SideMenu,
		contentOptions: {
      		activeTintColor: '#e91e63',
    	},
	}
);

export default DrawerMenuScreen;