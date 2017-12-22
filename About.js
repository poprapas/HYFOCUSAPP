import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

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
                    title={'เกี่ยวกับ'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ paddingBottom: 20 }}>
                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                </View>

                <View style={styles.about}>
                    <Text style={styles.detail}>
                        เกี่ยวกับเรื่องราวของอำเภอหาดใหญ่และจังหวัดสงขลาและรวมไปถึง
                     Platform เกี่ยวกับการหางานและการซื้อ-ขาย เนื้อหาข่าวสารของ
                     หาดใหญ่โฟกัสดอทคอม เน้นไปเรื่องขอการนำเสนอวิถีชีวิตของผู้คน
                     อาชีพ ข่าวสารที่เป็นกระแส ข่าวสารประจำวัน รวมไปถึง Event ต่างๆ
                     โดยอ้างอิงข้อมูลจากเว็บไซต์ต่างๆ ผู้คน และหลักฐานทางเอกสาร
                     โดยจะเป็นการบอกเล่าเรื่องราวในปัจจุบันและอดีตของเมืองหาดใหญ่
                     และจังหวัดสงขลาในด้านต่างๆ ข้อมูลจะมีการอัปเดตอยู่เสมอ นอก-
                     จากนั้นหาดใหญ่โฟกัสยังมีเว็บบอร์ดไว้สำหรับชาวหาดใหญ่และผู้
                     คนทั่วไปสามารถเข้ามาตั้งกระทู้สอบถามและแสดงความคิดเห็นซึ่งกันและกัน
                     ทั้งบอกเล่าเรื่องราว คนดังหาดใหญ่ ข่าวสาร ของกินหาด-
                     ใหญ่ เที่ยวหาดใหญ่ที่ไหนดี รีวิว เรื่องทั่วๆไป ทำให้เกิดเรื่องราวที่น่า
                     สนใจมากมายในวงกว้างอยู่เสมอ
                  </Text>
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
        backgroundColor: Color.BROWN[800],
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logo: {
        height: 100,
        width: 150,
    },
    about: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    detail: {
        fontSize: 13,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
    }

});