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
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';

const { width, height } = Dimensions.get("window");

export default class JobDetail extends Component {

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
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
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
                            <Text style={styles.detail}>{this.props.navigation.state.params.tel} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> อีเมลล์ : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.email == "" ? '-' : this.props.navigation.state.params.email} </Text>
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
                                    value={this.props.navigation.state.params.description.replace(/\r\n/g, '').replace(/&nbsp;/g, '')}
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
        width: width - 120
    },
    detail2: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#ff0000',
        textAlign: 'left',
        width: width - 120
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