import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    ListView,
    Linking,
    ScrollView,
    Dimensions,
    WebView,
    FlatList,
    PixelRatio,
    Share,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';
import DeviceInfo from 'react-native-device-info';
import Lightbox from 'react-native-lightbox';
//import WebViews from 'react-native-android-fullscreen-webview-video';

const { width, height } = Dimensions.get("window");
let ref = null

export default class NewDetail extends Component {

    componentDidMount() {
        global.ishome = false
    }

    componentWillUnmount() {
        if (this.props.navigation.state.params.fromhome) {
            global.ishome = true
        }
    }

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
                    paddingTop: Platform.OS == 'ios' ? 8 : 5,
                }}> {navigation.state.params.type}
                </Text>
            </View>,
        headerTitleStyle: {
            alignSelf: 'center',
        },
        headerRight:
            <TouchableOpacity onPress={() =>
                Platform.OS == 'ios' ?
                    fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + navigation.state.params.url)
                        .then((response) => response.text())
                        .then((responseJson) => { Share.share({ url: responseJson, message: navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'") }) })
                    : Share.share({ message: decodeURI(navigation.state.params.url) })}>
                <Feather
                    name="share-2"
                    size={20}
                    color='white'
                    style={{
                        paddingHorizontal: 10
                    }}
                />
            </TouchableOpacity>
        ,
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

    renderNode(node, index, siblings, parent, defaultRenderer) {
        //console.log(node)
        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Lightbox key={index} underlayColor={'transparent'} swipeToDismiss={false}>
                    <Image
                        style={{
                            width: width,
                            height: width * a.height / a.width,
                            resizeMode: 'contain',
                            marginVertical: 10,
                        }}
                        source={{
                            uri: a.src
                        }}
                    />
                </Lightbox>
            )
        }
        else if ((node.name == 'p' || node.name == 'div') && node.children[0].name == 'iframe') {
            if (node.children[0].attribs.src.slice(0, 2) == '//') {
                node.children[0].attribs.src = 'https:' + node.children[0].attribs.src
            };
            if (node.children[0].attribs.src.slice(12, 15) == 'you') {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: node.children[0].attribs.src
                            }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.5625,
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                )
            }
            else {
                const a = node.children[0].attribs;
                console.log(a)
                return (
                    // Platform.OS == 'ios' ?
                    <View
                        key={index}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            width: a.height <= a.width ? width - 10 : width - 30,
                            height:
                                a.height <= a.width ? ((width - 10) * a.height / a.width) :
                                    // a.width <= '270' && a.height == '476' ? (width - 30) * a.width / a.height :    // bug video facebook
                                    (width - 30) * a.height / a.width

                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: a.height <= a.width ? width - 10 : width - 30,
                                height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 30) * a.height / a.width,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                    // <View
                    //     key={index}
                    //     style={{
                    //         alignSelf: 'center',
                    //         backgroundColor: 'transparent',
                    //         width: a.height <= a.width ? width - 10 : width - 30,
                    //         height:
                    //             a.width == '264' && a.height == '476' ? (width - 30) * width / height :
                    //                 a.width == '500' && a.height == '600' ? (width - 30) * height / width :
                    //                     a.height <= a.width ? ((width - 10) * a.height / a.width) :
                    //                         (width - 30) * a.height / a.width
                    //     }}>
                    //     <WebViews
                    //         source={{ uri: a.src }}
                    //     />
                    // </View>
                );
            }
        }

        else if (node.name == 'p' && node.children[1] && node.children[1].name == 'iframe') {
            const a = node.children[1].attribs
            let latitude = parseFloat(a.src.slice(a.src.indexOf('!1d') + 3, a.src.indexOf('!2d'))).toFixed(6)
            let longitude = parseFloat(a.src.slice(a.src.indexOf('!2d') + 3, a.src.indexOf('!3d'))).toFixed(6)

            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
                const iframeHtml =
                    `<iframe src="${a.src}" 
                        height= 220, 
                        width= ${width - 10}, 
                    >
                    </iframe>`;
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

                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{ html: iframeHtml }}
                            style={{
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                );
            }
            else if (a.src.slice(12, 15) == 'you') {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.5625,
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                );
            }
            else {
                console.log(a)
                return (
                    <View
                        key={index}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 30) * a.height / a.width
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: a.height <= a.width ? width - 10 : width - 30,
                                height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 30) * a.height / a.width,
                            }}
                        />
                    </View>
                );
            }
        }
        else if (node.name == 'p' && node.children[2] && node.children[2].name == 'iframe') {
            const a = node.children[2].attribs
            let latitude = parseFloat(a.src.slice(a.src.indexOf('!1d') + 3, a.src.indexOf('!2d'))).toFixed(6)
            let longitude = parseFloat(a.src.slice(a.src.indexOf('!2d') + 3, a.src.indexOf('!3d'))).toFixed(6)

            if (a.src.slice(0, 2) == '//') {
                a.src = 'https:' + a.src
            };
            if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
                const iframeHtml =
                    `<iframe src="${a.src}" 
                        height= 220, 
                        width= ${width - 10}, 
                    >
                    </iframe>`;
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

                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{ html: iframeHtml }}
                            style={{
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                );
            }
            else if (a.src.slice(12, 15) == 'you') {
                return (
                    <View
                        key={index}
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.5625,
                                alignSelf: 'center',
                            }}
                        />
                    </View>
                );
            }
            else {
                console.log(a)
                return (
                    <View
                        key={index}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 30) * a.height / a.width
                        }}>
                        <WebView
                            bounces={false}
                            scrollEnabled={false}
                            source={{
                                uri: a.src
                            }}
                            style={{
                                width: a.height <= a.width ? width - 10 : width - 30,
                                height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 30) * a.height / a.width,
                            }}
                        />
                    </View>
                );
            }
        }
        // else if (node.name == 'br' && node.children[0] && node.children[0].name == 'iframe' ) {
        //     const a = node.children[0].attribs
        //     return (
        //         <View
        //             key={index}
        //             style={{
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 alignSelf: 'center',
        //                 backgroundColor: 'transparent',
        //                 width: width - 10,
        //                 height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 100) * a.height / a.width
        //             }}>
        //             <WebView
        //                 bounces={false}
        //                 scrollEnabled={false}
        //                 source={{
        //                     uri: a.src
        //                 }}
        //                 style={{
        //                     width: a.height <= a.width ? width - 10 : width - 100,
        //                     height: a.height <= a.width ? ((width - 10) * a.height / a.width) : (width - 100) * a.height / a.width,
        //                 }}
        //             />
        //         </View>
        //     )
        // }
        else if (node.name == 'br') {
            return null
        }

        else if (node.name == 'ol' && node.children["0"].name == 'li' && node.children["0"].children[2] && node.children["0"].children[2].children["0"].name == 'img') {

            const a = node.children["0"].children[2].children["0"].attribs;
            return (
                <View key={index}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'normal',
                            color: 'white',
                            textAlign: 'left',
                            fontFamily: 'Times New Roman',
                            paddingHorizontal: 5
                        }}>
                        {node.attribs.start}. {(node.children["0"].children["0"].children["0"].data).replace(/&ndash;/g, '').replace(/&nbsp;/g, '')}
                    </Text>
                    <Image
                        style={{
                            width: width - 20,
                            height: (width - 20) * a.height / a.width,
                            resizeMode: 'contain',
                            marginVertical: 10,
                        }}
                        source={{
                            uri: a.src
                        }}
                    />
                </View>
            )
        }

        else if (node.name == 'ol' && node.children["0"].name == 'li') {
            //console.log(node.children["0"].children[2])
            return (
                <Text
                    key={index}
                    style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: 'white',
                        textAlign: 'left',
                        fontFamily: 'Times New Roman',
                        paddingHorizontal: 5
                    }}
                >
                    {node.attribs.start}. {(node.children["0"].children["0"].children["0"].data).replace(/&ndash;/g, '').replace(/&nbsp;/g, '')}
                </Text>
            )
        }

        else if (node.name == 'p' && node.parent && node.parent.name == 'div') {
            //console.log('>>', node)
            let text = ''
            node.children.map(data => {
                //console.log('))))', data)
                if (data.data) {
                    text = text + data.data + ' '
                }
                else {
                    text = text + data.children["0"].data + ' '
                }
            })
            text = text.replace(/&quot;/g, '\"')
            //console.log(text)
            return (
                <Text
                    key={index}
                    style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: 'white',
                    }}
                >
                    {text}
                </Text>
            )
        }

        // else if(node.name == 'strong' && node.parent && node.parent.name == 'p' && node.parent.parent && node.parent.parent.name == 'div'){
        //     console.log('+++++',node.children)
        //     return null
        // }

    }

    render() {

        const { navigate } = this.props.navigation;
        let descript = this.props.navigation.state.params.description;

        return (
            <View style={styles.container}>
                <View style={styles.listView}>
                    <ScrollView style={{
                        height: Platform.OS == 'ios' ? height - 70 : height - 80,
                        width: "100%"
                    }}>
                        <Text style={styles.title}> {this.props.navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                        <Lightbox underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                            {Platform.OS == 'ios' ?
                                <ScrollView
                                    minimumZoomScale={1}
                                    maximumZoomScale={2}
                                    centerContent={true}
                                >
                                    <Image source={{ uri: this.props.navigation.state.params.image }}
                                        style={{
                                            height: (width - 10) * 0.625,
                                            resizeMode: 'contain'
                                        }} />
                                </ScrollView> :
                                <Image source={{ uri: this.props.navigation.state.params.image }}
                                    style={{
                                        height: (width - 10) * 0.625,
                                        resizeMode: 'contain'
                                    }} />}
                        </Lightbox>
                        <Text />
                        <HTMLView
                            value={descript.replace(/\r\n\t/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                            renderNode={this.renderNode}
                            stylesheet={styless}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 40 }}>
                            <Icon
                                name="eye"
                                size={15}
                                color='white'
                                style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                            />
                            <Text style={styles.view}>
                                {this.props.navigation.state.params.view}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Icons
                                name="access-time"
                                size={15}
                                color='white'
                                style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                            />
                            <Text style={[styles.view, { paddingBottom: DeviceInfo.getModel() == 'iPhone X' ? 40 : 0 }]}>
                                {this.props.navigation.state.params.date}
                            </Text>
                        </View>

                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: Color.BROWN[500],
    },
    logo: {
        height: 100,
        width: 150,
    },
    listView: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingBottom: 20,
        paddingTop: 20,
        lineHeight: Platform.OS == 'ios' ? 32 : 42
    },
    view: {
        fontSize: 14,
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    },
    star: {
        fontSize: 16,
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    }
});

const styless = StyleSheet.create({
    p: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Times New Roman',
        paddingHorizontal: 5,
        // lineHeight: 28,
        // marginBottom: Platform.OS == 'ios' ? -35 : -25,
    },
    a: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#ffd633',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        textDecorationLine: 'underline',
    },
    br: {
        height: 2
    },
});