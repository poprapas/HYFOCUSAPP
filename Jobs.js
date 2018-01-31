import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
  ListView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Button
} from 'react-native';

import Color from 'react-native-material-color';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Button from 'react-native-button';

const { width, height } = Dimensions.get("window");

export default class Jobs extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle:
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Image
          source={require('./assets/images/work-icon.png')}
          style={{
            width: 25,
            height: 25,
            top: Platform.OS == 'ios' ? 0 : 3,
          }}
        />
        <Text style={{
          textAlign: 'center',
          fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
          fontSize: Platform.OS == 'ios' ? 18 : 15,
          color: 'white',
          paddingTop: Platform.OS == 'ios' ? 8 : 5,
        }}> หางานหาดใหญ่
        </Text>
      </View>,
    headerTitleStyle: {
      alignSelf: 'center',
    },
    headerRight:
      <TouchableOpacity onPress={() => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/')}>
        <Ionicons
          name="logo-facebook"
          size={25}
          color='white'
          style={{
            paddingHorizontal: 10
          }}
        />
      </TouchableOpacity>,
    headerLeft:
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Ionicons
          name="md-menu"
          size={30}
          color='white'
          style={{
            paddingHorizontal: 10
          }}
        />
      </TouchableOpacity>
  })

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
      end: false,
      find: '',
      found: false,
      refreshing: false,
      isMounted: true,
    };
  }

  _fetchData(callback) {
    fetch('https://www.hatyaifocus.com/rest/api.php?action=jobs&start=' + this.state.start + '&per_page=10' + '&position=' + this.state.find)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error);
      });
  }

  _fetchMore() {
    if (!this.state.isLoadingMore) {
      this.setState({
        isLoadingMore: true,
      })
      this.fetchData(responseJson => {
        if (responseJson == null) {
          this.setState({
            end: true
          })
        }
        else {
          const data = this.state._data.concat(responseJson);
          if (this.state.isMounted) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
              isLoadingMore: false,
              _data: data,
              _dataAfter: responseJson.data,
              start: this.state.start + 10,
            });
          }
        }
      });
    }
  }

  componentDidMount() {
    //Start getting the first batch of data from reddit
    this.fetchData(responseJson => {
      if (!responseJson) { responseJson = [] }
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
      const data = responseJson;
      if (this.state.isMounted) {
        this.setState({
          dataSource: ds.cloneWithRows(data),
          isLoading: false,
          _data: data,
          _dataAfter: responseJson.data,
          start: 10,
          refreshing: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    })
  }

  _onRefresh() {
    if (!this.state.refreshing) {
      this.setState({
        refreshing: true,
        start: 0
      }, this.componentDidMount)
    }
  }

  search() {
    if (this.state.isMounted) {
      this.setState({
        dataSource: null,
        isLoading: true,
        isLoadingMore: false,
        _data: null,
        _dataAfter: "",
        start: 0,
        end: false,
        found: false,
        refreshing: false,
      }, this.componentDidMount())
    }
  }

  render() {

    const { navigate, goBack } = this.props.navigation;

    if (this.state.isLoading || this.state.refreshing) {
      return (
        <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 3 }}>

            <TouchableOpacity onPress={() => navigate('หน้าแรก')}>
              <Image source={require('./assets/images/banner2.jpg')}
                style={styles.logo} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={styles.jobfont}> - หางานหาดใหญ่ - </Text>
            </View>

          </View> */}

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.search}>

              <View style={{
                alignSelf: 'center',
                paddingLeft: Platform.OS == 'ios' ? 0 : 5,
              }}>
                <Icon
                  name='search'
                  color='black'
                  size={20}
                />
              </View>

              <View style={{ flexDirection: 'column' }}>
                <TextInput
                  style={styles.searchInput}
                  placeholder=' ค้นหาตำแหน่ง...'
                  placeholderTextColor='#686868'
                  underlineColorAndroid="transparent"
                  value={this.state.find}
                  onChangeText={(find) => this.setState({ find: find })}
                />
              </View>

              {this.state.find == '' ? null :
                <TouchableOpacity
                  onPress={() => this.setState({ find: '' })}
                  style={{ alignSelf: 'center' }}>
                  <Ionicons
                    name='md-close-circle'
                    color='black'
                    size={20}
                  />
                </TouchableOpacity>
              }

            </View>


            <TouchableOpacity
              onPress={() => this.search()}
              style={{
                alignSelf: 'center',
                marginRight: 5,
                borderRadius: 10,
                backgroundColor: 'black',
                overflow: 'hidden'
              }}
            >
              <Text style={styles.button}>
                ค้นหา
            </Text>
            </TouchableOpacity>

          </View>

          <ActivityIndicator
            style={{ paddingTop: 20 }}
            color='#cc9966' />
        </View>
      );
    }

    return (

      <View style={styles.container}>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 3 }}>

          <TouchableOpacity onPress={() => navigate('หน้าแรก')}>
            <Image source={require('./assets/images/banner2.jpg')}
              style={styles.logo} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={styles.jobfont}> - หางานหาดใหญ่ - </Text>
          </View>

        </View> */}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.search}>

            <View style={{
              alignSelf: 'center',
              paddingLeft: Platform.OS == 'ios' ? 0 : 5,
            }}>
              <Icon
                name='search'
                color='black'
                size={20}
              />
            </View>

            <View style={{ flexDirection: 'column' }}>
              <TextInput
                style={styles.searchInput}
                placeholder=' ค้นหาตำแหน่ง...'
                placeholderTextColor='#686868'
                underlineColorAndroid="transparent"
                value={this.state.find}
                onChangeText={(find) => this.setState({ find: find })}
              />
            </View>
            
            {this.state.find == '' ? null :
              <TouchableOpacity
                onPress={() => this.setState({ find: '' })}
                style={{ alignSelf: 'center' }}>
                <Ionicons
                  name='md-close-circle'
                  color='black'
                  size={20}
                />
              </TouchableOpacity>
            }

          </View>


          <TouchableOpacity
            onPress={() => this.search()}
            style={{
              alignSelf: 'center',
              marginRight: 5,
              borderRadius: 10,
              backgroundColor: 'black',
              overflow: 'hidden'
            }}
          >
            <Text style={styles.button}>
              ค้นหา
            </Text>
          </TouchableOpacity>

        </View>

        <View>
          {this.state.dataSource.rowIdentities[0].length == 0 ?
            <Text style={{
              fontSize: 18,
              //color: 'white',
              alignSelf: 'center',
              paddingTop: 10,
            }}>
              ---- ไม่พบข้อมูล ----
          </Text> : null}
        </View>

        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor={'transparent'}
            />
          }
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={(rowData, sectionID, rowID) =>
            <View>{this.state.dataSource.length == 0 || this.state.dataSource[rowID] || true ?
              <View style={styles.listView}>
                <TouchableOpacity
                  key={rowData.id}
                  onPress={() => navigate('JobDetail',
                    {
                      image: rowData.IMG,
                      company: rowData.COMPANY,
                      address: rowData.ADDRESS,
                      province: rowData.PROVINCE,
                      tel: rowData.TEL,
                      email: rowData.EMAIL,
                      position: rowData["​POSITION"],
                      rate: rowData.RATE,
                      salary: rowData.SALARY,
                      style: rowData.STYLE,
                      certi: rowData.CERTIFICATE,
                      sex: rowData.SEX,
                      description: rowData.DESCRIPTION,
                      date: rowData.DATE,
                      view: rowData.VIEWS,
                      url: rowData.URL
                    }
                  )}
                >
                  <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}>

                    <View style={{ flex: 30 }}>
                      <Image
                        source={{ uri: rowData.IMG }}
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: 'contain',
                        }} />
                    </View>

                    <View style={{
                      flexDirection: 'column',
                      paddingTop: Platform.OS == 'ios' ? 12 : 5,
                      paddingLeft: 5,
                      flex: 54
                    }}
                    >
                      <Text numberOfLines={1} style={styles.titleText}> ตำแหน่ง : {rowData["​POSITION"]} </Text>
                      <Text numberOfLines={1} style={styles.titleText}> วุฒิการศึกษา : {rowData.CERTIFICATE == "" ? '-' : rowData.CERTIFICATE} </Text>
                      <Text style={styles.titleText}> จังหวัด  : {rowData.PROVINCE} </Text>
                      <Text style={styles.titleText2}> จำนวน : {rowData.RATE} ตำแหน่ง </Text>
                    </View>

                    <View style={{
                      paddingLeft: 5,
                      paddingTop: Platform.OS == 'ios' ? 30 : 15,
                      flex: 16,
                    }}>

                      <Text style={styles.more}> > </Text>

                    </View>
                  </View>
                </TouchableOpacity>
              </View> : null}</View>
          }

          onEndReached={() =>
            this.fetchMore()}
          renderFooter={() => {
            if (this.state.end) {
              <View />
            }
            else {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="small" />
                </View>
              )
            }
          }}

        />

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BROWN[800],
  },
  logo: {
    height: 110,
    width: 150,
  },
  jobfont: {
    fontSize: width * 0.06,
    paddingTop: Platform.OS === 'ios' ? 45 : 40,
    alignSelf: 'center',
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: Platform.OS == 'ios' ? 5 : 0,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'white',
    flex: 5,
    height: Platform.OS == 'ios' ? 40 : 30,
  },
  searchInput: {
    fontSize: 16,
    color: 'black',
    padding: 0,
    width: width - 120,
    //borderWidth: 1,
    flex: 1
  },
  listView: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'left',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    paddingTop: Platform.OS == 'ios' ? 6 : 2,
  },
  titleText2: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#ff0000',
    textAlign: 'left',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    paddingTop: Platform.OS == 'ios' ? 5 : 2,
  },
  more: {
    fontWeight: 'normal',
    fontSize: 50,
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    color: '#696969'
  },
  button: {
    fontSize: Platform.OS == 'ios' ? 16 : 15,
    fontWeight: 'normal',
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    padding: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 3,
    alignItems: 'center'
  },
});
