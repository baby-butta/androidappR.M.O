import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private storage:Storage,private alertctrl:AlertController) { }

  ngOnInit() {
  }

  async delete(){
    const alertmsg = await this.alertctrl.create({
      message: 'Are you sure you want to delete data?',
      buttons: [
        {text: 'Yes',
        handler: () =>{
          this.storage.get('type').then(res=>{
            if(res == 'personal'){
              //personal
              this.storage.remove('temperature');
            }
            else{
              //business
              this.storage.remove('user');
            }
          })
          
        }}
        ,'No'],
    })
    await alertmsg.present();
  }

  async reset(){
    const alertmsg = await this.alertctrl.create({
      message: 'Are you sure you want to reset app?',
      buttons: [
        {text: 'Yes',
        handler: () =>{
          
          this.storage.clear().then(()=>{
              alert("App is now reset");
          });
        }}
        ,'No'],
    })
    await alertmsg.present();
  }

}
