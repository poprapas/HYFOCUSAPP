import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image, ActivityIndicator, Alert, RefreshControl, ScrollView } from 'react-native';

import Color from 'react-native-material-color';
import Swipeout from 'react-native-swipeout';
import * as utils from './Util'
import AsyncStorage from '@react-native-community/async-storage';
import Header from './_Component/header'

const { width, height } = Dimensions.get("window");

export default class Favorite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            d: [],
            delete: null,
            isMounted: true,
            refreshing: false,
        }
    }

    componentWillUnmount() {
        this.state.isMounted = false
    }

    componentDidMount() {

        global.fav = this

        AsyncStorage.getItem('fav').then((data) => {
            console.log(data)
            if (!data || data == '{}') {
                this.setState({ isLoading: false, refreshing: false, d: [] }, () => this.forceUpdate())
                return
            }
            const items = JSON.parse(data)
            let url = 'https://www.hatyaifocus.com/rest/api.php?action=news&ID='
            Object.keys(items).forEach((key) => {
                url += items[key][1] + ','
            })
            url = url.slice(0, -1)
            //console.log(url)
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (this.state.isMounted) {
                        this.setState({
                            isLoading: false,
                            d: responseJson,
                            refreshing: false,
                        }, () => this.forceUpdate())
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        })
    }

    _onRefresh() {
        if (!this.state.refreshing) {
            this.setState({
                refreshing: true,
            }, this.componentDidMount())
        }
    }

    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;

        if (this.state.isLoading) {

            return (
                <View style={styles.container} >
                    <Header
                        leftIcon={{
                            icon: 'md-menu',
                            fn: () => { toggleDrawer() }
                        }}
                        centerIcon4={'star'}
                        text={'บุ๊คมาร์ค'}
                        rightIcon3={{
                            icon: 'trash',
                            fn: () => { }
                        }}
                    />
                    <ActivityIndicator
                        style={{ paddingTop: height / 3 }}
                        size={'large'}
                        color='#cc9966' />

                </View>
            );
        }

        return (
            <View style={styles.container}>

                <Header
                    leftIcon={{
                        icon: 'md-menu',
                        fn: () => { toggleDrawer() }
                    }}
                    centerIcon4={'star'}
                    text={'บุ๊คมาร์ค'}
                    rightIcon3={this.props.route.params.isEmpty ?
                        {
                            icon: 'trash',
                            fn: () => {
                                Alert.alert(
                                    'บุ๊คมาร์ค',
                                    'ลบข่าวที่บันทึกไว้ทั้งหมด?',
                                    [
                                        {
                                            text: 'ยืนยัน', onPress: () => {
                                                utils.clearFavorite()
                                                global.sidemenu.setState({
                                                    currentpage: 'หน้าแรก'
                                                })
                                                global.Home.componentDidMount()
                                                navigate('หน้าแรก')
                                            }
                                        },
                                        { text: 'ยกเลิก', onPress: () => null, style: 'cancel' }
                                    ]
                                )
                            }
                        }
                        : null}
                />
                <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={'transparent'}
                        />
                    }>

                    {this.state.d.length == 0 ?
                        <View>
                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 18,
                                marginVertical: 15,
                                color: 'white'
                            }}>
                                -- ไม่มีข่าวที่บันทึกไว้ --
                    </Text>
                            <Image source={require('../assets/images/newspaper.png')}
                                style={{
                                    width: 70,
                                    height: 70,
                                    alignSelf: 'center'
                                }} />
                        </View>
                        :

                        <FlatList
                            data={this.state.d}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>

                                <View style={{ padding: 5 }}>
                                    <Swipeout
                                        autoClose={true}
                                        onOpen={() => this.setState({
                                            delete: item.ID
                                        })
                                        }
                                        onClose={() => {
                                            if (this.state.delete != null) {
                                                this.setState({
                                                    delete: null
                                                })
                                            }
                                        }}
                                        style={{ backgroundColor: Color.BROWN[800] }}
                                        right={
                                            [{
                                                onPress: () => {
                                                    this.state.d.splice(index, 1)
                                                    this.forceUpdate()
                                                    utils.removeFavorite('news', this.state.delete)
                                                    global.sidemenu.setState({
                                                        currentpage: 'หน้าแรก'
                                                    })
                                                    global.Home.componentDidMount()
                                                },
                                                text: 'Delete', type: 'delete'
                                            }]
                                        }
                                    >
                                        {item ?
                                            <TouchableOpacity
                                                onPress={() => navigate('NewDetail',
                                                    {
                                                        type: item.CATID,
                                                        title: item.TOPIC,
                                                        image: item.FEATURE,
                                                        description: item.DESCRIPTION,
                                                        view: item.VIEWS,
                                                        date: item.DATEIN,
                                                        url: item.URL
                                                    }
                                                )}
                                            >
                                                <View style={{ paddingBottom: 5 }}>
                                                    <Text style={styles.titleText}> {item.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                                                </View>
                                                <Image source={{ uri: item.FEATURE }}
                                                    style={{
                                                        height: (width - 10) * 0.525,
                                                        resizeMode: 'contain',
                                                        width: width - 10,
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                    }}
                                                />
                                                <View style={{ paddingTop: 5 }}>
                                                    <Text style={styles.moredetail}>{'>>> อ่านต่อ >>>'}</Text>
                                                </View>
                                                <View style={{
                                                    height: 1,
                                                    backgroundColor: 'rgba(240,240,240,0.2)',
                                                    marginTop: 10
                                                }}>
                                                </View>
                                            </TouchableOpacity> : null}
                                    </Swipeout>
                                </View>
                            }
                        />
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    titleText: {
        fontSize: 18,
        paddingTop: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        lineHeight: 35
    },
    moredetail: {
        fontSize: 14,
        paddingTop: 5,
        color: 'white',
        textAlign: 'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        textDecorationLine: 'underline',
    },
});
