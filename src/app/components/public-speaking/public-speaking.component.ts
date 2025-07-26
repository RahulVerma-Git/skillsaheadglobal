import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Inject, LOCALE_ID, OnInit,inject, model } from '@angular/core';
import { SharedServiceService } from '../../app-services/shared-service/shared-service.service';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import {MatTimepickerModule, MatTimepickerOption} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ClockComponent } from '../child-components/clock/clock.component';
import { Time } from '../../model/Time';
import { EventData } from '../../model/EventData';
import { formatDate } from '@angular/common';
import { RegisterWebinarFormFields } from '../../model/RegisterWebinarFormFields';
import { PublicSpeakingApiServiceService } from './api-service/public-speaking-api-service.service';

declare var $:any;

@Component({
  selector: 'app-public-speaking',
  templateUrl: './public-speaking.component.html',
  styleUrl: './public-speaking.component.scss',
  standalone:true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, 
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    ClockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatNativeDateModule],
})
export class PublicSpeakingComponent implements OnInit{

  private _formBuilder = inject(FormBuilder);
  firstFormGroup:any;
  secondFormGroup:any;
  isLinear:boolean= false;
  calenderDate = model<Date | null>(null);
  selectedDate:string="";

  isMobileDevice:boolean = false;
  selectedTime:string = "";
  timeForClock:Time = new Time(0,0,0,'AM');
  localEventData:EventData = new EventData();
  userData:RegisterWebinarFormFields = new RegisterWebinarFormFields();

  constructor(@Inject(LOCALE_ID) public locale:string,
              private sharedService:SharedServiceService,
              private publicSpeakingApiService:PublicSpeakingApiServiceService){
    this.calenderDate.subscribe((data:any)=>{
      this.selectedDate = formatDate(data,'dd MMMM YYYY',this.locale);
    })

  }

  ngOnInit(): void {
    if(this.sharedService.getLocalStorage("isMobileDevice")!== undefined){
      this.isMobileDevice =  this.sharedService.getLocalStorage("isMobileDevice");
    }
    this.selectedDate = formatDate(new Date(),'dd MMMM YYYY',this.locale);;

  // this.firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // this.secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  this.isLinear = true;
  }

  onTimeSelected(time:any){
    this.selectedTime = time;
    let hours:number = Number(this.selectedTime.split(" ")[0].split(":")[0]);
    let minutes:number = Number(this.selectedTime.split(" ")[0].split(":")[1]);
    let seconds:number = Number(this.selectedTime.split(" ")[0].split(":")[2]);
    let meridian:string = this.selectedTime.split(" ")[1];
    this.timeForClock= new Time(hours,minutes,seconds,meridian);
    this.localEventData.eventName = "CLOCK_TIME";
    this.localEventData.data = {
      hours:hours,
      minutes:minutes,
      seconds:seconds,
      meridian:meridian
    };
    this.sharedService.eventEmitter.emit(this.localEventData);
  }

  submit(){
    this.publicSpeakingApiService.registerWebinarUser(this.userData).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(error)=>{

      },
      complete:()=>{

      }
    })
    $("#publicSpeakingRegistrationConfirmationPopUp").modal("show");
    this.localEventData.eventName="WEBINAR_USER_REGISTRATION_DATA";
    this.localEventData.data=this.userData;
    this.sharedService.eventEmitter.emit(this.localEventData);
  }


}
