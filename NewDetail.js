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
//import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get("window");

export default class NewDetail extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         starCount: 0,
    //     };
    // }

    // onStarRatingPress(rating) {
    //     this.setState({
    //         starCount: rating,
    //     });
    // }

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
            <View style={{ flexDirection: 'row' }}>

                <TouchableOpacity onPress={() => {
                    AsyncStorage.getItem('favorite').then((data) => {
                        //console.log(JSON.parse(data))
                        let main = []
                        if (data == null) {
                            AsyncStorage.setItem('favorite', JSON.stringify(['news', navigation.state.params.id]))
                        }
                        else {
                            let newdata = JSON.parse(data)
                            let found = false
                            for (let i in newdata) {
                                if (newdata[i][0] == 'news' && newdata[i][1] == navigation.state.params.id)
                                    found = true
                            }
                            if (!found) {
                                newdata.push(['news', navigation.state.params.id])
                                AsyncStorage.setItem('favorite', JSON.stringify(newdata))
                            }
                        }
                    })
                    //AsyncStorage.removeItem('favorite')
                }}>
                    <Feather
                        name="download"
                        size={20}
                        color='white'
                    />
                </TouchableOpacity>

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
                </TouchableOpacity>
            </View>
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
                            width: width - 10,
                            height: (width - 10) * 0.5625,
                            alignSelf: 'center',
                        }}
                    />
                );1`1                                                                                                                                                                   1`

            }
            else {
                let a = node.children[0].attribs;
                return (
                    <WebView
                        key={index}
                        bounces={false}
                        source={{
                            uri: a.src
                        }}
                        style={{
                            width: width,
                            height: a.height < a.width ? (width * a.height / a.width) - 35 : width * a.height / a.width,
                            //resizeMode: 'contain',
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

                <View style={styles.listView}>
                    <ScrollView style={{
                        height: Platform.OS == 'ios' ? height - 70 : height - 80,
                        width: "100%"
                    }}>
                        <Text style={styles.title}> {this.props.navigation.state.params.title.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                        <Image source={{ uri: this.props.navigation.state.params.image }}
                            style={{
                                width: width - 10,
                                height: (width - 10) * 0.625
                            }} />
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

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
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

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>

                            <Text style={styles.star}>
                                ให้คะแนน :
                            </Text>

                            <View style={{ paddingLeft: 5 }}>
                                <StarRating
                                    disabled={false}
                                    emptyStar={'ios-star-outline'}
                                    fullStar={'ios-star'}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starColor={'#ff9933'}
                                    emptyStarColor={'white'}
                                    starSize={20}
                                />
                            </View>
                        </View> */}

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
        paddingTop: 20
    },
    view: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    },
    star: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Times New Roman',
        paddingLeft: 3,
    }
});

const styless = StyleSheet.create({
    p: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Times New Roman',
        paddingHorizontal: 5
    },
    a: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#FFFF66',
        textAlign: 'left',
        fontFamily: 'Times New Roman'
    },
});