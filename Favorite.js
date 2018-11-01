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
    ActivityIndicator,
    Alert
} from 'react-native';

import Color from 'react-native-material-color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Swipeout from 'react-native-swipeout';
import * as utils from './Util'

const { width, height } = Dimensions.get("window");

export default class Favorite extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
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
                }}> บุ๊คมาร์ค
            </Text>
            </View>,
        headerRight:
            <View>
                {navigation.state.params.isEmpty ?
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(
                                'บุ๊คมาร์ค',
                                'ลบข่าวที่บันทึกไว้ทั้งหมด?',
                                [
                                    {
                                        text: 'ยืนยัน', onPress: () => {
                                            utils.clearFavorite()
                                            global.sidemenu.setState({
                                                currentpage: 'หน้าแรก'
                                            })
                                            navigation.navigate('หน้าแรก')
                                        }
                                    },
                                    { text: 'ยกเลิก', onPress: () => null, style: 'cancel' }
                                ]
                            )
                        }
                    >
                        <EvilIcons
                            name="trash"
                            size={30}
                            color={'white'}
                            style={{
                                paddingHorizontal: 10,
                                alignSelf: 'center',
                                marginTop: 2,
                            }}
                        />
                    </TouchableOpacity> : null}
            </View>
        ,
        headerLeft:
            <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
                <Ionicons
                    name="md-menu"
                    size={30}
                    color={'#fff'}
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
            delete: null,
            isMounted: true,
        }
    }

    componentWillUnmount() {
        this.state.isMounted = false
    }

    componentDidMount() {
        AsyncStorage.getItem('fav').then((data) => {
            //console.log(data)
            if (!data || data == '{}') {
                this.setState({ isLoading: false })
                return
            }
            const items = JSON.parse(data)
            let url = 'https://www.hatyaifocus.com/rest/api.php?action=news&ID='
            Object.keys(items).forEach((key) => {
                url += items[key][1] + ','
            })
            url = url.slice(0, -1)
            //console.log(url)
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson)
                    if (this.state.isMounted) {
                        this.setState({
                            isLoading: false,
                            d: responseJson
                        })
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        })
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
                    <View>
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            marginVertical: 15,
                            color: 'white'
                        }}>
                            --- ไม่มีข่าวที่บันทึกไว้ ---
                    </Text>
                        <Image source={require('./assets/images/newspaper.png')}
                            style={{
                                width: 70,
                                height: 70,
                                alignSelf: 'center'
                            }} />
                    </View>
                    :
                    <FlatList
                        data={this.state.d}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) =>

                            <View style={styles.flatlist}>
                                <Swipeout
                                    autoClose={true}
                                    onOpen={() => this.setState({
                                        delete: item.ID
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
                                            key={item.ID}
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
                                            <View style={{ paddingTop: 5 }}>
                                                <Text style={styles.moredetail}> >>> อ่านต่อ >>> </Text>
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
        lineHeight: Platform.OS == 'ios' ? 28 : 35
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
