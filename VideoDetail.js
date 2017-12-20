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
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';

const { width } = Dimensions.get("window");
const height = width * 1.07;

export default class VideoDetail extends Component {

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
            if (node.children[0].attribs.src.slice(0, 2) == '//') {
            node.children[0].attribs.src = 'https:' + node.children[0].attribs.src
            };
            if (node.children[0].attribs.src.slice(12, 15) == 'you') {
                return (
                    <WebView
                        key={index}
                        source={{
                            uri: node.children[0].attribs.src
                        }}
                        style={{
                            width: 350, 
                            height: 200,
                            alignSelf: 'center',
                        }}
                    />
                );
            }
        }

    }

    render() {

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>
                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Video')}
                      title={'วิดีโอ'} 
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
                    <Text style={styles.videofont}> ---- Video ---- </Text>

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
    videofont: {
        fontSize: 27,
        paddingLeft: 5,
        paddingTop: 35,
        color: 'white',
        fontFamily: 'bangna-new',
    },
    listView: {
        paddingLeft: 7, 
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

});

const styless = StyleSheet.create({
    p: {
        fontSize: 15,
        fontWeight: 'normal',
        color:'white',
        textAlign:'left',
        fontFamily: 'Times New Roman'
    },
});