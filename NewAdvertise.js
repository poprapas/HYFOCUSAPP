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
    Dimensions
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

const { width, height } = Dimensions.get("window");

export default class New extends Component {

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
        fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=8&start=' + this.state.start + '&per_page=10')
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
        this.fetchData(responseJson => {
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

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => navigate('Tab')}
                    icontitless={"newspaper-o"}
                    title={'ข่าวประชาสัมพันธ์และการท่องเที่ยว'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                        },
                    ]}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bannerfont}> - ข่าวประชาสัมพันธ์และการท่องเที่ยว - </Text>
                    </View>

                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <View style={styles.listView}>
                        <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
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
                                }
                            )}
                        >
                            <Image source={{ uri: rowData.FEATURE }}
                                style={{
                                    width: width - 10,
                                    height: (width - 10) * 0.625
                                }} />

                            <View>
                                <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
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
        backgroundColor: Color.BROWN[600],
    },
    logo: {
        height: 100,
        width: 150,
    },
    bannerfont: {
        fontSize: Platform.OS === 'ios' ? width * 0.04 : width * 0.035 ,
        paddingTop: 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 2
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
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 10,
    },
});

