import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, ActivityIndicator, Dimensions, TouchableOpacity, RefreshControl, FlatList } from 'react-native';

import Color from 'react-native-material-color';
import Button from 'react-native-button';
import Header from './_Component/header'

const { width, height } = Dimensions.get("window");

export default class Room extends Component {

    constructor(props) {
        super(props);
        this.fetchMore = this._fetchMore.bind(this);
        this.fetchData = this._fetchData.bind(this);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: true,
            _data: [],
            _dataAfter: "",
            start: 0,
            end: false,
            refreshing: false,
            page: 'all',
            isMounted: true,
            now: 'all'
        }
    }

    componentWillUnmount() {
        this.state.isMounted = false
    }

    _fetchData(callback) {
        let url = ''
        if (this.state.page == 'all') {
            url = 'https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=' + this.state.start + '&per_page=10'
        }
        else if (this.state.page == 'hotel') {
            url = 'https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=1&start=' + this.state.start + '&per_page=10'
        }
        else if (this.state.page == 'apartment') {
            url = 'https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=5&start=' + this.state.start + '&per_page=10'
        }
        else if (this.state.page == 'resort') {
            url = 'https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=6&start=' + this.state.start + '&per_page=10'
        }
        else {
            url = 'https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=7&start=' + this.state.start + '&per_page=10'
        }
        fetch(url)
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
                    if (this.state.isMounted) {
                        this.setState({
                            end: true
                        })
                    }
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

    handleTabFocus = () => {
        // perform your logic here
        global.sidemenu.setState({
            currentpage: 'ที่พัก'
        })
    }

    componentDidMount() {

        this.props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });

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

    _onRefresh() {
        if (!this.state.refreshing) {
            this.setState({
                refreshing: true,
                start: 0
            }, this.componentDidMount)
        }
    }

    gotoOtherpage(page) {
        if (this.state.isMounted) {
            this.setState({
                dataSource: null,
                isLoading: true,
                isLoadingMore: false,
                _data: [],
                _dataAfter: "",
                start: 0,
                end: false,
                refreshing: false,
                page: page
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
                        centerIcon={require('../assets/images/hotel-icon.png')}
                        text={'ที่พักหาดใหญ่'}
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
                    centerIcon={require('../assets/images/hotel-icon.png')}
                    text={'ที่พักหาดใหญ่'}
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
                        <View style={{ paddingBottom: 5 }}>
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => navigate('RoomDetail',
                                    {
                                        for: item.FOR,
                                        property: item.PROPERTY,
                                        price: item.PRICE,
                                        deposit: item.DEPOSIT,
                                        owner: item.OWNER,
                                        type: item.TYPE,
                                        status: item.STATUS,
                                        provice: item.PROVINCE,
                                        amphur: item.AMPHUR,
                                        bedroom: item.BEDROOMS,
                                        bathroom: item.BATHROOMS,
                                        feature: item.FEATURE,
                                        service: item.SERVICES,
                                        furni: item.FURNISHED,
                                        descript: item.DESCRIPTION,
                                        latitude: item.LATITUDE,
                                        longitude: item.LONGITUDE,
                                        date: item.DATE,
                                        gallery: item.GALLERY,
                                        url: item.URL,
                                        fromhome: true
                                    }
                                )}>
                                <View style={{
                                    flexDirection: 'row',
                                    backgroundColor: 'white',
                                    justifyContent: 'space-around',
                                    paddingVertical: 5,
                                }}>

                                    <View style={{ flex: 5, paddingLeft: 5 }}>
                                        <Image source={{ uri: item.GALLERY[0] }}
                                            style={{
                                                height: 120,
                                                resizeMode: 'cover',
                                                borderRadius: 5
                                            }} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column',
                                        paddingTop: 12,
                                        paddingLeft: 5,
                                        flex: 4,
                                    }}
                                    >
                                        <Text numberOfLines={1} style={styles.titleText}> {item.PROPERTY} </Text>
                                        <Text style={styles.titleText2}> ราคา : {item.PRICE} </Text>
                                        <Text style={styles.titleText2}> อำเภอ : {item.AMPHUR} </Text>
                                        <Text style={styles.titleText2}> จังหวัด  : {item.PROVINCE} </Text>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        paddingRight: 5
                                    }}>

                                        <Text style={styles.more}>{' > '}</Text>
                                    </View>

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

                <View style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 5,
                    justifyContent: 'space-around'
                }}>
                    <Button
                        containerStyle={[styles.selectbutton, { backgroundColor: this.state.now == 'all' ? '#795548' : '#503830' }]}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => { this.gotoOtherpage('all'), this.setState({ now: 'all' }) }}>
                        All
                    </Button>

                    <Button
                        containerStyle={[styles.selectbutton, { backgroundColor: this.state.now == 'hotel' ? '#795548' : '#503830' }]}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => { this.gotoOtherpage('hotel'), this.setState({ now: 'hotel' }) }}>
                        Hotel
                    </Button>

                    <Button
                        containerStyle={[styles.selectbutton, { backgroundColor: this.state.now == 'apartment' ? '#795548' : '#503830' }]}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => { this.gotoOtherpage('apartment'), this.setState({ now: 'apartment' }) }}>
                        Apartment
                    </Button>

                    <Button
                        containerStyle={[styles.selectbutton, { backgroundColor: this.state.now == 'resort' ? '#795548' : '#503830' }]}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => { this.gotoOtherpage('resort'), this.setState({ now: 'resort' }) }}>
                        Resort
                    </Button>

                    <Button
                        containerStyle={[styles.selectbutton, { backgroundColor: this.state.now == 'guesthouse' ? '#795548' : '#503830' }]}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => { this.gotoOtherpage('guesthouse'), this.setState({ now: 'guesthouse' }) }}>
                        Guesthouse
                    </Button>

                </View>

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
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 8 : 0,
    },
    titleText2: {
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 8 : 0,
    },
    more: {
        fontSize: 40,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        color: '#696969'
    },
    button: {
        fontSize: 11,
        color: 'white',
        textAlign: 'center',
        padding: 5,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    selectbutton: {
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#30231d',
        width: width / 5.2,
        justifyContent: 'center',
        paddingVertical: 5
    },
});