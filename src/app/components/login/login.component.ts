import { Component } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  switchForm(event:any){
    console.log(event);
    $("#reg-log").click();
  }

}
