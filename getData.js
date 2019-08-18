// import * as FileSystem from 'expo-file-system';
// import {
//     db
// } from "./dataBase";

// var string = "";

// export default class getData {

//     constructor() {
//         this.array = [];
//         this.array2 = [];
//         this.count = 0;
//         this.name_list = [];
//         this.object_list = [];
//         this.data = [];
//         this.k = true;
//         this.userFavoriteList = [];
//         this.array3 = [];
//         this.array4 = [];
//         // this.dummyObject = {
//         //     delivery: "",
//         //     kind: 0,
//         //     region: "",
//         //     heart: "",
//         //     hour: "",
//         //     image: "",
//         //     location: "",
//         //     locationLink: "",
//         //     name: "",
//         //     phoneNumber: "",
//         //     starUserCount: 0,
//         //     totalPoint: 0,
//         //     menu: "",
//         // };
//     }
//     // overwriteText(objectArray){
//     //     var string = "";
//     //     for(var i=0; i<objectArray.length; i++){
//     //         string += "re점프al"+ String(objectArray[i].category.delivery) + "re점프al"+ String(objectArray[i].category.kind) + "re점프al"+objectArray[i].category.region + "re점프al" + objectArray[i].heart + "re점프al" + objectArray[i].hours + "re점프al" + objectArray[i].image + "re점프al" + objectArray[i].location + "re점프al" + objectArray[i].locationLink  + "re점프al"+objectArray[i].name+"re점프al"+objectArray[i].phoneNumber+"re점프al"+String(objectArray[i].starUserCount)+"re점프al"+String(objectArray[i].totalPoint) + "re점프al"+ objectArray[i].menu +"re이단점프al" ;  
//     //     }
//     //     FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
//     //     .then(()=>{
//     //     console.log("finished");
//     //     } 
//     //     )
//     //     .catch(err =>{
//     //     console.log(err);
//     //     });
//     // }
//     wirteUserFavorite(content) {
//         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "user", content)
//             .then(() => {
//                 console.log("finish User");
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
//     write_text(content) {
//         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
//             .then(() => {
//                 console.log("finished");
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
//     readIserFavorite() {
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "user")
//             .then(content => {
//                 console.log(content);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     read_text() {
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "text")
//             .then(content => {
//                 console.log(content);
//                 // console.log("tttt");
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     delete_text() {
//         FileSystem.deleteAsync(FileSystem.documentDirectory + "text")
//             .then(() => {
//                 console.log("delete finish");
//             })
//     }
//     delete_user() {
//         FileSystem.deleteAsync(FileSystem.documentDirectory + "user")
//             .then(() => {
//                 console.log("delete finish");
//             })
//     }

//     get_Data() {
//         // console.log("getDatainfo"+info);
//         // if(info.isFirst){

//         // }
//         // else{
//         console.log("read first");
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
//             .then(content => {
//                 this.array = content.split("re이단점프al");
//                 for (var i = 0; i < this.array.length - 1; i++) {
//                     this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
//                 }
//                 for (var i = 0; i < this.array.length - 1; i++) {
//                     var dummyObject = {};
//                     dummyObject.delivery = this.array2[i][1];
//                     dummyObject.kind = Number(this.array2[i][2]);
//                     dummyObject.region = this.array2[i][3];
//                     dummyObject.heart = this.array2[i][4];
//                     dummyObject.hour = this.array2[i][5];
//                     dummyObject.image = this.array2[i][6];
//                     dummyObject.location = this.array2[i][7];
//                     dummyObject.locationLink = this.array2[i][8];
//                     dummyObject.name = this.array2[i][9];
//                     dummyObject.phoneNumber = this.array2[i][10];
//                     dummyObject.starUserCount = Number(this.array2[i][11]);
//                     dummyObject.totalPoint = Number(this.array2[i][12]);
//                     dummyObject.menu = this.array2[i][13];
//                     //console.log(dummyObject);
//                     this.object_list.push(dummyObject);
//                 }
//                 // console.log(this.object_list);
//                 for(let i = 0; i < this.object_list.length; i++){
//                     this.name_list.push(this.object_list[i].name);
//                 }

//                 console.log("finish");
//             })
//             .catch(err => {
//                 console.log("에러 이후 쓰기");
//                 db.collection("restaurants").get()
//                     .then(snapshot => {

//                         if (snapshot.empty) {
//                             console.log('No such document!');
//                             return;
//                         }
//                         snapshot.forEach(doc => {
//                             this.data[this.count++] = doc.data();

//                         })
//                         for (var i = 0; i < this.count; i++) {
//                             string += "re점프al" + String(this.data[i].category.delivery) + "re점프al" + String(this.data[i].category.kind) + "re점프al" + this.data[i].category.region + "re점프al" + this.data[i].heart + "re점프al" + this.data[i].hours + "re점프al" + this.data[i].image + "re점프al" + this.data[i].location + "re점프al" + this.data[i].locationLink + "re점프al" + this.data[i].name + "re점프al" + this.data[i].phoneNumber + "re점프al" + String(this.data[i].starUserCount) + "re점프al" + String(this.data[i].totalPoint) + "re점프al" + this.data[i].menu + "re이단점프al";
//                         }
//                         this.write_text(string);
//                         this.array = string.split("re이단점프al");
//                         for (var i = 0; i < this.array.length - 1; i++) {
//                             this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
//                         }
//                         for (var i = 0; i < this.array.length - 1; i++) {
//                             var dummyObject = {};
//                             dummyObject.delivery = this.array2[i][1];
//                             dummyObject.kind = Number(this.array2[i][2]);
//                             dummyObject.region = this.array2[i][3];
//                             dummyObject.heart = this.array2[i][4];
//                             dummyObject.hour = this.array2[i][5];
//                             dummyObject.image = this.array2[i][6];
//                             dummyObject.location = this.array2[i][7];
//                             dummyObject.locationLink = this.array2[i][8];
//                             dummyObject.name = this.array2[i][9];
//                             dummyObject.phoneNumber = this.array2[i][10];
//                             dummyObject.starUserCount = Number(this.array2[i][11]);
//                             dummyObject.totalPoint = Number(this.array2[i][12]);
//                             dummyObject.menu = this.array2[i][13];
//                             //console.log(dummyObject);
//                             this.object_list.push(dummyObject);
//                         }
//                         for(let i = 0; i < this.object_list.length; i++){
//                             this.name_list.push(this.object_list[i].name);
//                         }
//                     })
//             });
//         // }
//     }

//     getUserData() {

//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + "user")
//             .then(content => {
//                 this.array3 = content.split("re이단점프al");
//                 for (var i = 0; i < this.array3.length - 1; i++) {
//                     this.array4[i] = Object.assign({}, this.array3[i].split("re점프al"));
//                 }
//                 for (var i = 0; i < this.array3.length - 1; i++) {
//                     var dummyObject = {};
//                     dummyObject.delivery = this.array4[i][1];
//                     dummyObject.kind = Number(this.array4[i][2]);
//                     dummyObject.region = this.array4[i][3];
//                     dummyObject.heart = this.array4[i][4];
//                     dummyObject.hour = this.array4[i][5];
//                     dummyObject.image = this.array4[i][6];
//                     dummyObject.location = this.array4[i][7];
//                     dummyObject.locationLink = this.array4[i][8];
//                     dummyObject.name = this.array4[i][9];
//                     dummyObject.phoneNumber = this.array4[i][10];
//                     dummyObject.starUserCount = Number(this.array4[i][11]);
//                     dummyObject.totalPoint = Number(this.array4[i][12]);
//                     dummyObject.menu = this.array4[i][13];
//                     this.userFavoriteList.push(dummyObject);
//                     console.log(dummyObject.name);
//                 }
//                 console.log("get usesr info finish");



//             })
//             .catch(err => {
//                 console.log("no fie");
//             });
//     }

//     overwriteText(objectArray) {
//         var string = "";
//         for (var i = 0; i < objectArray.length; i++) {
//             string += "re점프al" + String(objectArray[i].category.delivery) + "re점프al" + String(objectArray[i].category.kind) + "re점프al" + objectArray[i].category.region + "re점프al" + objectArray[i].heart + "re점프al" + objectArray[i].hours + "re점프al" + objectArray[i].image + "re점프al" + objectArray[i].location + "re점프al" + objectArray[i].locationLink + "re점프al" + objectArray[i].name + "re점프al" + objectArray[i].phoneNumber + "re점프al" + String(objectArray[i].starUserCount) + "re점프al" + String(objectArray[i].totalPoint) + "re점프al" + objectArray[i].menu + "re이단점프al";
//         }
//         FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
//             .then(() => {
//                 console.log("finished");
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     /**
//      * to update cache data when click the button. (8/15 updated)
//      */
//     updateData() {
//         this.object_list.splice(0,this.object_list.length);
//         db.collection("restaurants").get()
//             .then(snapshot => {
//                 if (snapshot.empty) {
//                     console.log('No such document!');
//                     return;
//                 }
//                 snapshot.forEach(doc => {
//                     this.data[this.count++] = doc.data();

//                 })
//                 for (var i = 0; i < this.count; i++) {
//                     string += "re점프al" + String(this.data[i].category.delivery) + "re점프al" + String(this.data[i].category.kind) + "re점프al" + this.data[i].category.region + "re점프al" + this.data[i].heart + "re점프al" + this.data[i].hours + "re점프al" + this.data[i].image + "re점프al" + this.data[i].location + "re점프al" + this.data[i].locationLink + "re점프al" + this.data[i].name + "re점프al" + this.data[i].phoneNumber + "re점프al" + String(this.data[i].starUserCount) + "re점프al" + String(this.data[i].totalPoint) + "re점프al" + this.data[i].menu + "re이단점프al";
//                 }
//                 this.write_text(string);
//                 this.array = string.split("re이단점프al");
//                 for (var i = 0; i < this.array.length - 1; i++) {
//                     this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
//                 }
//                 for (var i = 0; i < this.array.length - 1; i++) {
//                     var dummyObject = {};
//                     dummyObject.delivery = this.array2[i][1];
//                     dummyObject.kind = Number(this.array2[i][2]);
//                     dummyObject.region = this.array2[i][3];
//                     dummyObject.heart = this.array2[i][4];
//                     dummyObject.hour = this.array2[i][5];
//                     dummyObject.image = this.array2[i][6];
//                     dummyObject.location = this.array2[i][7];
//                     dummyObject.locationLink = this.array2[i][8];
//                     dummyObject.name = this.array2[i][9];
//                     dummyObject.phoneNumber = this.array2[i][10];
//                     dummyObject.starUserCount = Number(this.array2[i][11]);
//                     dummyObject.totalPoint = Number(this.array2[i][12]);
//                     dummyObject.menu = this.array2[i][13];
//                     //console.log(dummyObject);
//                     this.object_list.push(dummyObject);
//                 }

//             }).then(() => {
//                 console.log("getData: updateData() complete");
//                 for(let i = 0; i < this.object_list.length; i++){
//                     this.name_list.push(this.object_list[i].name);
//                 }
//             })
//         }
//     }



//                     // let write_text = (content)=>{
//                     //     FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
//                     //     .then(()=>{
//                     //       console.log("finished");
//                     //     } 
//                     //     )
//                     //     .catch(err =>{
//                     //       console.log(err);
//                     //     });
//                     // }
//                     // let read_text = ()=>{
//                     // FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
//                     // .then(content => {
//                     //     console.log(content);
//                     //     // console.log("tttt");
//                     // })
//                     // .catch(err => {
//                     //     console.log(err);
//                     // });
//                     // }
//                     // let delete_text = ()=> {
//                     // FileSystem.deleteAsync(FileSystem.documentDirectory + "./text")
//                     // .then(()=>{
//                     //     console.log("delete finish");
//                     // })
//                     // }

//                     // if(k){
//                     //     db.collection("restaurants").get()
//                     //     .then(snapshot=>{

//                     //     if(snapshot.empty){
//                     //     console.log('No such document!');
//                     //     return;
//                     //     }
//                     //     snapshot.forEach(doc=>{
//                     //     data[count++] = doc.data();

//                     //     })
//                     //     for(var i=0; i<count; i++){
//                     //     string += "re점프al"+ String(data[i].category.delivery) + "re점프al"+ String(data[i].category.kind) + "re점프al"+data[i].category.region + "re점프al" + data[i].heart + "re점프al" + data[i].hours + "re점프al" + data[i].image + "re점프al" + data[i].location + "re점프al" + data[i].locationLink  + "re점프al"+data[i].name+"re점프al"+data[i].phoneNumber+"re점프al"+String(data[i].starUserCount)+"re점프al"+String(data[i].totalPoint) + "re점프al"+ data[i].menu +"re이단점프al" ;  
//                     //     }
//                     //     write_text(string);
//                     //     array = string.split("re이단점프al");
//                     //     for(var i=0; i<count; i++){
//                     //     object_list = Object.assign({}, array[i].split("re점프al"));
//                     //     }

//                     //     })}
//                     // else{
//                     //     FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
//                     //     .then(content => {
//                     //     array = content.split("re이단점프al");
//                     //     for(var i=0; i<count; i++){
//                     //         object_list = Object.assign({}, array[i].split("re점프al"));
//                     //     }
//                     //     console.log("finish");
//                     //     this.setState({a: true});
//                     //     })
//                     //     .catch(err => {
//                     //     console.log(err);
//                     //     });
//                     // }
//                     // export {object_list};
//                     // 처음이면


import * as FileSystem from 'expo-file-system';
import {
    db
} from "./dataBase";

var string = "";

export default class getData {
    
    constructor() {
        this.array = [];
        this.array2 = [];
        this.count = 0;
        this.name_list = [];
        this.object_list = [];
        this.data = [];
        this.userFavoriteList = [];
        this.array3 = [];
        this.array4 = [];

        // this.dummyObject = {
        //     delivery: "",
        //     kind: 0,
        //     region: "",
        //     heart: "",
        //     hour: "",
        //     image: "",
        //     location: "",
        //     locationLink: "",
        //     name: "",
        //     phoneNumber: "",
        //     starUserCount: 0,
        //     totalPoint: 0,
        //     menu: "",
        // };
    }
    // overwriteText(objectArray){
    //     var string = "";
    //     for(var i=0; i<objectArray.length; i++){
    //         string += "re점프al"+ String(objectArray[i].category.delivery) + "re점프al"+ String(objectArray[i].category.kind) + "re점프al"+objectArray[i].category.region + "re점프al" + objectArray[i].heart + "re점프al" + objectArray[i].hours + "re점프al" + objectArray[i].image + "re점프al" + objectArray[i].location + "re점프al" + objectArray[i].locationLink  + "re점프al"+objectArray[i].name+"re점프al"+objectArray[i].phoneNumber+"re점프al"+String(objectArray[i].starUserCount)+"re점프al"+String(objectArray[i].totalPoint) + "re점프al"+ objectArray[i].menu +"re이단점프al" ;  
    //     }
    //     FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
    //     .then(()=>{
    //     console.log("finished");
    //     } 
    //     )
    //     .catch(err =>{
    //     console.log(err);
    //     });
    // }
    wirteUserFavorite(content) {
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "user", content)
            .then(() => {
                console.log("finish User");
            })
            .catch(err => {
                console.log(err);
            })
    }
    write_text(content) {
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
            .then(() => {
                console.log("finished");
            })
            .catch(err => {
                console.log(err);
            });
    }
    readIserFavorite() {
        FileSystem.readAsStringAsync(FileSystem.documentDirectory + "user")
            .then(content => {
                console.log(content);
            })
            .catch(err => {
                console.log(err);
            })
    }

    read_text() {
        FileSystem.readAsStringAsync(FileSystem.documentDirectory + "text")
            .then(content => {
                console.log(content);
                // console.log("tttt");
            })
            .catch(err => {
                console.log(err);
            });
    }

    delete_text() {
        FileSystem.deleteAsync(FileSystem.documentDirectory + "text")
            .then(() => {
                console.log("delete finish");
            })
    }
    delete_user() {
        FileSystem.deleteAsync(FileSystem.documentDirectory + "user")
            .then(() => {
                console.log("delete finish");
            })
    }

    get_Data() {

        // console.log("getDatainfo"+info);
        // if(info.isFirst){
        this.array.splice(0,this.array.length);
        this.array2.splice(0,this.array2.length);
        // }
        // else{
        console.log("read first");
        FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
            .then(content => {
                this.array = content.split("re이단점프al");
                for (var i = 0; i < this.array.length - 1; i++) {
                    this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
                }
                for (var i = 0; i < this.array.length - 1; i++) {
                    var dummyObject = {};
                    dummyObject.delivery = this.array2[i][1];
                    dummyObject.kind = Number(this.array2[i][2]);
                    dummyObject.region = this.array2[i][3];
                    dummyObject.heart = this.array2[i][4];
                    dummyObject.hour = this.array2[i][5];
                    dummyObject.image = this.array2[i][6];
                    dummyObject.location = this.array2[i][7];
                    dummyObject.locationLink = this.array2[i][8];
                    dummyObject.name = this.array2[i][9];
                    dummyObject.phoneNumber = this.array2[i][10];
                    dummyObject.starUserCount = Number(this.array2[i][11]);
                    dummyObject.totalPoint = Number(this.array2[i][12]);
                    dummyObject.menu = this.array2[i][13];
                    //console.log(dummyObject);
                    this.object_list.push(dummyObject);
                }
                // console.log(this.object_list);
                for(let i = 0; i < this.object_list.length; i++){
                    this.name_list.push(this.object_list[i].name);
                }

                console.log("finish");
            })
            .catch(err => {
                console.log("에러 이후 쓰기");
                db.collection("restaurants").get()
                    .then(snapshot => {

                        if (snapshot.empty) {
                            console.log('No such document!');
                            return;
                        }
                        snapshot.forEach(doc => {
                            this.data[this.count++] = doc.data();

                        })
                        for (var i = 0; i < this.count; i++) {
                            string += "re점프al" + String(this.data[i].category.delivery) + "re점프al" + String(this.data[i].category.kind) + "re점프al" + this.data[i].category.region + "re점프al" + this.data[i].heart + "re점프al" + this.data[i].hours + "re점프al" + this.data[i].image + "re점프al" + this.data[i].location + "re점프al" + this.data[i].locationLink + "re점프al" + this.data[i].name + "re점프al" + this.data[i].phoneNumber + "re점프al" + String(this.data[i].starUserCount) + "re점프al" + String(this.data[i].totalPoint) + "re점프al" + this.data[i].menu + "re이단점프al";
                        }
                        this.write_text(string);
                        this.array = string.split("re이단점프al");
                        for (var i = 0; i < this.array.length - 1; i++) {
                            this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
                        }
                        for (var i = 0; i < this.array.length - 1; i++) {
                            var dummyObject = {};
                            dummyObject.delivery = this.array2[i][1];
                            dummyObject.kind = Number(this.array2[i][2]);
                            dummyObject.region = this.array2[i][3];
                            dummyObject.heart = this.array2[i][4];
                            dummyObject.hour = this.array2[i][5];
                            dummyObject.image = this.array2[i][6];
                            dummyObject.location = this.array2[i][7];
                            dummyObject.locationLink = this.array2[i][8];
                            dummyObject.name = this.array2[i][9];
                            dummyObject.phoneNumber = this.array2[i][10];
                            dummyObject.starUserCount = Number(this.array2[i][11]);
                            dummyObject.totalPoint = Number(this.array2[i][12]);
                            dummyObject.menu = this.array2[i][13];
                            //console.log(dummyObject);
                            this.object_list.push(dummyObject);
                        }
                        for(let i = 0; i < this.object_list.length; i++){
                            this.name_list.push(this.object_list[i].name);
                        }
                    })
            });
        // }
    }

    getUserData() {

        FileSystem.readAsStringAsync(FileSystem.documentDirectory + "user")
            .then(content => {
                this.array3 = content.split("re이단점프al");
                for (var i = 0; i < this.array3.length - 1; i++) {
                    this.array4[i] = Object.assign({}, this.array3[i].split("re점프al"));
                }
                for (var i = 0; i < this.array3.length - 1; i++) {
                    var dummyObject = {};
                    dummyObject.delivery = this.array4[i][1];
                    dummyObject.kind = Number(this.array4[i][2]);
                    dummyObject.region = this.array4[i][3];
                    dummyObject.heart = this.array4[i][4];
                    dummyObject.hour = this.array4[i][5];
                    dummyObject.image = this.array4[i][6];
                    dummyObject.location = this.array4[i][7];
                    dummyObject.locationLink = this.array4[i][8];
                    dummyObject.name = this.array4[i][9];
                    dummyObject.phoneNumber = this.array4[i][10];
                    dummyObject.starUserCount = Number(this.array4[i][11]);
                    dummyObject.totalPoint = Number(this.array4[i][12]);
                    dummyObject.menu = this.array4[i][13];
                    this.userFavoriteList.push(dummyObject);
                    console.log(dummyObject.name);
                }
                console.log("get usesr info finish");



            })
            .catch(err => {
                console.log("no fie");
            });
    }

    overwriteText(objectArray) {
        var string = "";
        for (var i = 0; i < objectArray.length; i++) {
            string += "re점프al" + String(objectArray[i].category.delivery) + "re점프al" + String(objectArray[i].category.kind) + "re점프al" + objectArray[i].category.region + "re점프al" + objectArray[i].heart + "re점프al" + objectArray[i].hours + "re점프al" + objectArray[i].image + "re점프al" + objectArray[i].location + "re점프al" + objectArray[i].locationLink + "re점프al" + objectArray[i].name + "re점프al" + objectArray[i].phoneNumber + "re점프al" + String(objectArray[i].starUserCount) + "re점프al" + String(objectArray[i].totalPoint) + "re점프al" + objectArray[i].menu + "re이단점프al";
        }
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
            .then(() => {
                console.log("finished");
            })
            .catch(err => {
                console.log(err);
            });
    }


    // to debug (8/17)
    ConsoleObjectList(){
        for(var i=0; i<this.object_list.length; i++){
            console.log(this.object_list[i].name);
        }
    }
    /**
     * to update cache data when click the button. (8/15 updated)
     */


    updateData() {
 
        string = "";
        this.constructor();
        // this.array.splice(0,this.array.length);
        // this.array2.splice(0,this.array2.length);
        // this.object_list.splice(0,this.object_list.length);
        this.delete_text();
        this.getUserData();

        db.collection("restaurants").get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No such document!');
                    return;
                }
                snapshot.forEach(doc => {
                    this.data[this.count++] = doc.data();

                })
                for (var i = 0; i < this.count; i++) {
                    string += "re점프al" + String(this.data[i].category.delivery) + "re점프al" + String(this.data[i].category.kind) + "re점프al" + this.data[i].category.region + "re점프al" + this.data[i].heart + "re점프al" + this.data[i].hours + "re점프al" + this.data[i].image + "re점프al" + this.data[i].location + "re점프al" + this.data[i].locationLink + "re점프al" + this.data[i].name + "re점프al" + this.data[i].phoneNumber + "re점프al" + String(this.data[i].starUserCount) + "re점프al" + String(this.data[i].totalPoint) + "re점프al" + this.data[i].menu + "re이단점프al";
                }
                this.write_text(string);
                this.array = string.split("re이단점프al");
                for (var i = 0; i < this.array.length - 1; i++) {
                    this.array2[i] = Object.assign({}, this.array[i].split("re점프al"));
                }
                for (var i = 0; i < this.array.length - 1; i++) {
                    var dummyObject = {};
                    dummyObject.delivery = this.array2[i][1];
                    dummyObject.kind = Number(this.array2[i][2]);
                    dummyObject.region = this.array2[i][3];
                    dummyObject.heart = this.array2[i][4];
                    dummyObject.hour = this.array2[i][5];
                    dummyObject.image = this.array2[i][6];
                    dummyObject.location = this.array2[i][7];
                    dummyObject.locationLink = this.array2[i][8];
                    dummyObject.name = this.array2[i][9];
                    dummyObject.phoneNumber = this.array2[i][10];
                    dummyObject.starUserCount = Number(this.array2[i][11]);
                    dummyObject.totalPoint = Number(this.array2[i][12]);
                    dummyObject.menu = this.array2[i][13];
                    //console.log(dummyObject);
                    this.object_list.push(dummyObject);
                }

            }).then(() => {
                console.log("getData: updateData() complete");
                for(let i = 0; i < this.object_list.length; i++){
                    this.name_list.push(this.object_list[i].name);
                }
            })

        }
    }



                    // let write_text = (content)=>{
                    //     FileSystem.writeAsStringAsync(FileSystem.documentDirectory + "text", content)
                    //     .then(()=>{
                    //       console.log("finished");
                    //     } 
                    //     )
                    //     .catch(err =>{
                    //       console.log(err);
                    //     });
                    // }
                    // let read_text = ()=>{
                    // FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
                    // .then(content => {
                    //     console.log(content);
                    //     // console.log("tttt");
                    // })
                    // .catch(err => {
                    //     console.log(err);
                    // });
                    // }
                    // let delete_text = ()=> {
                    // FileSystem.deleteAsync(FileSystem.documentDirectory + "./text")
                    // .then(()=>{
                    //     console.log("delete finish");
                    // })
                    // }

                    // if(k){
                    //     db.collection("restaurants").get()
                    //     .then(snapshot=>{

                    //     if(snapshot.empty){
                    //     console.log('No such document!');
                    //     return;
                    //     }
                    //     snapshot.forEach(doc=>{
                    //     data[count++] = doc.data();

                    //     })
                    //     for(var i=0; i<count; i++){
                    //     string += "re점프al"+ String(data[i].category.delivery) + "re점프al"+ String(data[i].category.kind) + "re점프al"+data[i].category.region + "re점프al" + data[i].heart + "re점프al" + data[i].hours + "re점프al" + data[i].image + "re점프al" + data[i].location + "re점프al" + data[i].locationLink  + "re점프al"+data[i].name+"re점프al"+data[i].phoneNumber+"re점프al"+String(data[i].starUserCount)+"re점프al"+String(data[i].totalPoint) + "re점프al"+ data[i].menu +"re이단점프al" ;  
                    //     }
                    //     write_text(string);
                    //     array = string.split("re이단점프al");
                    //     for(var i=0; i<count; i++){
                    //     object_list = Object.assign({}, array[i].split("re점프al"));
                    //     }

                    //     })}
                    // else{
                    //     FileSystem.readAsStringAsync(FileSystem.documentDirectory + "./text")
                    //     .then(content => {
                    //     array = content.split("re이단점프al");
                    //     for(var i=0; i<count; i++){
                    //         object_list = Object.assign({}, array[i].split("re점프al"));
                    //     }
                    //     console.log("finish");
                    //     this.setState({a: true});
                    //     })
                    //     .catch(err => {
                    //     console.log(err);
                    //     });
                    // }
                    // export {object_list};
                    // 처음이면