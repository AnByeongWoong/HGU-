// import React, { Component } from "react";
// import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { tagArray } from "./Tabview";
// // import console = require("console");
// //import {Main, M} from "./Main";

// export default class CategoryButton extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//             beforePressCategoryButton: false,
//             //number : 1
//         }
//     }
//     pressButton(){
//         tagArray.changeStatus(this.props.index, this.props.category);
//         this.props.updateTagArray();
//     }
//     render() {
//         let transparent;
//         let fontColor;
//         if(this.props.category === "kind"){
//             transparent=tagArray.kind_bool[this.props.index] ? 0.3 : 1.0;
//             fontColor=tagArray.kind_bool[this.props.index] ? 'gray' : 'white';
//         }
//         if(this.props.category === "region"){
//             transparent=tagArray.region_bool[this.props.index] ? 0.3 : 1.0;
//             fontColor=tagArray.region_bool[this.props.index] ? 'gray' : 'white';
//         }
//         if(this.props.category === "delivery"){
//             transparent=tagArray.delivery_bool ? 0.3 : 1.0;
//             fontColor=tagArray.delivery_bool ? 'gray' : 'white';
//         }
//         return (
//             <View style={{flex: 1, width: '100%', height: '100%', resizeMode : 'contain'}}>
//                 <TouchableOpacity onPress={this.pressButton.bind(this)}>
//                     <ImageBackground
//                         source={this.props.imgfile}
//                         imageStyle= {{opacity: transparent}}
//                         style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', resizeMode : 'contain'}}
//                     >
//                         <Text style={{color : fontColor, fontSize: RFValue(25), fontWeight : 'bold', fontFamily: 'do-hyeon'}}>{this.props.name}</Text>
//                     </ImageBackground>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

import React, { Component } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { tagArray } from "./Tabview";
// import console = require("console");
//import {Main, M} from "./Main";

export default class CategoryButton extends Component {
    constructor(props){
        super(props)
        this.state={
            beforePressCategoryButton: false,
            //number : 1
        }
    }
    pressButton(){
        tagArray.changeStatus(this.props.index, this.props.category);
        this.props.updateTagArray();
    }
    render() {
        let transparent;
        let fontColor;
        if(this.props.category === "kind"){
            transparent=tagArray.kind_bool[this.props.index] ? 0.3 : 1.0;
            fontColor=tagArray.kind_bool[this.props.index] ? 'gray' : 'white';
        }
        if(this.props.category === "region"){
            transparent=tagArray.region_bool[this.props.index] ? 0.3 : 1.0;
            fontColor=tagArray.region_bool[this.props.index] ? 'gray' : 'white';
        }
        if(this.props.category === "delivery"){
            transparent=tagArray.delivery_bool ? 0.3 : 1.0;
            fontColor=tagArray.delivery_bool ? 'gray' : 'white';
        }
        return (
            <View style={{flex: 1, width: '100%', height: '100%', resizeMode : 'contain'}}>
                <TouchableOpacity onPress={this.pressButton.bind(this)}>
                    <ImageBackground
                        source={this.props.imgfile}
                        imageStyle= {{opacity: transparent}}
                        style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', resizeMode : 'contain'}}
                    >
                        <Text style={{color : fontColor, fontSize: RFPercentage(4.5), fontWeight : 'bold', fontFamily: 'hanna'}}>{this.props.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }
}