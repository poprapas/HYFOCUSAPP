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
  PlatformIOS,
  Dimensions,
} from 'react-native';

import DrawerMenuScreen from './DrawerMenuScreen';
import DrawerLayout from 'react-native-drawer-layout';
import Icon from 'react-native-vector-icons/dist/Foundation';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Iconss from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const { width, height } = Dimensions.get("window");

class SideMenu extends Component {

  navigateToScreen = (DrawerMenuScreen) => {
    const navigateAction = NavigationActions.navigate({
      routeName: DrawerMenuScreen,
      params: {},
      action: NavigationActions.navigate({ routeName: 'DrawerMenuScreen' }),

    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {
    super(props);
    this.state = {
      dropdown: false
    }
  }

  render() {
    return (
      <ScrollView
        bounces={false}
        style={{
          height: height,
          backgroundColor: 'black',
          marginTop: Platform.OS == 'ios' ? 60 : 40,
        }}
      >
        <View style={styles.wrapper}>

          <TouchableOpacity onPress={() => this.setState({ dropdown: !this.state.dropdown })}>
            <View style={styles.navSectionStyle}>
              <Iconss name="newspaper-o" size={20} color='white' style={{ width: 28 }} />
              <Text style={styles.navItemStyle}>
                ข่าวหาดใหญ่
              </Text>
              {this.state.dropdown ? <Text style={{ color: 'white', fontSize: Platform.OS == 'ios' ? 25 : 20 }}> - </Text> : <Text style={{ color: 'white', fontSize: Platform.OS == 'ios' ? 25 : 20 }}> + </Text>}
            </View>
          </TouchableOpacity>

          {this.state.dropdown ?
            <View style={{ paddingLeft: 30, flex: 1, backgroundColor: '#111111' }}>

              <TouchableOpacity onPress={() => this.navigateToScreen('Tab')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวล่าสุด
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewSport')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวกีฬา
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewSocial')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวสัมคมและการเมือง
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewEducation')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวการศึกษา
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewEconomy')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวเศรษฐกิจและการเงิน
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewEntertainment')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวบันเทิง
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewCrime')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวอาชญากรรม
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewScience')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าววิทยาศาสตร์และสิ่งแวดล้อม
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewAdvertise')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวประชาสัมพันธ์และการท่องเที่ยว
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.navigateToScreen('NewBusiness')}>
                <View style={[styles.navSectionStyle, { backgroundColor: '#111111' }]}>
                  <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14, backgroundColor: '#111111' }]}>
                    ข่าวธุรกิจและเทคโนโลยี
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            : null}

          <TouchableOpacity onPress={() => this.navigateToScreen('Story')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/story-icon.png')} style={{ height: 23, width: 28 }} />
              <Text style={styles.navItemStyle}>
                เรื่องราวหาดใหญ่
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('หางาน')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/work-icon.png')} style={{ height: 28, width: 28 }} />
              <Text style={styles.navItemStyle}>
                หางานหาดใหญ่
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('ของกิน')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/eat-icon.png')} style={{ height: 25, width: 28 }} />
              <Text style={styles.navItemStyle}>
                ของกินหาดใหญ่
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('ที่เที่ยว')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/travel-icon.png')} style={{ height: 25, width: 28 }} />
              <Text style={styles.navItemStyle}>
                เที่ยวหาดใหญ่
                </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('People')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/people-icon.png')} style={{ height: 22, width: 28 }} />
              <Text style={styles.navItemStyle}>
                คนหาดใหญ่
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('ที่พัก')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/hotel-icon.png')} style={{ height: 25, width: 28 }} />
              <Text style={styles.navItemStyle}>
                ที่พักหาดใหญ่
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('Event')}>
            <View style={styles.navSectionStyle}>
              <Icon name="megaphone" size={25} color='white' style={{ width: 28 }} />
              <Text style={styles.navItemStyle}>
                ไปหม้ายโหม๋เรา
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('Video')}>
            <View style={styles.navSectionStyle}>
              <Icon name="play-video" size={29} color='white' style={{ width: 28 }} />
              <Text style={styles.navItemStyle}>
                วิดีโอ
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('Review')}>
            <View style={styles.navSectionStyle}>
              <Icons name="rate-review" size={25} color='white' style={{ width: 28 }} />
              <Text style={styles.navItemStyle}>
                รีวิว
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.navigateToScreen('About')}>
            <View style={styles.navSectionStyle}>
              <Image source={require('./assets/images/about-icon.png')} style={{ height: 25, width: 28 }} />
              <Text style={styles.navItemStyle}>
                เกี่ยวกับเรา
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/board/forum.php')}>
            <View style={styles.navSectionStyle}>
              <Iconss name="tags" size={20} color='white' style={{ width: 28 }} />
              <Text style={styles.navItemStyle}>
                เว็บบอร์ด
              </Text>
            </View>
          </TouchableOpacity>

          {
            Platform.OS == 'ios' ?
              <TouchableOpacity onPress={() => this.navigateToScreen('Setting')}>
                <View style={styles.navSectionStyle}>
                  <Icons name="settings" size={25} color='white' style={{ width: 28 }} />
                  <Text style={styles.navItemStyle}>
                    ตั้งค่า
                  </Text>
                </View>
              </TouchableOpacity> : null
          }

        </View>
      </ScrollView >
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
    paddingLeft: 10,
    paddingTop: Platform.OS == 'ios' ? 12 : 6,
    paddingBottom: Platform.OS == 'ios' ? 12 : 6,
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    width: 240
  },
  navSectionStyle: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  wrapper: {
    backgroundColor: 'black',
    //marginTop: Platform.OS == 'ios' ? 60 : 40,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
});

export default SideMenu;



