import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Linking, ActivityIndicator, Dimensions, RefreshControl, FlatList, Keyboard } from 'react-native';

import Color from 'react-native-material-color';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './_Component/header'

const { width, height } = Dimensions.get("window");

export default class Jobs extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            // tabBarOnPress: ({ jumpToIndex, scene }) => {
            //     // now we have access to Component methods
            //     navigation.state.params.onTabFocus();
            //     jumpToIndex(scene.index);
            // },
            headerTitle:
                <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/images/work-icon.png')}
                        style={{
                            width: 30,
                            height: 30,
                            top: 3,
                        }}
                    />
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                        fontSize: Platform.OS == 'ios' ? 18 : 15,
                        color: 'white',
                        paddingTop: Platform.OS == 'ios' ? 9 : 5,
                    }}> หางานหาดใหญ่</Text>
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
        }
    }


    constructor(props) {
        super(props);

        this.fetchMore = this._fetchMore.bind(this);
        this.fetchData = this._fetchData.bind(this);

        this.state = {
            dataSource: [],
            isLoading: true,
            isLoadingMore: true,
            _data: [],
            _dataAfter: [],
            start: 0,
            end: false,
            find: '',
            found: false,
            refreshing: false,
            isMounted: true,
        };
    }

    _fetchData(callback) {
        fetch('https://www.hatyaifocus.com/rest/api.php?action=jobs&start=' + this.state.start + '&per_page=10' + '&position=' + this.state.find)
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

    handleTabFocus = () => {
        // perform your logic here
        global.sidemenu.setState({
            currentpage: 'หางาน'
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
                    _dataAfter: data,
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

    search() {
        if (this.state.isMounted) {
            this.setState({
                dataSource: [],
                isLoading: true,
                isLoadingMore: false,
                _data: [],
                _dataAfter: [],
                start: 0,
                end: false,
                found: false,
                refreshing: false,
            }, this.componentDidMount())
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
                        centerIcon={require('../assets/images/work-icon.png')}
                        text={'หางานหาดใหญ่'}
                        rightIcon={{
                            icon: 'logo-facebook',
                            fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                        }}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.search}>

                            <View style={{
                                alignSelf: 'center',
                                paddingLeft: Platform.OS == 'ios' ? 0 : 10,
                            }}>
                                <Icon
                                    name='search'
                                    color='black'
                                    size={20}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder='ค้นหาตำแหน่ง...'
                                    placeholderTextColor='#686868'
                                    underlineColorAndroid="transparent"
                                    value={this.state.find}
                                    onChangeText={(find) => this.setState({ find: find })}
                                />
                            </View>

                            {this.state.find == '' ? null :
                                <TouchableOpacity
                                    onPress={() => this.setState({ find: '' })}
                                    style={{ alignSelf: 'center' }}>
                                    <Ionicons
                                        name='md-close-circle'
                                        color='black'
                                        size={20}
                                    />
                                </TouchableOpacity>
                            }

                        </View>


                        <TouchableOpacity
                            onPress={() => { Keyboard.dismiss(), this.search() }}
                            style={{
                                alignSelf: 'center',
                                alignItems: 'center',
                                marginRight: 5,
                                borderRadius: 10,
                                backgroundColor: 'black',
                                overflow: 'hidden',
                            }}
                        >
                            <Text style={styles.button}>ค้นหา</Text>
                        </TouchableOpacity>

                    </View>

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
                    centerIcon={require('../assets/images/work-icon.png')}
                    text={'หางานหาดใหญ่'}
                    rightIcon={{
                        icon: 'logo-facebook',
                        fn: () => { Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/') }
                    }}
                />

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.search}>

                        <View style={{
                            alignSelf: 'center',
                            paddingLeft: Platform.OS == 'ios' ? 0 : 10,
                        }}>
                            <Icon
                                name='search'
                                color='black'
                                size={20}
                            />
                        </View>

                        <View style={{ flexDirection: 'column', paddingLeft: 5 }}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder='ค้นหาตำแหน่ง...'
                                placeholderTextColor='#686868'
                                underlineColorAndroid="transparent"
                                value={this.state.find}
                                onChangeText={(find) => this.setState({ find: find })}
                            />
                        </View>

                        {this.state.find == '' ? null :
                            <TouchableOpacity
                                onPress={() => this.setState({ find: '' })}
                                style={{ alignSelf: 'center' }}>
                                <Ionicons
                                    name='md-close-circle'
                                    color='black'
                                    size={20}
                                />
                            </TouchableOpacity>
                        }

                    </View>


                    <TouchableOpacity
                        onPress={() => { Keyboard.dismiss(), this.search() }}
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            marginRight: 5,
                            borderRadius: 10,
                            backgroundColor: 'black',
                            overflow: 'hidden',
                        }}
                    >
                        <Text style={styles.button}>ค้นหา</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    {this.state.dataSource == null ?
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            alignSelf: 'center',
                            paddingTop: 10,
                        }}>- ไม่พบข้อมูลที่ค้นหา -</Text> : null}
                </View>

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
                        <View>{this.state.dataSource.length > 0 ?
                            <View style={{ paddingVertical: 2 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => navigate('JobDetail',
                                        {
                                            image: item.IMG,
                                            company: item.COMPANY,
                                            address: item.ADDRESS,
                                            province: item.PROVINCE,
                                            tel: item.TEL,
                                            email: item.EMAIL,
                                            position: item["​POSITION"],
                                            rate: item.RATE,
                                            salary: item.SALARY,
                                            style: item.STYLE,
                                            certi: item.CERTIFICATE,
                                            sex: item.SEX,
                                            description: item.DESCRIPTION,
                                            date: item.DATE,
                                            view: item.VIEWS,
                                            url: item.URL,
                                            fromhome: true
                                        }
                                    )}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: 'white',
                                        justifyContent: 'space-around',
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                    }}>

                                        <View style={{ flex: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: item.IMG }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    resizeMode: 'contain',
                                                    alignSelf: 'center'
                                                }} />
                                        </View>

                                        <View style={{
                                            flexDirection: 'column',
                                            paddingVertical: 5,
                                            paddingLeft: 5,
                                            flex: 54
                                        }}
                                        >
                                            <Text numberOfLines={1} style={styles.titleText}> ตำแหน่ง : {item["​POSITION"]} </Text>
                                            <Text numberOfLines={1} style={styles.titleText}> วุฒิการศึกษา : {item.CERTIFICATE == "" ? '-' : item.CERTIFICATE} </Text>
                                            <Text style={styles.titleText}> จังหวัด  : {item.PROVINCE} </Text>
                                            <Text style={styles.titleText2}> จำนวน : {item.RATE} ตำแหน่ง </Text>
                                        </View>

                                        <View style={{
                                            paddingLeft: 5,
                                            paddingTop: Platform.OS == 'ios' ? 30 : 15,
                                            flex: 16,
                                        }}>
                                            <Text style={styles.more}>{' > '}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View> : <View />}
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
            </View >
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
    jobfont: {
        fontSize: width * 0.06,
        paddingTop: Platform.OS === 'ios' ? 45 : 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: Platform.OS == 'ios' ? 10 : 0,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: 'white',
        flex: 5,
        height: 40,
    },
    searchInput: {
        fontSize: 16,
        color: 'black',
        padding: 0,
        width: width - 140,
        flex: 1,
    },
    titleText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 7 : 2,
        height: 24
    },
    titleText2: {
        fontSize: 15,
        color: '#ff0000',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 7 : 2,
    },
    more: {
        fontSize: 50,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        color: '#696969'
    },
    button: {
        fontSize: 16,
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        padding: 10,
    },
});
