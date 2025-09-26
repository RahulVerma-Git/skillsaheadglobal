import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  constructor(private router:Router){

  }

  ngOnInit(): void {
    
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

}
