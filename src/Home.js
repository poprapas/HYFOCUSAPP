import React, { Component } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, Linking, FlatList, Dimensions, StatusBar, RefreshControl, Animated, TouchableWithoutFeedback, BackHandler, ToastAndroid, } from 'react-native';

import Color from 'react-native-material-color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from '../custom_modules/react-native-looped-carousel';
//import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-easy-toast'
import * as utils from './Util'
import SplashScreen from 'react-native-splash-screen'
import Header from './_Component/header'
import AsyncStorage from '@react-native-community/async-storage';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const { width, height } = Dimensions.get("window");

export default class Home extends Component {

    _notificationAndroid(_this) {
        // AsyncStorage.getItem('notification').then((data) => {
        //     console.log(data)
        //     if (data == null || data == 'true') {
        //         let notificationTime = new Date();
        //         if (notificationTime.getHours() < 12) {
        //             notificationTime.setHours(11);
        //             notificationTime.setMinutes(32);
        //             notificationTime.setSeconds(0);
        //             notificationTime.setMilliseconds(0);
        //             PushNotification.localNotificationSchedule({
        //                 id: '1',
        //                 title: "HatyaiFocus",
        //                 date: new Date(notificationTime),
        //                 message: "อัพเดตข่าวใหม่ที่ HatyaiFocus",
        //                 color: '#a6ff00',
        //                 repeatType: 'day',
        //             });
        //         }
        //     }
        // })
    }

    _notificationiOS(_this) {
        // PushNotification.configure({
        //     permissions: {
        //         alert: true,
        //         badge: true,
        //         sound: true
        //     },
        //     popInitialNotification: true,
        //     requestPermissions: true,
        // });
        // AsyncStorage.getItem('notification').then((data) => {
        //     if (data == null || data == 'true') {
        //         //console.log(data)
        //         let notificationTime = new Date();
        //         // PushNotification.localNotificationSchedule({
        //         //     date: new Date(Date.now() + 5000),
        //         //     message: "อัพเดตข่าวใหม่ที่ HatyaiFocus",
        //         //     foreground: true,
        //         // });
        //         AsyncStorage.getItem('notificationDate').then((date) => {
        //             if (date == null || notificationTime.toISOString().slice(0, 10) != date) {
        //                 notificationTime.setHours(18);
        //                 notificationTime.setMinutes(0);
        //                 notificationTime.setSeconds(0);
        //                 notificationTime.setMilliseconds(0);
        //                 PushNotification.localNotificationSchedule({
        //                     date: new Date(notificationTime),
        //                     message: "อัพเดตข่าวใหม่ที่ HatyaiFocus",
        //                     foreground: true,
        //                 });
        //                 AsyncStorage.setItem('notificationDate', notificationTime.toISOString().slice(0, 10))
        //             }
        //         })
        //     }
        // })
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            slide: [],
            refreshing: false,
            progress: new Animated.Value(0),
            size: { width, height },
            isMounted: true,
            update: false,
            favorite: {},
            checkback: false,
        }
    }

    componentWillUnmount() {
        this.state.isMounted = false
        global.ishome = false
    }

    handleTabFocus = () => {
        // perform your logic here
        global.sidemenu.setState({
            currentpage: 'หน้าแรก'
        })
    }

    componentDidMount() {

        global.Home = this

        this.props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

        global.ishome = true
        let _this = this

        BackHandler.addEventListener('hardwareBackPress', function () {
            //alert(global.ishome)
            if (Platform.OS == 'android' && global.ishome) {
                //console.log(_this.state.checkback)
                //alert('อะไรก้ได้')
                if (_this.state.checkback) {
                    BackHandler.exitApp()
                    return true
                }
                else {
                    if (_this.state.isMounted) {
                        _this.setState({
                            checkback: true
                        }, () => {
                            //console.log(_this.state.checkback, '2')
                            ToastAndroid.show('กดอีกครั้ง เพื่อออกจากแอป', ToastAndroid.SHORT)
                            timeout = setTimeout(function () {
                                //console.log(_this.state.checkback, '3')
                                if (_this.state.isMounted) {
                                    _this.setState({
                                        checkback: false
                                    })
                                }
                            }, 3000)
                        })
                    }
                    return true
                }
            }
            else {
                return false
            }
        })

        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('black')
        }

        SplashScreen.hide();

        StatusBar.setBarStyle("light-content")
        StatusBar.setHidden(false)

        if (Platform.OS == 'ios') {
            this._notificationiOS(this);
        } else {
            this._notificationAndroid(this);
        }

        return fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=&ID=&start=0&per_page=10')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                fetch('https://www.hatyaifocus.com/rest/api.php?action=slider')
                    .then((response2) => response2.json())
                    .then((responseJson2) => {
                        AsyncStorage.getItem('fav').then((data) => {
                            if (!data) { data = '[]' }
                            if (this.state.isMounted) {
                                this.setState({
                                    isLoading: false,
                                    dataSource: responseJson,
                                    slide: responseJson2,
                                    refreshing: false,
                                    favorite: JSON.parse(data)
                                }, function () {
                                    // do something with new state
                                    StatusBar.setBarStyle('light-content', true);
                                })
                            };
                        })
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

    favorite(action, id, favorite) {
        if (favorite) {
            utils.addFavorite(action, id)
        }
        else {
            utils.removeFavorite(action, id)
        }
    }

    gotoURL(key) {
        if (this.state.slide[key].URL.slice(0, 34) == 'https://www.hatyaifocus.com/บทความ') {
            Linking.openURL(this.state.slide[key].URL)
        }
        if (this.state.slide[key].URL.slice(0, 30) == 'https://www.hatyaifocus.com///') {
            Linking.openURL('https://' + this.state.slide[key].URL.slice(30))
        }
        if (this.state.slide[key].URL.slice(0, 33) == 'https://www.hatyaifocus.com/https') {
            Linking.openURL('https://' + this.state.slide[key].URL.slice(36))
        }
    }

    render() {

        if (this.state.isLoading || this.state.refreshing) {
            return (
                <View style={styles.container} >
                    <Header
                        leftIcon={{
                            icon: 'md-menu',
                            fn: () => { toggleDrawer() }
                        }}
                        centerIcon={require('../assets/images/home-icon.png')}
                        text={'หน้าแรก'}
                        rightIcon={{
                            icon: 'logo-facebook',
                            fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                        }}
                    />
                    <ActivityIndicator
                        style={{ paddingTop: height / 3 }}
                        size={'large'}
                        color='#cc9966' />
                </View>
            );
        }

        const { navigate, goBack, toggleDrawer } = this.props.navigation;

        return (
            <View style={styles.container} >
                <Header
                    leftIcon={{
                        icon: 'md-menu',
                        fn: () => { toggleDrawer() }
                    }}
                    centerIcon={require('../assets/images/home-icon.png')}
                    text={'หน้าแรก'}
                    rightIcon={{
                        icon: 'logo-facebook',
                        fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                    }}
                />

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={'transparent'}
                        />
                    }

                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.update}
                    renderItem={({ item }) =>
                        <View style={{ padding: 5 }}>
                            <TouchableOpacity
                                onPress={() => navigate('NewDetail',
                                    {
                                        type: item.CATID,
                                        title: item.TOPIC,
                                        image: item.FEATURE,
                                        description: item.DESCRIPTION,
                                        view: item.VIEWS,
                                        date: item.DATEIN,
                                        url: item.URL,
                                        id: item.ID,
                                        fromhome: true
                                    }
                                )}
                                activeOpacity={0.9}
                            >
                                <View style={{ paddingBottom: 5 }}>
                                    <Text style={styles.titleText}> {item.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                                </View>
                                <Image source={{ uri: item.FEATURE }}
                                    style={{
                                        height: (width - 10) * 0.525,
                                        resizeMode: 'contain',
                                        width: width - 10,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>

                                <TouchableOpacity onPress={() => {
                                    item.favorite = !item.favorite
                                    this.favorite('news', item.ID, item.favorite)
                                    this.refs.toast.show(item.favorite ? 'เพิ่มข่าวไปยังบุ๊คมาร์คแล้ว!' : 'ลบข่าวออกจากบุ๊คมาร์คแล้ว!', 1800)
                                    this.setState({
                                        update: !this.state.update,
                                    })
                                }}>
                                    <Ionicons
                                        name={item.favorite || this.state.favorite['news_' + item.ID] ? "md-star" : "md-star-outline"}
                                        size={20}
                                        color={'#edad35'}
                                        style={{ width: 40, }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigate('NewDetail',
                                        {
                                            type: item.CATID,
                                            title: item.TOPIC,
                                            image: item.FEATURE,
                                            description: item.DESCRIPTION,
                                            view: item.VIEWS,
                                            date: item.DATEIN,
                                            url: item.URL,
                                            id: item.ID
                                        }
                                    )}
                                >
                                    <Text style={styles.moredetail}>{'>>> อ่านต่อ >>>'}</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.2)',
                                marginTop: 10
                            }}>
                            </View>
                        </View>
                    }

                    ListFooterComponent={
                        <View>
                            {this.state.slide.length == 1 ?
                                <View style={{
                                    padding: 5,
                                    backgroundColor: 'white',
                                    marginTop: 20,
                                }}>
                                    <TouchableWithoutFeedback onPress={() => this.gotoURL(0)} >
                                        <Image
                                            source={{ uri: this.state.slide[0].FEATURE }}
                                            style={styles.advt_1}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                                :
                                <View style={{
                                    padding: 5,
                                    backgroundColor: 'white',
                                    marginTop: 20
                                }}>
                                    <View style={{ height: width * 0.526 }}
                                        onLayout={this._onLayoutDidChange}
                                    >
                                        <Carousel
                                            delay={3000}
                                            style={this.state.size}
                                            autoplay
                                            bullets
                                            arrows
                                            arrowsContainerStyle={{ marginHorizontal: 5 }}
                                            leftArrow={<FontAwesome name='chevron-circle-left' size={35} color='white' />}
                                            rightArrow={<FontAwesome name='chevron-circle-right' size={35} color='white' />}
                                        >
                                            {this.state.slide.map((prop, key) => {
                                                return (
                                                    <View
                                                        key={key}
                                                        style={{
                                                            backgroundColor: 'white',
                                                            width: width - 10,
                                                        }}>
                                                        {/* {console.log(this.state.slide[key].FEATURE)} */}
                                                        <TouchableWithoutFeedback onPress={() => this.gotoURL(key)} >
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
                            }
                            <Image
                                source={require('../assets/images/advt_4.jpg')}
                                style={styles.advt_4}
                            />
                        </View>
                    }
                />

                <Toast
                    ref="toast"
                    style={{
                        backgroundColor: '#606060',
                        borderRadius: 15
                    }}
                    position='bottom'
                    positionValue={Platform.OS == 'ios' ? 130 : 100}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.9}
                    textStyle={{ color: 'white' }}
                />

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    titleText: {
        fontSize: 18,
        paddingTop: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        lineHeight: 35,
    },
    moredetail: {
        fontSize: 14,
        paddingTop: 5,
        color: 'white',
        textAlign: 'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        textDecorationLine: 'underline',
    },
    advt_1: {
        height: width * 0.526,
        width: width - 10,
    },
    advt_4: {
        height: width * 0.1,
        width: width,
        marginVertical: 20
    }
});


