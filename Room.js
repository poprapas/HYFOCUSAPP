import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ListView,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Color from 'react-native-material-color';
import Button from 'react-native-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

export default class Room extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image
                    source={require('./assets/images/hotel-icon.png')}
                    style={{
                        width: 25,
                        height: 25,
                        top: Platform.OS == 'ios' ? 0 : 3,
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 9 : 5,
                }}> ที่พักหาดใหญ่
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
            page: 'all',
            isMounted: true
        }
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        })
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
                _data: null,
                _dataAfter: "",
                start: 0,
                end: false,
                refreshing: false,
                page: page
            }, this.componentDidMount)
        }
    }

    render() {

        const { navigate } = this.props.navigation;

        if (this.state.isLoading || this.state.refreshing) {
            return (
                <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
                    <ActivityIndicator
                        style={{ paddingTop: 20 }}
                        color='#cc9966' />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor={'transparent'}
                        />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={styles.listView}>
                            <TouchableOpacity
                                key={rowData.id}
                                onPress={() => navigate('RoomDetail',
                                    {
                                        for: rowData.FOR,
                                        property: rowData.PROPERTY,
                                        price: rowData.PRICE,
                                        deposit: rowData.DEPOSIT,
                                        owner: rowData.OWNER,
                                        type: rowData.TYPE,
                                        status: rowData.STATUS,
                                        provice: rowData.PROVINCE,
                                        amphur: rowData.AMPHUR,
                                        bedroom: rowData.BEDROOMS,
                                        bathroom: rowData.BATHROOMS,
                                        feature: rowData.FEATURE,
                                        service: rowData.SERVICES,
                                        furni: rowData.FURNISHED,
                                        descript: rowData.DESCRIPTION,
                                        latitude: rowData.LATITUDE,
                                        longitude: rowData.LONGITUDE,
                                        date: rowData.DATE,
                                        gallery: rowData.GALLERY,
                                        url: rowData.URL
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

                                    <View style={{ flex: 5, paddingLeft: 5 }}>
                                        <Image source={{ uri: rowData.GALLERY[0] }}
                                            style={{
                                                height: 115,
                                                resizeMode: 'cover',
                                                //backgroundColor: '#6a5750',
                                                borderRadius: 10
                                            }} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column',
                                        paddingTop: 12,
                                        paddingLeft: 5,
                                        flex: 4,
                                    }}
                                    >
                                        <Text numberOfLines={1} style={styles.titleText}> {rowData.PROPERTY} </Text>
                                        <Text style={styles.titleText2}> ราคา : {rowData.PRICE} </Text>
                                        <Text style={styles.titleText2}> อำเภอ : {rowData.AMPHUR} </Text>
                                        <Text style={styles.titleText2}> จังหวัด  : {rowData.PROVINCE} </Text>
                                    </View>

                                    <View style={{
                                        paddingTop: Platform.OS == 'ios' ? 45 : 25,
                                        flex: 1,
                                    }}>

                                        <Text style={styles.more}> > </Text>
                                    </View>

                                </View>
                            </TouchableOpacity>

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

                <View style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 5,
                    justifyContent: 'space-around'
                }}>
                    <Button
                        containerStyle={styles.selectbutton}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => this.gotoOtherpage('all')}>
                        All
                    </Button>

                    <Button
                        containerStyle={styles.selectbutton}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => this.gotoOtherpage('hotel')}>
                        Hotel
                    </Button>

                    <Button
                        containerStyle={styles.selectbutton}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => this.gotoOtherpage('apartment')}>
                        Apartment
                    </Button>

                    <Button
                        containerStyle={styles.selectbutton}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => this.gotoOtherpage('resort')}>
                        Resort
                    </Button>

                    <Button
                        containerStyle={styles.selectbutton}
                        disabledContainerStyle={{ backgroundColor: 'grey' }}
                        style={styles.button}
                        onPress={() => this.gotoOtherpage('guesthouse')}>
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
    logo: {
        height: 110,
        width: 150,
    },
    roomfont: {
        fontSize: width * 0.065,
        paddingTop: Platform.OS === 'ios' ? 48 : 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingTop: 2,
        paddingBottom: 2
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 8 : 0,
    },
    titleText2: {
        fontSize: 15,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 8 : 0,
    },
    more: {
        fontWeight: 'normal',
        fontSize: 40,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        color: '#696969'
    },
    button: {
        fontSize: Platform.OS == 'ios' ? width / 30 : width / 40,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        padding: 5,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        marginTop: Platform.OS == 'ios' ? 5 : 2,
    },
    selectbutton: {
        height: 30,
        overflow: 'hidden',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#30231d',
        backgroundColor: '#795548',
        width: Platform.OS == 'ios' ? width / 5.3 : width / 5.5
    },
});