import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, Linking, ScrollView, Dimensions, TouchableOpacity, Share, StatusBar
} from 'react-native';

import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Communications from 'react-native-communications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';
import Header from './_Component/header';

const { width, height } = Dimensions.get("window");

export default class JobDetail extends Component {

    // static navigationOptions = ({ navigation }) => ({
    //     headerTitle:
    //         <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
    //             <Image
    //                 source={require('../assets/images/work-icon.png')}
    //                 style={{
    //                     width: 25,
    //                     height: 25,
    //                     top: Platform.OS == 'ios' ? 0 : 3,
    //                 }}
    //             />
    //             <Text style={{
    //                 textAlign: 'center',
    //                 fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    //                 fontSize: Platform.OS == 'ios' ? 18 : 15,
    //                 color: 'white',
    //                 paddingTop: Platform.OS == 'ios' ? 8 : 5,
    //             }}> หางานหาดใหญ่
    //         </Text>
    //         </View>,
    //     headerRight:
    //         <TouchableOpacity onPress={() => Platform.OS == 'ios' ?
    //             fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + navigation.state.params.url)
    //                 .then((response) => response.text())
    //                 .then((responseJson) => { Share.share({ url: responseJson, message: 'หางาน : ' + navigation.state.params.company }) })
    //             :
    //             Share.share({ message: decodeURI(navigation.state.params.url) })}>
    //             <Feather
    //                 name="share-2"
    //                 size={20}
    //                 color='white'
    //                 style={{
    //                     paddingHorizontal: 10
    //                 }}
    //             />
    //         </TouchableOpacity>,
    //     headerLeft:
    //         <TouchableOpacity onPress={() => navigation.goBack()}>
    //             <Ionicons
    //                 name="ios-arrow-back"
    //                 size={30}
    //                 color='white'
    //                 style={{
    //                     paddingHorizontal: 10
    //                 }}
    //             />
    //         </TouchableOpacity>
    // })

    constructor(props) {
        super(props);
        this.state = {
            tel: ''
        }
    }

    componentDidMount() {

        if (Platform.OS == 'android') {
            StatusBar.setBackgroundColor('black')
        }
        StatusBar.setBarStyle("light-content")
        StatusBar.setHidden(false)

        global.ishome = false

        if (['02', '03', '04', '05', '07'].indexOf(this.props.route.params.tel.replace(/\D/g, '').slice(0, 2)) >= 0) {
            this.setState({
                tel: this.props.route.params.tel.replace(/\D/g, '').slice(0, 9)
            })
        }
        else {
            this.setState({
                tel: this.props.route.params.tel.replace(/\D/g, '').slice(0, 10)
            })
        }
    }

    componentWillUnmount() {
        global.ishome = true
    }

    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;

        return (

            <View style={styles.container}>
                <Header
                    leftIcon={{
                        icon: 'ios-arrow-back',
                        fn: () => { goBack() }
                    }}
                    centerIcon={require('../assets/images/work-icon.png')}
                    text={'หางานหาดใหญ่'}
                    rightIcon2={{
                        icon: 'share-2',
                        fn: () => Platform.OS == 'ios' ?
                            fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + this.props.route.params.url)
                                .then((response) => response.text())
                                .then((responseJson) => { Share.share({ url: responseJson, message: 'หางาน : ' + this.props.route.params.company }) })
                            :
                            Share.share({ message: decodeURI(this.props.route.params.url) })
                    }}
                />

                <ScrollView style={{ flex: 1, paddingHorizontal: 5 }}>
                    <View style={{
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 2,
                        width: 120,
                        height: 120,
                        overflow: 'hidden',
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>
                        <Image source={{ uri: this.props.route.params.image }}
                            style={{
                                height: 100,
                                resizeMode: 'contain',
                                marginVertical: 10
                            }} />
                    </View>

                    <Text style={styles.company}> {this.props.route.params.company} </Text>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> ตำแหน่ง : </Text>
                        <Text style={styles.detail}>{this.props.route.params.position} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> ที่อยู่ : </Text>
                        <Text style={styles.detail}>{this.props.route.params.address} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> จังหวัด : </Text>
                        <Text style={styles.detail}>{this.props.route.params.province} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> เบอร์โทร : </Text>
                        <View style={{ width: width - 180, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => Communications.phonecall(this.state.tel, true)}
                                style={{
                                    width: 30,
                                    height: 20,
                                    backgroundColor: '#88cc00',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 10

                                }}
                            >
                                <FontAwesome
                                    name="phone"
                                    size={15}
                                    color='white'
                                />
                            </TouchableOpacity>
                            <Text style={styles.detail3}>{this.props.route.params.tel} </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> อีเมลล์ : </Text>
                        <View style={{ width: width - 180, flexDirection: 'row' }}>
                            {this.props.route.params.email == "" ? null :
                                <TouchableOpacity onPress={() => Communications.email([this.props.route.params.email], null, null, null, null)}
                                    style={{
                                        width: 30,
                                        height: 20,
                                        backgroundColor: '#00ace6',
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 10

                                    }}
                                >
                                    <Foundation
                                        name="mail"
                                        size={15}
                                        color='white'
                                    />
                                </TouchableOpacity>
                            }
                            <Text style={styles.detail3}>{this.props.route.params.email == "" ? '-' : this.props.route.params.email} </Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic3}> จำนวน : </Text>
                        <Text style={styles.detail2}>{this.props.route.params.rate} ตำแหน่ง </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic3}> เงินเดือน : </Text>
                        <Text style={styles.detail2}>{this.props.route.params.salary == "" ? '-' : this.props.route.params.salary} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> ลักษณะงาน : </Text>
                        <Text style={styles.detail}>{this.props.route.params.style} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> วุฒิการศึกษา : </Text>
                        <Text style={styles.detail}>{this.props.route.params.certi == "" ? '-' : this.props.route.params.certi} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.topic}> เพศ : </Text>
                        <Text style={styles.detail}>{this.props.route.params.sex} </Text>
                    </View>

                    <View style={{ marginTop: 10, marginBottom: 40 }}>
                        <Text style={styles.topic2}> รายละเอียดเพิ่มเติม : </Text>
                        <View style={{ paddingLeft: 4, marginTop: 10 }}>
                            <HTMLView
                                value={this.props.route.params.description.replace(/\r\n/g, '').replace(/&nbsp;/g, '').replace(/<br \/>/g, '')}
                                stylesheet={styless}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <Icon
                            name="eye"
                            size={15}
                            color='black'
                            style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                        />
                        <Text style={styles.view}>
                            {this.props.route.params.view}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10, paddingRight: 5 }}>
                        <Icons
                            name="access-time"
                            size={15}
                            color='black'
                            style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                        />
                        <Text style={styles.view}>
                            {this.props.route.params.date}
                        </Text>
                    </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    company: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    topic: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right',
        width: 110,
        paddingRight: 10
    },
    topic2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 150,
    },
    topic3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
        textAlign: 'right',
        width: 110,
        paddingRight: 10
    },
    detail: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        width: width - 130
    },
    detail2: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#ff0000',
        textAlign: 'left',
        width: width - 120
    },
    detail3: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'right',
        paddingLeft: 3,
    },
});

const styless = StyleSheet.create({
    p: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        marginBottom: Platform.OS == 'ios' ? -30 : -20,
        lineHeight: 22,
    },
    strong: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginBottom: -20,
        lineHeight: 22,
    }
});