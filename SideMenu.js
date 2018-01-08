import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  Platform,
  DrawerLayoutAndroid,
  PlatformIOS
} from 'react-native';

import DrawerMenuScreen from './DrawerMenuScreen';
import DrawerLayout from 'react-native-drawer-layout';
import Icon from 'react-native-vector-icons/dist/Foundation';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Iconss from 'react-native-vector-icons/dist/FontAwesome';

class SideMenu extends Component {

  navigateToScreen = (DrawerMenuScreen) => {
    DrawerLayoutAndroid.closeDrawer;
    const navigateAction = NavigationActions.navigate({
      routeName: DrawerMenuScreen,
      params: {},
      action: NavigationActions.navigate({ routeName: 'DrawerMenuScreen' }),

    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/story-icon.png')} style={{ height: 23, width: 23 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Story')}>
              เรื่องราวหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/work-icon.png')} style={{ height: 28, width: 28 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Jobs')}>
              หางานหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/eat-icon.png')} style={{ height: 25, width: 25 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Eat')}>
              ของกินหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/travel-icon.png')} style={{ height: 25, width: 25 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Travel')}>
              เที่ยวหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/people-icon.png')} style={{ height: 22, width: 22 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('People')}>
              คนหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/hotel-icon.png')} style={{ height: 25, width: 25 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Room')}>
              ที่พักหาดใหญ่
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Icon name="megaphone" size={25} color='white' />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Event')}>
              ไปหม้ายโหม๋เรา
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Icon name="play-video" size={29} color='white' />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Video')}>
              วิดีโอ
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Icons name="rate-review" size={25} color='white' />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Review')}>
              รีวิว
              </Text>
          </View>

          <View style={styles.navSectionStyle}>
            <Image source={require('./assets/images/about-icon.png')} style={{ height: 25, width: 25 }} />
            <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('About')}>
              เกี่ยวกับเรา
              </Text>
          </View>

          {/* <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/contact-icon.png')} style={{ height: 25, width: 25 }} />
              <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Contact')}>
                ติดต่อ
              </Text>
            </View> */}

          <View style={styles.navSectionStyle}>
            <Iconss name="tags" size={20} color='white' />
            <Text style={styles.navItemStyle} onPress={() => Linking.openURL('https://www.hatyaifocus.com/board/forum.php')}>
              เว็บบอร์ด
              </Text>
          </View>
          {Platform.OS == 'ios' ?
            <View style={styles.navSectionStyle}>
              <Icons name="settings" size={25} color='white' />
              <Text style={styles.navItemStyle} onPress={() => this.navigateToScreen('Setting')}>
                ตั้งค่า
              </Text>
            </View> : null}


        </View>
      </ScrollView>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  navItemStyle: {
    color: 'white',
    fontSize: Platform.OS == 'ios' ? 20 : 16,
    paddingLeft: 20,
    paddingTop: Platform.OS == 'ios' ? 12 : 6,
    paddingBottom: Platform.OS == 'ios' ? 12 : 6,
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  navSectionStyle: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  wrapper: {
    backgroundColor: 'black',
    marginTop: Platform.OS == 'ios' ? 60 : 40,
    paddingTop: 1,
    paddingLeft: 45,
    alignItems: 'flex-start',
  },
});

export default SideMenu;



