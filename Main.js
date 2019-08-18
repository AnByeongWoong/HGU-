import React, { Fragment, Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { ScrollView, SafeAreaView, Platform, Button, Image, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert, TextInput } from "react-native";
import { Icon, SearchBar } from "react-native-elements"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Tabview from "./Tabview";
import {tagArray} from "./Tabview";
import SearchHeader from 'react-native-search-header';
import getData from "./getData";

//// data 받아오기 
let DataList = new getData();
DataList.get_Data();
DataList.getUserData();
// DataList.delete_text();
// DataList.delete_user(); 
  export {DataList};
var search;
let tag =[];

// 메인 페이지 만드는 클래스
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: true,
    }
  };

  Tagsearchbutton(){
    let trueCount=0;
    for(let i=0; i<=5; i++){
      if((tagArray.kind_bool[i] === true )||(tagArray.region_bool[i] === true)||(tagArray.delivery_bool == true)){
        trueCount++;
      }
    }
    if(trueCount===0){
      Alert.alert("카테고리를 선택해주세요","정확한 검색을 위해서는 카테고리를 하나 이상 선택해야 합니다:)")
    }else{
      // this.props.navigation.navigate('SearchList')
      this.props.navigation.push('SearchList');
    }
  }
  categoryButtonClick(){
    //pop
    for(let i=0; i<=5; i++){
      tag.pop(
        <Text style={styles.tagElements}>
          {tagArray.kind_name[i]}
        </Text>
      ); 
      tag.pop(
        <Text style={styles.tagElements}>
          {tagArray.region_name[i]}
        </Text>
      );
    }
    tag.pop(
      <Text style={styles.tagElements}>
        {tagArray.delivery_name}
      </Text>
    );
    //push
    for(let i=0; i<=5; i++){
      if(tagArray.kind_bool[i] == true){
        tag.push(
          <Text style={styles.tagElements}>
            {tagArray.kind_name[i]}
          </Text>
        ); 
      }  
      if(tagArray.region_bool[i] == true){
        tag.push(
          <Text style={styles.tagElements}>
            {tagArray.region_name[i]}
          </Text>
        );
      }
    }

    if(tagArray.delivery_bool == true){
      tag.push(
        <Text style={styles.tagElements}>
          {tagArray.delivery_name}
        </Text>
      ); 
    } 
    this.setState({
      now: false,
    });
  }

  
  render() {
    return (
      <Fragment>
        <SafeAreaView style={{ flex:0, backgroundColor: 'white', marginTop : Platform.OS ==='ios'? 0 : getStatusBarHeight()}} />
        <SafeAreaView style={{ flex: 1, backgroundColor : 'pink'}}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={{width: RFValue(25), height : RFValue(25)}}>
              </View>
              <Text style={{fontSize: RFValue(25), fontFamily: 'yeon-sung'}}>
                한동네맛집
              </Text>
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
              headerHeight = {RFValue(55)}
              placeholder = 'Search...'
              placeholderColor = 'gray'
              onClear = {() => {
                  console.log(`Clearing input!`);
              }}
              /**
               * 연관검색어 구현 (8/15 updated)
              **/
             suggestionHistoryEntryRollOverCount = {3}
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
            <View style={styles.tag}>
              <View style={styles.tagarea2}>
                <ScrollView horizontal={true}>
                  {tag}
                </ScrollView>    
              </View>
              <TouchableOpacity
                style={styles.tagsearchbuttonarea}
                onPress={this.Tagsearchbutton.bind(this)}            
              >
                <Text style={{color : 'white', fontFamily: 'hanna'}}>태그검색</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <Tabview updateTagArray= {() => this.categoryButtonClick()}/>
              <View style={{flexDirection : 'row', justifyContent : 'space-around', alignItems : 'center', backgroundColor: 'pink', height : 50}}>
                <TouchableOpacity
                  style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}
                  onPress={()=>
                    this.props.navigation.navigate('Home')
                  }
                >
                  <Text style = {{fontFamily: 'hanna'}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection : 'row', justifyContent : 'center', alignItems : 'center',width:'50%', height:50}}
                  onPress={()=>this.props.navigation.navigate('FavoriteList')}
                >
                  <View>
                    <Text style = {{fontFamily: 'hanna'}}>My Page</Text>
                  </View>
                </TouchableOpacity>
              </View> 
            </View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

// 스타일
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  header : {
    backgroundColor: 'white', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems : 'center',
    height : RFValue(55),
    paddingHorizontal : RFValue(15),
    borderColor : '#AAAAAA',
    borderBottomWidth :1,
  },
  tag : {
    flexDirection : 'row',
    justifyContent : 'space-around', 
    alignItems : 'center', 
    borderBottomWidth :1,
    borderColor : '#AAAAAA',
    height : RFValue(50),
  },
  tagarea : {
    flexDirection : 'row', 
    flexWrap : 'wrap',
    justifyContent : 'flex-start', 
    alignItems : 'flex-start', 
    paddingVertical : RFValue(5),
    paddingHorizontal : RFValue(10),
    backgroundColor: "white", 
    width : (Dimensions.get('window').width)/100*80,
  },
  sTextItem: {
    height: 50,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18
  },
  tagarea2 : {
    flexDirection : 'row', 
    flexWrap : 'wrap',
    justifyContent : 'flex-start', 
    alignItems : 'flex-start', 
    paddingVertical : RFValue(5),
    paddingHorizontal : RFValue(10),
    backgroundColor: "white", 
    width : (Dimensions.get('window').width)/100*75
  },
  tagElements : {
    flexDirection : 'row', 
    justifyContent : 'center', 
    alignItems : 'center',
    textAlign: 'center',  
    backgroundColor : '#DDDDDD', 
    paddingVertical : RFValue(3),
    paddingHorizontal : RFValue(15),
    margin : RFValue(5),
    borderWidth : 1,
    borderColor : '#AAAAAA',
    color : 'grey',
    borderRadius : 5,
    fontFamily: 'hanna',
  },
  tagsearchbuttonarea : {
    flexDirection: 'row',
    justifyContent : 'center', 
    alignItems : 'center',
    marginRight : 15, 
    paddingVertical : 7, 
    paddingHorizontal : 10, 
    backgroundColor: '#e64980', 
    borderRadius : 5,
  },
  content: {
    flex: 1,
  },
  bottomButton : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    paddingVertical : RFValue(15),
    paddingHorizontal : '4%'
  },
  searchbar: {
    flexDirection: 'row',
    justifyContent : 'space-between',
    alignItems: 'center',
    width: '100%',
    height : RFValue(55),
    borderBottomWidth :1,
    borderColor : '#AAAAAA',
  },
  searchbaritself: {
    borderRadius: 5,
    backgroundColor: 'lightgray',
    marginVertical: '3%',
    paddingLeft: '5%',
    width: '80%',
    height : RFValue(40),
    marginRight: '5%',
  },
});