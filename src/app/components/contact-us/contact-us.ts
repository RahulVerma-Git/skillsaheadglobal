import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss'
})
export class ContactUs {

  contactEmail1:string = "info@skillsahead.net";
  contactEmail2:string = "mail2skillsahead@gmail.com";
}
