import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { SafeAreaView, Platform, ImageBackground, AppRegistry, FlatList, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native";
import { Rating, Icon, SearchBar } from "react-native-elements"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from 'react-native-status-bar-height';
var search;
import {tagArray} from "./Tabview";
import SearchHeader from 'react-native-search-header';
// import {DataList} from "./App";
import {DataList} from "./Main";
import { Dropdown } from 'react-native-material-dropdown';
import {BackHandler} from 'react-native';

export default class RestaurantList extends Component {
  static navigationOptions = {        // Navigation Header 삭제
    header: null
  };
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      
      data: DataList.object_list,
      list: [],
      count: 0,
      usersList: DataList.userFavoriteList,
      adjustUsersFavoriteList: [],
      a: false,
      
    };
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.adjustFavoriteList();  
    DataList.userFavoriteList = this.state.adjustUsersFavoriteList;
    DataList.get_Data();
       tagArray.key_num = 83;
       this.state.a = false;
       tagArray.region_count_bool = false;
    this.state.list.splice(0,this.state.list.length);
    this.state.data.splice(0,this.state.data.length);
    this.props.navigation.goBack();
    return true;
  }

  _onPressButton(arg){
    search=arg
    console.log(search);
    this.setState({
      value: ''
    })
  }
    
  HeartButtonPress( listIndex){
    console.log(listIndex);
    if(this.state.list[listIndex].heart == "white"){
      this.state.list[listIndex].heart = "#e64980";
    }
    else if(this.state.list[listIndex].heart == "#e64980"){
      this.state.list[listIndex].heart = "white";
    }
    // console.log(this.state.list[listIndex].heart);
    this.setState({a: true});
  }
  // HeartButtonPress2( listIndex){
  //   console.log(listIndex);
  //   if(this.state.list[listIndex].heart == "white"){
  //     this.state.list[listIndex].heart = "#e64980";
  //   }
  //   else if(this.state.list[listIndex].heart == "#e64980"){
  //     this.state.list[listIndex].heart = "white";
  //   }
  //   // console.log(this.state.list[listIndex].heart);
  //   // this.setState({a: true});
  //   console.log(this.state.list[listIndex].heart);
  //   console.log(this.state.list[listIndex].name);
  // }
  
  RestaurantPress(selectedRestaurant, index){
    this.props.navigation.navigate('Info',{informationOfRestaurant: selectedRestaurant})
    // this.props.navigation.navigate('Info',{informationOfRestaurant: selectedRestaurant, index: index, heartButtonPress: (item)=> this.HeartButtonPress2(item)});
  }
  BackButtonPress(){
    this.adjustFavoriteList();
    
    DataList.userFavoriteList = this.state.adjustUsersFavoriteList;
    
    
    tagArray.key_num = 83;
    this.state.a = false;
    tagArray.region_count_bool = false;
    DataList.get_Data();
    this.state.list.splice(0,this.state.list.length);
    this.state.data.splice(0,this.state.data.length);
    
    // this.props.navigation.goBack();
    this.props.navigation.pop();
    
  }
  sortDataToList(){
    // console.log("체킹 스타트");
    // // for(let i=0; i<this.state.data.length; i++){
    // //   if(this.state.data[i].heart == "#e64980"){
    // //     console.log(this.state.data[i].name);
    // //   }
    // // }
    // for(let i=0; i<DataList.object_list.length; i++){
    //   if(DataList.object_list[i].heart == "#e64980"){
    //     console.log(DataList.object_list[i].name);
    //   }
    // }


    for(var i=0; i<6; i++){
      if(tagArray.kind_bool[i]==true){
        tagArray.key_num = tagArray.key_num * tagArray.kind_num[i];
      }
      if(tagArray.region_bool[i]==true){
          tagArray.region_count_bool = true;
      }
    }
    /// 배달만 선택
    if(tagArray.key_num == 83 && tagArray.region_count_bool == false){
      for(var i=0; i<this.state.data.length; i++){
        if(this.state.data[i].delivery == "true"){
          this.state.list.push(this.state.data[i]); 
        }
      }
    }
    ///// 종류만 선택
    else if(tagArray.region_count_bool == false && tagArray.delivery_bool == false){
      for(var i=0; i<this.state.data.length; i++){
        if(tagArray.key_num % this.state.data[i].kind == 0){
          this.state.list.push(this.state.data[i]); 
        }
      }
    }
    ////// 지역만 선택
    else if(tagArray.key_num == 83 && tagArray.delivery_bool == false){
    for(var k=0; k<6; k++){
      if(tagArray.region_bool[k] == false){
        continue;
      }

      for(var i=0; i<this.state.data.length; i++){        
        if(this.state.data[i].region == tagArray.region_name[k]){
          this.state.list.push(this.state.data[i]); 
        }
      }

    }     
    }
       ////////////////지역 종류 배달 다했을 때
       else if(tagArray.key_num != 83 && tagArray.region_count_bool ==true ){
        for(var k=0; k<6; k++){
          if(tagArray.region_bool[k] == false){
            continue;
          }
         
          if(tagArray.delivery_bool == true){
            for(var i=0; i<this.state.data.length; i++){
                     
              /////////체크  여기 꼭 다시 확인하기
                if(tagArray.key_num % this.state.data[i].kind == 0 && this.state.data[i].region == tagArray.region_name[k] && this.state.data[i].delivery == "true" ){
                 
                  this.state.list.push(this.state.data[i]); 
               
                }
              }
          }
          else{
            for(var i=0; i<this.state.data.length; i++){
                     
              /////////체크  여기 꼭 다시 확인하기
                if(tagArray.key_num % this.state.data[i].kind == 0 && this.state.data[i].region == tagArray.region_name[k] ){
                 
                  this.state.list.push(this.state.data[i]); 
               
                }
              }
          }

          
        }
      }
    //// 종류 배달 선택
    else if(tagArray.key_num != 83 && tagArray.delivery_bool == true && tagArray.region_count_bool == false){
      for(var i=0; i<this.state.data.length; i++){
        if(tagArray.key_num % this.state.data[i].kind ==0 && this.state.data[i].delivery == "true"){
          this.state.list.push(this.state.data[i]); 
        }
      }
    }
    ///// 지역 배달 선택
    else if(tagArray.key_num == 83 && tagArray.region_count_bool == true && tagArray.delivery_bool == true){
      for(var k=0; k<6; k++){
        if(tagArray.region_bool[k] == false){
          continue;
        }
        for(var i=0; i<this.state.data.length; i++){
          if(this.state.data[i].region == tagArray.region_name[k]){
            this.state.list.push(this.state.data[i]); 
          }
        }
      }
    }  
    else{
      console.log("뭐지????");
    }
    
  }

  sortListOrem(sortData){
    sortData.sort(function(a,b){
      return (a.name) > (b.name);
    })
  }
  sortListNaerim(sortData){
    sortData.sort(function(a,b){
      return (a.name) < (b.name);
    })
  }
  sortListByStarOrem(sortData){
    sortData.sort(function(a,b){
      return (a.totalPoint/a.starUserCount) < (b.totalPoint/b.starUserCount);
    })
  }
  sortListByStarNaerim(sortData){
    sortData.sort(function(a,b){
      return (a.totalPoint/a.starUserCount) > (b.totalPoint/b.starUserCount);
    })
  }

 
  

  deleteRepeatElement(myObject){
    var newData = [];
    for(var i=0; i<myObject.length; i++){

      for(var j =i+1; j<myObject.length; j++){
        if(myObject[i].name == myObject[j].name){
          break;
        }
        if(j == myObject.length-1){
          newData.push(myObject[i]);
        }
      }
      if(i == myObject.length-1){
        newData.push(myObject[i]);
      }
    }
    return newData;
  }
  

  adjustFavoriteList(){
    this.sortListOrem(this.state.list);

    console.log("작 시작");
    for(let i=0; i<this.state.list.length; i++){
      if(this.state.list[i].heart ==  "#e64980"){
        this.state.usersList.push(this.state.list[i]);
        // console.log("1"+this.state.list[i].name);
      }
    }

    // /////체킹
    // console.log("체크 1");
    // for (var i=0; i<this.state.usersList.length; i++){
    //   console.log(this.state.usersList[i].name);
    // }

    this.state.adjustUsersFavoriteList = this.deleteRepeatElement(this.state.usersList);
    this.sortListOrem(this.state.adjustUsersFavoriteList);
    // console.log(this.state.adjustUsersFavoriteList);
    // if(this.state.adjustUsersFavoriteList.length > this.state.list.length){
    //   for(var count=0, i=0; count<this.state.adjustUsersFavoriteList.length; count++){
    //     if(this.state.list.length == 0){
    //       break;
    //     }
    //   }
    // }
    // else{
    // }
      for(var i=0, count=0 ; i<this.state.list.length; i++){
        if(this.state.adjustUsersFavoriteList.length == 0 ){
          console.log("영");
          break;
        } 
        if(this.state.list[i].name == this.state.adjustUsersFavoriteList[count].name ){
          if(this.state.list[i].heart == "white"){
            this.state.adjustUsersFavoriteList.splice(count,1);
          }
          else if(this.state.list[i].heart == "#e64980"){
            count++;
          }
          if(count >= this.state.adjustUsersFavoriteList.length){
            // console.log(this.state.adjustUsersFavoriteList);
            break;
         
        }
      }
    }
    for(let i =0; i<this.state.adjustUsersFavoriteList.length; i++){
      if(this.state.adjustUsersFavoriteList[i].heart == "white"){
        this.state.adjustUsersFavoriteList.splice(i,1);
      }
    }
    this.state.usersList = this.state.adjustUsersFavoriteList;
    var string = "";
    for(var i=0; i<this.state.adjustUsersFavoriteList.length; i++){
      string += "re점프al"+ String(this.state.adjustUsersFavoriteList[i].delivery) + "re점프al"+ String(this.state.adjustUsersFavoriteList[i].kind) + "re점프al"+this.state.adjustUsersFavoriteList[i].region + "re점프al" + this.state.adjustUsersFavoriteList[i].heart + "re점프al" + this.state.adjustUsersFavoriteList[i].hours + "re점프al" + this.state.adjustUsersFavoriteList[i].image + "re점프al" + this.state.adjustUsersFavoriteList[i].location + "re점프al" + this.state.adjustUsersFavoriteList[i].locationLink  + "re점프al"+this.state.adjustUsersFavoriteList[i].name+"re점프al"+this.state.adjustUsersFavoriteList[i].phoneNumber+"re점프al"+String(this.state.adjustUsersFavoriteList[i].starUserCount)+"re점프al"+String(this.state.adjustUsersFavoriteList[i].totalPoint) + "re점프al"+ this.state.adjustUsersFavoriteList[i].menu +"re이단점프al" ;  
    }
    DataList.wirteUserFavorite(string);
  }

  
  onChangeHandler(value){
    // console.log(value);
    if(value == "별점순"){
      this.sortListByStarOrem(this.state.list);
    }
    // else if(value == "별점낮은순"){
    //   this.sortListByStarNaerim(this.state.list);
    // }
    else if(value == "오름차순"){
      this.sortListOrem(this.state.list);
    }
    else if(value == "내림차순"){
      this.sortListNaerim(this.state.list);
    }
    this.setState({});
  }
  checkHeart(){
    this.sortListOrem(this.state.list);
    // console.log("before sort");
    this.sortListOrem(this.state.usersList);
    // console.log("after sort");

    
    if(this.state.usersList.length == 0){
      
      this.sortListByStarOrem(this.state.list);
      return;
    }
    // console.log("pppppp");
    // console.log(this.state.usersList.length);
    for(let i=0, j=0; i<this.state.list.length; i++){
      //////////여기 length -1 뺏음 8.17
      // console.log("for 문이 돈다"+j);
      if(j>=this.state.usersList.length){
        /////////////여기 처리해야함///////////////////////////////////////////////////////////
        this.sortListByStarOrem(this.state.list);
        return;
      }
      if(this.state.usersList[j].name < this.state.list[i].name){
        
        while(this.state.usersList[j].name < this.state.list[i].name ){
          j++;
          if(j>=this.state.usersList.length){
            break;
          }
        }   
      }
      if(j>=this.state.usersList.length){
        this.sortListByStarOrem(this.state.list);
        console.log("끝??");
        return;
      }
      if(this.state.list[i].name == this.state.usersList[j].name ){
        // console.log("qqqqqq");
        this.state.list[i].heart = "#e64980";
        // console.log(this.state.list[i].name);
        j++;
      }
    }
    this.sortListByStarOrem(this.state.list);
  }

  

  render() {
    
    let data = [{
      value: '별점순',
    },
    // {
    //   value: '별점낮은순',
    // },
    {
      value: '오름차순',
    },{
      value: '내림차순',
    }
      
    ];

    if(this.state.a === false){
      

      this.sortDataToList();
      this.checkHeart();
      console.log("tt");
      
      
      this.setState({a : true});
      // console.log("after setState");
    }
    // for(var i=0; i<this.state.list.length; i++){
    //   console.log(this.state.list[i].name);
    // }
    return (
      <SafeAreaView 
        style={{
          flex: 1,
          marginTop : getStatusBarHeight()
        }}
      >
        <View style={styles.searchbar}>
          <Icon
            name='arrow-back'
            onPress={this.BackButtonPress.bind(this)}
          />
          <Icon
            name='search'
            type='material'
            onPress = {() => this.searchHeader.show()}
          />
        </View>
        <SearchHeader
          ref = {(searchHeader) => {
            this.searchHeader = searchHeader;
          }}
          placeholder = 'Search...'
          placeholderColor = 'gray'
          onClear = {() => {
              console.log(`Clearing input!`);
          }}
          /**
           * 연관검색어 구현 (8/15 updated)
           */
          onSearch = {(item) => {
            this.props.navigation.navigate('InfoByName',{NameOfRestaurant: item.nativeEvent.text});
            this.searchHeader.clear();
            this.searchHeader.hide();
            console.log("serach");
          }}
          topOffset={0}
          onGetAutocompletions = {async (text) => {
            if (text) {
              return DataList.name_list.filter(item => {
                return item.includes(text);
              })
            } else {
              return [];
            }
          }}
        />
        <View style={{ paddingLeft: '70%', paddingRight: '5%' }}>
          {/* <Dropdown
            dropdownOffset={{top: 12.5, left: 0}}
            dropdownMargins={{min: 0, max: 10}}
            label={'정렬'}
            data={data}
            onChangeText={value => this.onChangeHandler(value)}
          /> */}
           <Dropdown
            dropdownOffset={{top: 22, left: 0}}
            dropdownMargins={{min: 0, max: 10}}
            label={'정렬'}
            itemPadding={5}
            data={data}
            onChangeText={value => this.onChangeHandler(value)}
          />
        </View>
        <FlatList
          // data={this.state.showList}
          data={this.state.list}
          columnWrapperStyle={{ justifyContent : 'space-between', marginVertical : (Dimensions.get('window').width)/100*2}}
          numColumns={2}
          keyExtractor={(item, index) => item.name}
          contentContainerStyle={{paddingHorizontal : RFValue(15)}}
          // onEndReached={(info) => {this.renderMore()}}
          // onEndReachedThreshold={5 / this.state.showList.length}
          renderItem={({item, index}) => 
            <TouchableOpacity style={styles.element} onPress={this.RestaurantPress.bind(this, item, index)}>
                <ImageBackground
                    source={{uri: item.image}}
                    style={{width : '100%', height : (Dimensions.get('window').width)/100*30}}
                >
                    <Icon
                        name='heart'
                        type='octicon'
                        color={item.heart}
                        size={RFValue(30)}
                        onPress={this.HeartButtonPress.bind(this, index)}
                        containerStyle={{
                            flexDirection : 'row', 
                            justifyContent : 'flex-end', 
                            alignItems : 'flex-start', 
                            padding: RFValue(10)
                        }}
                    />
                </ImageBackground>
                <View style={styles.elementContent}>
                    <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                      <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: RFValue(15), fontFamily: 'hanna'}}> {item.name} </Text>
                    </View>
                    <View style={{flexDirection : 'row', alignItems : 'center'}}>
                        <Rating
                            imageSize={15}
                            readonly
                            startingValue={item.totalPoint / item.starUserCount}
                            style={{paddingHorizontal: 5}}
                        />
                        <Text style={{fontSize : RFPercentage(2), fontFamily: 'hanna'}}>({(item.totalPoint / item.starUserCount).toFixed(2)})</Text>
                    </View>
                </View>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>
    );
    
  }
}

// 스타일
const styles = StyleSheet.create({
  content: {
    flex:1,
    flexDirection : 'row',
    justifyContent : 'space-between',
    paddingTop : RFValue(20),
    backgroundColor : 'white',
  },
  element : {
    flexDirection : 'column',
    justifyContent : 'center',
    width : (Dimensions.get('window').width)/100*44,
    borderWidth : RFValue(3),
    borderColor : 'pink',
    borderRadius : 5,
  },
  elementContent : {
    paddingVertical : RFValue(10),
    padding: RFValue(5),
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'flex-start',
  },
  searchbaritself: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginVertical: '3%',
    paddingLeft: '5%',
    width: '80%',
    height : RFValue(40),
    marginRight: '5%'
  },
  searchbar: {
    height: RFValue(55),
    flexDirection: 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth :1,
    borderColor : '#AAAAAA',
    paddingHorizontal: RFValue(15)
  },
  searchbaritself: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginVertical: '3%',
    paddingLeft: '5%',
    width: '80%',
    height : RFValue(40),
    marginRight: '5%'
  },
});


// return (
//   <SafeAreaView 
//     style={{
//       flex: 1,
//       marginTop : getStatusBarHeight()
//     }}
//   >
//     <View style={styles.searchbar}>
//       <Icon
//         name='arrow-back'
//         onPress={this.BackButtonPress.bind(this)}
//       />
//       <Icon
//         name='search'
//         type='material'
//         onPress = {() => this.searchHeader.show()}
//       />
//     </View>
//     <SearchHeader
//       ref = {(searchHeader) => {
//         this.searchHeader = searchHeader;
//       }}
//       placeholder = 'Search...'
//       placeholderColor = 'gray'
//       onClear = {() => {
//           console.log(`Clearing input!`);
//       }}
//       /**
//        * 연관검색어 구현 (8/15 updated)
//        */
//       onSearch = {(item) => {
//         this.props.navigation.navigate('InfoByName',{NameOfRestaurant: item.nativeEvent.text});
//         this.searchHeader.clear();
//         this.searchHeader.hide();
//         console.log("serach");
//       }}
//       topOffset={0}
//       onGetAutocompletions = {async (text) => {
//         if (text) {
//           return DataList.name_list.filter(item => {
//             return item.includes(text);
//           })
//         } else {
//           return [];
//         }
//       }}
//     />
//     <View style={{ paddingLeft: '70%', paddingRight: '5%' }}>
//       {/* <Dropdown
//         dropdownOffset={{top: 12.5, left: 0}}
//         dropdownMargins={{min: 0, max: 10}}
//         label={'정렬'}
//         data={data}
//         onChangeText={value => this.onChangeHandler(value)}
//       /> */}
//        <Dropdown
//         dropdownOffset={{top: 22, left: 0}}
//         dropdownMargins={{min: 0, max: 10}}
//         label={'정렬'}
//         itemPadding={5}
//         data={data}
//         onChangeText={value => this.onChangeHandler(value)}
//       />
//     </View>
//     <FlatList
//       // data={this.state.showList}
//       data={this.state.list}
//       columnWrapperStyle={{ justifyContent : 'space-between', marginVertical : (Dimensions.get('window').width)/100*2}}
//       numColumns={2}
//       keyExtractor={(item, index) => item.name}
//       contentContainerStyle={{paddingHorizontal : RFValue(15)}}
//       // onEndReached={(info) => {this.renderMore()}}
//       // onEndReachedThreshold={5 / this.state.showList.length}
//       renderItem={({item, index}) => 
//         <TouchableOpacity style={styles.element} onPress={this.RestaurantPress.bind(this, item, index)}>
//             <ImageBackground
//                 source={{uri: item.image}}
//                 style={{width : '100%', height : (Dimensions.get('window').width)/100*30}}
//             >
//                 <Icon
//                     name='heart'
//                     type='octicon'
//                     color={item.heart}
//                     size={RFValue(30)}
//                     onPress={this.HeartButtonPress.bind(this, index)}
//                     containerStyle={{
//                         flexDirection : 'row', 
//                         justifyContent : 'flex-end', 
//                         alignItems : 'flex-start', 
//                         padding: RFValue(10)
//                     }}
//                 />
//             </ImageBackground>
//             <View style={styles.elementContent}>
//                 <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
//                   <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: RFValue(15), fontFamily: 'hanna'}}> {item.name} </Text>
//                 </View>
//                 <View style={{flexDirection : 'row', alignItems : 'center'}}>
//                     <Rating
//                         imageSize={15}
//                         readonly
//                         startingValue={item.totalPoint / item.starUserCount}
//                         style={{paddingRight: 5}}
//                     />
//                     <Text style={{fontSize : RFPercentage(2), fontFamily: 'hanna'}}>({(item.totalPoint / item.starUserCount).toFixed(2)})</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//       }
//     />
//   </SafeAreaView>
// );