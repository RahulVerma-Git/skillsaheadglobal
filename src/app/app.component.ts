import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from './app-services/shared-service/shared-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'SkillsAheadGlobal';
  
  constructor(private sharedService:SharedServiceService){

  }
  ngOnInit(): void {
    this.mobileDevice();
  }

  mobileDevice(){
    let isMobileDevice : boolean = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      isMobileDevice =  true;
      this.sharedService.setLocalStorage("isMobileDevice",true);
    }
    else{
      this.sharedService.setLocalStorage("isMobileDevice",false);
    }
    return isMobileDevice;
  }
}
