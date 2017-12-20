import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    ListView,
    ActivityIndicator,
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

export default class New extends Component {

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
    fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=2&start='+this.state.start+'&per_page=10')
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
                      title= {'ข่าว'} 
                      //title= {this.props.navigation.state.params.type} 
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
                    <Text style={styles.bannerfont}> - ข่าวสังคมและการเมือง - </Text>

                </View>

                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>  <View style= {styles.listView}>
                                                        <Text style={styles.titleText}> {rowData.TOPIC} </Text>
                                                        <Image  source= {{uri: rowData.FEATURE}} 
                                                        style={{width: 374, height: 200}}/>
                                                        <TouchableOpacity 
                                                            key={rowData.id} 
                                                            onPress={() => navigate('NewDetail', 
                                                                {
                                                                    type: rowData.CATID,
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
                        }}

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
        backgroundColor: Color.BROWN[600],
    },
    logo: {
        height: 100,
        width: 150,
    },
    bannerfont: {
        fontSize: 20,
        paddingLeft: 2,
        paddingTop: 40,
        color: 'white',
        fontFamily: Platform.OS == 'ios' ? 'BangnaNew': 'bangna-new',
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
        fontFamily: Platform.OS == 'ios' ? 'BangnaNew': 'bangna-new',
        textDecorationLine: 'underline'
    },    
    titleText: {
        fontSize: 16,
        fontWeight: 'normal',
        color:'white',
        textAlign:'center',
        fontFamily: Platform.OS == 'ios' ? 'BangnaNew': 'bangna-new',
    },
});

