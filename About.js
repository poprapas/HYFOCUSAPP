import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class About extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
                <Image
                    source={require('./assets/images/about-icon.png')}
                    style={{
                        width: 20,
                        height: 20,
                        top: Platform.OS == 'ios' ? 2 : 3,
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 8 : 5,
                }}> เกี่ยวกับเรา
            </Text>
            </View>,
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
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <Ionicons
                    name="md-menu"
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
                <ScrollView>
                    <View style={styles.about}>
                        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.hatyaifocus.com/')}>
                            <View>
                                <Text style={styles.main}>
                                    หาดใหญ่โฟกัสดอทคอม (อังกฤษ: <Text style={styles.name}>HatyaiFocus.com</Text>) เป็นเว็บไซต์นำเสนอข้อมูลข่าวสาร เกี่ยวกับเรื่องราวของอำเภอหาดใหญ่และจังหวัดสงขลา และรวมไปถึง Platform เกี่ยวกับการหางานและการซื้อ-ขาย เนื้อหาข่าวสารของหาดใหญ่โฟกัสดอทคอม เน้นไปเรื่องขอการนำเสนอวิถีชีวิตของผู้คน อาชีพ ข่าวสารที่เป็นกระแส ข่าวสารประจำวัน รวมไปถึง Event ต่างๆ โดยอ้างอิงข้อมูลจากเว็บไซต์ต่างๆ ผู้คน และหลักฐานทางเอกสาร โดยจะเป็นการบอกเล่าเรื่องราวในปัจจุบันและอดีตของเมืองหาดใหญ่และจังหวัดสงขลาในด้านต่างๆ ข้อมูลจะมีการอัปเดตอยู่เสมอ นอกจากนั้นหาดใหญ่โฟกัสยังมีเว็บบอร์ดไว้สำหรับชาวหาดใหญ่และผู้คนทั่วไปสามารถเข้ามาตั้งกระทู้สอบถามและแสดงความคิดเห็นซึ่งกันและกัน ทั้งเรื่องราว วิถีชีวิต ข่าวสาร เรื่องทั่วๆไป ทำให้เกิดเรื่องราวที่น่าสนใจมากมายในวงกว้างอยู่เสมอ
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.topic}>
                                เนื้อหา
                            </Text>
                        </View>

                        <Text style={styles.main}>
                            เนื้อหาในเว็บไซต์จะมีลักษณะเป็นทั้ง Content บอกเล่าเรื่องราวและคำสัมภาษณ์จาก Web Admin และผู้เข้าชมทั่วไป และยังมีเว็บบอร์ดสำหรับการพูดคุยตั้งคำถามในเรื่องราวต่างๆ อีกทั้งยังมี Platform ที่ผู้เข้าชมสามารถเข้ามาลงหางานหรือรับสมัครงาน หาสินค้าหรือโพสขายสินค้าได้อีกด้วย ซึ่งปัจจุบันมีการแบ่งหมวดออกดังนี้
                        </Text>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('Story'), global.sidemenu.setState({
                                    currentpage: 'เรื่องราวหาดใหญ่'
                                })
                            }}>
                                <Text style={styles.name}> เรื่องราวหาดใหญ่:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    เป็น Content บอกเล่าเรื่องราวเมืองหาดใหญ่และจังหวัดสงขลา รวมถึงข่าวสารและความรู้ทั่วไป
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('People'), global.sidemenu.setState({
                                    currentpage: 'คนหาดใหญ่'
                                })
                            }}>
                                <Text style={styles.name}> วิถีชีวิต:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    เป็นการถ่ายทอดเรื่องราวผ่านการสัมภาษณ์ชีวิตของบุคคลและอาชีพที่น่าสนใจ
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('หางาน'), global.sidemenu.setState({
                                    currentpage: 'หางาน'
                                })
                            }}>
                                <Text style={styles.name}> หางานหาดใหญ่:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    เป็น Platform ค้นหางานและฝากประชาสัมพันธ์หาลูกจ้าง
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('ของกิน'), global.sidemenu.setState({
                                    currentpage: 'ของกิน'
                                })
                            }}>
                                <Text style={styles.name}> ของกินหาดใหญ่:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    เป็นการแนะนำที่กิน-ที่เที่ยวที่น่าสนใจรอบๆ ตัวเมืองหาดใหญ่และสงขลา
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('Event'), global.sidemenu.setState({
                                    currentpage: 'ไปหม้ายโหม๋เรา'
                                })
                            }}>
                                <Text style={styles.name}> ไปหม้ายโหม๋เรา:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    นำเสนองาน Event ที่น่าสนใจในอำเภอหาดใหญ่และพื้นที่ใกล้เคียง
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                navigate('Video'), global.sidemenu.setState({
                                    currentpage: 'วิดีโอ'
                                })
                            }}>
                                <Text style={styles.name}> วิดีโอ:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    วีดีโอแนะนำที่กินและสถานที่ท่องเที่ยว รวมทั้งคลิปวีดีโอที่น่าสนใจรอบโลก
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/board/forum.php')}>
                                <Text style={styles.name}> เว็บบอร์ด:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5 }}>
                                <Text style={styles.detail}>
                                    บอร์ดกระดานข้อความพูดคุย ข่าวคราวเรื่องราว การซื้อขาย
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity onPress={() => {
                                navigate('Review'), global.sidemenu.setState({
                                    currentpage: 'รีวิว'
                                })
                            }}>
                                <Text style={styles.name}> รีวิว:</Text>
                            </TouchableOpacity>

                            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <Text style={styles.detail}>
                                    แนะนำสิ่งที่น่าสนใจ ไม่ว่าจะเป็นสินค้า ภาพยนตร์ สถานที่ ของกินต่างๆ
                                </Text>
                            </View>
                        </View>


                    </View>
                </ScrollView>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    about: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 5
    },
    main: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
    },
    detail: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        width: width - 150
    },
    topic: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        paddingTop: 5
    },
    name: {
        fontSize: 16,
        paddingTop: 5,
        fontWeight: 'normal',
        color: '#0066ff',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        textDecorationLine: 'underline',
        width: 125
    },
});