import {db} from "./dataBase";

export default class TagSearch {
    constructor() {
        this.kind_name = ['한식', '양식', '중식', '일식', '야식', '기타'];
        this.kind_bool = [false, false, false, false, false, false];
        this.kind_num = [2, 3, 5, 7, 11, 13];

        this.region_name = ['법원', '양덕/장성', '환호', '영일대', '육거리', '기타'];
        this.region_bool = [false, false, false, false, false, false];

        this.delivery_name='한동대배달';
        this.delivery_bool = false;

        this.key_num = 83;
        this.count = 0;
        this.restaurant_list = [];
        this.region_count_bool = false;
    }
    allPressKindButton(choice){
        for(let i=0; i<=5; i++){
            this.kind_bool[i]=choice
        }
        console.log("kind: ", this.kind_bool);
    }
    allPressRegionButton(choice){
        for(let i=0; i<=5; i++){
            this.region_bool[i]=choice
        }
        console.log("region: ", this.region_bool);
    }
    changeStatus(index, category) {
        if(category === "kind") {
            this.kind_bool[index] = !this.kind_bool[index];
            console.log("kind: ", this.kind_bool);
        } else if(category === "region") {
            this.region_bool[index] = !this.region_bool[index];
             console.log("region: ", this.region_bool);
        } else {
            this.delivery_bool = !this.delivery_bool;
             console.log("delivery: ", this.delivery_bool);
        }
    }

    search() {
        for(var i=0; i<6; i++){
            if(this.kind_bool[i]==true){
              this.key_num = this.key_num * this.kind_num[i];
            }
            if(this.region_bool[i]==true){
                this.region_count_bool = true;
            }
        }
        console.log(this.key_num);
        if(this.delivery_bool == true && this.region_count_bool == false){
            db.collection('restaurants').get()
            .then(snapshot=>{
                if(snapshot.empty){
                    console.log('No such document!');
                    return;
                }
                snapshot.forEach(doc=>{
                    if((this.key_num%doc.data().category.kind) == 0){
                        this.restaurant_list[this.count++] = doc.data().name;
                        console.log(this.restaurant_list[this.count]);
                    }
                })
            })
            .catch(err => {
                console.log('Error getting document',err);
            })
        }
        else{
            for(var j =0; j<6; j++){
                if(this.region_bool[j] == false){
                    continue;
                }
                db.collection('restaurants').get()
                .then(snapshot => {
                    //console.log(snapshot.docs);
                    if (snapshot.empty) {
                        console.log('No such document!');
                        return;
                    } 
                    
                    snapshot.forEach(doc=>{
                        if((this.key_num%doc.data().category.kind) == 0 && doc.data().category.delivery == this.delivery_bool){
                            // console.log(doc.data().name);
                            // console.log(count++);
                            this.restaurant_list[this.count++] = doc.data().name;
                            console.log(this.restaurant_list[this.count]);
                        }
                        // console.log(key_num % doc.data().key " 뭐 이런식으로 쓰기");
                    })
                })
                .catch(err => {
                    console.log('Error getting document', err);
                })
            }
        }
    }

}