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
    FlatList
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';

const { width } = Dimensions.get("window");
const height = width * 1.09;

export default class TravelDetail extends Component {

    renderNode(node, index, siblings, parent, defaultRenderer) {
        if (node.name == 'img') {
            const a = node.attribs;
            return (
                <Image
                    key={index} 
                    style={{
                        width: Number(a.width), 
                        height: Number(a.height)
                    }}
                    source={{
                        uri: a.src
                    }}
                />
            );
        }

        if (node.name == 'p' && node.children[0].name == 'iframe') {
            const iframeHtml = `<iframe src="${node.children[0].attribs.src}" 
                                        height= 220, 
                                        width= ${width - 10}, 

                                >
                                </iframe>`;
            return (
                <View key={index} 
                      style={{  width: width, 
                                height: 230, 
                                marginLeft: -10, 
                                paddingBottom: 10,
                                alignSelf: 'center'

                            }}
                >
                    <WebView source={{html: iframeHtml}} />       
                </View>
                );
        }
    }
        
        // if (node.name == 'p' && node.children[0].name == 'iframe') {
        //     //console.log(node.children[0].attribs.src)
        //      return (
        //         <WebView
        //             key={index}
        //             source={{
        //                 uri: 'https://www.google.com/maps/@7.0113513,100.4721213,3a,75y,271.11h,65.34t/data=!3m6!1e1!3m4!1sbmn81_NclR1f4KT1IjcpIg!2e0!7i13312!8i6656'
        //                 //uri: 'https://www.google.com/maps/embed?pb=!1m0!4v1508328335618!6m8!1m7!1s_1RVKLz1MGdAh4_asgaJCw!2m2!1d7.011253691624095!2d100.4721350903641!3f287.10771871464965!4f-16.168099298207366!5f0.7820865974627469'
        //                 //uri: node.children[0].attribs.src
        //             }}
        //             style={{
        //                 width: 350, 
        //                 height: 250,
        //                 alignSelf: 'center',
        //             }}
        //         />
        //     );
        // }

    render() {

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>
                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Travel')}
                      title={'เที่ยวหาดใหญ่'} 
                      rightIcons={[
                        {
                          name: 'facebook', 
                          onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                          //onPress: () => navigate('Social'),
                        },
                      ]}
                />

                <View style={{flexDirection: 'row', paddingBottom: 10}}>

                    <Image source={require('./assets/images/banner.png')} 
                        style={styles.logo} />
                    <Text style={styles.travelfont}> ---- Travel ---- </Text>

                </View>

                <View style = {styles.listView}>
                    <ScrollView style={{height: height, width: "100%"}}>
                        <Image  source= {{uri: this.props.navigation.state.params.image}} 
                            style={{width: 374, height: 220}}/>
                        <Text style={styles.title}> {this.props.navigation.state.params.title} </Text>
                        <Text></Text>
                        <HTMLView
                            value={this.props.navigation.state.params.description}
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
        paddingLeft: 4,
        paddingTop: 35,
        color: 'white',
        fontFamily: 'bangna-new',
    },
    listView: {
        paddingLeft: 5, 
        paddingRight: 5, 
        //paddingTop: 5, 
        //paddingBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        textAlign:'center',
        fontFamily: 'Times New Roman'
    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color:'white',
        textAlign:'right',
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
        color:'white',
        textAlign:'left',
        fontFamily: 'Times New Roman'
    }
});