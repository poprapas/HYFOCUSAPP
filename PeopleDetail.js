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
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get("window");

export default class PeopleDetail extends Component {

    renderNode(node, index, siblings, parent, defaultRenderer) {

        if (node.name == 'p' && node.children[0].name == 'img') {
            const a = node.children[0].attribs;
            return (
                <Image
                key={index} 
                style= {{
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
                      onLeftPress= {() => navigate('People')}
                      title={'คนหาดใหญ่'} 
                      rightIcons={[
                        {
                          name: 'facebook', 
                          onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                          //onPress: () => navigate('Social'),
                        },
                      ]}
                />

                <View style={{flexDirection: 'row', paddingBottom: 5, justifyContent: 'space-around'}}>

                    <Image source={require('./assets/images/banner.png')} 
                        style={styles.logo} />
                    <Text style={styles.peoplefont}> ---- วิถีชีวิต ---- </Text>

                </View>

                <View style = {styles.listView}>
                    <ScrollView style={{height: height-175, width: "100%"}}>
                        
                        <View style={{alignItems: 'center'}}>
                            <Image  source= {{uri: this.props.navigation.state.params.image}} 
                                style={{
                                    width: width-150, 
                                    height: (width-10) * 0.8
                                }}/>
                        </View>
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
    peoplefont: {
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
    }
});

                    