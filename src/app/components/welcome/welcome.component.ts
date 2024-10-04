import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit{

  redirectTimeout:any;
  constructor(private router:Router){

  }

  ngOnInit(): void {
    this.redirect();
  }

  redirect(){
    this.redirectTimeout = setTimeout(() => {
      this.router.navigate(["home"]);
    }, 8000);
  }

}
