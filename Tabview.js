
import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Header } from "react-native-elements"
import SearchHeader from 'react-native-search-header';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import CategoryButton from "./CategoryButton";
import TagSearch from "./TagSearch";

let tagArray = new TagSearch();
// let allKindButtonColor
export default class Tabview extends Component {
  constructor(props){
    super(props);
    this.allButtonText="모두선택";
    this.allKindButtonColor = 1.0;
    this.allRegionButtonColor = 1.0;
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: '종류' },
        { key: 'second', title: '지역' },
        { key: 'third', title: '배달'}
      ],
      allKindButtonColor : false,
      allRegionButtonColor : false,
    };
  }

  allPressKindButton(){
    tagArray.allPressKindButton(!this.state.allKindButtonColor);
    this.props.updateTagArray()
    this.setState({
      allKindButtonColor: !this.state.allKindButtonColor, 
    })
  }
  allPressRegionButton(){
    tagArray.allPressRegionButton(!this.state.allRegionButtonColor);
    this.props.updateTagArray()
    this.setState({
      allRegionButtonColor: !this.state.allRegionButtonColor, 
    })
  }

  render(){
    this.allKindButtonColor = this.state.allKindButtonColor ? '#ffdeeb' : '#e64980';
    this.allRegionButtonColor = this.state.allRegionButtonColor ? '#ffdeeb' : '#e64980';
    this.allKindButtonText=this.state.allKindButtonColor ? "모두해제": "모두선택";
    this.allRegionButtonText=this.state.allRegionButtonColor ? "모두해제": "모두선택";
    this.allKindButtonTextColor = this.state.allKindButtonColor ? '#BBBBBB' : 'white';
    this.allRegionButtonTextColor = this.state.allRegionButtonColor ? '#BBBBBB' : 'white';
    console.log("allkindbuttoncolor",this.state.allKindButtonColor);
    console.log("/allkindbuttoncolor",this.allKindButtonColor);
    return(
      <TabView
        navigationState={this.state}
        renderScene={({route}) => {
            switch ( route.key ) {
              case  'first' :
                return  (
                  <View style={styles.scene}>
                    <View style={styles.buttonGroup}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="한식" imgfile={require("./food/korean.jpeg")} index={0} category="kind"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="양식" imgfile={require("./food/western.jpeg")} index={1} category="kind"/>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="중식" imgfile={require("./food/chinese.jpeg")} index={2} category="kind"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="일식" imgfile={require("./food/japanese.jpeg")} index={3} category="kind"/>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="야식" imgfile={require("./food/nighteat.jpeg")} index={4} category="kind"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="기타" imgfile={require("./food/others.jpeg")} index={5} category="kind"/>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection : 'row', justifyContent : 'center', alignItems : 'stretch', width:'100%',
                        backgroundColor : this.allKindButtonColor,
                        borderRadius : 5,
                        paddingVertical: 5,
                        marginTop : 15,
                      }}
                      onPress={this.allPressKindButton.bind(this)}
                    >
                      <Text  style={{fontSize: RFValue(15), color: this.allKindButtonTextColor, textAlign: 'center', fontFamily: 'hanna'}}>{this.allKindButtonText}</Text>
                    </TouchableOpacity>
                  </View>
                );
            case  'second' :
                return  (
                  <View style={styles.scene}>
                    <View style={styles.buttonGroup}>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="법원" imgfile ={require("./region/court.jpeg")} index={0} category="region"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="양덕/장성" imgfile={require("./region/yangduck.jpeg")} index={1} category="region"/>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="환호" imgfile={require("./region/hwanho.jpeg")} index={2} category="region"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="영일대" imgfile={require("./region/yeongildae.jpeg")} index={3} category="region"/>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="육거리" imgfile={require("./region/street.jpeg")} index={4} category="region"/>
                        <CategoryButton updateTagArray = {this.props.updateTagArray} name ="기타" imgfile={require("./region/others.jpeg")} index={5} category="region"/>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection : 'row', justifyContent : 'center', alignItems : 'stretch', width:'100%',
                        backgroundColor : this.allRegionButtonColor,
                        borderRadius : 5,
                        paddingVertical: 5,
                        marginTop : 15,
                      }}
                      onPress={this.allPressRegionButton.bind(this)}
                    >
                      <Text  style={{fontSize: RFValue(15), color: this.allRegionButtonTextColor, textAlign: 'center', fontFamily: 'hanna'}}>{this.allRegionButtonText}</Text>
                    </TouchableOpacity>
                  </View>
                );
              case  'third' :
                return  (
                  <View style={styles.scene}>
                    <View style={styles.buttonGroup}>
                      <CategoryButton 
                        updateTagArray = {this.props.updateTagArray}
                        name ="한동대 배달 가능" 
                        imgfile={require("./delivery/handong.jpeg")}
                        category="delivery"
                      />
                    </View>
                  </View>
                );
          }}
        }
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
        useNativeDriver = {true}
        renderTabBar={(props) =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#e64980' }}
            style={{backgroundColor: "pink"}}
            renderIcon={this.renderIcon}
            renderLabel={({ route }) => {
              return (
                <View>
                  <Text
                    style={
                      route.key === props.navigationState.routes[this.state.index].key
                        ? styles.tabActiveStyle
                        : styles.tabInctiveStyle
                    }
                  >
                    {route.title}
                  </Text>
                </View>
              );
            }}
          />
        }
      />
    )
  }
}


// 스타일
const styles = StyleSheet.create({
  buttonGroup: {
    width : '100%',
    height: '100%',
    flex : 1,
  },
  tabActiveStyle: {
    color: 'black',
    fontSize: RFPercentage(2.5),
    fontFamily: 'hanna'
  },
  tabInctiveStyle: {
    color: 'black',
    fontSize: RFPercentage(2.5),
    fontFamily: 'hanna'
  },
  scene: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 15,
  },
});


export { tagArray };

// return(
//   <TabView
//     navigationState={this.state}
//     renderScene={({route}) => {
//         switch ( route.key ) {
//           case  'first' :
//             return  (
//               <View style={styles.scene}>
//                 <View style={styles.buttonGroup}>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="한식" imgfile={require("./food/korean.jpeg")} index={0} category="kind"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="양식" imgfile={require("./food/western.jpeg")} index={1} category="kind"/>
//                   </View>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="중식" imgfile={require("./food/chinese.jpeg")} index={2} category="kind"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="일식" imgfile={require("./food/japanese.jpeg")} index={3} category="kind"/>
//                   </View>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="야식" imgfile={require("./food/nighteat.jpeg")} index={4} category="kind"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="기타" imgfile={require("./food/others.jpeg")} index={5} category="kind"/>
//                   </View>
//                 </View>
//                 <TouchableOpacity
//                   style={{
//                     flexDirection : 'row', justifyContent : 'center', alignItems : 'stretch', width:'100%',
//                     backgroundColor : this.allKindButtonColor,
//                     borderRadius : 5,
//                     paddingVertical: 5,
//                     marginTop : 15,
//                   }}
//                   onPress={this.allPressKindButton.bind(this)}
//                 >
//                   <Text  style={{fontSize: RFValue(15), color: this.allKindButtonTextColor, textAlign: 'center', fontFamily: 'hanna'}}>{this.allKindButtonText}</Text>
//                 </TouchableOpacity>
//               </View>
//             );
//         case  'second' :
//             return  (
//               <View style={styles.scene}>
//                 <View style={styles.buttonGroup}>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="법원" imgfile ={require("./region/court.jpeg")} index={0} category="region"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="양덕/장성" imgfile={require("./region/yangduck.jpeg")} index={1} category="region"/>
//                   </View>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="환호" imgfile={require("./region/hwanho.jpeg")} index={2} category="region"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="영일대" imgfile={require("./region/yeongildae.jpeg")} index={3} category="region"/>
//                   </View>
//                   <View style={{flex: 1, flexDirection: 'row'}}>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="육거리" imgfile={require("./region/street.jpeg")} index={4} category="region"/>
//                     <CategoryButton updateTagArray = {this.props.updateTagArray} name ="기타" imgfile={require("./region/others.jpeg")} index={5} category="region"/>
//                   </View>
//                 </View>
//                 <TouchableOpacity
//                   style={{
//                     flexDirection : 'row', justifyContent : 'center', alignItems : 'stretch', width:'100%',
//                     backgroundColor : this.allRegionButtonColor,
//                     borderRadius : 5,
//                     paddingVertical: 5,
//                     marginTop : 15,
//                   }}
//                   onPress={this.allPressRegionButton.bind(this)}
//                 >
//                   <Text  style={{fontSize: RFValue(15), color: this.allRegionButtonTextColor, textAlign: 'center', fontFamily: 'hanna'}}>{this.allRegionButtonText}</Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           case  'third' :
//             return  (
//               <View style={styles.scene}>
//                 <View style={styles.buttonGroup}>
//                   <CategoryButton 
//                     updateTagArray = {this.props.updateTagArray}
//                     name ="한동대 배달 가능" 
//                     imgfile={require("./delivery/handong.jpeg")}
//                     category="delivery"
//                   />
//                 </View>
//               </View>
//             );
//       }}
//     }
//     onIndexChange={index => this.setState({index})}
//     initialLayout={{width: Dimensions.get('window').width}}
//     useNativeDriver = {true}
//     renderTabBar={(props) =>
//       <TabBar
//         {...props}
//         indicatorStyle={{ backgroundColor: '#e64980' }}
//         style={{backgroundColor: "pink"}}
//         renderIcon={this.renderIcon}
//         renderLabel={({ route }) => {
//           return (
//             <View>
//               <Text
//                 style={
//                   route.key === props.navigationState.routes[this.state.index].key
//                     ? styles.tabActiveStyle
//                     : styles.tabInctiveStyle
//                 }
//               >
//                 {route.title}
//               </Text>
//             </View>
//           );
//         }}
//       />
//     }
//   />
// )
// }
// }


// // 스타일
// const styles = StyleSheet.create({
// buttonGroup: {
// width : '100%',
// height: '100%',
// flex : 1,
// },
// tabActiveStyle: {
// color: 'black',
// fontSize: RFValue(20),
// fontFamily: 'hanna'
// },
// tabInctiveStyle: {
// color: 'black',
// fontSize: RFValue(20),
// fontFamily: 'hanna'
// },
// scene: {
// flex:1,
// alignItems: 'center',
// justifyContent: 'center',
// backgroundColor: 'white',
// margin: 15,
// },
// });
