import { AsyncStorage } from 'react-native';


let info = {
    isFirst: true,
    ID: ""
};

let removeFromAsyncStorage = async (target)=> {
    try{
        await AsyncStorage.removeItem(target);        
    }
    catch (error){
        console.log('removeFromAsyncStorage: ', error);
    }
}

let loadID = async() => {  
    try {
        loaded = await AsyncStorage.getItem('ID')
        .then((loaded) => {
            info.ID = loaded;
            console.log("[ID]: ", info.ID);
        });
    } catch(err) {
        console.log('in loadID: ', err);
    }
}

let loadIsFirst = async() => {  
    try {
        loaded = await AsyncStorage.getItem('isFirst')
        .then((loaded) => {
            info.isFirst = loaded;
            console.log("[isFirst]: ", info.isFirst);
        });
    } catch(err) {
        console.log('in loadIsFirst: ', err);
    }
}

loadID();
loadIsFirst();    

// removeFromAsyncStorage('ID');
// removeFromAsyncStorage('isFirst');

export { info };


////////////////////////////// for logic //////////////////////////////

// let setToAsyncStorage = async (key, value) => {
//     try {
//         await AsyncStorage.setItem(key, value);
//         console.log('setToAsyncStorage complete');
//     } catch (error) {
//         // Error saving data
//         console.log('setToAsyncStorage: ', error);
//     }
// };

/**
 * load tempID and isFirst from AsyncStorage.
 * if 'isFirst' is null, set new ID and change isFirst to false.
 * else, use loaded ID.
 */
// let run = async () => {
//     try {
//         let ID = await AsyncStorage.getItem('ID')
//         .then(()=>{
//             info.ID = ID;
//             console.log('loaded ID: ', info.ID);
//         });
//         let isFirst = await AsyncStorage.getItem('isFirst')
//         .then(()=>{
//             info.isFirst = isFirst;
//             console.log('loaded isFirst: ', info.isFirst);
//         });
        
//         if(info.isFirst !== false) {
//             // we dont have data
//             db.collection('users').add({
//                 nickName: "",
//             }).then(ref => {
//                 setToAsyncStorage('ID', ref.id);
//                 setToAsyncStorage('isFirst', JSON.stringify(false));
//                 console.log("New ID: ", ref.id);
//                 // console.log("isFirst: ", isFirst);
//             })
//         } else {
//             console.log('Exist ID: ', info.ID);
//             // console.log("isFirst: ", isFirst)
//         }
//     } catch (error) {
//         // Error retrieving data
//         console.log('run: ', error);
//     }
//     // removeFromAsyncStorage('tempID');
//     // removeFromAsyncStorage('isFirst');
// }





 /**
     * this method can be useless...
     * because the fucntion can't return the right value.
     */
    // static getFromAsyncStorage = async (key) => {
    //     try {
    //         const value = await AsyncStorage.getItem(key);
    //         if (value !== null) {
    //             // We have data!!
    //             console.log('in getFromAsyncStorage: ', value);
    //             //return target;
    //         }
    //         else{
    //             console.log("no data");
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //         console.log('getFromAsyncStorage: ', error);
    //     }
    // };