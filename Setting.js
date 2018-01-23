import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Communications from 'react-native-communications';
import { Switch } from 'react-native-switch';
import PushNotification from 'react-native-push-notification';

export default class Contact extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <MaterialIcons
                    name="settings"
                    size={20}
                    color='white'
                    style={{
                        top: 2
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 8 : 5,
                }}> ตั้งค่า
            </Text>
            </View>,
        headerTitleStyle: {
            alignSelf: 'center',
        },
        headerRight:
            <TouchableOpacity onPress={() => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/')}>
                <Ionicons
                    name="logo-facebook"
                    size={25}
                    color='white'
                    style={{
                        paddingHorizontal: 10
                    }}
                />
            </TouchableOpacity>,
        headerLeft:
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name="ios-arrow-back"
                    size={30}
                    color='white'
                    style={{
                        paddingHorizontal: 10
                    }}
                />
            </TouchableOpacity>
    })

    controlNotification(val){
        AsyncStorage.setItem('notification', val + '')
        PushNotification.cancelAllLocalNotifications()
    }

    componentDidMount(){
        AsyncStorage.getItem('notification').then((data) => {
            if(data == null || data == 'true'){
                this.setState({
                    notification: true
                })
            }
            else{
                this.setState({
                    notification: false
                })
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
          notification: null,
        }
      }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                {Platform.OS == 'ios' ?

                    <TouchableOpacity onPress={() => Linking.openURL('app-settings:')}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1
                        }}>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.titleText}> เปลี่ยนแปลงการแจ้งเตือน </Text>
                            </View>
                            <View style={{ paddingTop: Platform.OS == 'ios' ? 7 : 0 }}>
                                <Text style={styles.more}> > </Text>
                            </View>
                        </View>
                    </TouchableOpacity> :

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        borderBottomColor: '#A9A9A9',
                        borderBottomWidth: 1,
                        paddingBottom: 5,
                        paddingTop: 5
                    }}>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.titleText}> เปลี่ยนแปลงการแจ้งเตือน </Text>
                        </View>
                        <View style={{ 
                            paddingTop: 2, 
                            paddingRight: 5,
                        }}>
                            <Switch
                                value={this.state.notification}
                                onValueChange={(val) => this.controlNotification(val)}
                                disabled={false}
                                activeText={'On'}
                                inActiveText={'Off'}
                                circleSize={27}
                                barHeight={27}
                                circleBorderWidth={2}
                                backgroundActive={'green'}
                                backgroundInactive={'#505050'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'gray'}
                            />
                        </View>
                    </View>
                }

                {Platform.OS == 'ios' ? null :

                    <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.hyfocusapp')}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            justifyContent: 'space-between',
                            borderBottomColor: '#A9A9A9',
                            borderBottomWidth: 1
                        }}>
                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.titleText}> ให้คะแนนเรา </Text>
                            </View>
                            <View style={{ paddingTop: Platform.OS == 'ios' ? 7 : 0 }}>
                                <Text style={styles.more}> > </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                }

                <TouchableOpacity onPress={() => Communications.email(['info@hatyaifocus.com'], null, null, null, null)}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        borderBottomColor: '#A9A9A9',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.titleText}> ติดต่อเรา </Text>
                        </View>
                        <View style={{ paddingTop: Platform.OS == 'ios' ? 7 : 0 }}>
                            <Text style={styles.more}> > </Text>
                        </View>
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
        fontSize: Platform.OS == 'ios' ? 20 : 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 10 : 0,
    },
    more: {
        fontWeight: 'normal',
        fontSize: Platform.OS == 'ios' ? 50 : 40,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        color: '#696969',
        marginBottom: Platform.OS == 'ios' ? 0 : -10,
        marginTop: Platform.OS == 'ios' ? 0 : -10
    }
});