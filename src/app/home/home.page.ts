import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {Storage} from '@ionic/storage'
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  a:any =null;

  constructor(private nativeStorage: NativeStorage,private storage:Storage,private router:Router) {
    this.isFirsttime();
    // this.cool();
  }

  cool(){
    this.nativeStorage.getItem('type')
    .then(data =>{
       
       if(data == 'personal'){
        this.router.navigate(['temperature']);
       }
       else{
         this.router.navigate(['fill-data',{type:'business'}]);
       }
    }
    ).catch(err=>{
      
       this.router.navigate(['instructions']);
    });
  }
 
  isFirsttime(){
    this.storage.get('type')
    .then(res =>{

      switch(res){

        case 'personal': this.router.navigate(['temperature']);
                         break;
        case 'business': 
        let navigateParams: NavigationExtras ={
          queryParams:{
              type:'business',
          }
        }
        this.router.navigate(['fill-data'], navigateParams);
                         break;
        default:  this.router.navigate(['instructions']);
      }
    
    });
    
  }
  
}
