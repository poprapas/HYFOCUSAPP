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
} from 'react-native';

import ActionBar from 'react-native-action-bar';
import Color from 'react-native-material-color';
import { Dropdown } from 'react-native-material-dropdown';

export default class Jobs extends Component {

  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.typeRef = this.updateRef.bind(this, 'type');
    this.provinceRef = this.updateRef.bind(this, 'province');
    this.fetchMore = this._fetchMore.bind(this);
    this.fetchData = this._fetchData.bind(this);

    this.state = {
      type: 'ประเภท',
      province: 'จังหวัด',
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: "", 
      start: 0, 
    };
  }

  onChangeText(text) {
    ['type', 'provinceo']
      .map((type) => ({ type, ref: this[type] }))
      .filter(({ ref }) => ref && ref.isFocused())
      .forEach(({ type, ref }) => {
        this.setState({ [type]: text });
      });
  }

  updateRef(type, ref) {
    this[type] = ref;
  }

  _fetchData(callback) {
    fetch('https://www.hatyaifocus.com/rest/api.php?action=jobs&start='+this.state.start+'&per_page=10')
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

    let { type, province} = this.state;

    let textStyle = [
      styles[type + province],
    ];

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
          title={'หางานหาดใหญ่'} 
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

        <View style={{ flexDirection: 'row'}}>
          <View style={{ flex: 1, paddingRight: 20, paddingLeft: 10 }}>
            <Dropdown
              ref={this.typeRef}
              label= ''
              value={type}
              onChangeText={this.onChangeText}
              data={typeData}
            />
          </View>

          <View style={{ flex: 1, paddingRight: 20  }}>
            <Dropdown
              ref={this.provinceRef}
              label= ''
              value={province}
              onChangeText={this.onChangeText}
              data={provinceData}
            />
          </View>

          <View style={{ flex: 1, paddingRight: 10 }}>
            <TextInput
              style={styles.searchInput}
              placeholder='ตำแหน่งงาน'
              placeholderTextColor = 'black'
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>  
              <View style= {styles.listView}>
                  <View style= {{flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-around', paddingTop: 5}}>

                    <Image  source= {{uri: rowData.IMG}} 
                      style={{width: 105, height: 100}}/>

                    <View style= {{flexDirection: 'column', paddingTop: 5}}>
                      <Text style={styles.titleText}> ตำแหน่ง : {rowData["​POSITION"]} </Text>
                      <Text style={styles.titleText}> วุฒิการศึกษา : {rowData.CERTIFICATE} </Text>
                      <Text style={styles.titleText}> จังหวัด  : {rowData.PROVINCE} </Text>
                      <Text style={styles.titleText}> จำนวน : {rowData.RATE} ตำแหน่ง </Text>
                    </View>

                    <View style= {{paddingLeft: 5, paddingTop: 20}}>
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
                            position: rowData["POSITION"],
                            rate: rowData.RATE,
                            salary: rowData.SALARY,
                            style: rowData.STYLE,
                            certi: rowData.CERTIFICATE,
                            sex: rowData.SEX,
                            description: rowData.DESCRIPTION,
                            date: rowData.DATE,
                            view: rowData.VIEWS,
                          }
                        )}
                      >
                        <Text style={styles.more}> > </Text>      
                      </TouchableOpacity>                  
                    </View>

                  </View>
                                                        
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
  searchInput: {
      height: 20,
      padding: 4,
      marginRight: 3,
      marginTop: 35,
      flexGrow: 0.5,
      fontSize: 14,
      color: 'black',
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      borderRadius: 4,
      textAlign: 'center',
      backgroundColor: 'white',
  },
  listView: {
      paddingTop: 2, 
      paddingBottom: 2,
  },
  titleText: {
      fontSize: 14,
      fontWeight: 'normal',
      color:'black',
      textAlign:'left',
      fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  more: {
      fontWeight: 'normal',
      fontSize: 50,
      fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  }
});


const typeData = [
  { value: 'ราชการ' },
  { value: 'เอกชน' },
  { value: 'Part Time' },
];

const provinceData = [
  { value: 'สงขลา' },
  { value: 'กระบี่' },
  { value: 'ภูเก็ต' },
  { value: 'ตรัง' },
  { value: 'สตูล' },
];