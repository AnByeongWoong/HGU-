import React, { Component } from "react";

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Linking, Platform, SafeAreaView, TextInput, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon, Rating, AirbnbRating, Header, withTheme } from "react-native-elements"
import SearchHeader from 'react-native-search-header';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import call from 'react-native-phone-call';
import { ScrollView } from "react-native-gesture-handler";
import { startAsync } from "expo/build/AR";
import { info } from "./LoadAsyncStorage";
import { db } from "./dataBase";
import { DataList } from "./Main";
import Loading from "./Loading";

// 식당 정보 페이지 만드는 클래스
export default class InfoByName extends React.Component {
    constructor(props) {
      super(props);
      this.isLatestData = true;
      this.selectedRestaurantName = this.props.navigation.getParam('NameOfRestaurant');
      this.selectedRestaurant = null;
      this.state = {
        loadDB : true,
        waitingDB : true,
        heartButtonColor : true,
        Default_Rating : 0,
        starPoint: 0,
        splitMenu: [],

        network: false,
      };
    }
    _onPressButton(arg){
      search=arg
      console.log(search);
      this.setState({
        value: ''
      })
    }
    HeartButtonPress(){
      this.setState({
        heartButtonColor : !this.state.heartButtonColor
      });
    }
    UpdateRating(key){
      this.setState({Default_Rating : key})
    }

    /**
     * load database (9/8 updated)
     */
    loadData() {
      db.collection('restaurants').doc(this.selectedRestaurantName).get().then(doc => {
        if(!doc.exists) {
          console.log('No such document');
        } else {
          this.selectedRestaurant = doc.data();
          // console.log(this.selectedRestaurant);
        }
      }).then(() => {
        this.setState({
          loadDB: false,
          waitingDB: false,
          starPoint: (this.selectedRestaurant.totalPoint / this.selectedRestaurant.starUserCount).toFixed(2)
        });
      });
    }

    /**
     * to submit star point and update db (8/7 updated)
     * with bug: 별점을 매긴 후, 다시 검색해서 별점을 매길 때 두번째부터는 숫자가 한번 올라감.... (8/9 updated)
     * debugging complete (8/12 updated)
     */
    submitStarPoint(){
      /////////네트워크 체크
      if(this.state.network == true){
        Alert.alert("경고","\n네트워크 연결을 확인해주세요.");
        return;
      }

      let newTotal = this.selectedRestaurant.totalPoint + this.state.Default_Rating;
      let newUserCount = this.selectedRestaurant.starUserCount + 1;
      let docRef = db.collection('restaurants').doc(this.selectedRestaurant.name);
      let existPoint, alertMsg;
      let targetIndex;

      /**
       * cache data update : find target (8/14 updated)
       */
      console.log(DataList.object_list);
      for(let i = 0; i < DataList.object_list.length; i++) {
        if(DataList.object_list[i].name === this.selectedRestaurant.name) {
          targetIndex = i;
          break;
        }
      }


      docRef.collection('starUserList').doc(info.ID).get().then(doc => {
        if(doc.exists) {
          existPoint = doc.data().point;
          alertMsg = String(existPoint).concat("점에서 ", this.state.Default_Rating, "점으로 변경되었습니다.");
          alert(alertMsg);
          newTotal -= existPoint;
          newUserCount--;
        }   
        else{
          Alert.alert("등록", this.state.Default_Rating+"점으로 등록하셨습니다.")
        }      
      })
      .catch(err =>{
        var targetIndex = 0;
        for(let i = 0; i < DataList.object_list.length; i++) {
          if(DataList.object_list[i].name === this.selectedRestaurant.name) {
            targetIndex = i;
            break;
          }
        }
        this.selectedRestaurant = DataList.object_list[targetIndex];

        this.setState({
          loadDB: false,
          waitingDB: false,
          network: true,
        })
      })
      .then(()=>{
        docRef.update({
          totalPoint: newTotal,
          starUserCount: newUserCount
        }).then(()=>{
          this.setState({
            starPoint: (newTotal / newUserCount).toFixed(2), 
            loadDB: true
          })
          this.isLatestData = false;
          // console.log("starPoint successfully updated! : ", newTotal / newUserCount );
        });

        docRef.collection('starUserList').doc(info.ID).set({
          point: this.state.Default_Rating,
        });

        /**
         * cache data update : assign new value & write cache file
         */
        DataList.object_list[targetIndex].totalPoint = newTotal;
        DataList.object_list[targetIndex].starUserCount = newUserCount;
        DataList.overwriteText(DataList.object_list);
      });

    }

    onPressComment(selectedRestaurant){
      console.log("RestInfo:",selectedRestaurant);
      this.props.navigation.navigate('Comment', {CommentKey: selectedRestaurant})
    }

    render() {
      let heartColor=this.state.heartButtonColor ? 'md-heart' : 'md-heart-empty'
      let Rating_Bar = [];
      if(this.state.loadDB) {
        this.loadData();
      }

      if (this.state.waitingDB) {
        return(
          <Loading/>
          );
      }
      this.state.splitMenu = this.selectedRestaurant.menu.split("\t");
      if(this.state.network == true){
        return (
          <SafeAreaView 
            style={{
              flex: 1,
              marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
            }}
          >
            <View style={styles.header}>
              <Icon
                name= 'arrow-back'
                type='ionicons'
                onPress={this.BackButtonPress.bind(this)}
              />
            </View>
            <ScrollView>
              <View style={styles.content}>
                <View style={styles.title}>
                  <Text 
                    style={{
                    fontFamily: 'hanna', 
                    flexWrap:'wrap', 
                      width:(Dimensions.get('window').width)/100*75, 
                      fontSize : RFPercentage(4),
                    }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >{this.selectedRestaurant.name}
                  </Text>
                  {/* <Text style={{fontSize : RFPercentage(4), fontFamily: 'do-hyeon', flexWrap:'wrap', width:(Dimensions.get('window').width)/100*70}}>
                    아리가또맘마 
                    {this.selectedRestaurant.name}
                  </Text> */}
                  <Icon
                    name={heartColor}
                    type='ionicon'
                    color='#e64980'
                    //color={this.selectedRestaurant.heart}
                    //color={this.selectedRestaurant.heart}
                    size={RFValue(30)}
                    // onPress={this.HeartButtonPress.bind(this)}
                    iconStyle={{padding:10}}
                  />
                </View>
                <View style={styles.image}>
                <View style={{width : '100%', height : 250, flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor:'#DDDDDD'}}>
                  <Text style={{fontSize : RFPercentage(2), fontFamily: 'hanna'}}>네트워크 연결이 되어있지 않습니다.</Text>
                </View>
                
              </View>
                <View style={styles.icons}>
                  <Icon
                    name='place'
                    size={RFValue(30)}
                    iconStyle={{paddingRight:5}}
                  />
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80, margin:5}}>
                    <Text style={{flexDirection: 'row', flexWrap: 'wrap', fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
                      {this.selectedRestaurant.location}
                    </Text>
                    <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna'}} onPress={()=>Linking.openURL(this.selectedRestaurant.locationLink)}>
                      (지도보기)
                    </Text>
                  </View>
                </View>
                <View style={styles.icons}>
                  <Icon
                    name='call'
                    size={RFValue(30)}
                    iconStyle={{paddingRight:5}}
                  />
                  <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna', margin:2.5}}>
                  {this.selectedRestaurant.phoneNumber}
                  </Text>
                  <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna', margin:2.5}} onPress={()=>call({number : this.selectedRestaurant.phoneNumber})}>
                    (전화걸기)
                  </Text>
                </View>
                <View style={styles.icons}>
                  <Icon
                    name='schedule'
                    size={RFValue(30)}
                    iconStyle={{paddingRight:5}}
                  />
                  <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80, margin:5}}>
                    <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
                      {/* 9:00~22:00 */}
                      {this.selectedRestaurant.hour}
                    </Text>
                  </View>
                </View>
                <View style={styles.image}>
                  <View style={styles.ratingstar}>
                    <Text style={styles.textStyle}>
                      {/* 평점 : {this.state.average} / 5.0 */}
                      {/* 평점 : {(this.selectedRestaurant.totalPoint / this.selectedRestaurantData.starUserCount).toFixed(2)} / 5.00 */}
                      평점 : 0 / 5.00
                    </Text>
                    <View style={styles.starscore}>{Rating_Bar}</View>
                  </View>                
                  <TouchableOpacity
                    style={styles.button}
                    // onPress={() => alert(this.state.Default_Rating)}>
                    onPress={this.submitStarPoint.bind(this)}>
                    <Text style={{color: 'white', fontFamily: 'hanna'}}>별점주기</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.menuinfo}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', padding : 5}}>
                    <Text style={{fontSize : RFPercentage(3.5), fontWeight : 'bold', fontFamily: 'hanna'}}>
                      메뉴 정보
                    </Text>
                    <TouchableOpacity
                      style={{ backgroundColor: 'white', borderRadius: 5, borderColor: 'pink', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 7, paddingVertical: 7}}
                      onPress={this.onPressComment.bind(this, this.selectedRestaurant.name)}
                    >
                      <Icon
                        name='comment'
                        type='evilicon'
                        color= 'pink'
                      />
                      <Text style={{fontFamily: 'hanna'}}>댓글</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems: 'flex-start', padding : 5}}>
                    <Text style={{fontSize : RFValue(20), textAlign : 'left', fontFamily: 'hanna'}}>
                      {this.state.splitMenu[0]}
                    </Text>
                    <Text style={{fontSize : RFValue(20), textAlign : 'right', fontFamily: 'hanna'}}>
                      {this.state.splitMenu[1]}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
      }
      for (let i = 1; i <= 5; i++) {
        Rating_Bar.push(
          <TouchableOpacity
            key={i}
            onPress={this.UpdateRating.bind(this, i)}>
            <Image
              style={styles.StarImage}
              source={
                i <= this.state.Default_Rating
                  ? require('./ratingStar/star.png') 
                  : require('./ratingStar/starGrey.png')
              }
            />
          </TouchableOpacity>
        );
      }

      return (
        <SafeAreaView 
          style={{
            flex: 1,
            marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
          }}
        >
          <View style={styles.header}>
            <Icon
              name= 'arrow-back'
              type='ionicons'
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.title}>
                <Text 
                  style={{
                    fontFamily: 'hanna', 
                    flexWrap:'wrap', 
                    width:(Dimensions.get('window').width)/100*75, 
                    fontSize : RFPercentage(4),
                  }}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >{this.selectedRestaurant.name}</Text>
                <Icon
                  name={heartColor}
                  type='ionicon'
                  color='#e64980'
                  //color={this.selectedRestaurant.heart}
                  size={RFValue(30)}
                  onPress={this.HeartButtonPress.bind(this)}
                  iconStyle={{padding: 10}}
                />
              </View>
              <View style={styles.image}>
                <Image
                  style={{width : '100%', height : 250}}
                  source={{uri: this.selectedRestaurant.image}}
                />
              </View>
              <View style={styles.icons}>
                <Icon
                  name='place'
                  size={RFValue(30)}
                  iconStyle={{paddingRight:5}}
                />
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80, margin:5}}>
                  <Text style={{flexDirection: 'row', fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
                    {this.selectedRestaurant.location}
                  </Text>
                  <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna'}} onPress={()=>Linking.openURL(this.selectedRestaurant.locationLink)}>
                    (지도보기)
                  </Text>
                </View>
              </View>
              <View style={styles.icons}>
                <Icon
                  name='call'
                  size={RFValue(30)}
                  iconStyle={{paddingRight:5}}
                />
                <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna', margin:5}}>
                {this.selectedRestaurant.phoneNumber}
                </Text>
                <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna', margin:5}} onPress={()=>call({number : this.selectedRestaurant.phoneNumber})}>
                  (전화걸기)
                </Text>
              </View>
              <View style={styles.icons}>
                <Icon
                  name='schedule'
                  size={RFValue(30)}
                  iconStyle={{paddingRight:5}}
                />
                <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80, margin:5}}>
                  <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
                    {/* 9:00~22:00 */}
                    {this.selectedRestaurant.hours}
                  </Text>
                </View>
              </View>
              <View style={styles.image}>
                <View style={styles.ratingstar}>
                  <Text style={styles.textStyle}>
                    {/* 평점 : {this.state.average} / 5.0 */}
                    평점 : {this.state.starPoint} / 5.00
                  </Text>
                  <View style={styles.starscore}>{Rating_Bar}</View>
                </View>                
                <TouchableOpacity
                  style={styles.button}
                  // onPress={() => alert(this.state.Default_Rating)}>
                  onPress={this.submitStarPoint.bind(this)}>
                  <Text style={{color: 'white', fontFamily: 'hanna'}}>별점주기</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.menuinfo}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', padding : 5}}>
                  <Text style={{fontSize : RFPercentage(3.5), fontWeight : 'bold', fontFamily: 'hanna'}}>
                    메뉴 정보
                  </Text>
                  <TouchableOpacity
                    style={{ backgroundColor: 'white', borderRadius: 5, borderColor: 'pink', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 7, paddingVertical: 7}}
                    onPress={this.onPressComment.bind(this, this.selectedRestaurant.name)}
                  >
                    <Icon
                      name='comment'
                      type='evilicon'
                      color= 'pink'
                    />
                    <Text style={{fontFamily: 'hanna'}}>댓글</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems: 'flex-start', padding : 5}}>
                  <Text style={{fontSize : RFValue(20), textAlign : 'left', fontFamily: 'hanna'}}>
                    {this.state.splitMenu[0]}
                  </Text>
                  <Text style={{fontSize : RFValue(20), textAlign : 'right', fontFamily: 'hanna'}}>
                    {this.state.splitMenu[1]}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }

// 스타일
const styles = StyleSheet.create({
  content: {
    flex:1,
    flexDirection : 'column',
    paddingHorizontal : RFValue(15),
  },
  header : {
    backgroundColor: 'white', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems : 'center',
    height : RFValue(55),
    padding : RFValue(15),
    borderColor : '#AAAAAA',
    borderBottomWidth :1,
    
  },
  title : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    padding: 10,
  },
  image : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems: 'center',
    paddingBottom : 10,
  },
  icons : {
    flexDirection : 'row',
    justifyContent : 'flex-start',
    alignItems : 'flex-start',
    paddingVertical : RFValue(5),
  },
  ratingstar :{
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    paddingVertical : RFValue(10),
  },
  StarImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginHorizontal : 1,
  },
  starscore: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    textAlign: 'center',
    fontSize:  RFValue(25),
    color: 'grey',
    fontFamily: 'hanna',
  },
  button: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginLeft : 5,
    padding: 10,
    backgroundColor: '#e64980',
    borderRadius : 10
  },
  menuinfo : {
    paddingVertical : 10,
    borderTopWidth : 1,
    borderTopColor : '#AAAAAA',
    flexDirection: 'column'
  },
});

// return (
//   <SafeAreaView 
//     style={{
//       flex: 1,
//       marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
//     }}
//   >
//     <View style={styles.header}>
//       <Icon
//         name= 'arrow-back'
//         type='ionicons'
//         onPress={() => this.props.navigation.goBack()}
//       />
//     </View>
//     <ScrollView>
//       <View style={styles.content}>
//         <View style={styles.title}>
//         <Text 
//           style={{
//             fontFamily: 'hanna', 
//             flexWrap:'wrap', 
//             width:(Dimensions.get('window').width)/100*75, 
//             fontSize : RFPercentage(4),
//           }}
//           adjustsFontSizeToFit={true}
//           numberOfLines={1}
//         >{this.selectedRestaurant.name}</Text>
//           <Icon
//             name={heartColor}
//             type='ionicon'
//             color='#e64980'
//             //color={this.selectedRestaurant.heart}
//             size={RFValue(30)}
//             onPress={this.HeartButtonPress.bind(this)}
//             iconStyle={{padding: 10}}
//           />
//         </View>
//         <View style={styles.image}>
//           <Image
//             style={{width : '100%', height : 250}}
//             source={{uri: this.selectedRestaurant.image}}
//           />
//         </View>
//         <View style={styles.icons}>
//           <Icon
//             name='place'
//             size={RFValue(30)}
//             iconStyle={{paddingRight:5}}
//           />
//           <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80, marginTop:5}}>
//             <Text style={{flexDirection: 'row', fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
//               {this.selectedRestaurant.location}
//             </Text>
//             <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna'}} onPress={()=>Linking.openURL(this.selectedRestaurant.locationLink)}>
//               (지도보기)
//             </Text>
//           </View>
//         </View>
//         <View style={styles.icons}>
//           <Icon
//             name='call'
//             size={RFValue(30)}
//             iconStyle={{paddingRight:5}}
//           />
//           <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
//           {this.selectedRestaurant.phoneNumber}
//           </Text>
//           <Text style={{fontSize : RFPercentage(3), color:'#e64980', fontFamily: 'hanna'}} onPress={()=>call({number : this.selectedRestaurant.phoneNumber})}>
//             (전화걸기)
//           </Text>
//         </View>
//         <View style={styles.icons}>
//           <Icon
//             name='schedule'
//             size={RFValue(30)}
//             iconStyle={{paddingRight:5}}
//           />
//           <View style={{flexDirection: 'row', flexWrap: 'wrap', width: (Dimensions.get('window').width)/100*80,}}>
//             <Text style={{fontSize : RFPercentage(3), fontFamily: 'hanna'}}>
//               {/* 9:00~22:00 */}
//               {this.selectedRestaurant.hours}
//             </Text>
//           </View>
//         </View>
//         <View style={styles.image}>
//           <View style={styles.ratingstar}>
//             <Text style={styles.textStyle}>
//               {/* 평점 : {this.state.average} / 5.0 */}
//               평점 : {this.state.starPoint} / 5.00
//             </Text>
//             <View style={styles.starscore}>{Rating_Bar}</View>
//           </View>                
//           <TouchableOpacity
//             style={styles.button}
//             // onPress={() => alert(this.state.Default_Rating)}>
//             onPress={this.submitStarPoint.bind(this)}>
//             <Text style={{color: 'white', fontFamily: 'hanna'}}>별점주기</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.menuinfo}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', padding : 5}}>
//             <Text style={{fontSize : RFPercentage(3.5), fontWeight : 'bold', fontFamily: 'hanna'}}>
//               메뉴 정보
//             </Text>
//             <TouchableOpacity
//               style={{ backgroundColor: 'white', borderRadius: 5, borderColor: 'pink', borderWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 7, paddingVertical: 7}}
//               onPress={this.onPressComment.bind(this, this.selectedRestaurant.name)}
//             >
//               <Icon
//                 name='comment'
//                 type='evilicon'
//                 color= 'pink'
//               />
//               <Text style={{fontFamily: 'hanna'}}>댓글</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems: 'flex-start', padding : 5}}>
//             <Text style={{fontSize : RFValue(20), textAlign : 'left', fontFamily: 'hanna'}}>
//               {this.state.splitMenu[0]}
//             </Text>
//             <Text style={{fontSize : RFValue(20), textAlign : 'right', fontFamily: 'hanna'}}>
//               {this.state.splitMenu[1]}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// );