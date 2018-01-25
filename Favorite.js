import React, { Component, cloneElement } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';

import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';
import * as utils from './Util'

const { width, height } = Dimensions.get("window");

export default class Favorite extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <MaterialIcons
                    name="star"
                    size={20}
                    color='#edad35'
                    style={{
                        top: 3
                    }}
                />
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 9 : 5,
                }}> ข่าวโปรด
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
        this.state = {
            isLoading: true,
            d: [],
            delete: null
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('fav').then((data) => {
            //console.log(data)
            if (!data || data == '{}') {
                this.setState({isLoading: false})
                return
            }
            const items = JSON.parse(data)
            let datatemp = []
            Object.keys(items).forEach((key) => {
                let url = 'https://www.hatyaifocus.com/rest/api.php?action=' + items[key][0] + '&cat=&ID=' + items[key][1]
                fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //console.log(responseJson)
                        datatemp.push(responseJson)
                        if (datatemp.length == Object.keys(items).length) {
                            this.setState({
                                isLoading: false,
                                d: datatemp
                            })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
        })
        //AsyncStorage.removeItem('favorite')
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>

                    <ActivityIndicator
                        style={{ paddingTop: 20 }}
                        color='#cc9966' />
                </View>
            );
        }

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>

                {this.state.d.length == 0 ?
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 18,
                        top: 15,
                        color: 'white'
                    }}>
                        --- ไม่มีข่าวโปรด ---
                    </Text> :

                    <FlatList
                        data={this.state.d}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) =>

                            <View style={styles.flatlist}>
                                <Swipeout
                                    autoClose={true}
                                    onOpen={() => this.setState({
                                        delete: item["0"].ID
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
                                            },
                                            text: 'Delete', type: 'delete'
                                        }]
                                    }

                                >
                                    {item ?
                                        <TouchableOpacity
                                            key={item[0].id}
                                            onPress={() => navigate('NewDetail',
                                                {
                                                    type: item[0].CATID,
                                                    title: item[0].TOPIC,
                                                    image: item[0].FEATURE,
                                                    description: item[0].DESCRIPTION,
                                                    view: item[0].VIEWS,
                                                    date: item[0].DATEIN,
                                                    url: item[0].URL
                                                }
                                            )}
                                        >
                                            <View style={{ paddingBottom: 5 }}>
                                                <Text style={styles.titleText}> {item[0].TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                                            </View>
                                            <Image source={{ uri: item[0].FEATURE }}
                                                style={{
                                                    width: width - 10,
                                                    height: (width - 10) * 0.625,
                                                    borderRadius: 10,
                                                }}
                                            />
                                            <View style={{ paddingTop: 5 }}>
                                                <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    flatlist: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 20,
    },
    titleText: {
        fontSize: 18,
        paddingTop: 10,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',

    },
    moredetail: {
        fontSize: 14,
        paddingTop: 5,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        textDecorationLine: 'underline',
    },
});
