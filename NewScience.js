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
  Dimensions,
  RefreshControl
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';

const { width, height } = Dimensions.get("window");

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
      end: false,
      refreshing: false,
    }
  }

  _fetchData(callback) {
    fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=7&start=' + this.state.start + '&per_page=10')
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
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data),
            isLoadingMore: false,
            _data: data,
            _dataAfter: responseJson.data,
            start: this.state.start + 10,
          });
        }
      });
    }
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
        refreshing: false,
      });
    });
  }

  _onRefresh() {
    if (!this.state.refreshing) {
      this.setState({
        refreshing: true,
        start: 0
      }, this.componentDidMount)
    }
  }

  render() {

    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'black'}
            leftIconName={'back'}
            onLeftPress={() => navigate('Tab')}
            icontitless={"newspaper-o"}
            title={'ข่าววิทยาศาสตร์และสิ่งแวดล้อม'}
            rightIcons={[
              {
                name: 'facebook',
                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
              },
            ]}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => navigate('Tab')}>
              <Image source={require('./assets/images/banner2.jpg')}
                style={styles.logo} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={styles.bannerfont}> - ข่าววิทยาศาสตร์และสิ่งแวดล้อม - </Text>
            </View>

          </View>
          <ActivityIndicator style={{ paddingTop: 20 }} />
        </View>
      );
    }

    return (
      <View style={styles.container}>

        <ActionBar
          containerStyle={styles.bar}
          backgroundColor={'black'}
          leftIconName={'back'}
          onLeftPress={() => navigate('Tab')}
          icontitless={"newspaper-o"}
          title={'ข่าววิทยาศาสตร์และสิ่งแวดล้อม'}
          rightIcons={[
            {
              name: 'facebook',
              onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
            },
          ]}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => navigate('Tab')}>
            <Image source={require('./assets/images/banner2.jpg')}
              style={styles.logo} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={styles.bannerfont}> - ข่าววิทยาศาสตร์และสิ่งแวดล้อม - </Text>
          </View>

        </View>

        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={styles.listView}>
            <View style={{ paddingBottom: 5 }}>
              <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
            </View>
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
              <Image source={{ uri: rowData.FEATURE }}
                style={{
                  width: width - 10,
                  height: (width - 10) * 0.625,
                  backgroundColor: '#6a5750'
                }} />

              <View style={{ paddingTop: 5 }}>
                <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    height: 110,
    width: 150,
  },
  bannerfont: {
    fontSize: Platform.OS === 'ios' ? width * 0.05 : width * 0.038,
    paddingTop: Platform.OS === 'ios' ? 50 : 48,
    alignSelf: 'center',
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  listView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 20
  },
  moredetail: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'right',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    paddingTop: 5,
    textDecorationLine: 'underline'
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    paddingTop: 10,
  },
});

