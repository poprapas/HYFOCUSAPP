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
    TouchableOpacity
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';

const { width, height } = Dimensions.get("window");

export default class PeopleDetail extends Component {

    renderNode(node, index, siblings, parent, defaultRenderer) {

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
    }

    render() {

        const { navigate, goBack } = this.props.navigation;
        let descript = this.props.navigation.state.params.description;

        return (

            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => goBack()}
                    icontitle={require('./assets/images/people-icon.png')}
                    title={'คนหาดใหญ่'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => navigate('Tab')}>
                        <Image source={require('./assets/images/banner.png')}
                            style={styles.logo} />
                    </TouchableOpacity>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.peoplefont}> ---- วิถีชีวิต ---- </Text>
                    </View>
                </View>

                <View style={styles.listView}>
                    <ScrollView style={{
                        height: Platform.OS == 'ios' ? height - 165 : height - 170,
                        width: "100%"
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}> {this.props.navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                            <Image source={{ uri: this.props.navigation.state.params.image }}
                                style={{
                                    width: width - 150,
                                    height: (width - 10) * 0.8
                                }} />
                        </View>
                        <Text />
                        <HTMLView
                            value={descript.replace(/\r\n/g, '').replace(/<p>&nbsp;<\/p>/g, '')}
                            renderNode={this.renderNode}
                            stylesheet={styless}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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
                            <Text style={styles.view}>
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
    peoplefont: {
        fontSize: width * 0.07,
        paddingTop: Platform.OS === 'ios' ? 40 : 35,
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
        paddingBottom: 10
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
    },
    a: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#FFFF66',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    },
});

