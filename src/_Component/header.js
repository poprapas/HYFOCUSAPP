import React, { Component } from 'react';
import { Platform, Dimensions, StyleSheet, View, TouchableOpacity, StatusBar, SafeAreaView, Text, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

let { width, height } = Dimensions.get('window')

export default class Header extends Component {
    render() {
        let { _this, text, leftIcon, rightIcon, rightIcon2, rightIcon3, centerIcon, centerIcon2, centerIcon3, centerIcon4 } = this.props
        return (
            <View>

                {Platform.OS == 'android' &&
                    <View style={{ marginTop: StatusBar.currentHeight }}>
                        <StatusBar translucent={true} backgroundColor={'#000'} />
                    </View>
                }
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} />
                <View style={styles.container} >
                    {leftIcon ?
                        <TouchableOpacity
                            style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => leftIcon.fn()}
                        >
                            <Ionicons
                                name={leftIcon.icon}
                                size={25}
                                color='#fff'
                            />
                        </TouchableOpacity>
                        :
                        <View style={{ width: 50 }} />
                    }
                    <View style={{ flexDirection: 'row' }}>
                        {centerIcon ?
                            <Image
                                source={centerIcon}
                                style={{
                                    width: 23,
                                    height: 23,
                                    top: Platform.OS == 'ios' ? 2 : 3,
                                }}
                            /> :
                            centerIcon2 ?
                                <FontAwesome
                                    name={centerIcon2}
                                    size={18}
                                    color='white'
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: 2
                                    }}
                                /> :
                                centerIcon3 ?
                                    <Foundation
                                        name={centerIcon3}
                                        size={20}
                                        color='white'
                                        style={{
                                            top: 5
                                        }}
                                    /> :
                                    centerIcon4 ?
                                        <MaterialIcons
                                            name={centerIcon4}
                                            size={20}
                                            color='white'
                                            style={{
                                                top: 5
                                            }}
                                        /> : null}
                        <Text style={styles.welcome}> {text}</Text>
                    </View>
                    {rightIcon ?
                        <TouchableOpacity
                            style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => rightIcon.fn()}
                        >
                            <Ionicons
                                name={rightIcon.icon}
                                size={25}
                                color='#fff'
                            />
                        </TouchableOpacity>
                        :
                        rightIcon2 ?
                            <TouchableOpacity
                                style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}
                                onPress={() => rightIcon2.fn()}
                            >
                                <Feather
                                    name={rightIcon2.icon}
                                    size={20}
                                    color='white'
                                    style={{
                                        paddingHorizontal: 10
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            rightIcon3 ?
                                <TouchableOpacity
                                    style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}
                                    onPress={() => rightIcon3.fn()}
                                >
                                    <EvilIcons
                                        name={rightIcon3.icon}
                                        size={30}
                                        color={'white'}
                                        style={{
                                            paddingHorizontal: 10,
                                            alignSelf: 'center',
                                            marginTop: 2,
                                        }}
                                    />
                                </TouchableOpacity>
                                : <View style={{ width: 50 }} />
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#000',
        paddingVertical: 10
    },
    welcome: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        fontSize: Platform.OS == 'ios' ? 18 : 15,
        paddingTop: Platform.OS == 'ios' ? 8 : 5,
        alignSelf: 'center',
    },
});
