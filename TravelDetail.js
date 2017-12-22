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
    WebView,
    FlatList,
    PixelRatio
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get("window");

export default class TravelDetail extends Component {

    renderNode(node, index, siblings, parent, defaultRenderer) {

        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Image
                    key={index}
                    style={{
                        width: (width / 2) * a.width / a.height,
                        height: width / 2,
                        alignSelf: 'center',
                        marginVertical: 10,
                    }}
                    source={{
                        uri: node.children[0].attribs.src
                    }}
                />
            )
        }

        if (node.name == 'p' && node.children[0].name == 'iframe') {
            const a = node.children[0].attribs;
            const iframeHtml = `<iframe src="${a.src}" 
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
                        alignSelf: 'center'
                    }}
                >
                    <WebView source={{ html: iframeHtml }} />
                </View>
            );
        }


    }

    render() {

        const { navigate } = this.props.navigation;
        let descript = this.props.navigation.state.params.description;

        return (

            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => navigate('Travel')}
                    title={'เที่ยวหาดใหญ่'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ flexDirection: 'row', paddingBottom: 5, justifyContent: 'space-between' }}>

                    <Image source={require('./assets/images/banner.png')}
                        style={styles.logo} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.travelfont}> ---- Travel ---- </Text>
                    </View>

                </View>

                <View style={styles.listView}>
                    <ScrollView style={{ height: height - 175, width: "100%" }}>
                        <Image source={{ uri: this.props.navigation.state.params.image }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.625
                            }}
                        />
                        <Text style={styles.title}> {this.props.navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                        <Text></Text>
                        <HTMLView
                            value={descript.replace(/\r\n/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                            renderNode={this.renderNode}
                            stylesheet={styless}
                        />
                        <Text style={styles.view}> Views: {this.props.navigation.state.params.view} </Text>
                        <Text style={styles.view}> Date: {this.props.navigation.state.params.date} </Text>
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
    travelfont: {
        fontSize: 27,
        paddingTop: 35,
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Times New Roman'
    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman'
    },
    containermap: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        //...StyleSheet.absoluteFillObject,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },


});

const styless = StyleSheet.create({
    p: {
        fontSize: 15,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    }
});