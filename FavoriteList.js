// import React, { Fragment, Component } from "react";
// import {
//   createBottomTabNavigator,
//   createStackNavigator,
//   createAppContainer,
// } from 'react-navigation';
// import { SafeAreaView, Linking, Platform, AppRegistry, FlatList, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { Left, Right, Icon, Rating, AirbnbRating, Header } from "react-native-elements"
// import SearchHeader from 'react-native-search-header';
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import RestaurantInfo from "./RestaurantInfo";
// import {tagArray} from "./Tabview";
// import {db} from "./dataBase";
// // import {DataList} from "./App";
// import { DataList } from "./Main";

// // 메인 페이지 만드는 클래스
// export default class FavoritetList extends React.Component {
//   static navigationOptions = {        // Navigation Header 삭제
//     header: null
//   };
//   constructor(props) {
//     super(props);

//     this.state = {
//       list: [],
//       waitFavoriteList: false,
//     };
//   }


//   _onPressButton(arg){
//     search=arg
//     console.log(search);
//     this.setState({
//       value: ''
//     })
//   }
//   RestaurantPress(selectedRestaurant){
//     this.props.navigation.navigate('Info',{informationOfRestaurant: selectedRestaurant})
//   }
//   homeButtonPress(){
//     // DataList.getUserData();
//     this.props.navigation.navigate('Home');
//   }
//   HeartButtonPress(index){
//     if(this.state.list.length == 1){
//       this.state.list.pop();
//       DataList.wirteUserFavorite("");
//       this.setState({});
//     }
//     this.state.list.splice(index,1);

//     var string = "";
//     for(var i=0; i<this.state.list.length; i++){
//       string += "re점프al"+ String(this.state.list[i].delivery) + "re점프al"+ String(this.state.list[i].kind) + "re점프al"+this.state.list[i].region + "re점프al" + this.state.list[i].heart + "re점프al" + this.state.list[i].hours + "re점프al" + this.state.list[i].image + "re점프al" + this.state.list[i].location + "re점프al" + this.state.list[i].locationLink  + "re점프al"+this.state.list[i].name+"re점프al"+this.state.list[i].phoneNumber+"re점프al"+String(this.state.list[i].starUserCount)+"re점프al"+String(this.state.list[i].totalPoint) + "re점프al"+ this.state.list[i].menu +"re이단점프al" ;
//     }

//     DataList.wirteUserFavorite(string);
//     this.setState({});
//   }
//   RestaurantPress(selectedRestaurant){
//     this.props.navigation.navigate('Info', {informationOfRestaurant: selectedRestaurant})
//   }

//   /**
//    * update cache data when press update button. (5/18 updated)
//    */
//   _onPressUpdate = () => {
//     Alert.alert(
//       'Update',
//       '최신 정보로 업데이트하시겠습니까?\n데이터가 소모될 수 있습니다.',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log("updateData canceled"),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => DataList.updateData(),
//         },
//       ],
//       {cancelable: false},
//     );
//     console.log("update executed");
//   }

//   render() {
//     if(this.state.waitFavoriteList == false){
//       // DataList.getUserData().then(
//       //   this.setState(waitFavoriteList = true)
//       // )
//       // .catch(err=>{
//       //   console.log("favorite error");
//       // }
//       // )
//       // DataList.getUserData();
//       this.setState({waitFavoriteList : true, list: DataList.userFavoriteList});
//     }

//     // if(this.state.list == null){
//     //   console.log("flkaj");
//     // }
//     // else{
//     //   for(var i=0; i<DataList.userFavoriteList.length; i++){
//     //     console.log("내가찜한"+DataList.userFavoriteList[i].name);
//     //   }
//     // }



//     return (
//       <Fragment>
//         <SafeAreaView style={{ flex:0, backgroundColor: 'white', marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()}} />
//         <SafeAreaView style={{ flex: 1, backgroundColor : 'pink'}} >
//           <View style={styles.container}>
//             <View style={styles.header} >
//               <Text style={{fontSize: RFValue(24), fontFamily: 'yeon-sung'}}>
//                 MY PAGE
//               </Text>
//             </View>
//             <View style={styles.button}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor : '#DDDDDD',
//                   flexDirection : 'row',
//                   justifyContent : 'center',
//                   alignItems : 'center',
//                   paddingVertical : 5,
//                   paddingHorizontal : 20,
//                   borderRadius : 5,
//                 }}
//                 onPress={() => this._onPressUpdate()}
//               >
//                 <Text  style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
//                   최신정보{'\n'}업데이트
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor : '#DDDDDD',
//                   flexDirection : 'row',
//                   justifyContent : 'center',
//                   alignItems : 'center',
//                   paddingVertical : 5,
//                   paddingHorizontal : 20,
//                   borderRadius : 5,
//                 }}
//                 onPress={()=>Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfodGhM-2Hn1Hqh1OTD9UJwVKSHa987r5w47xSez85LxsGmNQ/viewform")}
//               >
//                 <Text style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
//                   식당{'\n'}추가/수정/삭제
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor : '#DDDDDD',
//                   flexDirection : 'row',
//                   justifyContent : 'center',
//                   alignItems : 'center',
//                   paddingVertical : 5,
//                   paddingHorizontal: 20,
//                   borderRadius : 5,
//                 }}
//                 onPress={()=>Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSf-IAFGjLwzrvK6o7qH50nZAiHgwip2vvt7gsH_VImxwvRJRA/viewform")}
//               >
//                 <Text style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
//                   문의 및{'\n'}피드백
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{marginHorizontal:RFValue(15), borderBottomWidth:1, borderBottomColor: '#DDDDDD'}}>
//               <Text style={{fontSize: RFValue(20), paddingBottom: RFValue(10), color: 'gray', fontFamily: 'hanna'}}> 내가 찜한 식당</Text>
//             </View>
//             <View style={styles.content}>
//               <FlatList
//                 data={this.state.list}
//                 contentContainerStyle={{paddingTop : RFValue(15), paddingHorizontal : RFValue(15)}}
//                 renderItem={({item, index}) =>
//                   <View>
//                     <TouchableOpacity style={styles.element} onPress={this.RestaurantPress.bind(this,item)}>
//                       <View style={{flexDirection : 'column',alignItems:'flex-start' ,justifyContent:'flex-start'}}>
//                         <Text style={{fontSize: RFValue(20), fontFamily: 'hanna'}}> {item.name} </Text>
//                         <Rating
//                           style={{marginLeft:RFValue(1)}}
//                           readonly
//                           imageSize={RFPercentage(2.5)}
//                           startingValue={(item.totalPoint / item.starUserCount)}
//                         />
//                       </View>
//                       <View style={{padding : RFValue(10)}}>
//                         <Icon
//                           name='heart'
//                           type='octicon'
//                           color={item.heart}
//                           size={RFValue(30)}
//                           onPress={this.HeartButtonPress.bind(this, index)}
//                         />
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 }
//               />
//             </View>
//             <View style={{flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center', backgroundColor: 'pink', height : 50}}>
//               <TouchableOpacity
//                 style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}
//                 onPress={this.homeButtonPress.bind(this)}

//               >
//                 <Text style = {{fontFamily: 'hanna'}}>Home</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}

//               >
//                 <Text style = {{fontFamily: 'hanna'}}>My Page</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Fragment>
//     );
//   }
// }

// // 스타일
// const styles = StyleSheet.create({
//   container :{
//     flex:1,
//     backgroundColor: 'white'
//   },
//   header : {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems : 'center',
//     height : RFValue(55),
//     padding : RFValue(15),
//     borderBottomColor : "#AAAAAA",
//     borderBottomWidth : 1,
//   },
//   button : {
//     flexDirection : 'row',
//     justifyContent : 'space-between',
//     alignItems: 'center',
//     paddingVertical : RFValue(15),
//     paddingHorizontal : '4%'
//   },
//   content: {
//     flex:1,
//     flexDirection : 'column',
//     justifyContent : 'flex-start',
//     alignItems : 'stretch',
//     backgroundColor : 'white',
//   },
//   element : {
//     padding: RFValue(10),
//     flexDirection : 'row',
//     justifyContent : 'space-between',
//     alignItems : 'center',
//     height: RFValue(80),
//     fontSize: RFPercentage(6),
//     borderWidth : RFValue(5),
//     borderColor : 'pink',
//     marginBottom : RFValue(20),
//     borderRadius : 5,
//   },
// });

import React, { Fragment, Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { SafeAreaView, Linking, Platform, AppRegistry, FlatList, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Left, Right, Icon, Rating, AirbnbRating, Header } from "react-native-elements"
import SearchHeader from 'react-native-search-header';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RestaurantInfo from "./RestaurantInfo";
import {tagArray} from "./Tabview";
import {db} from "./dataBase";
// import {DataList} from "./App";
import { DataList } from "./Main";

// 메인 페이지 만드는 클래스
export default class FavoritetList extends React.Component {
  static navigationOptions = {        // Navigation Header 삭제
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      waitFavoriteList: false,
    };
  }


  _onPressButton(arg){
    search=arg
    console.log(search);
    this.setState({
      value: ''
    })
  }
  RestaurantPress(selectedRestaurant){
    this.props.navigation.navigate('Info',{informationOfRestaurant: selectedRestaurant})
  }
  homeButtonPress(){
    // DataList.getUserData();
    this.props.navigation.navigate('Home');
  }
  HeartButtonPress(index){
    if(this.state.list.length == 1){
      this.state.list.pop();
      DataList.wirteUserFavorite("");
      this.setState({});
    }
    this.state.list.splice(index,1);

    var string = "";
    for(var i=0; i<this.state.list.length; i++){
      string += "re점프al"+ String(this.state.list[i].delivery) + "re점프al"+ String(this.state.list[i].kind) + "re점프al"+this.state.list[i].region + "re점프al" + this.state.list[i].heart + "re점프al" + this.state.list[i].hours + "re점프al" + this.state.list[i].image + "re점프al" + this.state.list[i].location + "re점프al" + this.state.list[i].locationLink  + "re점프al"+this.state.list[i].name+"re점프al"+this.state.list[i].phoneNumber+"re점프al"+String(this.state.list[i].starUserCount)+"re점프al"+String(this.state.list[i].totalPoint) + "re점프al"+ this.state.list[i].menu +"re이단점프al" ;
    }

    DataList.wirteUserFavorite(string);
    this.setState({});
  }
  RestaurantPress(selectedRestaurant){
    this.props.navigation.navigate('Info', {informationOfRestaurant: selectedRestaurant})
  }

  /**
   * update cache data when press update button. (5/18 updated)
   */
  _onPressUpdate = () => {
    Alert.alert(
      'Update',
      '최신 정보로 업데이트하시겠습니까?\n데이터가 소모될 수 있습니다.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log("updateData canceled"),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => DataList.updateData(),
        },
      ],
      {cancelable: false},
    );
    console.log("update executed");
  }

  render() {
    if(this.state.waitFavoriteList == false){
      // DataList.getUserData().then(
      //   this.setState(waitFavoriteList = true)
      // )
      // .catch(err=>{
      //   console.log("favorite error");
      // }
      // )
      // DataList.getUserData();
      this.setState({waitFavoriteList : true, list: DataList.userFavoriteList});
    }

    // if(this.state.list == null){
    //   console.log("flkaj");
    // }
    // else{
    //   for(var i=0; i<DataList.userFavoriteList.length; i++){
    //     console.log("내가찜한"+DataList.userFavoriteList[i].name);
    //   }
    // }



    return (
      <Fragment>
        <SafeAreaView style={{ flex:0, backgroundColor: 'white', marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()}} />
        <SafeAreaView style={{ flex: 1, backgroundColor : 'pink'}} >
          <View style={styles.container}>
            <View style={styles.header} >
              <Text style={{fontSize: RFValue(24), fontFamily: 'yeon-sung'}}>
                MY PAGE
              </Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={{
                  backgroundColor : '#DDDDDD',
                  flexDirection : 'row',
                  justifyContent : 'center',
                  alignItems : 'center',
                  width:'45%',
                  paddingVertical : 5,
                  //paddingHorizontal : 25,
                  borderRadius : 5,
                }}
                onPress={() => this._onPressUpdate()}
              >
                <Text  style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
                  최신정보 업데이트
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor : '#DDDDDD',
                  flexDirection : 'row',
                  justifyContent : 'center',
                  alignItems : 'center',
                  width:'45%',
                  paddingVertical : 5,
                  //paddingHorizontal : 25,
                  borderRadius : 5,
                }}
                onPress={()=>Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSfodGhM-2Hn1Hqh1OTD9UJwVKSHa987r5w47xSez85LxsGmNQ/viewform")}
              >
                <Text style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
                  식당 추가/수정/삭제
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                style={{
                  backgroundColor : '#DDDDDD',
                  flexDirection : 'row',
                  justifyContent : 'center',
                  alignItems : 'center',
                  width:'45%',
                  paddingVertical : 5,
                  //paddingHorizontal: 25,
                  borderRadius : 5,
                }}
                onPress={()=>Linking.openURL("https://docs.google.com/forms/d/e/1FAIpQLSf-IAFGjLwzrvK6o7qH50nZAiHgwip2vvt7gsH_VImxwvRJRA/viewform")}
              >
                <Text style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
                  문의 및 피드백
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor : '#DDDDDD',
                  flexDirection : 'row',
                  justifyContent : 'center',
                  alignItems : 'center',
                  width:'45%',
                  paddingVertical : 5,
                  //paddingHorizontal: 25,
                  borderRadius : 5,
                }}
                onPress={()=>{this.props.navigation.navigate('SourcePage')}}
              >
                <Text style={{fontSize: RFValue(15), color: '#888888', textAlign: 'center', fontFamily: 'hanna'}}>
                  어플리케이션 정보
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:RFValue(15), borderBottomWidth:1, borderBottomColor: '#DDDDDD'}}>
              <Text style={{fontSize: RFValue(20), paddingBottom: RFValue(10), color: 'gray', fontFamily: 'hanna'}}> 내가 찜한 식당</Text>
            </View>
            <View style={styles.content}>
              <FlatList
                data={this.state.list}
                contentContainerStyle={{paddingTop : RFValue(15), paddingHorizontal : RFValue(15)}}
                renderItem={({item, index}) =>
                  <View>
                    <TouchableOpacity style={styles.element} onPress={this.RestaurantPress.bind(this,item)}>
                      <View style={{flexDirection : 'column',alignItems:'flex-start' ,justifyContent:'flex-start'}}>
                        <Text style={{fontSize: RFValue(20), fontFamily: 'hanna'}}> {item.name} </Text>
                        <Rating
                          style={{marginLeft:RFValue(1)}}
                          readonly
                          imageSize={RFPercentage(2.5)}
                          startingValue={(item.totalPoint / item.starUserCount)}
                        />
                      </View>
                      <View style={{padding : RFValue(10)}}>
                        <Icon
                          name='heart'
                          type='octicon'
                          color={item.heart}
                          size={RFValue(30)}
                          onPress={this.HeartButtonPress.bind(this, index)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
            <View style={{flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center', backgroundColor: 'pink', height : 50}}>
              <TouchableOpacity
                style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}
                onPress={this.homeButtonPress.bind(this)}

              >
                <Text style = {{fontFamily: 'hanna'}}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}

              >
                <Text style = {{fontFamily: 'hanna'}}>My Page</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

// 스타일
const styles = StyleSheet.create({
  container :{
    flex:1,
    backgroundColor: 'white'
  },
  header : {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems : 'center',
    height : RFValue(55),
    padding : RFValue(15),
    borderBottomColor : "#AAAAAA",
    borderBottomWidth : 1,
  },
  button : {
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems: 'center',
    paddingVertical : RFValue(15),
    paddingHorizontal : '4%'
  },
  content: {
    flex:1,
    flexDirection : 'column',
    justifyContent : 'flex-start',
    alignItems : 'stretch',
    backgroundColor : 'white',
  },
  element : {
    padding: RFValue(10),
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    height: RFValue(80),
    fontSize: RFPercentage(6),
    borderWidth : RFValue(5),
    borderColor : 'pink',
    marginBottom : RFValue(20),
    borderRadius : 5,
  },
});
