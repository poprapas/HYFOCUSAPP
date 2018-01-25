import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    ListView,
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    AsyncStorage
} from 'react-native';

import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Toast, { DURATION } from 'react-native-easy-toast'
import * as utils from './Util'

const { width, height } = Dimensions.get("window");

export default class New extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <FontAwesome
                    name="newspaper-o"
                    size={18}
                    color='white'
                    style={{
                        top: 5,
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 9 : 5,
                }}> {navigation.state.params.topic}
                </Text>
            </View>,
        headerTitleStyle: {
            alignSelf: 'center',
        },
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name="ios-arrow-back"
                    size={30}
                    color='white'
                    style={{
                        paddingHorizontal: 10
                    }}
                />
            </TouchableOpacity>
    })

    constructor(props) {
        super(props);
        this.fetchMore = this._fetchMore.bind(this);
        this.fetchData = this._fetchData.bind(this);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: false,
            _data: null,
            _dataAfter: "",
            start: 0,
            end: false,
            refreshing: false,
            isMounted: true
        }
    }

    _fetchData(callback) {

        fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=' + this.props.navigation.state.params.cat + '&start=' + this.state.start + '&per_page=10')
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
                            dataSource: this.state.dataSource.cloneWithRows(data),
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
            let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            });
            const data = responseJson;
            if (this.state.isMounted) {
                this.setState({
                    dataSource: ds.cloneWithRows(data),
                    isLoading: false,
                    _data: data,
                    _dataAfter: responseJson.data,
                    start: 10,
                    refreshing: false,
                });
            }
        });
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
    }

    _onRefresh() {
        if (!this.state.refreshing) {
            this.setState({
                refreshing: true,
                start: 0
            }, this.componentDidMount)
        }
    }

    favorite(action, id) {
        utils.addFavorite(action, id)
    }

    // favorite(action, id) {
    //     AsyncStorage.getItem('favorite').then((data) => {
    //         //console.log(JSON.parse(data))
    //         let main = []
    //         if (data == null) {
    //             AsyncStorage.setItem('favorite', JSON.stringify([[action, id]]))
    //         }
    //         else {
    //             let newdata = JSON.parse(data)
    //             let found = false
    //             for (let i in newdata) {
    //                 if (newdata[i][0] == action && newdata[i][1] == id)
    //                     found = true
    //             }
    //             if (!found) {
    //                 newdata.push([action, id])
    //                 AsyncStorage.setItem('favorite', JSON.stringify(newdata))
    //             }
    //         }
    //     })
    //     //AsyncStorage.removeItem('favorite')
    // }

    render() {

        const { navigate } = this.props.navigation;

        if (this.state.isLoading || this.state.refreshing) {
            return (
                <View style={{ flex: 1, backgroundColor: Color.BROWN[600] }}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <TouchableOpacity onPress={() => navigate('หน้าแรก')}>
                            <Image source={require('./assets/images/banner2.jpg')}
                                style={styles.logo} />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.bannerfont}> ---- ข่าวกีฬา ---- </Text>
                        </View>

                    </View> */}
                    <ActivityIndicator
                        style={{ paddingTop: 20 }}
                        color='#d2a679' />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => navigate('หน้าแรก')}>
                        <Image source={require('./assets/images/banner2.jpg')}
                            style={styles.logo} />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.bannerfont}> ---- ข่าวกีฬา ---- </Text>
                    </View>

                </View> */}

                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={'transparent'}
                        />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <View style={styles.listView}>
                        <TouchableOpacity
                            key={rowData.id}
                            onPress={() => navigate('NewDetail',
                                {
                                    type: rowData.CATID,
                                    title: rowData.TOPIC,
                                    image: rowData.FEATURE,
                                    description: rowData.DESCRIPTION,
                                    view: rowData.VIEWS,
                                    date: rowData.DATEIN,
                                    url: rowData.URL
                                }
                            )}
                        >
                            <View style={{ paddingBottom: 5 }}>
                                <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                            </View>
                            <Image source={{ uri: rowData.FEATURE }}
                                style={{
                                    width: width - 10,
                                    height: (width - 10) * 0.625,
                                    //backgroundColor: '#6a5750',
                                    borderRadius: 10
                                }} />
                        </TouchableOpacity>

                        <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>


                            <TouchableOpacity onPress={() => {
                                this.favorite('news', rowData.ID)
                                this.refs.toast.show('เพิ่มข่าวไปยังข่าวโปรดแล้ว!', 2000);
                            }}>
                                <Feather
                                    name="download"
                                    size={16}
                                    color='white'
                                    style={{
                                        top: 7,
                                        width: 30,
                                        margin: 3
                                    }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                key={rowData.id}
                                onPress={() => navigate('NewDetail',
                                    {
                                        type: rowData.CATID,
                                        title: rowData.TOPIC,
                                        image: rowData.FEATURE,
                                        description: rowData.DESCRIPTION,
                                        view: rowData.VIEWS,
                                        date: rowData.DATEIN,
                                        url: rowData.URL
                                    }
                                )}
                            >

                                <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
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

                    onEndReached={() =>
                        this.fetchMore()}
                    renderFooter={() => {
                        if (this.state.end) {
                            <View />
                        }
                        else {
                            return (
                                this.state.isLoadingMore &&
                                <View style={{ flex: 1, padding: 10 }}>
                                    <ActivityIndicator size="small" />
                                </View>
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
                    positionValue={Platform.OS == 'ios' ? 110 : 130}
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
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: Color.BROWN[600],
    },
    logo: {
        height: 110,
        width: 150,
    },
    bannerfont: {
        fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.065,
        paddingTop: Platform.OS === 'ios' ? 45 : 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
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
    },
});
