import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    ListView,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import Color from 'react-native-material-color';
import ActionBar from 'react-native-action-bar';

const { width, height } = Dimensions.get("window");

export default class Video extends Component {

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
        fetch('https://www.hatyaifocus.com/rest/api.php?action=content&cat=4&start=' + this.state.start + '&per_page=10')
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

        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
                    <ActionBar
                        containerStyle={styles.bar}
                        backgroundColor={'black'}
                        leftIconName={'menu'}
                        onLeftPress={() => navigate('Tab')}
                        icontitles={"play-video"}
                        title={'วิดีโอ'}
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
                    icontitles={"play-video"}
                    title={'วิดีโอ'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => navigate('Tab')}>
                        <Image source={require('./assets/images/banner.png')}
                            style={styles.logo} />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.videofont}> ---- Video ---- </Text>
                    </View>
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <View style={styles.listView}>
                        <View style={{ paddingBottom: 5 }}>
                            <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                        </View>
                        <TouchableOpacity
                            key={rowData.id}
                            onPress={() => navigate('TravelDetail',
                                {
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
                                }}
                            />
                            <View style={{ paddingTop: 5 }}>
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
        backgroundColor: Color.BROWN[800],
    },
    logo: {
        height: 100,
        width: 150,
    },
    videofont: {
        fontSize: width * 0.07,
        paddingTop: Platform.OS === 'ios' ? 40 : 35,
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