import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, ScrollView, Dimensions, Share, TouchableOpacity, SafeAreaView } from 'react-native';

import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Lightbox from 'react-native-lightbox';
import Header from './_Component/header';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get("window");

export default class NewDetail extends Component {

    componentDidMount() {
        global.ishome = false
    }

    componentWillUnmount() {
        if (this.props.route.params.fromhome) {
            global.ishome = true
        }
    }

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
                    <View
                        key={index}
                        style={{
                            alignSelf: 'center',
                            backgroundColor: 'transparent',
                            width: a.height <= a.width ? width - 10 : width - 30,
                            height:
                                a.height <= a.width ? ((width - 10) * a.height / a.width) :
                                    (width - 30) * a.height / a.width

                        }}>
                        {console.log(a.src)}
                        <WebView
                            bounces={false}
                            useWebKit={true}
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
                        height="100%", 
                        width="100%" 
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
                        height="100%", 
                        width="100%", 
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
    }

    render() {

        const { navigate, goBack, toggleDrawer } = this.props.navigation;
        let descript = this.props.route.params.description;

        return (
            <View style={styles.container}>
                <Header
                    leftIcon={{
                        icon: 'ios-arrow-back',
                        fn: () => { goBack() }
                    }}
                    centerIcon2={'newspaper-o'}
                    text={this.props.route.params.type}
                    rightIcon2={{
                        icon: 'share-2',
                        fn: () => Platform.OS == 'ios' ?
                            fetch('http://api.bit.ly/v3/shorten?format=txt&login=hatyaiapp&apiKey=R_c8544f5f3e8241f39f1dbe59bee0027a&longUrl=' + this.props.route.params.url)
                                .then((response) => response.text())
                                .then((responseJson) => { Share.share({ url: responseJson, message: this.props.route.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'") }) })
                            : Share.share({ message: decodeURI(this.props.route.params.url) })
                    }}
                />

                <ScrollView style={{ flex: 1 }}>
                    <Text style={styles.title}>{this.props.route.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                    <Lightbox underlayColor={Color.BROWN[500]} swipeToDismiss={false}>
                        {Platform.OS == 'ios' ?
                            <ScrollView
                                minimumZoomScale={1}
                                maximumZoomScale={2}
                                centerContent={true}
                            >
                                <Image source={{ uri: this.props.route.params.image }}
                                    style={{
                                        height: (width - 10) * 0.625,
                                        resizeMode: 'contain',
                                    }} />
                            </ScrollView> :
                            <Image source={{ uri: this.props.route.params.image }}
                                style={{
                                    height: (width - 10) * 0.625,
                                    resizeMode: 'contain',
                                }} />}
                    </Lightbox>
                    <Text />
                    <HTMLView
                        value={descript.replace(/\r\n\t/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                        renderNode={this.renderNode}
                        stylesheet={styless}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 20, paddingRight: 5 }}>
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
        height: 100,
        width: 150,
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 20,
        lineHeight: 32
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