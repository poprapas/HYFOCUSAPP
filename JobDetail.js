import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Share
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Communications from 'react-native-communications';

const { width, height } = Dimensions.get("window");

export default class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: ''
        }
    }

    componentDidMount() {
        if (['02', '03', '04', '05', '07'].indexOf(this.props.navigation.state.params.tel.replace(/\D/g, '').slice(0, 2)) >= 0) {
            this.setState({
                tel: this.props.navigation.state.params.tel.replace(/\D/g, '').slice(0, 9)
            })
        }
        else {
            this.setState({
                tel: this.props.navigation.state.params.tel.replace(/\D/g, '').slice(0, 10)
            })
        }
    }

    render() {

        const { navigate, goBack } = this.props.navigation;

        return (

            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => goBack()}
                    icontitle={require('./assets/images/work-icon.png')}
                    title={'หางานหาดใหญ่'}
                    rightIcons={[
                        {
                            name: 'share',
                            onPress: () => Platform.OS == 'ios' ?
                                Share.share({ url: this.props.navigation.state.params.url})
                                :
                                Share.share({ message: this.props.navigation.state.params.url})
                        },
                    ]}
                />

                <View style={styles.listView}>
                    <ScrollView style={{
                        height: height - 70,
                        width: "100%",
                    }}>
                        <View style={{
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 2,
                            width: 120,
                            height: 100,
                            overflow: 'hidden',
                            alignSelf: 'center'
                        }}>
                            <Image source={{ uri: this.props.navigation.state.params.image }}
                                style={{
                                    width: 120,
                                    height: 100,
                                    resizeMode: 'contain',
                                }} />
                        </View>

                        <Text style={styles.company}> {this.props.navigation.state.params.company} </Text>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> ตำแหน่ง : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.position} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> ที่อยู่ : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.address} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> จังหวัด : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.province} </Text>
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
                                <Text style={styles.detail3}>{this.props.navigation.state.params.tel} </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> อีเมลล์ : </Text>
                            <View style={{ width: width - 180, flexDirection: 'row' }}>
                                {this.props.navigation.state.params.email == "" ? null :
                                    <TouchableOpacity onPress={() => Communications.email([this.props.navigation.state.params.email], null, null, null, null)}
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
                                <Text style={styles.detail3}>{this.props.navigation.state.params.email == "" ? '-' : this.props.navigation.state.params.email} </Text>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic3}> จำนวน : </Text>
                            <Text style={styles.detail2}>{this.props.navigation.state.params.rate} ตำแหน่ง </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic3}> เงินเดือน : </Text>
                            <Text style={styles.detail2}>{this.props.navigation.state.params.salary == "" ? '-' : this.props.navigation.state.params.salary} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> ลักษณะงาน : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.style} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> วุฒิการศึกษา : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.certi == "" ? '-' : this.props.navigation.state.params.certi} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> เพศ : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.sex} </Text>
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 40 }}>
                            <Text style={styles.topic2}> รายละเอียดเพิ่มเติม : </Text>
                            <View style={{ paddingLeft: 4, marginTop: 10 }}>
                                <HTMLView
                                    value={this.props.navigation.state.params.description.replace(/\r\n/g, '').replace(/&nbsp;/g, '').replace(/<br \/>/g, '')}
                                    stylesheet={styless}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Icon
                                name="eye"
                                size={15}
                                color='black'
                                style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                            />
                            <Text style={styles.view}>
                                {this.props.navigation.state.params.view}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
                            <Icons
                                name="access-time"
                                size={15}
                                color='black'
                                style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                            />
                            <Text style={styles.view}>
                                {this.props.navigation.state.params.date}
                            </Text>
                        </View>

                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listView: {
        padding: 10,
        width: width,
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
        textAlign: 'left',
        width: 110,
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
        textAlign: 'left',
        width: 110,
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
        marginBottom: -20
    },
    strong: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        marginBottom: -20
    }
});