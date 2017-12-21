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

const { width, height } = Dimensions.get("window");

export default class EatDetail extends Component {

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
            const a = node.children[0].attribs;
            const iframeHtml = `<iframe src="${a.src}" 
                                        height= 220, 
                                        width= ${width - 10}, 

                                >
                                </iframe>`;
            return (
                <View key={index} 
                      style={{  width: width, 
                                height: 230, 
                                marginLeft: -20, 
                                paddingBottom: 10,
                                alignSelf: 'center'
                                // width: width,
                                // height: (width / 2 ) * (a.width / a.height),
                                // marginVertical: 10,
                            }}
                >
                    <WebView source={{html: iframeHtml}} />       
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
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Eat')}
                      title={'ของกินหาดใหญ่'} 
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
                    <Text style={styles.eatfont}> ---- Eat ---- </Text>

                </View>

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
        backgroundColor: Color.BROWN[500],
    },
    logo: {
        height: 100,
        width: 150,
    },
    eatfont: {
        fontSize: 27,
        paddingLeft: 18,
        paddingTop: 35,
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
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