import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Linking, ActivityIndicator, Dimensions, RefreshControl, FlatList } from 'react-native';

import Color from 'react-native-material-color';
import Header from './_Component/header'

const { width, height } = Dimensions.get("window");

export default class Story extends Component {

    constructor(props) {
        super(props);
        this.fetchMore = this._fetchMore.bind(this);
        this.fetchData = this._fetchData.bind(this);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: true,
            _data: null,
            _dataAfter: "",
            start: 0,
            end: false,
            refreshing: false,
            isMounted: true,
        }
    }

    _fetchData(callback) {
        fetch('https://www.hatyaifocus.com/rest/api.php?action=content&cat=1&start=' + this.state.start + '&per_page=10')
            .then(response => response.json())
            .then(callback)
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

    componentDidMount() {
        //Start getting the first batch of data from reddit
        this.fetchData(responseJson => {
            const data = responseJson;
            if (this.state.isMounted) {
                this.setState({
                    dataSource: data,
                    isLoading: false,
                    _data: data,
                    _dataAfter: responseJson.data,
                    start: 10,
                    refreshing: false,
                    isLoadingMore: false
                });
            }
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
                        centerIcon={require('../assets/images/story-icon.png')}
                        text={'เรื่องราวหาดใหญ่'}
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
                    centerIcon={require('../assets/images/story-icon.png')}
                    text={'เรื่องราวหาดใหญ่'}
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
                        <View style={styles.flatlist}>
                            <TouchableOpacity
                                onPress={() => navigate('ContentDetail',
                                    {
                                        title: item.TOPIC,
                                        image: item.FEATURE,
                                        description: item.DESCRIPTION,
                                        view: item.VIEWS,
                                        date: item.DATEIN,
                                        url: item.URL,
                                        topic: 'เรื่องราวหาดใหญ่',
                                        cat: 1,
                                    }
                                )}
                            >
                                <View style={{ paddingBottom: 5 }}>
                                    <Text style={styles.titleText}> {item.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                                </View>
                                <Image source={{ uri: item.FEATURE }}
                                    style={{
                                        width: width - 10,
                                        height: (width - 10) * 0.625,
                                        borderRadius: 10
                                    }}
                                />

                                <View style={{ paddingTop: 5 }}>
                                    <Text style={styles.moredetail}> >>> อ่านต่อ >>> </Text>
                                </View>
                                <View style={{
                                    height: 1,
                                    backgroundColor: 'rgba(240,240,240,0.2)',
                                    marginTop: 10
                                }}>
                                </View>
                            </TouchableOpacity>
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

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    logo: {
        height: 110,
        width: 150,
    },
    storyfont: {
        fontSize: width * 0.07,
        paddingTop: Platform.OS === 'ios' ? 45 : 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    flatlist: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 20
    },
    moredetail: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 5,
        textDecorationLine: 'underline'
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 10,
        lineHeight: Platform.OS == 'ios' ? 28 : 35
    },
});