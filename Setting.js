import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

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

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => Linking.openURL('app-settings:')}
                >
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
                        <View style={{ paddingTop: 7 }}>
                            <Text style={styles.more}> > </Text>
                        </View>
                    </View>

                </TouchableOpacity>

                {/* <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={styles.titleText}> ให้คะแนนเรา </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                        <Text style={styles.more}> > </Text>
                    </View>
                </View> */}

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
        fontSize: 20,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'WDBBangna',
        paddingTop: 10,
    },
    more: {
        fontWeight: 'normal',
        fontSize: 50,
        fontFamily: 'WDBBangna',
        color: '#696969'
    }
});