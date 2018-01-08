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
  RefreshControl
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
//import { Dropdown } from 'react-native-material-dropdown';

const { width, height } = Dimensions.get("window");

export default class Jobs extends Component {

  constructor(props) {
    super(props);

    //this.onChangeText = this.onChangeText.bind(this);
    // this.typeRef = this.updateRef.bind(this, 'type');
    // this.provinceRef = this.updateRef.bind(this, 'province');
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);

    // type: 'ประเภท',
    // province: 'จังหวัด',
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: "",
      start: 0,
      end: false,
      findposition: [],
      find: '',
      found: false,
      refreshing: false,
    };
  }

  // onChangeText(text) {
  //   ['type', 'provinceo']
  //     .map((type) => ({ type, ref: this[type] }))
  //     .filter(({ ref }) => ref && ref.isFocused())
  //     .forEach(({ type, ref }) => {
  //       this.setState({ [type]: text });
  //     });
  // }

  // updateRef(type, ref) {
  //   this[type] = ref;
  // }

  _fetchData(callback) {
    fetch('https://www.hatyaifocus.com/rest/api.php?action=jobs&start=' + this.state.start + '&per_page=10')
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

  findposition(find) {
    this.setState({ find: find, found: false })
    for (i = 0; i < this.state._data.length; i++) {
      if (this.state._data[i]["​POSITION"].search(find) > -1) {
        this.state.findposition[i] = true
        this.setState({
          found: true
        })
      }
      else {
        this.state.findposition[i] = false
      }
    }
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.setState({
      dataSource: ds.cloneWithRows(this.state.dataSource)
    });
  }

  render() {

    // let { type, province } = this.state;

    // let textStyle = [
    //   styles[type + province],
    // ];
    const { navigate, goBack } = this.props.navigation;

    if (this.state.isLoading || this.state.refreshing) {
      return (
        <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'black'}
            leftIconName={'menu'}
            onLeftPress={() => navigate('Tab')}
            icontitle={require('./assets/images/work-icon.png')}
            title={'หางานหาดใหญ่'}
            rightIcons={[
              {
                name: 'facebook',
                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                //onPress: () => navigate('Social'),
              },
            ]}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 3 }}>

            <TouchableOpacity onPress={() => navigate('Tab')}>
              <Image source={require('./assets/images/banner2.jpg')}
                style={styles.logo} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={styles.jobfont}> -- หางานหาดใหญ่ -- </Text>
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
          icontitle={require('./assets/images/work-icon.png')}
          title={'หางานหาดใหญ่'}
          rightIcons={[
            {
              name: 'facebook',
              onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
              //onPress: () => navigate('Social'),
            },
          ]}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 3 }}>

          <TouchableOpacity onPress={() => navigate('Tab')}>
            <Image source={require('./assets/images/banner2.jpg')}
              style={styles.logo} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={styles.jobfont}> -- หางานหาดใหญ่ -- </Text>
          </View>

        </View>

        {/* <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 20, paddingLeft: 10 }}>
            <Dropdown
              ref={this.typeRef}
              label=''
              value={type}
              onChangeText={this.onChangeText}
              data={typeData}
            />
          </View>

          <View style={{ flex: 1, paddingRight: 20 }}>
            <Dropdown
              ref={this.provinceRef}
              label=''
              value={province}
              onChangeText={this.onChangeText}
              data={provinceData}
            />
          </View> */}

        {/* <View style={styles.search}>

          <View style={{ paddingTop: Platform.OS == 'ios' ? 0 : 15, paddingLeft: Platform.OS == 'ios' ? 0 : 5 }}>
            <Icon
              name='search'
              color='black'
              size={20}
            />
          </View>

          <View style={{ flex: 1, paddingTop: 3 }}>
            <TextInput
              style={styles.searchInput}
              placeholder=' ค้นหาตำแหน่ง...'
              placeholderTextColor='#686868'
              underlineColorAndroid="transparent"
              value={this.state.find}
              onChangeText={(find) => this.findposition(find)}
            />
          </View>
        </View> */}
        {/* </View> */}

        {/* <View>
          {this.state.findposition.length != 0 && !this.state.found ?

            <Text style={{
              fontSize: 17,
              alignSelf: 'center',
              paddingTop: 10,
            }}>
              ---- ไม่พบข้อมูล ----
          </Text> : null}
        </View> */}

        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <View>{this.state.findposition.length == 0 || this.state.findposition[rowID] ?
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
  },
  searchInput: {
    fontSize: 14,
    color: 'black',
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
    paddingTop: Platform.OS == 'ios' ? 5 : 2,
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
  }
});


// const typeData = [
//   { value: 'ราชการ' },
//   { value: 'เอกชน' },
//   { value: 'Part Time' },
// ];

// const provinceData = [
//   { value: 'สงขลา' },
//   { value: 'กระบี่' },
//   { value: 'ภูเก็ต' },
//   { value: 'ตรัง' },
//   { value: 'สตูล' },
// ];