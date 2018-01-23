import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Color from 'react-native-material-color';

export default class Favorite extends Component {

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
});
