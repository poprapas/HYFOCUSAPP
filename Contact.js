import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    TextInput,
    Image,
    Linking,
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
//import Emoticons from 'react-native-emoticons';

export default class Contact extends Component {

    state = {
      name: '',
      email: '',
      massage: '',
   }
   handleName = (text) => {
      this.setState({ name: text })
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handleMassage = (text) => {
      this.setState({ massage: text })
   }
   login = () => {
      alert('ส่งข้อความสำเร็จ')
   }

    render() {

      const { navigate } = this.props.navigation;
      
        return (
            <View style={styles.container}>
                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Tab')}
                      icontitle={require('./assets/images/contact-icon.png')}
                      title={'ติดต่อเรา'} 
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
                <Image source={require('./assets/images/contact.jpg')} 
                       style={styles.contact} />

                <View style={{paddingTop: 20}}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "ชื่อ-สกุล"
                           placeholderTextColor = "#808080"
                           autoCapitalize = "none"
                           onChangeText = {this.handleName}/>
                        
                    <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "อีเมลล์"
                           placeholderTextColor = "#808080"
                           autoCapitalize = "none"
                           onChangeText = {this.handleEmail}/>
                  </View>
                  <TextInput style = {styles.input2}
                         underlineColorAndroid = "transparent"
                         placeholder = "ข้อความ"
                         placeholderTextColor = "#808080"
                         autoCapitalize = "none"
                         onChangeText = {this.handleMassage}/>
                </View>

                <View style={{paddingTop: 5}}>

                  <TouchableOpacity
                         style = {styles.submitButton}
                         onPress = {
                            () => this.login(this.state.name, this.state.email, this.state.massage)
                         }>
                         <Text style = {styles.submitButtonText}> ส่งข้อความ </Text>
                  </TouchableOpacity>

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
    contact: {
        height: 150,
        width: 384,
    },
    input: {
        margin: 5,
        height: 40,
        width: 180,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white',
        //borderRadius: 4,
    },
    input2: {
        margin: 5,
        height: 130,
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'white',
        //borderRadius: 4,
    },
    submitButton: {
        backgroundColor: 'black',
        padding: 10,
        marginTop: 5,
        marginLeft: 125,
        marginRight: 125,
        height: 40,
        borderRadius: 9,
        alignItems: 'center'
    },
    submitButtonText:{
        color: 'white'
    },
});