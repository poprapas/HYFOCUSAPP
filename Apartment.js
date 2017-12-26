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
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

const { width, height } = Dimensions.get("window");

export default class Apartment extends Component {

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
        }
    }

    _fetchData(callback) {
        fetch('https://www.hatyaifocus.com/rest/api.php?action=rooms&cat=5&start=' + this.state.start + '&per_page=10')
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
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(data),
                        isLoadingMore: false,
                        _data: data,
                        _dataAfter: responseJson.data,
                        start: this.state.start + 10,
                    });
                }
            });
        }
    }

    componentDidMount() {
        //Start getting the first batch of data from reddit
        this._fetchData(responseJson => {
            let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            });
            const data = responseJson;
            this.setState({
                dataSource: ds.cloneWithRows(data),
                isLoading: false,
                _data: data,
                _dataAfter: responseJson.data,
                start: 10,
            });
        });
    }

    render() {

        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
                    <ActionBar
                        containerStyle={styles.bar}
                        backgroundColor={'black'}
                        leftIconName={'menu'}
                        onLeftPress={() => navigate('Tab')}
                        icontitle={require('./assets/images/hotel-icon.png')}
                        title={'ที่พักหาดใหญ่'}
                        rightIcons={[
                            {
                                name: 'facebook',
                                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                                //onPress: () => navigate('Social'),
                            },
                        ]}
                    />
                    <ActivityIndicator style={{ paddingTop: 20 }} />
                </View>
            );
        }

        return (
            <View style={styles.container}>

                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => navigate('Tab')}
                    icontitle={require('./assets/images/hotel-icon.png')}
                    title={'ที่พักหาดใหญ่'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 3 }}>

                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.roomfont}> --- Apartment --- </Text>
                    </View>

                </View>

                <ListView
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

                                    <View style={{ flex: 0.4 }}>
                                        <Image source={{ uri: rowData.GALLERY[0] }}
                                            style={{
                                                width: 150,
                                                height: 115,
                                            }} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column',
                                        paddingTop: Platform.OS == 'ios' ? 15 : 10,
                                        paddingLeft: 5,
                                        flex: 0.35,
                                    }}
                                    >
                                        <Text numberOfLines = {1} style={styles.titleText}> {rowData.PROPERTY} </Text>
                                        <Text style={styles.titleText2}> ราคา : {rowData.PRICE} </Text>
                                        <Text style={styles.titleText2}> อำเภอ : {rowData.AMPHUR} </Text>
                                        <Text style={styles.titleText2}> จังหวัด  : {rowData.PROVINCE} </Text>
                                    </View>

                                    <View style={{
                                        paddingTop: Platform.OS == 'ios' ? 40 : 25,
                                        flex: 0.15,
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
    logo: {
        height: 100,
        width: 150,
    },
    roomfont: {
        fontSize: width * 0.06,
        paddingTop: 35,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingTop: 2,
        paddingBottom: 2
    },
    titleText: {
        fontSize: 15.5,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 5 : 0,
    },
    titleText2: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: Platform.OS == 'ios' ? 5 : 0,
    },
    more: {
        fontWeight: 'normal',
        fontSize: 50,
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    }
});