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

                <View style={{ paddingBottom: 6 }}>
                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                </View>

                <View style={styles.listView}>
                    <ScrollView style={{
                        height: Platform.OS == 'ios' ? height - 165 : height - 170,
                        width: "100%"
                    }}>
                        <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                            <Image source={{ uri: this.props.navigation.state.params.image }}
                                style={{ width: width, height: 100, resizeMode: 'contain'}} />
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
                            <Text style={styles.topic}> จำนวน : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.rate} ตำแหน่ง </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={styles.topic}> เงินเดือน : </Text>
                            <Text style={styles.detail}>{this.props.navigation.state.params.salary == "" ? '-' : this.props.navigation.state.params.salary} </Text>
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

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.topic2}> รายละเอียดเพิ่มเติม : </Text>
                            <View style={{ paddingLeft: 4 }}>
                                <HTMLView
                                    value={this.props.navigation.state.params.description.replace(/\r\n/g, '').replace(/&nbsp;/g, '')}
                                    stylesheet={styless}
                                />
                            </View>
                        </View>

                        <Text style={styles.view}> ผู้ชม: {this.props.navigation.state.params.view}  </Text>
                        <Text style={styles.view}> วันที่: {this.props.navigation.state.params.date} </Text>
                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: Color.BROWN[400],
    },
    logo: {
        height: 100,
        width: 150,
    },

    listView: {
        backgroundColor: 'white',
        paddingLeft: 1,
        width: width,
    },
    company: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    topic: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 98,
    },
    topic2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 150,
    },
    detail: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        width: width - 98
    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'right',
    },
});

const styless = StyleSheet.create({
    p: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
    }
});