import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Linking, Platform, Dimensions, SafeAreaView, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/dist/Foundation';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Iconss from 'react-native-vector-icons/dist/FontAwesome';
import Color from 'react-native-material-color';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("window");

export default class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdown: false,
            currentpage: 'หน้าแรก'
        }
    }

    componentDidMount() {
        global.sidemenu = this
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', }}>
                <View style={{ height: 60, }} />
                <ScrollView bounces={false} style={{ flex: 1, backgroundColor: '#000', }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('หน้าแรก'), this.setState({ currentpage: 'หน้าแรก', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'หน้าแรก' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/home-icon.png')} style={{ height: 23, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                หน้าแรก
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: 'rgba(240,240,240,0.2)', width }} />

                    <TouchableOpacity onPress={() => this.setState({ dropdown: !this.state.dropdown })}>
                        <View style={styles.navSectionStyle}>

                            <Iconss name="newspaper-o" size={20} color='white' style={{ width: 28 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                                <Text style={styles.navItemStyle}>
                                    ข่าวหาดใหญ่
                            </Text>
                                {this.state.dropdown ? <Text style={{ color: 'white', fontSize: Platform.OS == 'ios' ? 25 : 20 }}> - </Text> : <Text style={{ color: 'white', fontSize: Platform.OS == 'ios' ? 25 : 20 }}> + </Text>}
                            </View>
                        </View>
                    </TouchableOpacity>

                    {this.state.dropdown ?
                        <View style={{ flex: 1, backgroundColor: '#111111' }}>

                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('หน้าแรก'), this.setState({ currentpage: 'ข่าวล่าสุด' }) }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวล่าสุด' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวล่าสุด
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 1, topic: 'ข่าวกีฬา' })
                                if (global.new)
                                    global.new.changenew(1)
                                this.setState({ currentpage: 'ข่าวกีฬา' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวกีฬา' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวกีฬา
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 2, topic: 'ข่าวสัมคมและการเมือง' })
                                if (global.new)
                                    global.new.changenew(2)
                                this.setState({ currentpage: 'ข่าวสัมคมและการเมือง' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวสัมคมและการเมือง' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวสัมคมและการเมือง
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 3, topic: 'ข่าวการศึกษา' })
                                if (global.new)
                                    global.new.changenew(3)
                                this.setState({ currentpage: 'ข่าวการศึกษา' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวการศึกษา' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวการศึกษา
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 4, topic: 'ข่าวเศรษฐกิจและการเงิน' })
                                if (global.new)
                                    global.new.changenew(4)
                                this.setState({ currentpage: 'ข่าวเศรษฐกิจและการเงิน' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวเศรษฐกิจและการเงิน' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวเศรษฐกิจและการเงิน
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 5, topic: 'ข่าวบันเทิง' })
                                if (global.new)
                                    global.new.changenew(5)
                                this.setState({ currentpage: 'ข่าวบันเทิง' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวบันเทิง' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวบันเทิง
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 6, topic: 'ข่าวอาชญากรรม' })
                                if (global.new)
                                    global.new.changenew(6)
                                this.setState({ currentpage: 'ข่าวอาชญากรรม' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวอาชญากรรม' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวอาชญากรรม
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 7, topic: 'ข่าววิทยาศาสตร์และสิ่งแวดล้อม' })
                                if (global.new)
                                    global.new.changenew(7)
                                this.setState({ currentpage: 'ข่าววิทยาศาสตร์และสิ่งแวดล้อม' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าววิทยาศาสตร์และสิ่งแวดล้อม' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าววิทยาศาสตร์และสิ่งแวดล้อม
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 8, topic: 'ข่าวประชาสัมพันธ์และการท่องเที่ยว' })
                                if (global.new)
                                    global.new.changenew(8)
                                this.setState({ currentpage: 'ข่าวประชาสัมพันธ์และการท่องเที่ยว' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวประชาสัมพันธ์และการท่องเที่ยว' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวประชาสัมพันธ์และการท่องเที่ยว
                                </Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.1)',
                                width
                            }}>
                            </View>

                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('New', { cat: 9, topic: 'ข่าวธุรกิจและเทคโนโลยี' })
                                if (global.new)
                                    global.new.changenew(9)
                                this.setState({ currentpage: 'ข่าวธุรกิจและเทคโนโลยี' })
                            }}>
                                <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ข่าวธุรกิจและเทคโนโลยี' ? Color.BROWN[800] : '#111', paddingLeft: 30 }]}>
                                    <Text style={[styles.navItemStyle, { fontSize: Platform.OS == 'ios' ? 18 : 14 }]}>
                                        ข่าวธุรกิจและเทคโนโลยี
                                </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : null}

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => {
                        AsyncStorage.getItem('fav').then((data) => {
                            if (global.fav) {
                                global.fav.componentDidMount()
                            }
                            this.props.navigation.navigate('Favorite', { isEmpty: data != '{}' })
                            this.setState({ currentpage: 'บุ๊คมาร์ค', dropdown: false })
                        })
                    }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'บุ๊คมาร์ค' ? Color.BROWN[800] : '#000' }]}>
                            <Icons name="star" size={25} color='white' style={{ width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                บุ๊คมาร์ค
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Story'), this.setState({ currentpage: 'เรื่องราวหาดใหญ่', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'เรื่องราวหาดใหญ่' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/story-icon.png')} style={{ height: 23, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                เรื่องราวหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('หางาน'), this.setState({ currentpage: 'หางาน', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'หางาน' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/work-icon.png')} style={{ height: 29, width: 29 }} />
                            <Text style={styles.navItemStyle}>
                                หางานหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ของกิน'), this.setState({ currentpage: 'ของกิน', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ของกิน' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/eat-icon.png')} style={{ height: 25, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                ของกินหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ที่เที่ยว'), this.setState({ currentpage: 'ที่เที่ยว', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ที่เที่ยว' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/travel-icon.png')} style={{ height: 25, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                เที่ยวหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('People'), this.setState({ currentpage: 'คนหาดใหญ่', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'คนหาดใหญ่' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/people-icon.png')} style={{ height: 22, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                คนหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ที่พัก'), this.setState({ currentpage: 'ที่พัก', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ที่พัก' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/hotel-icon.png')} style={{ height: 25, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                ที่พักหาดใหญ่
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Event'), this.setState({ currentpage: 'ไปหม้ายโหม๋เรา', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ไปหม้ายโหม๋เรา' ? Color.BROWN[800] : '#000' }]}>
                            <Icon name="megaphone" size={25} color='white' style={{ width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                ไปหม้ายโหม๋เรา
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Video'), this.setState({ currentpage: 'วิดีโอ', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'วิดีโอ' ? Color.BROWN[800] : '#000' }]}>
                            <Icon name="play-video" size={29} color='white' style={{ width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                วิดีโอ
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Review'), this.setState({ currentpage: 'รีวิว', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'รีวิว' ? Color.BROWN[800] : '#000' }]}>
                            <Icons name="rate-review" size={25} color='white' style={{ width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                รีวิว
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('About'), this.setState({ currentpage: 'เกี่ยวกับเรา', dropdown: false }) }}>
                        <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'เกี่ยวกับเรา' ? Color.BROWN[800] : '#000' }]}>
                            <Image source={require('../assets/images/about-icon.png')} style={{ height: 25, width: 28 }} />
                            <Text style={styles.navItemStyle}>
                                เกี่ยวกับเรา
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(240,240,240,0.2)',
                        width
                    }}>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Setting'), this.setState({ currentpage: 'ตั้งค่า', dropdown: false }) }}>
                            <View style={[styles.navSectionStyle, { backgroundColor: this.state.currentpage == 'ตั้งค่า' ? Color.BROWN[800] : '#000' }]}>
                                <Icons name="settings" size={25} color='white' style={{ width: 28 }} />
                                <Text style={styles.navItemStyle}>
                                    ตั้งค่า
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{
                            height: 1,
                            backgroundColor: 'rgba(240,240,240,0.2)',
                            width
                        }}>
                        </View>
                    </View>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }} />
                </ScrollView >
            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

const styles = StyleSheet.create({
    navItemStyle: {
        color: '#fff',
        fontSize: Platform.OS == 'ios' ? 18 : 16,
        paddingLeft: 10,
        paddingTop: Platform.OS == 'ios' ? 16 : 6,
        paddingBottom: Platform.OS == 'ios' ? 8 : 3,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    navSectionStyle: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 3
    },
});



