import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-fill-data',
  templateUrl: './fill-data.page.html',
  styleUrls: ['./fill-data.page.scss'],
})

export class FillDataPage implements OnInit {
  isCheck = true;
  type:any ;
  name:string;
  age:number;
  contact:string;
  healthIssue:string;
  
  weight:number;
  height:number;
  item:any[] =[];

  constructor(private nativeStorage: NativeStorage,private route:ActivatedRoute, private router:Router,private storage:Storage) {
   this.route.queryParams.subscribe(params=>{
      this.type = params.type;
    })

    
   }

  ngOnInit() {
  }

  check(){
      this.isCheck = !this.isCheck;
  }

  

  //add user deatails in file including personal/business
  submit(){
      this.storage.ready().then(()=>{
      
        this.addUserRecord();

    }).catch((err) => {
      alert("somehting went wrong");
       
      });
      
    }

    addUserRecord(){
      //temporary array 

      var tempArr={};

      //checking type personal or business
      if (this.type == "personal"){

         tempArr['age'] = this.age;
         tempArr['contact'] = this.contact;
         tempArr['healthIssue'] = this.healthIssue;
         tempArr['height'] = this.height;
         tempArr['name'] = this.name;
         tempArr['type'] =this.type;
         tempArr['weight'] = this.weight;
        
         this.item.push(tempArr);

          var promises = [
              this.storage.set("user",[this.item]),
              this.storage.set('type',this.type),
             
            ]

              Promise.all(promises)
        .then(data => {
          // alert(data);
        });
        this.router.navigate(['temperature']);
      }
      else{
        // //adding previous record to storage
        // this.storage.get('business').then((res)=>{
        //     if(res){
        //       console.log("previous");
        //       this.item =[];
        //       res.forEach(element => {
        //          console.log(element);
        //          this.item.push(element);
        //       });
        //     }
        // });
    
        // //adding current record to storage
        this.storage.get('type').then(res =>{
          if(!res){
            this.storage.set('type',this.type);
          }
        });
        let date = new Date();
        let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
        let time = date.getHours()+":"+date.getMinutes()

        
        tempArr['age'] = this.age;
        tempArr['contact'] = this.contact;
        tempArr['name'] = this.name;
        tempArr['type'] =this.type;
        tempArr['date_of_entry'] = today;
        tempArr['time_of_entry'] = time;
        
        this.item.push(tempArr);
        
        let navigateParams: NavigationExtras ={
          queryParams:{
              name:tempArr['name'],
              age:tempArr['age'],
              contact:tempArr['contact'],
              date:tempArr['date_of_entry'],
              time:tempArr['time_of_entry'],

          }
        }
        this.router.navigate(['temperature'],navigateParams);
      }
      

      
    }
    
    show(){
    //   this.storage.get('name').then(value=>{
       
    //   });
    //  this.storage.forEach((name)=>{
    //     alert(name);
    //  });
    this.storage.clear().then();
    }
}
