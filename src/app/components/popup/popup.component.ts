import { Component, EventEmitter, OnInit } from '@angular/core';
import { CourseCustomizationComponent } from '../course-customization/course-customization.component';
import { SharedServiceService } from '../../app-services/shared-service/shared-service.service';
import { RegisterWebinarFormFields } from '../../model/RegisterWebinarFormFields';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit{

  webinarUserRegistrationData:RegisterWebinarFormFields= new RegisterWebinarFormFields();

  constructor(private sharedService:SharedServiceService){

    this.sharedService.eventEmitter.subscribe((data:any,error:any,complete:any)=>{
      if(data!=null){
        switch(data.eventName){
          case "WEBINAR_USER_REGISTRATION_DATA":
            this.webinarUserRegistrationData = data.data as RegisterWebinarFormFields;
            break;
        }
      }
    });

  }

  ngOnInit(): void {
    
  }

}
