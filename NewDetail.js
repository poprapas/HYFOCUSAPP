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
    PixelRatio
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get("window");

export default class NewDetail extends Component {


    renderNode(node, index, siblings, parent, defaultRenderer) {

        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Image
                key={index} 
                style= {{
                    width: width,
                    height: (width / 2 ) * (a.width / a.height),
                    marginVertical: 10,
                }}
                source={{
                    uri: node.children[0].attribs.src
                }}
            />
            )
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
            else {
                 return (
                    <WebView
                        key={index}
                        source={{
                            uri: node.children[0].attribs.src
                        }}
                        style={{
                            width: 300, 
                            height: 500,
                            alignSelf: 'center',
                        }}
                    />
                );
            }
        }
    }

    render() {

        const { navigate } = this.props.navigation;
        let descript = this.props.navigation.state.params.description;

        return (
            <View style={styles.container}>

                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Tab', {...this.props} )}
                      title= {this.props.navigation.state.params.type} 
                      rightIcons={[
                        {
                          name: 'facebook', 
                           onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                          //onPress: () => navigate('Social'),
                        },
                      ]}
                />

                <Image source={require('./assets/images/banner.png')} 
                    style={styles.logo} />

                <View style = {styles.listView}>
                    <ScrollView style={{height: height-175, width: "100%"}}>
                        <Image  source= {{uri: this.props.navigation.state.params.image}} 
                            style={{width: 374, height: 220}}/>
                        <Text style={styles.title}> {this.props.navigation.state.params.title} </Text>
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
        backgroundColor: Color.BROWN[400],
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    logo: {
        height: 100,
        width: 150,
    },
    new: {
        fontSize: 23,
        paddingLeft: 5,
        paddingTop: 35,
        color: 'white',
        //alignSelf: 'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingTop: 5, 
        paddingBottom: 2,
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
        fontFamily: 'Times New Roman',
        margin:0
    },
});