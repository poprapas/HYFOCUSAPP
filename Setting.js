import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import Color from 'react-native-material-color';
import ActionBar from 'react-native-action-bar';
import ImageSlider from 'react-native-image-slider';

export default class Setting extends Component {

    render() {
        return (
            <View style={styles.container}>

                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      //leftIconName={'menu'}
                      //onLeftPress={this.toggleDrawer}
                      title={'Setting'} 
                      // rightIcons={[
                      //   {
                      //     name: 'plus',
                      //     onPress: this.toggleDrawer2,                          
                      //   },
                      // ]}
                />

                <View style={{paddingTop: 30, paddingLeft: 20, paddingRight: 20, paddingBottom: 70}}>

                    <ImageSlider  // more option
                        images={[
                            'http://placeimg.com/640/480/arch',
                            'http://placeimg.com/640/480/nature',
                            'http://placeimg.com/640/480/tech'
                        ]}
                    />

                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20}}>

                    <Image source={require('./assets/images/advt_2.jpg')} 
                        style={styles.advt_2} /> 

                    <Image source={require('./assets/images/advt_3.jpg')} 
                        style={styles.advt_3} /> 

                </View>

                <Image source={require('./assets/images/advt_4.jpg')} 
                    style={styles.advt_4} /> 

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
       backgroundColor: Color.BROWN[800],
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
    advt_1: {
        height: 180,
        width: 340,
    },
    advt_2: {
        height: 120,
        width: 180,
    },
    advt_3: {
        height: 120,
        width: 170,
    },
    advt_4: {
        height: 38,
        width: 385,
    },
});