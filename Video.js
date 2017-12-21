import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    ListView,
    ActivityIndicator,
    Dimensions
} from 'react-native';

import Color from 'react-native-material-color';
import ActionBar from 'react-native-action-bar';

const { width, height } = Dimensions.get("window");

export default class Video extends Component {

    constructor(props) {
    super(props);
      this.fetchMore = this._fetchMore.bind(this);
      this.fetchData = this._fetchData.bind(this);       
      this.state = {
        dataSource: null,
        isLoading: true,
        isLoadingMore: false,
        _data: null,
        _dataAfter: "", 
        start: 0,   
      } 
    }

    _fetchData(callback) {
        fetch('https://www.hatyaifocus.com/rest/api.php?action=content&cat=4&start='+this.state.start+'&per_page=10')
          .then(response => response.json())
          .then(callback)
          .catch(error => {
            console.error(error);
          });
    }

    _fetchMore() {
        this.fetchData(responseJson => {
          const data = this.state._data.concat(responseJson);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoadingMore: false,
            _data: data,
            _dataAfter: responseJson.data,
            start: this.state.start + 10,
          });
        });
    }

    componentDidMount() {
        //Start getting the first batch of data from reddit
        this.fetchData(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          });
          const data = responseJson;
          this.setState({
            dataSource: ds.cloneWithRows(data),
            isLoading: false,
            _data: data,
            _dataAfter: responseJson.data,
            start: 10,
          });
        });
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                  <ActivityIndicator />
                </View>
            );
        }

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ActionBar
                      containerStyle={styles.bar}
                      backgroundColor= {'black'}
                      leftIconName={'back'}
                      onLeftPress= {() => navigate('Tab')}
                      title={'วิดีโอ'} 
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
                    <Text style={styles.videofont}> ---- Video ---- </Text>

                </View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>  <View style= {styles.listView}>
                                                        <Text style={styles.titleText}> {rowData.TOPIC} </Text>
                                                        <Image  source= {{uri: rowData.FEATURE}} 
                                                          style={{ 
                                                            width: width-10, 
                                                            height: (width-10) * 0.625
                                                          }} 
                                                        />
                                                        <TouchableOpacity 
                                                            key={rowData.id} 
                                                            onPress={() => navigate('VideoDetail', 
                                                                {
                                                                    title: rowData.TOPIC,
                                                                    image: rowData.FEATURE,
                                                                    description: rowData.DESCRIPTION,
                                                                    view: rowData.VIEWS,
                                                                    date: rowData.DATEIN,
                                                                }
                                                            )}
                                                        >
                                                          <View>
                                                            <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
                                                          </View>
                                                        </TouchableOpacity>
                                                  </View> 
                        }

                        onEndReached={() =>
                            this.setState({ isLoadingMore: true }, () => this.fetchMore())}
                        renderFooter={() => {
                            return (
                                  this.state.isLoadingMore &&
                                  <View style={{ flex: 1, padding: 10 }}>
                                    <ActivityIndicator size="small" />
                                  </View>
                                )
                            }
                        }
                    />
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
    logo: {
        height: 100,
        width: 150,
    },
    videofont: {
        fontSize: 27,
        paddingLeft: 5,
        paddingTop: 35,
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    },
    listView: {
        paddingLeft: 5, 
        paddingRight: 5, 
        paddingTop: 5, 
        paddingBottom: 2
    },
    moredetail: {
        fontSize: 14,
        fontWeight: 'normal',
        color:'white',
        textAlign:'right',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 5,
        textDecorationLine: 'underline'
    },    
    titleText: {
        fontSize: 16,
        fontWeight: 'normal',
        color:'white',
        textAlign:'center',
        fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
        paddingTop: 5,
    },

});

// import React, { Component } from 'react';
// import {
//     Platform,
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     AppRegistry,
//     Dimensions,
//     TouchableWithoutFeedback,
//     Animated,
//     Linking,
// } from 'react-native';

// import ActionBar from 'react-native-action-bar';
// import Color from 'react-native-material-color';
// import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ProgressBar from "react-native-progress/Bar";

// function secondsToTime(time) {
//   return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
// }

// export default class VideoPlayer extends Component {

//     state = {
//         paused: true,   // edit false to play video now when run app
//         progress: 0,
//         duration: 0,
//     };

//     animated = new Animated.Value(0);

//     handleMainButtonTouch = () => {
//         this.triggerShowHide();

//         if (this.state.progress >= 1) {
//           this.player.seek(0);
//         }

//         this.setState(state => {
//           return {
//             paused: !state.paused,
//           }
//         })
//     }

//     handleProgressPress = (e) => {
//         this.triggerShowHide();

//         const position = e.nativeEvent.locationX;
//         const progress = (position / 250) * this.state.duration;
//         const isPlaying = !this.state.paused;

//         this.player.seek(progress)
//     }

//     handleProgress = (progress) => {
//         this.setState({
//           progress: progress.currentTime / this.state.duration
//         })
//     }

//     handleEnd = () => {
//         this.setState({ paused: true })
//     }

//     handleLoad = (meta) => {
//         this.setState({
//           duration: meta.duration
//         })

//         this.triggerShowHide()
//     }

//     handleVideoPress = () => {
//         this.triggerShowHide()
//     }

//     triggerShowHide = () => {
//         clearTimeout(this.hideTimeout)

//         Animated.timing(this.animated, {
//           toValue: 1,
//           duration: 100,
//         }).start()
//         this.hideTimeout = setTimeout(() => {
//           Animated.timing(this.animated, {
//             toValue: 0,
//             duration: 300,
//           }).start()
//         }, 1500)
//     }

//     render() {

//         const { width } = Dimensions.get("window");
//         const height = width * 0.5625;

//         const interpolatedControls = this.animated.interpolate({
//             inputRange: [0, 1],
//             outputRange: [48, 0],
//         });

//         const controlHideStyle = {
//             transform: [
//                 {
//                     translateY: interpolatedControls,
//                 },
//             ],
//         };

//         const { navigate } = this.props.navigation;

//         return (
//             <View style={styles.container}>

//                 <ActionBar
//                     containerStyle={styles.bar}
//                       backgroundColor= {'black'}
//                       leftIconName={'back'}
//                       onLeftPress= {() => navigate('Tab')}
//                       title={'Video'} 
//                       rightIcons={[
//                         {
//                           name: 'facebook', 
//                           onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
//                           //onPress: () => navigate('Social'),
//                         },
//                       ]}
//                 />

//                 <Image source={require('./assets/images/banner.png')} 
//                         style={styles.logo} />

//                 <View style={styles.videoContainer}> 
//                     <TouchableWithoutFeedback onPress={this.handleVideoPress}>
//                         <Video
//                           paused={this.state.paused}
//                           //source= {require('./somkid.mp4')}
//                           source={{uri:'http://techslides.com/demos/sample-videos/small.mp4'}}
//                           style={{ width: "100%", height }}
//                           resizeMode="contain"
//                           onLoad={this.handleLoad}
//                           onProgress={this.handleProgress}
//                           onEnd={this.handleEnd}
//                           ref={ref => {
//                               this.player = ref;
//                           }}
//                         />
//                     </TouchableWithoutFeedback>

//                     <Animated.View style={[styles.controls, controlHideStyle]}>
//                         <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
//                             <Icon name={!this.state.paused ? "pause" : "play"} size={25} color="#FFF" />
//                         </TouchableWithoutFeedback>

//                         <TouchableWithoutFeedback onPress={this.handleProgressPress}>
//                             <View>
//                                 <ProgressBar
//                                   progress={this.state.progress}
//                                   color="#FFF"
//                                   unfilledColor="rgba(255,255,255,.5)"
//                                   borderColor="#FFF"
//                                   width={250}
//                                   height={15}
//                             />
//                             </View>
//                         </TouchableWithoutFeedback>

//                         <Text style={styles.duration}>
//                             {secondsToTime(Math.floor(this.state.progress * this.state.duration))}
//                         </Text>
//                     </Animated.View>    
//                 </View> 
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         //justifyContent: 'center',
//         //alignItems: 'center',
//         backgroundColor: Color.BROWN[900],
//     },
//     videoContainer: {
//         overflow: "hidden",
//     },
//     controls: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         height: 48,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         position: "absolute",
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-around",
//         paddingHorizontal: 10,
//     },
//     mainButton: {
//         marginRight: 15,
//     },
//     duration: {
//         color: "#FFF",
//         marginLeft: 15,
//     },
//     logo: {
//         height: 100,
//         width: 150,
//     },
// });

// AppRegistry.registerComponent('VideoPlayer', () => VideoPlayer);
