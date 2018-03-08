import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Linking,
    ListView,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Share,
    WebView
} from 'react-native';

import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import DeviceInfo from 'react-native-device-info';

const { width, height } = Dimensions.get("window");
let _this = null

export default class ContentDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle:
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {navigation.state.params.cat == 1 ?
                    <Image
                        source={require('./assets/images/story-icon.png')}
                        style={{
                            width: 25,
                            height: 25,
                            top: Platform.OS == 'ios' ? 0 : 3,
                        }}
                    /> :
                    navigation.state.params.cat == 2 ?
                        <Image
                            source={require('./assets/images/people-icon.png')}
                            style={{
                                width: 25,
                                height: 25,
                                top: Platform.OS == 'ios' ? 0 : 3,
                            }}
                        />
                        :
                        navigation.state.params.cat == 3 ?
                            <Image
                                source={require('./assets/images/eat-icon.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                    top: Platform.OS == 'ios' ? 0 : 3,
                                }}
                            />
                            :
                            navigation.state.params.cat == 4 ?
                                <Foundation
                                    name="play-video"
                                    size={20}
                                    color='white'
                                    style={{
                                        top: 5
                                    }}
                                />
                                :
                                navigation.state.params.cat == 5 ?
                                    <Icons
                                        name="rate-review"
                                        size={20}
                                        color='white'
                                        style={{
                                            top: 5
                                        }}
                                    />
                                    :
                                    navigation.state.params.cat == 7 ?
                                        <Foundation
                                            name="megaphone"
                                            size={20}
                                            color='white'
                                            style={{
                                                top: 5
                                            }}
                                        />
                                        :
                                        navigation.state.params.cat == 8 ?
                                            <Image
                                                source={require('./assets/images/travel-icon.png')}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    top: Platform.OS == 'ios' ? 0 : 3,
                                                }}
                                            />
                                            : null
                }
                <Text style={{
                    textAlign: 'center',
                    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
                    fontSize: Platform.OS == 'ios' ? 18 : 15,
                    color: 'white',
                    paddingTop: Platform.OS == 'ios' ? 9 : 5,
                }}> {navigation.state.params.topic}
                </Text>
            </View>,
        headerTitleStyle: {
            alignSelf: 'center',
        },
        headerRight:
            <TouchableOpacity onPress={() => Platform.OS == 'ios' ?
                Share.share({ url: navigation.state.params.url })
                :
                Share.share({ message: navigation.state.params.url })}>
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

    renderNode(node, index, siblings, parent, defaultRenderer) {
        //console.log(node)
        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Image
                    key={index}
                    style={{
                        width: width,
                        height: width * a.height / a.width,
                        resizeMode: 'contain',
                        marginVertical: 10
                    }}
                    source={{
                        uri: node.children[0].attribs.src
                    }}
                />
            )
        }
<<<<<<< HEAD

=======
>>>>>>> 9763b2739a573d06343f7930ae5d7cefa9b80d1e
        else if ((node.name == 'p' || node.name == 'div')  && node.children[0] && node.children[0].name == 'iframe') {
            const a = node.children[0].attribs;
            //console.log(a)
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
                            height: 230,
                            marginLeft: -20,
                            paddingBottom: 10,
                            alignSelf: 'center',
                        }}
                    >
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
                    <WebView
                        key={index}
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
                );
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
            //console.log(node.name == 'p' && node.children[1] && node.children[1].name == 'iframe')
            const a = node.children[1].attribs
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
                            height: 230,
                            marginLeft: -20,
                            paddingBottom: 10,
                            alignSelf: 'center',
                        }}
                    >
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
                //console.log(a.src)
                return (
                    <View
                        style={{
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}>
                        <WebView
                            key={index}
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
            //console.log((node.name == 'p' || node.name == 'div') && node.children[0] && node.children[0].name == 'iframe')
            const a = node.children[0].attribs;
            //console.log(a)
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
                            height: 230,
                            marginLeft: -20,
                            paddingBottom: 10,
                            alignSelf: 'center',
                        }}
                    >
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
        // else if ((node.name == 'p' || node.name == 'div') && node.children[0] && node.children[0].name == 'iframe') {
        // console.log(node)
        //     const a = node.children[0].attribs;
        //     if (a.src.slice(0, 2) == '//') {
        //         a.src = 'https:' + a.src
        //     };
        //     if (a.src.slice(0, 27) == 'https://www.google.com/maps') {
        //         const iframeHtml =
        //             `<iframe src="${a.src}" 
        //                 height= 220, 
        //                 width= ${width - 10}, 
        //             >
        //             </iframe>`;
        //         return (
        //             <View key={index}
        //                 style={{
        //                     width: width,
        //                     height: 230,
        //                     marginLeft: -20,
        //                     paddingBottom: 10,
        //                     alignSelf: 'center',
        //                 }}
        //             >
        //                 <WebView
        //                     bounces={false}
        //                     scrollEnabled={false}
        //                     source={{ html: iframeHtml }}
        //                     style={{
        //                         backgroundColor: 'transparent',
        //                     }}
        //                 />
        //             </View>
        //         );
        //     }
        //     else if (a.src.slice(12, 15) == 'you') {
        //         return (
        //             <WebView
        //                 key={index}
        //                 bounces={false}
        //                 scrollEnabled={false}
        //                 source={{
        //                     uri: a.src
        //                 }}
        //                 style={{
        //                     width: width - 10,
        //                     height: (width - 10) * 0.5625,
        //                     alignSelf: 'center',
        //                 }}
        //             />
        //         );
        //     }
        //     else {
        //         return (
        //             <View
        //                 key={index}
        //                 style={{
        //                     width: width - 10,
        //                     height: (width - 10) * 0.5625,
        //                     alignSelf: 'center',
        //                     backgroundColor: 'transparent'
        //                 }}>
        //                 <WebView
        //                     bounces={false}
        //                     scrollEnabled={false}
        //                     source={{
        //                         uri: a.src
        //                     }}
        //                     style={{
        //                         //width: width,
        //                         height: a.height <= a.width ? (width * a.height / a.width) - 35 : width * a.height / a.width,
        //                         //resizeMode: 'contain',
        //                         backgroundColor: 'transparent'
        //                     }}
        //                 />
        //             </View>
        //         );
        //     }
        // }
    }

    renderImage(catID) {
        if (catID == 1 || catID == 3 || catID == 4 || catID == 5 || catID == 8) {
            return <Image source={{ uri: this.props.navigation.state.params.image }}
                style={{
                    //width: (width - 10),
                    height: (width - 10) * 0.75,
                    resizeMode: 'contain'
                }}
            />
        } else if (catID == 2) {
            return <Image source={{ uri: this.props.navigation.state.params.image }}
                style={{
                    width: (width - 150) * 0.8,
                    height: (width - 150),
                    alignSelf: 'center'
                }}
            />
        } else if (catID == 7) {
            return <Image source={{ uri: this.props.navigation.state.params.image }}
                style={{
                    width: width - 10,
                    height: (width - 10) * 0.25
                }}
            />
        }
        return null
    }

    componentDidMount() {
        _this = this
    }

    render() {

        const { navigate, goBack } = this.props.navigation;
        let descript = this.props.navigation.state.params.description;

        return (

            <View style={styles.container}>
                <View style={styles.listView}>
                    <ScrollView style={{
                        height: Platform.OS == 'ios' ? height - 50 : height - 65,
                        width: "100%"
                    }}>
                        <Text style={styles.title}> {this.props.navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>

                        {this.renderImage.bind(this)(this.props.navigation.state.params.cat)}

                        <Text />

                        <HTMLView
                            value={descript.replace(/\r\n/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                            renderNode={this.renderNode}
                            stylesheet={styless}
                        />

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingTop: this.props.navigation.state.params.cat == 3 ? 0 : 30
                        }}>
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

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 20 }}>
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
    listView: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
    },
    title: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 10,
        paddingBottom: 10,
        lineHeight: Platform.OS == 'ios' ? 28 : 35

    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    },
});

const styless = StyleSheet.create({
    p: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        paddingHorizontal: 5,
        lineHeight: Platform.OS == 'ios' ? 28 : 35,
        marginBottom: Platform.OS == 'ios' ? -35 : -25
    },
    a: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#FFFF66',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    },
});