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
import ActionBar from 'react-native-action-bar';
import DrawerLayout from 'react-native-drawer-layout';
import SwiperFlatList from 'react-native-swiper-flatlist'
import Button from 'react-native-button';
import SideMenu from "./SideMenu"

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      drawerClosed: true,
      cat: [],
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

    //   let cat = [];

    //   for(let i = 1; i <= 9; i++) {
    //     fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat='+i+'&start=0&per_page=1')
    //     .then((response) => response.json())
    //     .then((responseJson) => { console.log(responseJson) 
    //       cat.push(responseJson)
    //       //let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //       this.setState({
    //         cat: cat,
    //       })

    //       if(i == 9){
    //         this.setState({
    //           isLoading: false,
    //         })
    //       }
    //     })
    //       .catch((error) => {
    //        console.error(error);
    //       });
    //   }
    // }

    return fetch('https://www.hatyaifocus.com/rest/api.php?action=news&cat=&start=0&per_page=10')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

              <Image source={require('./assets/images/banner.png')}
                style={styles.logo} />
              <Text style={styles.newfont}> --- ข่าวล่าสุด --- </Text>

            </View>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => <View style={styles.listView}>
                <Text style={styles.titleText}> {rowData.TOPIC.replace(/&#34;/g, '"').replace(/&#39;/g, "'")} </Text>
                <Image source={{ uri: rowData.FEATURE }}
                  style={{ 
                    width: width-10, 
                    height: (width-10) * 0.625
                        }} 
                />
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
            />

            <View style={{ paddingLeft: 10, paddingRight: 280, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewSport')}>
                ข่าวกีฬา >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 200, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewSocial')}>
                ข่าวสังคมและการเมือง >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 250, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEducation')}>
                ข่าวการศึกษา >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 190, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEconomy')}>
                ข่าวเศรษฐกิจและการเงิน >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 270, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewEntertainment')}>
                ข่าวบันเทิง >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 230, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewCrime')}>
                ข่าวอาชญากรรม >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 140, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewScience')}>
                ข่าววิทยาศาสตร์และสิ่งแวดล้อม >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 120, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewAdvertise')}>
                ข่าวประชาสัมพันธ์และการท่องเที่ยว >
              </Button>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 190, paddingTop: 5, paddingBottom: 1 }}>
              <Button
                containerStyle={styles.selectbutton}
                disabledContainerStyle={{ backgroundColor: 'grey' }}
                style={styles.button}
                onPress={() => navigate('NewBusiness')}>
                ข่าวธุรกิจและเทคโนโลยี >
              </Button>
            </View>

            <View style={{ paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 50 }}>

              <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={0}
                showPagination >

                <View style={{ backgroundColor: 'white', paddingRight: 4, paddingLeft: 4, paddingTop: 4 }}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/Mamon-Desserts-%E0%B8%84%E0%B8%B8%E0%B8%81%E0%B8%81%E0%B8%B5%E0%B9%89%E0%B9%81%E0%B8%9F%E0%B8%99%E0%B8%8B%E0%B8%B5%E0%B8%A1%E0%B8%B5%E0%B9%84%E0%B8%AA%E0%B9%89-%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%97%E0%B8%B1%E0%B9%88%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8-2361281234096567/')} >
                    <Image
                      source={{ uri: 'https://www.hatyaifocus.com/admin/upload/slider/65990f908c8c60d20ba78fcbca3144fc.jpg' }}
                      style={styles.advt_1}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'white', paddingRight: 4, paddingLeft: 4, paddingTop: 4, paddingBottom: 4 }}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/บทความ/588-ของกินหาดใหญ่-อาม่าลอดช่องกึ่งศตวรรษ-%40ตลาดกิมหยง/')} >
                    <Image
                      source={{ uri: 'https://www.hatyaifocus.com/admin/upload/slider/a2f856e895de1b9f83a1778e885de440.jpg' }}
                      style={styles.advt_1}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'white', paddingRight: 4, paddingLeft: 4, paddingTop: 4, paddingBottom: 4 }}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/บทความ/611-ของกินหาดใหญ่-สลัดคุณหนู-เมนูเพื่อสุขภาพ-|-ปุณณกันต์-ม.อ./')} >
                    <Image
                      source={{ uri: 'https://www.hatyaifocus.com/admin/upload/slider/545bf391b2297a227b49bc4d3c1e85eb.jpg' }}
                      style={styles.advt_1}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'white', paddingRight: 4, paddingLeft: 4, paddingTop: 4, paddingBottom: 4 }}>
                  <TouchableOpacity onPress={() => Linking.openURL('https://www.hatyaifocus.com/บทความ/623-เรื่องราวหาดใหญ่-ศาลาหลบเสือ-|-โบราณสถานเมืองสงขลา/')} >
                    <Image
                      source={{ uri: 'https://www.hatyaifocus.com/admin/upload/slider/6d3f6b4f9cc3a23120fd473001dda099.jpg' }}
                      style={styles.advt_1}
                    />
                  </TouchableOpacity>
                </View>

              </SwiperFlatList>

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
      </View>
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
    fontSize: 27,
    paddingTop: 35,
    color: 'white',
    fontFamily: Platform.OS == 'ios' ? 'WDBBangna' : 'bangna-new',
  },
  listView: {
    paddingLeft: 5,
    paddingRight: 5,
    //paddingTop: 3, 
    paddingBottom: 3,
  },
  titleText: {
    fontSize: 16,
    paddingTop: 5,
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
    height: (width-48) * 0.526,
    width: width-48,
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
    textAlign: 'center',
    paddingTop: 2
  },
  selectbutton: {
    height: 30,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'black',
  },
});


// <FlatList
            //       keyExtractor={(item, index) => index}
            //       data={this.state.cat}
            //       renderItem={({item}) =>  <View style= {styles.listView}>
            //                                         <Text style={styles.titleText}> {item[0].CATID} </Text>
            //                                         <Image  source= {{uri: item[0].FEATURE}} 
            //                                         style={{width: 374, height: 190}}/>
            //                                         <TouchableOpacity key={item[0].id} 
            //                                                             onPress={() => navigate('New', 
            //                                                                 {
            //                                                                   type: item[0].CATID,
            //                                                                   title: item[0].TOPIC,
            //                                                                   image: item[0].FEATURE,
            //                                                                   description: item[0].DESCRIPTION,
            //                                                                   view: item[0].VIEWS,
            //                                                                 }
            //                                                             )}
            //                                         >
            //                                           <View>
            //                                             <Text style={styles.moredetail}> >>> ดูทั้งหมด >>> </Text>
            //                                           </View>
            //                                         </TouchableOpacity>
            //                                 </View> 
            //                               }
            // />

