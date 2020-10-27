import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, Dimensions, ScrollView, TouchableOpacity, Share, SafeAreaView } from 'react-native';

import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Lightbox from 'react-native-lightbox';
import Header from './_Component/header';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview'

const { width, height } = Dimensions.get("window");

export default class ContentDetail extends Component {

    renderNode(node, index, siblings, parent, defaultRenderer) {
        //console.log(node)
        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Lightbox key={index} underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                    <Image
                        style={{
                            width: width,
                            height: width * a.height / a.width,
                            resizeMode: 'contain',
                            marginVertical: 10,
                        }}
                        source={{
                            uri: node.children[0].attribs.src
                        }}
                    />
                </Lightbox>
            )
        }
        else if ((node.name == 'p' || node.name == 'div') && node.children[0] && (node.children[0].name == 'iframe')) {
            const a = node.children[0].attribs;

            // console.log(a.src, a.src.slice(6, 13))

            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if ((a.src.slice(6, 13) == 'youtube') || (a.src.slice(12, 15) == 'you')) {
                let videoId = a.src.slice(a.src.indexOf('/embed/') + 7)
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(a.src)}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                            marginBottom: 10
                        }}
                    >
                        <Image
                            source={{ uri: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg' }}
                            style={{ width: '100%', height: '100%' }}
                        />
                        <LinearGradient
                            colors={['#fff', 'transparent']}
                            style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}
                            start={{ x: 0.6, y: 0.0 }}
                            end={{ x: 0.1, y: 0.0 }}
                        >
                            <View style={{
                                flexDirection: 'row', alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 15, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>เปิดด้วย Youtube</Text>
                                <Icon color={'red'} size={40} style={{ marginLeft: 13, width: 43, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} name={'youtube'} />
                                <Icon style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} size={40} name={'chevron-right'} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                );
            }
            else if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
                const iframeHtml =
                    `<iframe src="${a.src}" 
                        height="100%", 
                        width="100%", 
                    >
                    </iframe>`;

                let latitude = parseFloat(a.src.slice(a.src.indexOf('!3d') + 3, a.src.indexOf('!2m'))).toFixed(6)
                let longitude = parseFloat(a.src.slice(a.src.indexOf('!2d') + 3, a.src.indexOf('!3d'))).toFixed(6)
                // console.log(a.src, latitude, longitude, 1)

                if (latitude != 'NaN' && longitude != 'NaN') {
                    return (
                        <View key={index}
                            style={{
                                width: width,
                                height: 270,
                                marginLeft: -10,
                                paddingBottom: 10,
                                alignSelf: 'center',
                            }}
                        >
                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => Linking.openURL(Platform.OS == 'ios' ? 'http://maps.apple.com/?q=' + latitude + ',' + longitude : 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)}
                            >
                                <Text style={{ color: '#4da6ff', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>{Platform.OS == 'ios' ? 'ดูด้วย Maps' : 'ดูด้วย Google Maps'}</Text>
                            </TouchableOpacity>
                            <MapView
                                //provider={PROVIDER_GOOGLE}
                                style={{ width, height: width * 9 / 16 }}
                                initialRegion={{
                                    latitude: Number(latitude),
                                    longitude: Number(longitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: Number(latitude),
                                        longitude: Number(longitude),
                                    }}
                                />
                            </MapView>
                        </View>
                    );
                }
            }
            else {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                //width: width,
                                height: a.height <= a.width ? (width * a.height / a.width) - 35 : width * a.height / a.width,
                                //resizeMode: 'contain',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                );
            }
        }
        else if (node.name == 'p' && node.children[1] && node.children[1].name == 'iframe') {
            const a = node.children[1].attribs

            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if ((a.src.slice(6, 13) == 'youtube') || (a.src.slice(12, 15) == 'you')) {
                let videoId = a.src.slice(a.src.indexOf('/embed/') + 7)
                return (
                    <View
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>

                        <TouchableOpacity
                            key={index}
                            onPress={() => Linking.openURL(a.src)}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.5625,
                                alignSelf: 'center',
                                marginBottom: 10
                            }}
                        >
                            <Image
                                source={{ uri: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg' }}
                                style={{ width: '100%', height: '100%' }}
                            />
                            <LinearGradient
                                colors={['#fff', 'transparent']}
                                style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}
                                start={{ x: 0.6, y: 0.0 }}
                                end={{ x: 0.1, y: 0.0 }}
                            >
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: 15, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>เปิดด้วย Youtube</Text>
                                    <Icon color={'red'} size={40} style={{ marginLeft: 13, width: 43, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} name={'youtube'} />
                                    <Icon style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} size={40} name={'chevron-right'} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                );
            }
            else if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
                const iframeHtml =
                    `<iframe src="${a.src}" 
                        height="100%", 
                        width="100%", 
                    >
                    </iframe>`;

                let latitude = parseFloat(a.src.slice(a.src.indexOf('!3d') + 3, a.src.indexOf('!2m'))).toFixed(6)
                let longitude = parseFloat(a.src.slice(a.src.indexOf('!2d') + 3, a.src.indexOf('!3d'))).toFixed(6)
                // console.log(latitude, 2)

                if (latitude != 'NaN' && longitude != 'NaN') {
                    return (
                        <View key={index}
                            style={{
                                width: width,
                                height: 260,
                                marginLeft: -20,
                                paddingBottom: 10,
                                alignSelf: 'center',
                            }}
                        >

                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => Linking.openURL(Platform.OS == 'ios' ? 'http://maps.apple.com/?q=' + latitude + ',' + longitude : 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)}
                            >
                                <Text style={{ color: '#66b3ff', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>{Platform.OS == 'ios' ? 'ดูด้วย Maps' : 'ดูด้วย Google Maps'}</Text>
                            </TouchableOpacity>

                            <MapView
                                //provider={PROVIDER_GOOGLE}
                                style={{ width, height: width * 9 / 16 }}
                                initialRegion={{
                                    latitude: Number(latitude),
                                    longitude: Number(longitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: Number(latitude),
                                        longitude: Number(longitude),
                                    }}
                                />
                            </MapView>
                        </View>
                    );
                }
            }
            else {
                return (
                    <View
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>
                        <WebView
                            key={index}
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                //width: width,
                                height: a.height <= a.width ? (width * a.height / a.width) - 35 : width * a.height / a.width,
                                //resizeMode: 'contain',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                );
            }
        }
        else if ((node.name == 'p' || node.name == 'div') && node.children[0] && node.children[0].name == 'iframe') {
            const a = node.children[0].attribs;

            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if ((a.src.slice(6, 13) == 'youtube') || (a.src.slice(12, 15) == 'you')) {
                let videoId = a.src.slice(a.src.indexOf('/embed/') + 7)
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => Linking.openURL(a.src)}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.5625,
                                alignSelf: 'center',
                                marginBottom: 10
                            }}
                        >
                            <Image
                                source={{ uri: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg' }}
                                style={{ width: '100%', height: '100%' }}
                            />
                            <LinearGradient
                                colors={['#fff', 'transparent']}
                                style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'flex-end' }}
                                start={{ x: 0.6, y: 0.0 }}
                                end={{ x: 0.1, y: 0.0 }}
                            >
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: 15, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }}>เปิดด้วย Youtube</Text>
                                    <Icon color={'red'} size={40} style={{ marginLeft: 13, width: 43, textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} name={'youtube'} />
                                    <Icon style={{ textShadowColor: 'rgba(0, 0, 0, 0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 }} size={40} name={'chevron-right'} />
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                );
            }
            else if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
                const iframeHtml =
                    `<iframe src="${a.src}" 
                        height="100%", 
                        width="100%", 
                    >
                    </iframe>`;

                let latitude = parseFloat(a.src.slice(a.src.indexOf('!3d') + 3, a.src.indexOf('!2m'))).toFixed(6)
                let longitude = parseFloat(a.src.slice(a.src.indexOf('!2d') + 3, a.src.indexOf('!3d'))).toFixed(6)
                // console.log(latitude, 3)

                if (latitude != 'NaN' && longitude != 'NaN') {
                    return (
                        <View key={index}
                            style={{
                                width: width,
                                height: 260,
                                marginLeft: -20,
                                paddingBottom: 10,
                                alignSelf: 'center',
                            }}
                        >

                            <TouchableOpacity
                                style={{ alignSelf: 'flex-end' }}
                                onPress={() => Linking.openURL(Platform.OS == 'ios' ? 'http://maps.apple.com/?q=' + latitude + ',' + longitude : 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)}
                            >
                                <Text style={{ color: '#66b3ff', fontSize: 15, textDecorationLine: 'underline', paddingBottom: 10 }}>{Platform.OS == 'ios' ? 'ดูด้วย Maps' : 'ดูด้วย Google Maps'}</Text>
                            </TouchableOpacity>

                            <MapView
                                //provider={PROVIDER_GOOGLE}
                                style={{ width, height: width * 9 / 16 }}
                                initialRegion={{
                                    latitude: Number(latitude),
                                    longitude: Number(longitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <MapView.Marker
                                    coordinate={{
                                        latitude: Number(latitude),
                                        longitude: Number(longitude),
                                    }}
                                />
                            </MapView>
                        </View>
                    );
                }
            }
            else {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                            backgroundColor: 'transparent'
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                //width: width,
                                height: a.height <= a.width ? (width * a.height / a.width) - 35 : width * a.height / a.width,
                                //resizeMode: 'contain',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </View>
                );
            }
        }
    }

    renderImage(catID) {
        if (catID == 1 || catID == 3 || catID == 4 || catID == 5 || catID == 8) {
            return (
                <Lightbox underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                    {Platform.OS == 'ios' ?
                        <ScrollView
                            minimumZoomScale={1}
                            maximumZoomScale={2}
                            centerContent={true}
                        >
                            <Image source={{ uri: this.props.route.params.image }}
                                style={{
                                    //width: (width - 10),
                                    height: (width - 10) * 0.75,
                                    resizeMode: 'contain'
                                }}
                            />
                        </ScrollView> :
                        <Image source={{ uri: this.props.route.params.image }}
                            style={{
                                //width: (width - 10),
                                height: (width - 10) * 0.75,
                                resizeMode: 'contain'
                            }}
                        />}
                </Lightbox>
            )
        } else if (catID == 2) {
            return (
                <Lightbox underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                    {Platform.OS == 'ios' ?
                        <ScrollView
                            minimumZoomScale={1}
                            maximumZoomScale={2}
                            centerContent={true}
                        >
                            <Image source={{ uri: this.props.route.params.image }}
                                style={{
                                    width: (width - 150) * 0.8,
                                    height: (width - 150),
                                    alignSelf: 'center'
                                }}
                            />
                        </ScrollView> :
                        <Image source={{ uri: this.props.route.params.image }}
                            style={{
                                width: (width - 150) * 0.8,
                                height: (width - 150),
                                alignSelf: 'center',
                            }}
                        />}
                </Lightbox>
            )
        } else if (catID == 7) {
            return (
                <Lightbox underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                    {Platform.OS == 'ios' ?
                        <ScrollView
                            minimumZoomScale={1}
                            maximumZoomScale={2}
                            centerContent={true}
                        >
                            <Image source={{ uri: this.props.route.params.image }}
                                style={{
                                    width: width - 10,
                                    height: (width - 10) * 0.25,
                                    alignSelf: 'center'
                                }}
                            />
                        </ScrollView> :
                        <Image source={{ uri: this.props.route.params.image }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.25,
                                alignSelf: 'center'

                            }}
                        />}
                </Lightbox>
            )
        }
        return null
    }

    componentDidMount() {
        _this = this
        global.ishome = false
    }

    componentWillUnmount() {
        if (this.props.route.params.fromhome) {
            global.ishome = true
        }
    }

    render() {

        const { navigate, goBack } = this.props.navigation;
        let descript = this.props.route.params.description;

        return (

            <View style={styles.container}>

                <Header
                    leftIcon={{
                        icon: 'ios-arrow-back',
                        fn: () => { goBack() }
                    }}
                    centerIcon={this.props.route.params.cat == 1 ? require('../assets/images/story-icon.png') :
                        this.props.route.params.cat == 2 ? require('../assets/images/people-icon.png') :
                            this.props.route.params.cat == 3 ? require('../assets/images/eat-icon.png') :
                                this.props.route.params.cat == 8 ? require('../assets/images/travel-icon.png') : null}
                    centerIcon3={this.props.route.params.cat == 4 ? 'play-video' :
                        this.props.route.params.cat == 7 ? 'megaphone' : null}
                    centerIcon4={this.props.route.params.cat == 5 ? 'rate-review' : null}
                    text={this.props.route.params.topic}
                    rightIcon2={{
                        icon: 'share-2',
                        fn: () => Share.share({ message: decodeURI(this.props.route.params.url) })
                    }}
                />

                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <Text style={styles.title}>{this.props.route.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>

                    {this.renderImage.bind(this)(this.props.route.params.cat)}

                    <Text />

                    <HTMLView
                        value={descript.replace(/\r\n/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                        renderNode={this.renderNode}
                        stylesheet={styless}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingTop: this.props.route.params.cat == 3 ? 0 : 30,
                        paddingRight: 5
                    }}>
                        <Icon
                            name="eye"
                            size={15}
                            color='white'
                            style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                        />
                        <Text style={styles.view}>
                            {this.props.route.params.view}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10, paddingRight: 5 }}>
                        <Icons
                            name="access-time"
                            size={15}
                            color='white'
                            style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                        />
                        <Text style={styles.view}>
                            {this.props.route.params.date}
                        </Text>
                    </View>
                    <SafeAreaView style={{ flex: 1, backgroundColor: Color.BROWN[500] }} />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[500],
    },
    logo: {
        height: 110,
        width: 150,
    },
    storyfont: {
        fontSize: width * 0.07,
        paddingTop: Platform.OS === 'ios' ? 45 : 40,
        alignSelf: 'center',
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 10,
        lineHeight: 32,
    },
    view: {
        fontSize: 14,
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    },
});

const styless = StyleSheet.create({
    p: {
        fontSize: 18,
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        paddingHorizontal: 5,
    },
    a: {
        fontSize: 18,
        color: '#ffd633',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        textDecorationLine: 'underline'
    },
    br: {
        height: 2
    },
});