import React, { Component } from "react";
import { createAppContainer, createStackNavigator} from 'react-navigation';
import Main from "./Main";
import FavoriteList from "./FavoriteList";
import RestaurantList from "./RestaurantList";
import RestaurantInfo from "./RestaurantInfo";
import InfoByName from "./InfoByName";
import Comment from "./Comment";

import getData from "./getData";

import { AsyncStorage } from 'react-native';
import { info } from "./LoadAsyncStorage";
import { db } from './dataBase';

import * as Font from 'expo-font';
import Loading from './Loading';

// 홈 페이지에 대해 스택 네비게이터 생성

const AppContainer = createAppContainer(createStackNavigator(
  {
    Home : Main,
    FavoriteList : FavoriteList,
    SearchList : RestaurantList,
    Info : RestaurantInfo,
    InfoByName : InfoByName,  // for direct search by restaurant name (8/15)
    Comment : Comment,
  },
  {
    initialRouteName: "Home",
    headerMode: 'none',
    defaultNavigationOptions: {
      headerVisible: false,
    },
  },
));

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false, //To show the main page of the app
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'do-hyeon': require('./assets/fonts/BMDOHYEON_ttf.ttf'),
      'hanna': require('./assets/fonts/BMHANNA_11yrs_ttf.ttf'),
      'yeon-sung': require('./assets/fonts/BMYEONSUNG_ttf.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render(){

    if(!this.state.fontLoaded) {
      return(
        <Loading/>
      );
    }
    
    else {
      console.log("in App.js test: ", info);
    
      if(info.isFirst !== 'false') {
        //If false show the Intro Slides
        
        db.collection('users').add({
          nickName: "",
        }).then(ref => {
          // this.setToAsyncStorage('ID', ref.id);
          (async() => {
            try {
              await AsyncStorage.setItem('ID', ref.id);
              info.ID = ref.id;
              console.log("New ID: ", ref.id);
            } catch (err) {
              console.log('[Set new ID]', err);
            }
          })();
          // this.setToAsyncStorage('isFirst', JSON.stringify(false));
          (async() => {
            try {
              await AsyncStorage.setItem('isFirst', JSON.stringify(false));
              info.isFirst = false;
              console.log('Set isFirst');
            } catch (err) {
              console.log('[Set isFirst]', err);
            }
          })();
          // this.setToAsyncStorage('isFirst', JSON.stringify(false));
        });
        return (
          <AppContainer></AppContainer>
        );
        
      } else {
        // console.log("new info: ", info);
        return(
          <AppContainer></AppContainer>
        );
      }
    
    }
  }
}
