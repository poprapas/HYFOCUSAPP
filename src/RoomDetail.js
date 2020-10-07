import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, ScrollView, Dimensions, Share, TouchableOpacity, } from 'react-native';

import HTMLView from 'react-native-htmlview';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import MapView from 'react-native-maps';
import DeviceInfo from 'react-native-device-info';
import { WebView } from 'react-native-webview';
import Header from './_Component/header';
import Carousel from 'react-native-looped-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("window");

export default class RoomDetail extends Component {

    componentDidMount() {
        global.ishome = false
    }

    componentWillUnmount() {
        global.ishome = true
    }

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

    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'p' && node.children && node.children["0"] && node.children["0"].children && node.children["0"].children["0"] && node.children["0"].children["0"].name == 'iframe') {
            //console.log(node)
            let a = node.children["0"].children["0"].attribs
            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if (a.src.slice(12, 15) == 'you') {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 25,
                            height: (width - 25) * 0.5625,
                            alignSelf: 'center',
                            marginLeft: -5,
                            backgroundColor: 'transparent'
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: width - 25,
                                height: (width - 25) * 0.5625,
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                )
            }
        }
    }

    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;

        return (

            <View style={styles.container}>
                <Header
                    leftIcon={{
                        icon: 'ios-arrow-back',
                        fn: () => { goBack() }
                    }}
                    centerIcon={require('../assets/images/hotel-icon.png')}
                    text={'ที่พักหาดใหญ่'}
                    rightIcon2={{
                        icon: 'share-2',
                        fn: () => Platform.OS == 'ios' ?
                            fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + this.props.route.params.url)
                                .then((response) => response.text())
                                .then((responseJson) => { Share.share({ url: responseJson, message: 'ที่พัก : ' + this.props.route.params.property }) })
                            :
                            Share.share({ message: decodeURI(this.props.route.params.url) })
                    }}
                />

                <ScrollView style={{ flex: 1 }}>

                    <View style={{ height: DeviceInfo.hasNotch() ? height / 4 : height / 3, }}
                        onLayout={this._onLayoutDidChange}
                    >
                        <Carousel
                            delay={3000}
                            style={this.state.size}
                            autoplay
                            bullets
                            arrows
                            arrowsContainerStyle={{ marginHorizontal: 5 }}
                            leftArrowText={<FontAwesome name='chevron-circle-left' size={40} color='white' />}
                            rightArrowText={<FontAwesome name='chevron-circle-right' size={40} color='white' />}
                        >
                            {this.props.route.params.gallery.map((prop, key) => {
                                return (
                                    <View
                                        key={key.toString()}
                                        style={{
                                            backgroundColor: 'white',
                                            width: width,
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
                        <Text style={styles.property}> {this.props.route.params.property} </Text>

                        <Text style={styles.topic1}>  สถานะ  </Text>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ความเป็นเจ้าของ : </Text>
                            <Text style={styles.detail}>{this.props.route.params.owner} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ประเภท : </Text>
                            <Text style={styles.detail}>{this.props.route.params.type} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ลงประกาศ : </Text>
                            <Text style={styles.for}>{this.props.route.params.for} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ห้องนอน : </Text>
                            <Text style={styles.detail}>{this.props.route.params.bedroom} ห้อง</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ห้องน้ำ : </Text>
                            <Text style={styles.detail}>{this.props.route.params.bathroom} ห้อง</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  เฟอร์นิเจอร์ : </Text>
                            <Text style={styles.detail}>{this.props.route.params.furni} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  สถานะทรัพย์สิน : </Text>
                            <Text style={styles.detail}>{this.props.route.params.status} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  ราคา : </Text>
                            <Text style={styles.price}>{this.props.route.params.price} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic}>  มัดจำ : </Text>
                            <Text style={styles.detail}>{this.props.route.params.deposit == "" ? '-' : this.props.route.params.deposit} </Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic2}>  สิ่งอำนวยความสะดวก : </Text>
                            <View>
                                {this.props.route.params.feature.map((prop, key) => {
                                    return (
                                        <View key={key}>
                                            <Text style={styles.feature}>{this.props.route.params.feature[key]} </Text>
                                        </View>
                                    )
                                })
                                }
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <Text style={styles.topic3}>  การบริการ : </Text>
                            <View>
                                {this.props.route.params.service.map((prop, key) => {
                                    return (
                                        <View key={key}>
                                            <Text style={styles.service}>{this.props.route.params.service[key]} </Text>
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
                                    value={this.props.route.params.descript.replace(/\r\n/g, '').replace(/&nbsp;/g, '')}
                                    renderNode={this.renderNode}
                                    stylesheet={styless}
                                />
                            </View>
                        </View>
                    </View>

                    {this.props.route.params.latitude && this.props.route.params.longitude ?
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end', paddingHorizontal: 10 }}
                                onPress={() =>
                                    Linking.openURL(Platform.OS == 'ios' ? 'http://maps.apple.com/?q=' + parseFloat(this.props.route.params.latitude) + ',' + parseFloat(this.props.route.params.longitude) : 'https://www.google.com/maps/search/?api=1&query=' + parseFloat(this.props.route.params.latitude) + ',' + parseFloat(this.props.route.params.longitude))}
                            >
                                <Text style={{ color: '#1e90ff', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>{Platform.OS == 'ios' ? 'ดูด้วย Maps' : 'ดูด้วย Google Maps'}</Text>
                            </TouchableOpacity>

                            <MapView
                                //provider={PROVIDER_GOOGLE}
                                style={styles.map}
                                initialRegion={{
                                    latitude: parseFloat(this.props.route.params.latitude),
                                    longitude: parseFloat(this.props.route.params.longitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <MapView.Marker coordinate={{
                                    latitude: parseFloat(this.props.route.params.latitude),
                                    longitude: parseFloat(this.props.route.params.longitude),
                                }}
                                />
                            </MapView>

                        </View>
                        : null
                    }

                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end', padding: 10,
                        paddingBottom: 10
                    }}>
                        <Icons
                            name="access-time"
                            size={15}
                            color='black'
                            style={{ paddingTop: Platform.OS == 'ios' ? 1 : 3, paddingRight: 2 }}
                        />
                        <Text style={styles.date}>
                            {this.props.route.params.date}
                        </Text>
                    </View>

                </ScrollView>

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
        textAlign: 'right',
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
        paddingLeft: 10,
    },
    price: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ff0000',
        textAlign: 'left',
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
        width: width - 10,
        alignSelf: 'center',
    },
    for: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#28a428',
        textAlign: 'left',
        paddingLeft: 10,
    },
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