import React, { Component } from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  ListView,
  Linking,
  FlatList,
  Dimensions
} from 'react-native';


import Color from 'react-native-material-color';
import { StackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionBar from 'react-native-action-bar';
import DrawerLayout from 'react-native-drawer-layout';
import Button from 'react-native-button';
import SideMenu from "./SideMenu";
import Carousel from 'react-native-looped-carousel';

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drawerClosed: true,
      slide: [],

    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setDrawerState = this.setDrawerState.bind(this);

  }

  setDrawerState() {
    this.setState({
      drawerClosed: !this.state.drawerClosed,
    });
  }

  toggleDrawer = () => {
    if (this.state.drawerClosed) {
      this.DRAWER.openDrawer();               //edit 2 out -> error
    } else {
      this.DRAWER.closeDrawer();              //edit 2 out
    }
  }

  componentDidMount() {

    return fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=&start=0&per_page=10')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        fetch('https://www.hatyaifocus.com/rest/api.php?action=slider')
          .then((response2) => response2.json())
          .then((responseJson2) => {
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
              slide: responseJson2
            }, function () {
              // do something with new state
            });
          })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, backgroundColor: Color.BROWN[800] }}>
          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'black'}
            leftIconName={'menu'}
            icontitle={require('./assets/images/home-icon.png')}
            title={'หน้าแรก'}
            rightIcons={[
              {
                name: 'facebook',
                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                //onPress: () => navigate('Social'),
              },
            ]}
          />
          <ActivityIndicator style={{ paddingTop: 20 }} />
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container} >
        <DrawerLayout
          drawerWidth={260}
          ref={drawerElement => {
            this.DRAWER = drawerElement;
          }}

          drawerPosition={DrawerLayout.positions.Left}
          onDrawerOpen={this.setDrawerState}
          onDrawerClose={this.setDrawerState}
          renderNavigationView={() => <SideMenu {...this.props} />}
        >

          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'black'}
            leftIconName={'menu'}
            onLeftPress={this.toggleDrawer}
            icontitle={require('./assets/images/home-icon.png')}
            title={'หน้าแรก'}
            rightIcons={[
              {
                name: 'facebook',
                onPress: () => Linking.openURL('https://th-th.facebook.com/Hatyaifocus99/'),
                //onPress: () => navigate('Social'),
              },
            ]}
          />

          <ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Image source={require('./assets/images/banner.png')}
                style={styles.logo} />
              <View style={{ flex: 1 }}>
                <Text style={styles.newfont}> --- ข่าวล่าสุด --- </Text>
              </View>

            </View>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.listView}>
                <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
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
                      height: (width - 10) * 0.625
                    }}
                  />
                  <View>
                    <Text style={styles.moredetail}> >>> ดูเพิ่มเติม >>> </Text>
                  </View>
                </TouchableOpacity>
              </View>
              }
            />

            <View style={{ paddingRight: 165 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewSport')}>
                ข่าวกีฬา >
            </Button>
            </View>

            <View style={{ paddingRight: 80 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewSocial')}>
                ข่าวสังคมและการเมือง >
            </Button>
            </View>

            <View style={{ paddingRight: 130 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEducation')}>
                ข่าวการศึกษา >
              </Button>
            </View>

            <View style={{ paddingRight: 65 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEconomy')}>
                ข่าวเศรษฐกิจและการเงิน >
              </Button>
            </View>

            <View style={{ paddingRight: 150 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEntertainment')}>
                ข่าวบันเทิง >
              </Button>
            </View>

            <View style={{ paddingRight: 115 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewCrime')}>
                ข่าวอาชญากรรม >
              </Button>
            </View>

            <View style={{ paddingRight: 25 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewScience')}>
                ข่าววิทยาศาสตร์และสิ่งแวดล้อม >
              </Button>
            </View>

            <Button
              containerStyle={styles.selectbutton}
              disabledContainerStyle={{ backgroundColor: 'grey' }}
              style={styles.button}
              onPress={() => navigate('NewAdvertise')}>
              ข่าวประชาสัมพันธ์และการท่องเที่ยว >
            </Button>

            <View style={{ paddingRight: 70 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewBusiness')}>
                ข่าวธุรกิจและเทคโนโลยี >
              </Button>
            </View>

            <View style={{ paddingTop: 20, paddingBottom: 30 }}>
              <Carousel
                delay={2000}
                style={{
                  height: width * 0.526,
                  width: width,
                  borderWidth: 5,
                  borderColor: 'white',
                }}
                autoplay
                bullets
                arrows
                arrowsContainerStyle={{
                  marginLeft: 5,
                  marginRight: 5,
                }}
                leftArrowText={<FontAwesome name='chevron-circle-left' size={40} color='white' />}
                rightArrowText={<FontAwesome name='chevron-circle-right' size={40} color='white' />}
              >
                {this.state.slide.map((prop, key) => {
                  return (
                    <View
                      key={key}
                      style={{
                        backgroundColor: 'white',
                        width: width,
                      }}>
                      <TouchableOpacity onPress={() => Linking.openURL(this.state.slide[key].URL)} >
                        <Image
                          source={{ uri: this.state.slide[key].FEATURE }}
                          style={styles.advt_1}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                })}

              </Carousel>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20 }}>

              <View style={{ backgroundColor: 'white', paddingRight: 1, paddingLeft: 1, paddingTop: 1, paddingBottom: 1 }}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B9%8C-1380405395370823/')} >
                  <Image source={require('./assets/images/advt_2.jpg')}
                    style={styles.advt_2} />
                </TouchableOpacity>
              </View>

              <View style={{ backgroundColor: 'white', paddingRight: 1, paddingLeft: 1, paddingTop: 1, paddingBottom: 1 }}>
                <Image source={require('./assets/images/advt_3.jpg')}
                  style={styles.advt_3} />
              </View>

            </View>

            <Image source={require('./assets/images/advt_4.jpg')}
              style={styles.advt_4} />

            <Text></Text>
            <Text></Text>

          </ScrollView>

        </DrawerLayout>
      </View >
    )
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
  newfont: {
    fontSize: width * 0.07,
    paddingTop: 35,
    alignSelf: 'center',
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  listView: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
  },
  titleText: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',

  },
  moredetail: {
    fontSize: 14,
    paddingTop: 5,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'right',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
    textDecorationLine: 'underline'
  },
  advt_1: {
    height: width * 0.526,
    width: width,
  },
  advt_2: {
    height: 120,
    width: 180,
  },
  advt_3: {
    height: 120,
    width: 170,
  },
  advt_4: {
    height: 38,
    width: width,
  },
  button: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'left',
    padding: 5,
  },
  selectbutton: {
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'black',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 140
  },
});


