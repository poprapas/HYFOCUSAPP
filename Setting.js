import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Linking,
    TouchableOpacity
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

export default class Contact extends Component {

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ActionBar
                    containerStyle={styles.bar}
                    backgroundColor={'black'}
                    leftIconName={'back'}
                    onLeftPress={() => navigate('Tab')}
                    icontitlesss={"settings"}
                    title={'ตั้งค่า'}
                    rightIcons={[
                        {
                            name: 'facebook',
                            onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                        },
                    ]}
                />

                <TouchableOpacity
                    onPress={() => Linking.openURL('app-settings:')}
                >
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        borderBottomColor: '#A9A9A9',
                        borderBottomWidth: 1
                    }}>
                        <View style={{ paddingTop: 10 }}>
                            <Text style={styles.titleText}> เปลี่ยนแปลงการแจ้งเตือน </Text>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                            <Text style={styles.more}> > </Text>
                        </View>
                    </View>

                </TouchableOpacity>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={styles.titleText}> ให้คะแนนเรา </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                        <Text style={styles.more}> > </Text>
                    </View>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.BROWN[800],
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'left',
        fontFamily: 'WDBBangna',
        paddingTop: 10,
    },
    more: {
        fontWeight: 'normal',
        fontSize: 50,
        fontFamily: 'WDBBangna',
    }
});