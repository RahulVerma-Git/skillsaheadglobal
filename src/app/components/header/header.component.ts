import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../app-services/shared-service/shared-service.service';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  isMobileDevice:boolean = false;
  constructor(private router:Router,public sharedService:SharedServiceService){

  }
  
  ngOnInit(): void {
    if(this.sharedService.getLocalStorage("isMobileDevice")!== undefined){
      this.isMobileDevice =  this.sharedService.getLocalStorage("isMobileDevice");
    }
    else{
      this.mobileDevice();
    }
    this.handlePermission();
  }

  navigateTo(tabname:string){
    switch(tabname){
      case "HOME": this.router.navigate(["home"]);
        break;
      case "ENQUIRE_NOW": this.router.navigate(["enquire-now"]);
        break;
      case "SERVICES": this.router.navigate(["services"]);
        break;
      case "LOGIN": this.router.navigate(["login"]);
        break;
      case "SIGN_UP": this.router.navigate(["signup"]);
        break;
      case "CONTACT_US": this.router.navigate(["contactus"]);
        break;
    }
  }

  enquiry(){
    $("#genericPopUp").modal("show");
  }

  handlePermission() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        this.report(result.state);
      } else if (result.state === "prompt") {
        this.report(result.state);
        navigator.geolocation.getCurrentPosition(function(zz){
          console.log(zz);
        });
      } else if (result.state === "denied") {
        this.report(result.state);
      }
      result.addEventListener("change", () => {
        this.report(result.state);
      });
    });
  }

  mobileDevice(){
    this.isMobileDevice = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobileDevice =  true;
      this.sharedService.setLocalStorage("isMobileDevice",true);
    }
    else{
      this.sharedService.setLocalStorage("isMobileDevice",false);
    }
    return this.isMobileDevice;
  }
  
  report(state:any) {
    console.log(`Permission ${state}`);
  }
  
}
