import { Component, OnInit, NgZone } from '@angular/core';
import { Serial } from '@ionic-native/serial/ngx';
import {Animation,AnimationController,AlertController,MenuController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
})
export class TemperaturePage implements OnInit {
 open:any;
 temperature:any =0 ;
 green = false;
 red= false;
 item: any[]=[];
 tempArr: any ={};
  constructor(private nativeStorage:NativeStorage,private menuctrl:MenuController,private serial:Serial, private ngzone:NgZone,private animationctrl:AnimationController,private route:ActivatedRoute, private storage: Storage,
    private alertctrl:AlertController) { 
  
    //get record details from fill page business type
    
    this.route.queryParams.subscribe(params =>{
      this.tempArr['name'] = params.name; 
      this.tempArr['age'] = params.age; 
      this.tempArr['contact'] = params.contact; 
      this.tempArr['date'] = params.date; 
      this.tempArr['time'] = params.time; 
  });
    
    //setting up connection with arduino board
    this.serial.requestPermission().then(() =>{

      //open serial com 
        this.serial.open({
          baudRate: 115200,
          dataBits: 4,
          stopBits: 1,
          parity: 0,
          dtr: true,
          rts: true,
          sleepOnPause: false
        }).then(()=>{
          this.open = true;
          
        });
          
      
    }).catch(err=>{alert('no arduino')});
   }

  ngOnInit() {
  }

  checkTemperature(){

    if(open){
      //send data to anrduinio via serial
        this.serial.write('1').then(()=>{
          
        });

        // listening for incoimng data in serial
        this.serial.registerReadCallback().subscribe(data=>{
          let buffer = new Uint8Array(data);

          // check if buffer length is more than equal 1 (has data)
          if(buffer.length >=1){
              //decoding buffer
              let temperature = new TextDecoder("utf-8").decode(buffer);
            
              
            if(temperature != ''){
              
              //update app to display temperature on screen
              this.ngzone.run( () => {
                 this.change(temperature);
                 
                 if(parseInt(temperature) >= 38){
                  this.green =false;
                   this.red = true;
                }
                else { 
                  this.green= true;
                  this.red = false;
                }
             });
              
             const inlay = document.querySelector('#inlay');
             // checking if user temperature is more 38
                
            }
            else {this.temperature = 0;}
          }
          
      });
      document.getElementById('s').style.display = 'block';
    }
    
    // const inlay1 = document.querySelector('#inlay');
    // const animation1: Animation = this.animationctrl.create()
    // .addElement(inlay1)
    // .duration(1000)
    // .from('background', 'white')
    // .from('transform','scaleY(0)')
    // .to('background','red')
    // .to('transform','scaleY(40)');
    
//keyframes([{background: 'white'},{transform: 'scale(1,2)',background:'red'}]);
    // animation1.play();
    
    document.getElementById('save').style.display = 'block';
  }

  change(temp){
    this.temperature = temp;
  }

  save(){
         //adding previous record to storage
     this.saveMessage();
        
        
  }

  async saveMessage(){
    const alert = await this.alertctrl.create({
      message: 'Are you sure?',
      buttons: [
        {text: 'Ok',
        handler: () =>{
          this.addRecord();
        }}
        ,'Cancel'],
    })
    await alert.present();
  }

  addRecord(){
    //check type personal or business
    // this.nativeStorage.getItem('type')
    // .then(res => {
    //   if(res == 'personal'){
    //     var temparr = [],arr =[];
    //           this.nativeStorage.getItem('temperature').then((res:any []) => {   
    //               if(res){
    //                   res.forEach(element => {
    //                      arr.push(element);                   
    //                   });
    //                   console.log(res);
    //                  }
    //                  let date = new Date();
    //                  let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
    //                  let time = date.getHours()+":"+date.getMinutes()+"-"+date.getSeconds();
    //                  temparr['temp'] = this.temperature;
    //                  temparr['date'] = today;
    //                  temparr['time'] = time;
    //                  arr.push(temparr);
    //                  var json = JSON.stringify(arr);
    //                 this.nativeStorage.setItem('temperature',json);
    //           }).catch(()=>{
    //             let date = new Date();
    //             let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
    //             let time = date.getHours()+":"+date.getMinutes()+"-"+date.getSeconds();
    //             temparr['temp'] = this.temperature;
    //             temparr['date'] = today;
    //             temparr['time'] = time;
    //              arr.push(temparr);
    //              var json = JSON.stringify(arr);
    //              this.nativeStorage.setItem('temperature',json);
    //           });
    //   }
    // });
    this.storage.get('type').then(res =>{

      //personal
      if( res == 'personal'){
        var temparr = {temp:null,date:null,time:null},arr =[];
          this.storage.get('temperature').then((res: any[] )=> {   
              if(res){
                  // res.forEach(element => {
                  //    console.log(element);            
                  // });
                  console.log(res);
                  for(let i =0; i < res[0].length ; i++){
                     arr.push(res[0][i]);
                    // console.log(res[i]);
                  }
                  
                 }
                 let date = new Date();
                 let today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDay();
                 let time = date.getHours()+":"+date.getMinutes();
                 temparr.temp = this.temperature;
                 temparr.date = today;
                 temparr.time = time;
                  arr.push(temparr);
                //  var cool = [];
                //   cool[0] = { monney: 'c'};
                //   cool.push(cool[0]);
                 
                 
                 this.storage.set('temperature',[arr]);
                //  this.storage.remove('temperature');
          });

          
      }
      else{
        //business
        this.storage.get('user').then((res)=>{
          if(res){
            console.log("previous");
            this.item =[];
            
            for(let i =0; i < res[0].length ; i++){
              this.item.push(res[0][i]);
             // console.log(res[i]);
           }

              
               
            
            
            //adding new records
            this.tempArr['temperature'] = this.temperature;
            this.item.push(this.tempArr);
            console.log(res);
            this.storage.set('user', [this.item]); 
            //  this.storage.remove('user');
            
          }
          else{
            //adding first record 
            this.tempArr['temperature'] = this.temperature;
            this.item.push(this.tempArr);
            // console.log(this.item);
            this.storage.set('user', this.item);
          }
      });
      }
    })

  }

}
