import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Linking, TouchableOpacity, } from 'react-native';

import Color from 'react-native-material-color';
import Communications from 'react-native-communications';
import { Switch } from 'react-native-switch';
// import PushNotification from 'react-native-push-notification';
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
        // PushNotification.cancelAllLocalNotifications()
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

                <View>
                    <View style={styles.box}>
                        <Text style={styles.titleText}>เวอร์ชั่น</Text>
                        <Text style={styles.titleText}>{DeviceInfo.getVersion()}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => Communications.email(['info@hatyaifocus.com'], null, null, null, null)}>
                    <View style={styles.box}>
                        <Text style={styles.titleText}>ติดต่อเรา</Text>
                        <Ionicons
                            name="ios-arrow-forward"
                            size={30}
                            color='#696969'
                            style={{ alignSelf: 'center', }}
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
        fontSize: 18,
        color: 'black',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 10 : 0,
    },
    box: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderBottomColor: '#A9A9A9',
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'center'
    }
});