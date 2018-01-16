import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  ListView,
  Linking,
  FlatList,
  Dimensions,
  StatusBar,
  RefreshControl,
  Animated,
  AsyncStorage,
  TouchableWithoutFeedback,
} from 'react-native';


import Color from 'react-native-material-color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionBar from 'react-native-action-bar';
import DrawerLayout from 'react-native-drawer-layout';
import Button from 'react-native-button';
import SideMenu from "./SideMenu";
import Carousel from 'react-native-looped-carousel';
import PushNotification from 'react-native-push-notification';

const { width, height } = Dimensions.get("window");

export default class Home extends Component {

  _notificationAndroid(_this) {
    let notificationTime = new Date();
    if (notificationTime.getHours() < 18) {
      notificationTime.setHours(18);
      notificationTime.setMinutes(0);
      notificationTime.setSeconds(0);
      notificationTime.setMilliseconds(0);
      PushNotification.localNotificationSchedule({
        id: '1',
        title: "HatyaiFocus",
        date: new Date(notificationTime),
        message: "อัพเดตข่าวใหม่ที่ HatyaiFocus",
        color: '#a6ff00',
        repeatType: 'day',
      });
    }
  }
  _notificationiOS(_this) {
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    let notificationTime = new Date();
    //AsyncStorage.clear()
    AsyncStorage.getItem('notificationDate').then((date) => {
      if (date == null || notificationTime.toISOString().slice(0, 10) != date) {
        notificationTime.setHours(18);
        notificationTime.setMinutes(0);
        notificationTime.setSeconds(0);
        notificationTime.setMilliseconds(0);
        PushNotification.localNotificationSchedule({
          date: new Date(notificationTime),
          message: "อัพเดตข่าวใหม่ที่ HatyaiFocus",
          foreground: true,
        });
        AsyncStorage.setItem('notificationDate', notificationTime.toISOString().slice(0, 10))
      }
    })
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width + 10, height: layout.height } });
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drawerClosed: true,
      slide: [],
      refreshing: false,
      progress: new Animated.Value(0),
      size: { width, height },
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);

  }

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed,
    });
  }

  toggleDrawer = () => {
    if (this.state.drawerClosed) {
      this.DRAWER.openDrawer();               //edit 2 out -> error
    } else {
      this.DRAWER.closeDrawer();              //edit 2 out
    }
  }

  componentDidMount() {

    global.state = []


    if (Platform.OS == 'ios') {
      this._notificationiOS(this);
    } else {
      this._notificationAndroid(this);
    }

    return fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=&start=0&per_page=10')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        fetch('https://www.hatyaifocus.com/rest/api.php?action=slider')
          .then((response2) => response2.json())
          .then((responseJson2) => {
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
              slide: responseJson2,
              refreshing: false
            }, function () {
              // do something with new state
              StatusBar.setBarStyle('light-content', true);
            });
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh() {
    if (!this.state.refreshing) {
      this.setState({ refreshing: true },
        this.componentDidMount)
    }
  }

  render() {

    if (this.state.isLoading || this.state.refreshing) {
      return (
        <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>

          <DrawerLayout
            drawerWidth={300}
            ref={drawerElement => {
              this.DRAWER = drawerElement;
            }}

            drawerPosition={DrawerLayout.positions.Left}
            onDrawerOpen={this.setDrawerState}
            onDrawerClose={this.setDrawerState}
            renderNavigationView={() => <SideMenu {...this.props} />}
          >

            <ActionBar
              containerStyle={styles.bar}
              backgroundColor={'black'}
              leftIconName={'menu'}
              onLeftPress={this.toggleDrawer}
              icontitle={require('./assets/images/home-icon.png')}
              title={'หน้าแรก'}
              rightIcons={[
                {
                  name: 'facebook',
                  onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                  //onPress: () => navigate('Social'),
                },
              ]}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <TouchableOpacity onPress={() => navigate('หน้าแรก')}>
                <Image source={require('./assets/images/banner2.jpg')}
                  style={styles.logo} />
              </TouchableOpacity>

              <View style={{ flex: 1 }}>
                <Text style={styles.newfont}> --- ข่าวล่าสุด --- </Text>
              </View>

            </View>

            <ActivityIndicator
              style={{ paddingTop: 20 }}
              color='#cc9966' />
          </DrawerLayout>
        </View>

      );
    }

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container} >
        <DrawerLayout
          drawerWidth={300}
          ref={drawerElement => {
            this.DRAWER = drawerElement;
          }}

          drawerPosition={DrawerLayout.positions.Left}
          onDrawerOpen={this.setDrawerState}
          onDrawerClose={this.setDrawerState}
          renderNavigationView={() => <SideMenu {...this.props} />}
        >

          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'black'}
            leftIconName={'menu'}
            onLeftPress={this.toggleDrawer}
            icontitle={require('./assets/images/home-icon.png')}
            title={'หน้าแรก'}
            rightIcons={[
              {
                name: 'facebook',
                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                //onPress: () => navigate('Social'),
              },
            ]}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => navigate('Tab')}>
              <Image source={require('./assets/images/banner2.jpg')}
                style={styles.logo} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={styles.newfont}> --- ข่าวล่าสุด --- </Text>
            </View>

          </View>

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor={'transparent'}
              />
            }
          >
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.listView}>
                <View style={{ paddingBottom: 5 }}>
                  <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                </View>
                <TouchableOpacity
                  key={rowData.id}
                  onPress={() => navigate('NewDetail',
                    {
                      type: rowData.CATID,
                      title: rowData.TOPIC,
                      image: rowData.FEATURE,
                      description: rowData.DESCRIPTION,
                      view: rowData.VIEWS,
                      date: rowData.DATEIN,
                      url: rowData.URL
                    }
                  )}
                >
                  <Image source={{ uri: rowData.FEATURE }}
                    style={{
                      width: width - 10,
                      height: (width - 10) * 0.625,
                      backgroundColor: '#6a5750'
                    }}
                  />
                  <View style={{ paddingTop: 5 }}>
                    <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
                  </View>
                </TouchableOpacity>
              </View>
              }
            />
            <View style={{ 
              borderWidth: 5, 
              borderColor: 'white', 
              top: 20, 
              marginBottom: 30, 
            }}>
              <View style={{ height: width * 0.526 }}
                onLayout={this._onLayoutDidChange}
              >
                <Carousel
                  delay={2000}
                  style={this.state.size}
                  autoplay
                  bullets
                  arrows
                  arrowsContainerStyle={{
                    marginLeft: 5,
                    marginRight: 15,
                  }}
                  leftArrowText={<FontAwesome name='chevron-circle-left' size={40} color='white' />}
                  rightArrowText={<FontAwesome name='chevron-circle-right' size={40} color='white' />}
                >
                  {this.state.slide.map((prop, key) => {
                    return (
                      <View
                        key={key}
                        style={{
                          backgroundColor: 'white',
                          width: width,
                        }}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL(this.state.slide[key].URL)} >
                          <Image
                            source={{ uri: this.state.slide[key].FEATURE }}
                            style={styles.advt_1}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    )
                  })}

                </Carousel>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 }}>

              <View style={{ borderColor: 'white', borderWidth: 2 }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B9%8C-1380405395370823/')} >
                  <Image source={require('./assets/images/advt_2.jpg')}
                    style={styles.advt_2} />
                </TouchableOpacity>
              </View>

              <View style={{ borderColor: 'white', borderWidth: 2 }}>
                <Image source={require('./assets/images/advt_3.jpg')}
                  style={styles.advt_3} />
              </View>

            </View>

            <Image source={require('./assets/images/advt_4.jpg')}
              style={styles.advt_4} />

            <Text></Text>
            <Text></Text>

          </ScrollView>

        </DrawerLayout>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: Color.BROWN[800],
  },
  logo: {
    height: 110,
    width: 150,
  },
  newfont: {
    fontSize: width * 0.07,
    paddingTop: Platform.OS === 'ios' ? 45 : 40,
    alignSelf: 'center',
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  listView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',

  },
  moredetail: {
    fontSize: 14,
    paddingTop: 5,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'right',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    textDecorationLine: 'underline'
  },
  advt_1: {
    height: width * 0.526,
    width: width,
  },
  advt_2: {
    height: (width - 230) * 0.69,
    width: width - 230,
  },
  advt_3: {
    height: (width - 230) * 0.69,
    width: width - 230,
  },
  advt_4: {
    height: width * 0.1,
    width: width,
  },
  button: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: Platform.OS == 'ios' ? 7.5 : 5,
    marginTop: Platform.OS == 'ios' ? 5 : 0,
  },
  selectbutton: {
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#30231d',
    backgroundColor: '#795548',
    marginTop: 5,
    marginLeft: 15,
    alignSelf: 'flex-start'
  },
});


