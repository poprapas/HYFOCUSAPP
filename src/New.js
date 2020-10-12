import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking, ActivityIndicator, Dimensions, RefreshControl, FlatList } from 'react-native';

import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as utils from './Util'
import AsyncStorage from '@react-native-community/async-storage';
import Header from './_Component/header'

const { width, height } = Dimensions.get("window");

export default class New extends Component {

    constructor(props) {
        super(props);
        this.fetchMore = this._fetchMore.bind(this);
        this.fetchData = this._fetchData.bind(this);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: true,
            _data: null,
            _dataAfter: null,
            start: 0,
            end: false,
            refreshing: false,
            isMounted: true,
            favorite: {},
        }
    }

    _fetchData(callback) {
        let cat = this.props.route.params.cat
        //alert(this.props.route.params.cat)
        fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=' + this.props.route.params.cat + '&start=' + this.state.start + '&per_page=10')
            .then(response => response.json())
            .then(cat == this.props.route.params.cat ? callback : null)
            .catch(error => {
                console.error(error);
            });
    }


    _fetchMore() {
        if (!this.state.isLoadingMore) {
            this.setState({
                isLoadingMore: true,
            })
            this.fetchData(responseJson => {
                if (responseJson == null) {
                    this.setState({
                        end: true
                    })
                }
                else {
                    //console.log(responseJson)
                    const data = this.state._data.concat(responseJson);
                    if (this.state.isMounted) {
                        this.setState({
                            dataSource: data,
                            isLoadingMore: false,
                            _data: data,
                            _dataAfter: responseJson.data,
                            start: this.state.start + 10,
                        });
                    }
                }
            });
        }
    }

    changenew(cat) {
        //console.log('changenew')
        this.props.route.params.cat = cat
        if (this.state.isMounted) {
            this.setState({
                dataSource: null,
                isLoading: true,
                isLoadingMore: false,
                _data: null,
                _dataAfter: "",
                start: 0,
                end: false,
                refreshing: false,
                isMounted: true,
                favorite: {}
            }, this.componentDidMount)
        }
    }

    componentDidMount() {
        global.new = this
        this.fetchData(responseJson => {

            //console.log(responseJson)
            const data = responseJson;
            AsyncStorage.getItem('fav').then((d) => {
                if (!d) { d = '[]' }
                if (this.state.isMounted) {
                    this.setState({
                        dataSource: data,
                        isLoading: false,
                        _data: data,
                        _dataAfter: responseJson.data,
                        start: 10,
                        refreshing: false,
                        favorite: JSON.parse(d),
                        isLoadingMore: false
                    });
                }
            })
        });
    }

    componentWillUnmount() {
        this.state.isMounted = false
    }

    _onRefresh() {
        if (!this.state.refreshing) {
            this.setState({
                refreshing: true,
                start: 0
            }, this.componentDidMount)
        }
    }

    favorite(action, id, favorite) {
        if (favorite) {
            utils.addFavorite(action, id)
        }
        else {
            utils.removeFavorite(action, id)
        }
        this.forceUpdate()
    }


    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;

        if (this.state.isLoading || this.state.refreshing) {
            return (
                <View style={styles.container} >
                    <Header
                        leftIcon={{
                            icon: 'md-menu',
                            fn: () => { toggleDrawer() }
                        }}
                        centerIcon2={'newspaper-o'}
                        text={this.props.route.params.type}
                        rightIcon={{
                            icon: 'logo-facebook',
                            fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
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
                    centerIcon2={'newspaper-o'}
                    text={this.props.route.params.topic}
                    rightIcon={{
                        icon: 'logo-facebook',
                        fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                    }}
                />

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={'transparent'}
                        />
                    }
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={{ padding: 5 }}>
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
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>

                                <TouchableOpacity onPress={() => {
                                    item.favorite = !item.favorite
                                    this.favorite('news', item.ID, item.favorite)
                                    this.refs.toast.show(item.favorite ? 'เพิ่มข่าวไปยังบุ๊คมาร์คแล้ว!' : 'ลบข่าวออกจากบุ๊คมาร์คแล้ว!', 1800)
                                }}>
                                    <Ionicons
                                        name={item.favorite || this.state.favorite['news_' + item.ID] ? "md-star" : "md-star-outline"}
                                        size={20}
                                        color={'#edad35'}
                                        style={{ width: 40, }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    key={item.id}
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
                                    <Text style={styles.moredetail}>{'>>> อ่านต่อ >>>'}</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                height: 1,
                                backgroundColor: 'rgba(240,240,240,0.2)',
                                marginTop: 10
                            }}>
                            </View>
                        </View>
                    }
                    onEndReachedThreshold={0.5}
                    onEndReached={() =>
                        this.fetchMore()}
                    ListFooterComponent={() => {
                        if (this.state.end) {
                            return (
                                <View />
                            )
                        }
                        else if (this.state.isLoadingMore) {
                            return (
                                <View style={{ flex: 1, padding: 10 }}>
                                    <ActivityIndicator size="small" />
                                </View>
                            )
                        }
                        else {
                            return (
                                <View />
                            )
                        }
                    }}
                />

                <Toast
                    ref="toast"
                    style={{
                        backgroundColor: '#707070',
                        borderRadius: 15
                    }}
                    position='bottom'
                    positionValue={Platform.OS == 'ios' ? 90 : 60}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.9}
                    textStyle={{ color: 'white' }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[600],
    },
    moredetail: {
        fontSize: 14,
        color: 'white',
        textAlign: 'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 5,
        textDecorationLine: 'underline'
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 10,
        lineHeight: 35
    },
});
