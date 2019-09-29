import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';
import { db } from "./dataBase";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import console = require('console');



let data = {};
let search;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadData: false,
      textIn: '',
    };
  }

  _onPressButton(arg) {
      //this.setState({search: this.state.textIn})
      //this.setState({serach: arg});
      search=arg.split(',');
      //Alert.alert(search);
  }

  render(){
    let getRestaurant = db.collection('restaurants').doc("restaurant1");
    let getDoc = getRestaurant.get()
    .then(doc => {
        if(!doc.exists) {
            console.log('Np such document!');
        } else {
            data.name = doc.data().name;
            data.hours = doc.data().hours;
            data.location = doc.data().location;
            data.image = doc.data().image;
            data.menu = doc.data().menu;
            data.phoneNumber = doc.data().phoneNumber;
            data.category = doc.data().category;
            // console.log('loading complete');
            // console.log('name: ', data.name);
        }
    })
    .catch(e => {
        console.log('Error: getting document (in dataBase.js)', e);
    })
    .then(() => {
      this.setState({loadData: true})
    });

    if (this.state.loadData === false) {
      return(
      <View style={styles.loading}>
        <Text>loading....</Text>
      </View>
      );
    }
    
    //console.log(this.state.search);
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
            <TextInput
                style={{width: 300, fontSize: 40}}
                placeholder="Search..."
                onChangeText={text => this.setState({textIn: text})}
                onSubmitEditing={event => {this._onPressButton(event.nativeEvent.text)}}
                value={this.state.textIn}
                clearButtonMode='always'
                returnKeyType='search'
                autoCapitalize='none'
                //autoComplete='none'
            />
            <TouchableHighlight onPress={event => {this._onPressButton(this.state.textIn)}} underlayColor="white">
                <View style={styles.button}>
                    <Text style={{fontSize:30}}>Go!</Text>
                </View>
            </TouchableHighlight> 
        </View>
        <Text>{search}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    height : RFPercentage(10),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height : RFPercentage(10),
    margin : 10,
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
  },
  button: {
    height: 50,  
    width: 60,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  }
});