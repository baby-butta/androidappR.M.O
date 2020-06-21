import { Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';



@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
 
  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  public something(a){
    let navigateParams: NavigationExtras ={
      queryParams:{
          type:a,
      }
    }
    this.router.navigate(['fill-data'],navigateParams);
  }
  //set appstate to personal in file

}
