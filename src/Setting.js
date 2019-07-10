import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Linking, TouchableOpacity,
} from 'react-native';

import Color from 'react-native-material-color';
import Communications from 'react-native-communications';
import { Switch } from 'react-native-switch';
import PushNotification from 'react-native-push-notification';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './_Component/header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Setting extends Component {

    controlNotification(val) {
        AsyncStorage.setItem('notification', val + '',
            () => this.setState({
                notification: val
            })
        )
        PushNotification.cancelAllLocalNotifications()
    }

    componentDidMount() {
        AsyncStorage.getItem('notification').then((data) => {
            console.log(data)
            if (data == null || data == 'true') {
                this.setState({
                    notification: true
                })
            }
            else {
                this.setState({
                    notification: false
                })
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            notification: true,
        }
    }

    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;


        return (
            <View style={styles.container}>
                <Header
                    leftIcon={{
                        icon: 'md-menu',
                        fn: () => { toggleDrawer() }
                    }}
                    centerIcon4={'settings'}
                    text={'ตั้งค่า'}
                    rightIcon={{
                        icon: 'logo-facebook',
                        fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                    }}
                />

                {Platform.OS == 'ios' ?
                    <View>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1,
                            paddingVertical: 10,
                            paddingLeft: 10,
                        }}>
                            <Text style={styles.titleText}>เวอร์ชั่น</Text>
                            <Text style={styles.version}>{DeviceInfo.getVersion()}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 5,
                            paddingLeft: 5
                        }}>
                            <Text style={styles.titleText}> เปลี่ยนแปลงการแจ้งเตือน </Text>
                            <Switch
                                value={this.state.notification}
                                onValueChange={(val) => this.controlNotification(val)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={23}
                                barHeight={23}
                                circleBorderWidth={1}
                                backgroundActive={'green'}
                                backgroundInactive={'#505050'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'gray'}
                            />
                        </View>

                        <TouchableOpacity onPress={() => {
                            parseInt(Platform.Version, 10) == 11 ?
                                Linking.openURL('https://itunes.apple.com/us/app/appName/id1331300096?mt=8&action=write-review').catch(err => console.error('An error occurred', err))
                                :
                                Linking.openURL('https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?pageNumber=0&sortOrdering=1&type=Purple+Software&mt=8&id1331300096').catch(err => console.error('An error occurred', err));
                        }
                        }>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                justifyContent: 'space-between',
                                borderBottomColor: '#A9A9A9',
                                borderBottomWidth: 1,
                                paddingVertical: 10,
                                paddingLeft: 5
                            }}>
                                <Text style={styles.titleText}> ให้คะแนนเรา </Text>
                                <Ionicons
                                    name="ios-arrow-forward"
                                    size={30}
                                    color='#696969'
                                    style={{
                                        alignSelf: 'center',
                                        paddingRight: 20
                                    }}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                    :
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1,
                            paddingTop: 10,
                            paddingBottom: 5,
                            paddingLeft: 10
                        }}>
                            <Text style={styles.titleText}>เวอร์ชั่น</Text>
                            <Text style={styles.version}>{DeviceInfo.getVersion()}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 5,
                            paddingLeft: 5
                        }}>
                            <Text style={styles.titleText}> เปลี่ยนแปลงการแจ้งเตือน </Text>
                            <Switch
                                value={this.state.notification}
                                onValueChange={(val) => this.controlNotification(val)}
                                disabled={false}
                                activeText={''}
                                inActiveText={''}
                                circleSize={23}
                                barHeight={23}
                                circleBorderWidth={1}
                                backgroundActive={'green'}
                                backgroundInactive={'#505050'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'gray'}
                            />
                        </View>

                        <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.hyfocusapp')}>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                justifyContent: 'space-between',
                                borderBottomColor: '#A9A9A9',
                                borderBottomWidth: 1,
                                paddingTop: 10,
                                paddingBottom: 5,
                                paddingLeft: 5
                            }}>
                                <Text style={styles.titleText}> ให้คะแนนเรา </Text>
                                <Ionicons
                                    name="ios-arrow-forward"
                                    size={30}
                                    color='#696969'
                                    style={{
                                        alignSelf: 'center',
                                        paddingRight: 20
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                }

                <TouchableOpacity onPress={() => Communications.email(['info@hatyaifocus.com'], null, null, null, null)}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        borderBottomColor: '#A9A9A9',
                        borderBottomWidth: 1,
                        paddingTop: 10,
                        paddingBottom: Platform.OS == 'ios' ? 10 : 5,
                        paddingLeft: 5
                    }}>
                        <Text style={styles.titleText}> ติดต่อเรา </Text>
                        <Ionicons
                            name="ios-arrow-forward"
                            size={30}
                            color='#696969'
                            style={{
                                alignSelf: 'center',
                                paddingRight: 20
                            }}
                        />
                    </View>
                </TouchableOpacity>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    titleText: {
        fontSize: Platform.OS == 'ios' ? 18 : 16,
        color: 'black',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 10 : 0,
    },
    version: {
        fontSize: Platform.OS == 'ios' ? 18 : 16,
        color: 'black',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 10 : 0,
        paddingRight: 10
    },
});