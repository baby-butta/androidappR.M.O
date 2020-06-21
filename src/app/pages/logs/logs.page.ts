import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  items :any[] = [];
  type: string =null;

  constructor(private nativeStorage: NativeStorage,private storage:Storage) {
      this.getRecords();
   }

   getRecords(){
     this.storage.get('type').then(res=>{

          if(res == 'personal'){
            //personal
            this.type = 'personal';
            this.storage.get('temperature').then(res=>{
        
              this.items= res[0];
             console.log(res);
              
             
           }).catch(err=>{alert("no");});
          }
          else{
            //business
            this.type = 'business';
            
            this.storage.get('user').then(res=>{
               this.items = res[0];  
            });
          }
     });
      
     
      
   }

  ngOnInit() {
  }

}
