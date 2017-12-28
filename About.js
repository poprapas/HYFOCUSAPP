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
    Dimensions
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

const { width, height } = Dimensions.get("window");

export default class About extends Component {

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => navigate('Tab')}
                    icontitle={require('./assets/images/about-icon.png')}
                    title={'เกี่ยวกับเรา'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ paddingBottom: 10 }}>
                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                </View>

                <ScrollView>
                    <View style={styles.about}>
                        <Text style={styles.main}>
                            หาดใหญ่โฟกัสดอทคอท (อังกฤษ: HatyaiFocus.com) เป็นเว็บไซต์นำเสนอข้อมูลข่าวสาร เกี่ยวกับเรื่องราวของอำเภอหาดใหญ่และจังหวัดสงขลา และรวมไปถึง Platform เกี่ยวกับการหางานและการซื้อ-ขาย เนื้อหาข่าวสารของหาดใหญ่โฟกัสดอทคอม เน้นไปเรื่องขอการนำเสนอวิถีชีวิตของผู้คน อาชีพ ข่าวสารที่เป็นกระแส ข่าวสารประจำวัน รวมไปถึง Event ต่างๆ โดยอ้างอิงข้อมูลจากเว็บไซต์ต่างๆ ผู้คน และหลักฐานทางเอกสาร โดยจะเป็นการบอกเล่าเรื่องราวในปัจจุบันและอดีตของเมืองหาดใหญ่และจังหวัดสงขลาในด้านต่างๆ ข้อมูลจะมีการอัปเดตอยู่เสมอ นอกจากนั้นหาดใหญ่โฟกัสยังมีเว็บบอร์ดไว้สำหรับชาวหาดใหญ่และผู้คนทั่วไปสามารถเข้ามาตั้งกระทู้สอบถามและแสดงความคิดเห็นซึ่งกันและกัน ทั้งเรื่องราว วิถีชีวิต ข่าวสาร เรื่องทั่วๆไป ทำให้เกิดเรื่องราวที่น่าสนใจมากมายในวงกว้างอยู่เสมอ
                        </Text>

                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.topic}>
                                เนื้อหา
                            </Text>
                        </View>

                        <Text style={styles.main}>
                            เนื้อหาในเว็บไซด์จะมีลักษณะเป็นทั้ง Content บอกเล่าเรื่องราวและคำสัมภาษณ์จาก Web Admin และผู้เข้าชมทั่วไป และยังมีเว็บบอร์ดสำหรับการพูดคุยตั้งคำถามในเรื่องราวต่างๆ อีกทั้งยังมี Platform ที่ผู้เข้าชมสามารถเข้ามาลงหางานหรือรับสมัครงาน หาสินค้าหรือโพสขายสินค้าได้อีกด้วย ซึ่งปัจจุบันมีการแบ่งหมวดออกดังนี้
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 110 }}>
                                <TouchableOpacity onPress={() => navigate('Story')}>
                                    <Text style={styles.name}> เรื่องราวหาดใหญ่:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 110, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    เป็น Content บอกเล่าเรื่องราวเมืองหาดใหญ่และจังหวัดสงขลา รวมถึงข่าวสารและความรู้ทั่วไป
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 55 }}>
                                <TouchableOpacity onPress={() => navigate('People')}>
                                    <Text style={styles.name}> วิถีชีวิต:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 55, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    เป็นการถ่ายทอดเรื่องราวผ่านการสัมภาษณ์ชีวิตของบุคคลและอาชีพที่น่าสนใจ
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 105 }}>
                                <TouchableOpacity onPress={() => navigate('Jobs')}>
                                    <Text style={styles.name}> หางานหาดใหญ่:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 105, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    เป็น Platform ค้นหางานและฝากประชาสัมพันธ์หาลูกจ้าง
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 107 }}>
                                <TouchableOpacity onPress={() => navigate('Eat')}>
                                    <Text style={styles.name}> ของกินหาดใหญ่:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 107, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    เป็นการแนะนำที่กิน-ที่เที่ยวที่น่าสนใจรอบๆ ตัวเมืองหาดใหญ่และสงขลา
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 105 }}>
                                <TouchableOpacity onPress={() => navigate('Event')}>
                                    <Text style={styles.name}> ไปหม้ายโหม๋เรา:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 105, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    นำเสนองาน Event ที่น่าสนใจในอำเภอหาดใหญ่และพื้นที่ใกล้เคียง
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 45 }}>
                                <TouchableOpacity onPress={() => navigate('Video')}>
                                    <Text style={styles.name}> วิดีโอ:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 45, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    วีดีโอแนะนำที่กินและสถานที่ท่องเที่ยว รวมทั้งคลิปวีดีโอที่น่าสนใจรอบโลก
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 70 }}>
                                <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/board/forum.php')}>
                                    <Text style={styles.name}> เว็บบอร์ด:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 70, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    บอร์ดกระดานข้อความพูดคุย ข่าวคราวเรื่องราว การซื้อขาย
                                </Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 40 }}>
                                <TouchableOpacity onPress={() => navigate('Review')}>
                                    <Text style={styles.name}> รีวิว:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 40, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    แนะนำสิ่งที่น่าสนใจ ไม่ว่าจะเป็นสินค้า ภาพยนตร์ สถานที่ ของกินต่างๆ
                                </Text>
                            </View>
                        </View>

                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.topic}>
                                Partner
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 120 }}>
                                <TouchableOpacity onPress={() => navigate('Story')}>
                                    <Text style={styles.name}> เรื่องราวหาดใหญ่:</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: width - 120, paddingTop: 5 }}>
                                <Text style={styles.main}>
                                    เป็น Content บอกเล่าเรื่องราวเมืองหาดใหญ่และจังหวัดสงขลา รวมถึงข่าวสารและความรู้ทั่วไป
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
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: Color.BROWN[800],
    },
    logo: {
        height: 100,
        width: 150,
    },
    about: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 5,
        backgroundColor: 'white',
    },
    main: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
    },
    topic: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
    },
    name: {
        fontSize: 14,
        paddingTop: 5,
        fontWeight: 'normal',
        color: '#0066ff',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        textDecorationLine: 'underline'
    },
});