import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ScrollView,
    Dimensions,
    Share,
    TouchableOpacity
} from 'react-native';

import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-looped-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get("window");

export default class RoomDetail extends Component {

    componentDidMount() {
        global.ishome = false
    }

    componentWillUnmount() {
        global.ishome = true
    }

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
            <TouchableOpacity onPress={() => Platform.OS == 'ios' ?
                fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + navigation.state.params.url)
                    .then((response) => response.text())
                    .then((responseJson) => { Share.share({ url: responseJson, message: 'ที่พัก : ' + navigation.state.params.property }) })
                :
                Share.share({ message: decodeURI(navigation.state.params.url) })}>
                <Feather
                    name="share-2"
                    size={20}
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

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    constructor(props) {
        super(props);
        this.state = {
            size: { width, height },
        }
    }

    render() {

        const { navigate, goBack } = this.props.navigation;

        return (

            <View style={styles.container}>
                <View style={styles.listView}>
                    <ScrollView style={{
                        height: height - 50,
                        width: "100%",
                    }}>

                        <View style={{ height: height / 4 }}
                            onLayout={this._onLayoutDidChange}
                        >
                            <Carousel
                                autoplay
                                delay={5000}
                                style={this.state.size}
                                bullets
                                bulletStyle={{
                                    margin: 3
                                }}
                                chosenBulletStyle={{
                                    margin: 3
                                }}
                                arrows
                                arrowsContainerStyle={{
                                    marginLeft: 5,
                                    marginRight: 5,
                                }}
                                leftArrowText={<FontAwesome name='chevron-circle-left' size={40} color='white' />}
                                rightArrowText={<FontAwesome name='chevron-circle-right' size={40} color='white' />}
                            >

                                {this.props.navigation.state.params.gallery.map((prop, key) => {
                                    return (
                                        <View
                                            key={key.toString()}
                                            style={{
                                                backgroundColor: 'white',
                                                width: width
                                            }}>
                                            <Image
                                                source={{ uri: prop }}
                                                style={styles.gallery}
                                            />
                                        </View>
                                    )
                                })}

                            </Carousel>
                        </View>

                        <View style={{ padding: 10 }}>
                            <Text style={styles.property}> {this.props.navigation.state.params.property} </Text>

                            <Text style={styles.topic1}>  สถานะ  </Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ความเป็นเจ้าของ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.owner} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ประเภท : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.type} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ห้องนอน : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.bedroom} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ห้องน้ำ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.bathroom} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  เฟอร์นิเจอร์ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.furni} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  สถานะทรัพย์สิน : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.status} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ราคา : </Text>
                                <Text style={styles.price}>{this.props.navigation.state.params.price} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  มัดจำ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.deposit == "" ? '-' : this.props.navigation.state.params.deposit} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic2}>  สิ่งอำนวยความสะดวก : </Text>
                                <View>
                                    {this.props.navigation.state.params.feature.map((prop, key) => {
                                        return (
                                            <View key={key}>
                                                <Text style={styles.feature}>{this.props.navigation.state.params.feature[key]} </Text>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic3}>  การบริการ : </Text>
                                <View>
                                    {this.props.navigation.state.params.service.map((prop, key) => {
                                        return (
                                            <View key={key}>
                                                <Text style={styles.service}>{this.props.navigation.state.params.service[key]} </Text>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                            </View>

                            <View style={{ marginTop: 5, }}>
                                <Text style={styles.topic2}>  รายละเอียดเพิ่มเติม : </Text>
                                <View style={{ paddingLeft: 4, marginTop: 10 }}>
                                    <HTMLView
                                        value={this.props.navigation.state.params.descript.replace(/\r\n/g, '').replace(/&nbsp;/g, '')}
                                        stylesheet={styless}
                                    />
                                </View>
                            </View>

                            {this.props.navigation.state.params.latitude ?
                                <View>
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end' }}
                                        onPress={() => 
                                            Linking.openURL(Platform.OS == 'ios' ? 'http://maps.apple.com/?q=' + parseFloat(this.props.navigation.state.params.latitude)+ ',' + parseFloat(this.props.navigation.state.params.longitude) : 'https://www.google.com/maps/search/?api=1&query=' + parseFloat(this.props.navigation.state.params.latitude) + ',' + parseFloat(this.props.navigation.state.params.longitude))}
                                    >
                                        <Text style={{ color: '#1e90ff', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>{Platform.OS == 'ios' ? 'ดูด้วย Maps' : 'ดูด้วย Google Maps'}</Text>
                                    </TouchableOpacity>

                                    <MapView
                                        provider={PROVIDER_GOOGLE}
                                        style={styles.map}
                                        initialRegion={{
                                            latitude: parseFloat(this.props.navigation.state.params.latitude),
                                            longitude: parseFloat(this.props.navigation.state.params.longitude),
                                            latitudeDelta: 0.01,
                                            longitudeDelta: 0.01,
                                        }}
                                    >
                                        <MapView.Marker coordinate={{
                                            latitude: parseFloat(this.props.navigation.state.params.latitude),
                                            longitude: parseFloat(this.props.navigation.state.params.longitude),
                                        }}
                                        />
                                    </MapView>
                                </View>
                                : null
                            }

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20, paddingTop: 10 }}>
                                <Icons
                                    name="access-time"
                                    size={15}
                                    color='black'
                                    style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                                />
                                <Text style={[styles.view, { paddingBottom: DeviceInfo.getModel() == 'iPhone X' ? 25 : 0 }]}>
                                    {this.props.navigation.state.params.date}
                                </Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        ...StyleSheet.absoluteFillObject,
    },
    logo: {
        height: 100,
        width: 150,
    },
    listView: {
        width: width,
    },
    property: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    topic1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        paddingTop: 10
    },
    topic: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 140,
    },
    topic2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 180,
    },
    topic3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 100,
    },
    detail: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        width: width - 120,
        paddingLeft: 10,
    },
    price: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ff0000',
        textAlign: 'left',
        width: width - 140,
        paddingLeft: 10,
    },
    date: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'right',
        paddingLeft: 3,
    },
    gallery: {
        height: width * 0.62375,
        width: width,
        resizeMode: 'cover'
    },
    feature: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5,
    },
    service: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5,
    },
    map: {
        height: 200,
        width: width,
    }
});

const styless = StyleSheet.create({
    p: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5,
        marginBottom: Platform.OS === 'ios' ? -20 : -10,
    }
});