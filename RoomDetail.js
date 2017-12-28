import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    ScrollView,
    Dimensions,
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import HTMLView from 'react-native-htmlview';
import Carousel from 'react-native-looped-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/dist/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get("window");

export default class RoomDetail extends Component {

    render() {

        const { navigate, goBack } = this.props.navigation;

        return (

            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => goBack()}
                    icontitle={require('./assets/images/hotel-icon.png')}
                    title={'ที่พักหาดใหญ่'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                            //onPress: () => navigate('Social'),
                        },
                    ]}
                />

                <View style={styles.listView}>
                    <ScrollView style={{
                        height: height - 50,
                        width: "100%",
                    }}>

                        <Carousel
                            delay={2000}
                            style={{
                                height: width * 0.62375,
                                width: width,
                                borderWidth: 5,
                                borderColor: 'white',
                            }}
                            autoplay
                            bullets
                            bulletStyle={{
                                margin: 3
                            }}
                            chosenBulletStyle={{
                                margin: 3
                            }}
                            arrows
                            arrowsContainerStyle={{
                                marginLeft: 5,
                                marginRight: 5,
                            }}
                            leftArrowText={<FontAwesome name='chevron-circle-left' size={40} color='white' />}
                            rightArrowText={<FontAwesome name='chevron-circle-right' size={40} color='white' />}
                        >
                            {this.props.navigation.state.params.gallery.map((prop, key) => {
                                return (
                                    <View
                                        key={key}
                                        style={{
                                            backgroundColor: 'white',
                                            width: width
                                        }}>
                                        <Image
                                            source={{ uri: this.props.navigation.state.params.gallery[key] }}
                                            style={styles.gallery}
                                        />
                                    </View>
                                )
                            })}

                        </Carousel>

                        <View style={{ padding: 10 }}>
                            <Text style={styles.property}> {this.props.navigation.state.params.property} </Text>

                            <Text style={styles.topic1}>  สถานะ  </Text>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ความเป็นเจ้าของ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.owner} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ประเภท : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.type} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ห้องนอน : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.bedroom} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ห้องน้ำ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.bathroom} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  เฟอร์นิเจอร์ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.furni} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  สถานะทรัพย์สิน : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.status} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  ราคา : </Text>
                                <Text style={styles.price}>{this.props.navigation.state.params.price} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic}>  มัดจำ : </Text>
                                <Text style={styles.detail}>{this.props.navigation.state.params.deposit == "" ? '-' : this.props.navigation.state.params.deposit} </Text>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic2}>  สิ่งอำนวยความสะดวก : </Text>
                                <View>
                                    {this.props.navigation.state.params.feature.map((prop, key) => {
                                        return (
                                            <View key={key}>
                                                <Text style={styles.feature}>{this.props.navigation.state.params.feature[key]} </Text>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.topic3}>  การบริการ : </Text>
                                <View>
                                    {this.props.navigation.state.params.service.map((prop, key) => {
                                        return (
                                            <View key={key}>
                                                <Text style={styles.service}>{this.props.navigation.state.params.service[key]} </Text>
                                            </View>
                                        )
                                    })
                                    }
                                </View>
                            </View>

                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.topic2}>  รายละเอียดเพิ่มเติม : </Text>
                                <HTMLView
                                    value={this.props.navigation.state.params.descript.replace(/\r\n/g, '').replace(/&nbsp;/g, '')}
                                    stylesheet={styless}
                                />
                            </View>

                            {this.props.navigation.state.params.latitude ?

                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: parseFloat(this.props.navigation.state.params.latitude),
                                        longitude: parseFloat(this.props.navigation.state.params.longitude),
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                    }}
                                >
                                    <MapView.Marker coordinate={{
                                        latitude: parseFloat(this.props.navigation.state.params.latitude),
                                        longitude: parseFloat(this.props.navigation.state.params.longitude),
                                    }}
                                    />
                                </MapView>
                                : null
                            }
                            <Text />

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>
                                <Icons
                                    name="access-time"
                                    size={15}
                                    color='black'
                                    style={{ paddingTop: Platform.OS == 'ios' ? 0 : 3 }}
                                />
                                <Text style={styles.date}>
                                    {this.props.navigation.state.params.date}
                                </Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        ...StyleSheet.absoluteFillObject,
    },
    logo: {
        height: 100,
        width: 150,
    },
    listView: {
        width: width,
    },
    property: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    topic1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },
    topic: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 140,
    },
    topic2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 180,
    },
    topic3: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        width: 100,
    },
    detail: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        width: width - 120,
        paddingLeft: 10,
    },
    price: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ff0000',
        textAlign: 'left',
        width: width - 140,
        paddingLeft: 10,
    },
    date: {
        fontSize: 14,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'right',
        paddingLeft: 3,
    },
    gallery: {
        height: width * 0.62375,
        width: width,
    },
    feature: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5,
    },
    service: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5,
    },
    map: {
        height: 200,
        width: width,
    }
});

const styless = StyleSheet.create({
    p: {
        fontSize: 16,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        paddingLeft: 5.
    }
});