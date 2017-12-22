import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

export default class Room extends Component {
    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                
                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Tab')}
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

                <View style={{paddingBottom: 20}}>
                  <Image source={require('./assets/images/banner.png')} 
                          style={styles.logo} />
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
    logo: {
        height: 100,
        width: 150,
    },
});