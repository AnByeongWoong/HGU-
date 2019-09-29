import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SafeAreaView, Platform, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, FlatList, ScrollView, Keyboard, TextInput } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Header, SearchBar, Icon } from "react-native-elements"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { KeyboardAvoidingView } from 'react-native';
import { db } from "./dataBase";
import { info } from "./LoadAsyncStorage";
import firebase from "firebase";
import Loading from "./Loading";
// let isFirstRender = true;

export default class Comment extends Component {
  static navigationOptions = {        // Navigation Header 삭제
    header: null
  };

  constructor(props) {
    super(props);
    this.isFirstRender = true;
    this.state = {
      restaurantName: this.props.navigation.getParam('CommentKey'),
      data:[],
      value: '',
      loading: true,
    }
  }

  formattingTimeStamp(timestamp) {
    let year = String(timestamp.getFullYear());

    let month = String(timestamp.getMonth()+1);
    if(month.length < 2) month = "0".concat(month);

    let date = String(timestamp.getDate()); 
    if(date.length < 2) date = "0".concat(date);

    let hours = String(timestamp.getHours());
    if(hours.length < 2) hours = "0".concat(hours);

    let minutes = String(timestamp.getMinutes());
    if(minutes.length < 2) minutes = "0".concat(minutes);

    let second = String(timestamp.getSeconds());
    if(second.length < 2) second = "0".concat(second);

    let string = year.concat(".", month, ".", date, "  ", hours, ":", minutes, "|", second);
    return string;
  }

  _onPressButton(arg){
    console.log(arg);
    let time = this.formattingTimeStamp((firebase.firestore.Timestamp.now()).toDate());
    let timeToDisplay = time.split('|')[0];
    let newComment = {
      tempID: info.ID,
      msg: arg,
      timestamp: timeToDisplay
      // timestamp: new Date(new Date().getTime()).toDateString,
    }
    db.collection('restaurants').doc(this.state.restaurantName).collection('comments').doc(time).set(newComment);
    this.state.data.unshift(newComment);
    this.setState({
      value: '',
    });
    // console.log(String((firebase.firestore.Timestamp.now()).toDate().getMilliseconds);
    console.log(time);
  }
  BackButtonPress(){
    this.props.navigation.goBack();
    
  }

  render() {


    if(this.isFirstRender){
      db.collection('restaurants').doc(this.state.restaurantName).collection('comments')
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.state.data.unshift(doc.data());
        });
      }).then(()=>{
        console.log(this.state.data);
        this.isFirstRender = false;
        this.setState({loading: false});
      });
    }

    if(this.state.loading) {
      return(
        <Loading/>
      );
    }

    else{
     
      return (
        <SafeAreaView 
          style={{
            flex: 1,
            marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
          }}
        >
           <View style={styles.header}>
            <Icon
              name='arrow-back'
              onPress={this.BackButtonPress.bind(this)}
            />
            <Text style={{ fontSize: RFValue(25), fontFamily:'yeon-sung' }}>
              댓글
            </Text>
            <View style={{width: RFValue(25), height : RFValue(25)}}>
            </View>
          </View>
          
            <KeyboardAvoidingView 
              style={styles.content}
              behavior='padding'
              keyboardVerticalOffset= {Platform.OS==='ios' ? 0 : RFValue(15)}
            >
              <FlatList
                style={styles.root}
                data={this.state.data}
                extraData={this.state}
                ItemSeparatorComponent={() => {
                return (
                    <View style={styles.separator}/>
                )
                }}
                keyExtractor={(item)=>{
                  return item.id;
                }}
                renderItem={(item) => {
                  const Notification = item.item;
                  return(
                    <View style={styles.container2}>
                      <View style={styles.content}>
                        <View style={styles.contentHeader}>
                          <Text  style={styles.name}>익명</Text>
                          <Text style={styles.time}>
                            {Notification.timestamp}
                          </Text>
                        </View>
                        <Text rkType='primary3 mediumLine' style={{fontFamily: 'hanna'}}>{Notification.msg}</Text>
                      </View>
                    </View>
                  );
                }}
              />
  
              <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderTopWidth: 1,
                  borderTopColor: 'gray',
              }}>
                <View style={{width: '85%'}}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder="댓글 달기"
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value={this.state.value}
                    multiline={true}
                    maxLength={200}
                    onChangeText={(value) => {this.setState({value: value})}}
                    underlineColorAndroid={'transparent'}
                  />
                </View>
                <View style={{width: '15%', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                  <View style={{
                    width: '100%',
                    marginBottom: Platform.OS==='ios' ? '17%' : '30%',
                  }}>
                    <TouchableOpacity
                      style={styles.submit}
                      onPress={event => {this._onPressButton(this.state.value)}}
                    >
                      <Icon
                        name='send'
                        type='feather'
                        size={RFValue(25)}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        );
    
    }
  }
}

// 스타일
const styles = StyleSheet.create(
  {
    root: {
        backgroundColor: "#ffffff",
        marginTop:10,
    },
    container2: {
      paddingLeft: 19,
      paddingRight: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    content: {
      flex:1,
      flexDirection : 'column',
      paddingHorizontal : RFValue(15),
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image:{
        width:45,
        height:45,
        borderRadius:20,
        marginLeft:20
    },
    time:{
        fontSize:11,
        color:"#808080",
        fontFamily: 'hanna',
    },
    name:{
        fontSize:16,
        fontWeight:"bold",
        fontFamily: 'hanna',
    },
    txtInput: {
      borderRadius: 5,
      backgroundColor: 'lightgray',
      paddingHorizontal: '3%',
      width: '100%',
      marginTop: '3%',
      marginBottom: Platform.OS==='ios' ? '3%' : '6%',
      fontFamily: 'hanna',
      minHeight: RFValue(40),
    },
    submit: {
      backgroundColor: 'white',
      // backgroundColor: 'pink',
      width: '100%',
      minHeight: RFValue(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    header : {
      backgroundColor: 'white', 
      flexDirection: 'row', 
      alignItems : 'center',
      height : RFValue(55),
      padding : RFValue(15),
      borderColor : '#AAAAAA',
      borderBottomWidth :1,
      justifyContent: 'space-between',
    },
  }
)

// // 스타일
// const styles = StyleSheet.create(
//   {
//     root: {
//         backgroundColor: "#ffffff",
//         marginTop:10,
//     },
//     container2: {
//       paddingLeft: 19,
//       paddingRight: 16,
//       paddingVertical: 12,
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//     },
//     content: {
//       flex:1,
//       flexDirection : 'column',
//       paddingHorizontal : RFValue(15),
//     },
//     contentHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 6
//     },
//     separator: {
//         height: 1,
//         backgroundColor: "#CCCCCC"
//     },
//     image:{
//         width:45,
//         height:45,
//         borderRadius:20,
//         marginLeft:20
//     },
//     time:{
//         fontSize:11,
//         color:"#808080",
//         fontFamily: 'hanna',
//     },
//     name:{
//         fontSize:16,
//         fontWeight:"bold",
//         fontFamily: 'hanna',
//     },
//     txtInput: {
//       borderRadius: 5,
//       backgroundColor: 'lightgray',
//       width: '81%',
//       marginVertical: '3%',
//       paddingLeft: '5%',
//       paddingVertical: '6%',
//       paddingTop: '6%',
//       fontFamily: 'hanna',
//     },
//     submit: {
//       backgroundColor: 'pink',
//       borderRadius: 50,
//       width: RFValue(50),
//       height: RFValue(50),
//       marginVertical: '3%',
//       alignItems: 'center',
//       paddingTop: RFValue(10)
//     },
//     header : {
//       backgroundColor: 'white', 
//       flexDirection: 'row', 
//       alignItems : 'center',
//       height : RFValue(55),
//       padding : RFValue(15),
//       borderColor : '#AAAAAA',
//       borderBottomWidth :1,
//       justifyContent: 'space-between',
//     },

//   }
// )

// return (
//   <SafeAreaView 
//     style={{
//       flex: 1,
//       marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
//     }}
//   >
//      <View style={styles.header}>
//       <Icon
//         name='arrow-back'
//         onPress={this.BackButtonPress.bind(this)}
//       />
//       <Text style={{ fontSize: RFValue(25), fontFamily:'do-hyeon' }}>
//         댓글
//       </Text>
//       <View style={{width: RFValue(25), height : RFValue(25)}}>
//       </View>
//     </View>
    
//       <KeyboardAvoidingView 
//         style={styles.content}
//         behavior='padding'
//         // behavior='height'

//         contentContainerStyle={{flex:1}}
//       >
//         <FlatList
//           style={styles.root}
//           data={this.state.data}
//           extraData={this.state}
//           ItemSeparatorComponent={() => {
//           return (
//               <View style={styles.separator}/>
//           )
//           }}
//           keyExtractor={(item)=>{
//             return item.id;
//           }}
//           renderItem={(item) => {
//             const Notification = item.item;
//             return(
//               <View style={styles.container2}>
//                 <View style={styles.content}>
//                   <View style={styles.contentHeader}>
//                     <Text  style={styles.name}>익명</Text>
//                     <Text style={styles.time}>
//                       {Notification.timestamp}
//                     </Text>
//                   </View>
//                   <Text rkType='primary3 mediumLine' style={{fontFamily: 'hanna'}}>{Notification.msg}</Text>
//                 </View>
//               </View>
//             );
//           }}
//         />

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.4, borderTopColor: 'gray'}}>
//           <TextInput
//             style={ styles.txtInput }
//             placeholder="댓글 달기"
//             autoCapitalize={'none'}
//             autoCorrect={false}
//             value={this.state.value}
//             multiline={true}
//             maxLength={40}
//             onChangeText={(value) => {this.setState({value: value})}}
//             underlineColorAndroid={'transparent'}
//           />
//           <TouchableOpacity
//             style={styles.submit}
//             onPress={event => {this._onPressButton(this.state.value)}}
//           >
//             <Icon
//               style={{ alignItems: 'center', justifyContent: 'center' }}
//               name='check'
//               size={RFValue(30)}
//               color="black"
//             />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );

// import React, { Component } from "react";
// import {
//   createBottomTabNavigator,
//   createStackNavigator,
//   createAppContainer,
// } from 'react-navigation';
// import { getStatusBarHeight } from 'react-native-status-bar-height';
// import { SafeAreaView, Platform, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, FlatList, ScrollView, Keyboard, TextInput } from "react-native";
// import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// import { Header, SearchBar, Icon } from "react-native-elements"
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { KeyboardAvoidingView } from 'react-native';
// import { db } from "./dataBase";
// import { info } from "./LoadAsyncStorage";
// import firebase from "firebase";
// import Loading from "./Loading";
// // let isFirstRender = true;

// export default class Comment extends Component {
//   static navigationOptions = {        // Navigation Header 삭제
//     header: null
//   };

//   constructor(props) {
//     super(props);
//     this.isFirstRender = true;
//     this.state = {
//       restaurantName: this.props.navigation.getParam('CommentKey'),
//       data:[],
//       value: '',
//       loading: true,
//     }
//   }

//   formattingTimeStamp(timestamp) {
//     let year = String(timestamp.getFullYear());

//     let month = String(timestamp.getMonth()+1);
//     if(month.length < 2) month = "0".concat(month);

//     let date = String(timestamp.getDate()); 
//     if(date.length < 2) date = "0".concat(date);

//     let hours = String(timestamp.getHours());
//     if(hours.length < 2) hours = "0".concat(hours);

//     let minutes = String(timestamp.getMinutes());
//     if(minutes.length < 2) minutes = "0".concat(minutes);

//     let second = String(timestamp.getSeconds());
//     if(second.length < 2) second = "0".concat(second);

//     let string = year.concat(".", month, ".", date, "  ", hours, ":", minutes, "|", second);
//     return string;
//   }

//   _onPressButton(arg){
//     console.log(arg);
//     let time = this.formattingTimeStamp((firebase.firestore.Timestamp.now()).toDate());
//     let timeToDisplay = time.split('|')[0];
//     let newComment = {
//       tempID: info.ID,
//       msg: arg,
//       timestamp: timeToDisplay
//       // timestamp: new Date(new Date().getTime()).toDateString,
//     }
//     db.collection('restaurants').doc(this.state.restaurantName).collection('comments').doc(time).set(newComment);
//     this.state.data.unshift(newComment);
//     this.setState({
//       value: '',
//     });
//     // console.log(String((firebase.firestore.Timestamp.now()).toDate().getMilliseconds);
//     console.log(time);
//   }
//   BackButtonPress(){
//     this.props.navigation.goBack();
    
//   }

//   render() {


//     if(this.isFirstRender){
//       db.collection('restaurants').doc(this.state.restaurantName).collection('comments')
//       .get().then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           this.state.data.unshift(doc.data());
//         });
//       }).then(()=>{
//         console.log(this.state.data);
//         this.isFirstRender = false;
//         this.setState({loading: false});
//       });
//     }

//     if(this.state.loading) {
//       return(
//         <Loading/>
//       );
//     }

//     else{
     

//     return (
//       <SafeAreaView 
//         style={{
//           flex: 1,
//           marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()
//         }}
//       >
//          <View style={styles.header}>
//           <Icon
//             name='arrow-back'
//             onPress={this.BackButtonPress.bind(this)}
//           />
//           <Text style={{ fontSize: RFValue(25), fontFamily:'yeon-sung' }}>
//             댓글
//           </Text>
//           <View style={{width: RFValue(25), height : RFValue(25)}}>
//           </View>
//         </View>
        
//           <KeyboardAvoidingView 
//             style={styles.content}
//             behavior='padding'
//           >
//             <FlatList
//               style={styles.root}
//               data={this.state.data}
//               extraData={this.state}
//               ItemSeparatorComponent={() => {
//               return (
//                   <View style={styles.separator}/>
//               )
//               }}
//               keyExtractor={(item)=>{
//                 return item.id;
//               }}
//               renderItem={(item) => {
//                 const Notification = item.item;
//                 return(
//                   <View style={styles.container2}>
//                     <View style={styles.content}>
//                       <View style={styles.contentHeader}>
//                         <Text  style={styles.name}>익명</Text>
//                         <Text style={styles.time}>
//                           {Notification.timestamp}
//                         </Text>
//                       </View>
//                       <Text rkType='primary3 mediumLine' style={{fontFamily: 'hanna'}}>{Notification.msg}</Text>
//                     </View>
//                   </View>
//                 );
//               }}
//             />

//             <View style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 borderTopWidth: 1,
//                 borderTopColor: 'gray',
//             }}>
//               <View style={{width: '85%'}}>
//                 <TextInput
//                   style={styles.txtInput}
//                   placeholder="댓글 달기"
//                   autoCapitalize={'none'}
//                   autoCorrect={false}
//                   value={this.state.value}
//                   multiline={true}
//                   maxLength={200}
//                   onChangeText={(value) => {this.setState({value: value})}}
//                   underlineColorAndroid={'transparent'}
//                 />
//               </View>
//               <View style={{width: '15%', flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
//                 <View style={{
//                   width: '100%',
//                   marginBottom: Platform.OS==='ios' ? '17%' : '30%',
//                 }}>
//                   <TouchableOpacity
//                     style={styles.submit}
//                     onPress={event => {this._onPressButton(this.state.value)}}
//                   >
//                     <Icon
//                       name='send'
//                       type='feather'
//                       size={RFValue(25)}
//                       color="black"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </SafeAreaView>
//       );
//     }
//   }
// }
// // 스타일
// const styles = StyleSheet.create(
//   {
//     root: {
//         backgroundColor: "#ffffff",
//         marginTop:10,
//     },
//     container2: {
//       paddingLeft: 19,
//       paddingRight: 16,
//       paddingVertical: 12,
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//     },
//     content: {
//       flex:1,
//       flexDirection : 'column',
//       paddingHorizontal : RFValue(15),
//     },
//     contentHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 6
//     },
//     separator: {
//         height: 1,
//         backgroundColor: "#CCCCCC"
//     },
//     image:{
//         width:45,
//         height:45,
//         borderRadius:20,
//         marginLeft:20
//     },
//     time:{
//         fontSize:11,
//         color:"#808080",
//         fontFamily: 'hanna',
//     },
//     name:{
//         fontSize:16,
//         fontWeight:"bold",
//         fontFamily: 'hanna',
//     },
//     txtInput: {
//       borderRadius: 5,
//       backgroundColor: 'lightgray',
//       paddingHorizontal: '3%',
//       width: '100%',
//       marginTop: '3%',
//       marginBottom: Platform.OS==='ios' ? '3%' : '6%',
//       fontFamily: 'hanna',
//       minHeight: RFValue(40),
//     },
//     submit: {
//       backgroundColor: 'white',
//       width: '100%',
//       minHeight: RFValue(40),
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     header : {
//       backgroundColor: 'white', 
//       flexDirection: 'row', 
//       alignItems : 'center',
//       height : RFValue(55),
//       padding : RFValue(15),
//       borderColor : '#AAAAAA',
//       borderBottomWidth :1,
//       justifyContent: 'space-between',
//     },
//   }
// )
