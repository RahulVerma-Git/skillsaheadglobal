import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit{

  constructor(private router:Router){

  }

  ngOnInit(): void {
  }

  navigateTo(tabname:string){
    switch(tabname){
      case "COURSE_CUSTOMIZATION": this.router.navigate(["course-customization"]);
        break;
      case "ENQUIRE_NOW": this.router.navigate(["enquire-now"]);
        break;
      case "SERVICES": this.router.navigate(["services"]);
        break;
      case "PUBLIC_SPEAKING_COURSE":this.router.navigate(["public-speaking"]);
        break;
    }
  }

}
