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
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../app-services/api-service/api-service.service';
import { ApiResponse } from '../../model/ApiResponse';
import { Payment } from '../../model/SuccessPayment';

declare var $:any;
declare var Razorpay:any;

@Component({
  selector: 'app-qr-registration',
  templateUrl: './qr-registration.component.html',
  styleUrl: './qr-registration.component.scss',
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
export class QrRegistrationComponent implements OnInit{

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
  qrData:any = {};

  //http://localhost:4200/qr-registration?data={"courseId":"1234","courseTitle":"Online Webinar","courseFee":"10","courseDurationInHrs":"20"}
  constructor(@Inject(LOCALE_ID) public locale:string,
              private sharedService:SharedServiceService,
              private apiService:ApiServiceService,
              private activateRoute:ActivatedRoute){
    this.calenderDate.subscribe((data:any)=>{
      this.selectedDate = formatDate(data,'dd MMMM YYYY',this.locale);
    })

  }

  ngOnInit(): void {
    $("#global-header").css("display","none");
    if(this.sharedService.getLocalStorage("isMobileDevice")!== undefined){
      this.isMobileDevice =  this.sharedService.getLocalStorage("isMobileDevice");
    }
    this.selectedDate = formatDate(new Date(),'dd MMMM YYYY',this.locale);

    // read query params
    this.activateRoute.queryParams.subscribe((param:any)=>{
      let data = param['data'];
      if(data){
        data = JSON.parse(data);
        this.qrData.courseTitle = data.courseTitle;
        this.qrData.courseFee = data.courseFee;
        this.qrData.courseDurationInHrs = data.courseDurationInHrs;
        this.qrData.courseId = data.courseId;
      }
    })

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
    // this.publicSpeakingApiService.registerWebinarUser(this.userData).subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //   },
    //   error:(error)=>{

    //   },
    //   complete:()=>{

    //   }
    // })
    $("#publicSpeakingRegistrationConfirmationPopUp").modal("show");
    this.localEventData.eventName="WEBINAR_USER_REGISTRATION_DATA";
    this.localEventData.data=this.userData;
    this.sharedService.eventEmitter.emit(this.localEventData);
  }

  initiatePayment(){
    //public :rzp_test_OuzWZwerLWicgC	
    //secret : 6L5XmmY7Q1q3kqPN4s0tmf6P

    this.userData.initiatePayment.amount = this.qrData.courseFee;
    this.userData.initiatePayment.currency = "INR";
    this.userData.courseId = Number(this.qrData.courseId);
    this.userData.source = "QR_WEBAPP";
    
    this.apiService.registerWebinarUser(this.userData).subscribe({
      next: (response:ApiResponse) => {
        console.log('initiate payment successfull', response);
        if(response.responseCode == 200){
          let options = {
              "key": "rzp_test_OuzWZwerLWicgC", // Enter the Key ID generated from the Dashboard
              "amount": this.qrData.courseFee * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Skills Ahead", //your business name
              "description": "Test Transaction",
              "image": "/assets/header/skills-ahead-logo2.png",
              "order_id": response.data.initiatePayment.transactionId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler":this.onPaymentSuccess.bind(this),
              // "handler": function (response:any){
              //     alert(response.razorpay_payment_id);
              //     alert(response.razorpay_order_id);
              //     alert(response.razorpay_signature);
              // },
              "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                  "name": "Gaurav Kumar", //your customer's name
                  "email": "gaurav.kumar@example.com", 
                  "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
              },
              "notes": {
                  "address": "Razorpay Corporate Office"
              },
              "theme": {
                  "color": "#0b3763",
                  //"backdrop_color":"red"
              },
              "modal":
              {
                "animation":true
              }
          };
          var rzp1 = new Razorpay(options);
          rzp1.open();

          //if transaction failed
          rzp1.on('payment.failed', function (response:any){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
        }
      },
      error: (error) => {
        console.error('error in initiate payment', error);
      },
      complete: () => {
        console.log('initiate payment completed');
      }
    });
  }

  onPaymentSuccess(obj:any){
    let payment:Payment = new Payment();
    payment.paymentId=obj.razorpay_payment_id;
    payment.transactionId = obj.razorpay_order_id;
    payment.razorpaySignature = obj.razorpay_signature;
    payment.source = "QR_WEBAPP";

    this.apiService.onPaymentSuccess(payment).subscribe({
      next: (response:ApiResponse) => {
        console.log('initiate payment successfull', response);
        if(response.responseCode == 200){
          console.log("PAYMENT SUCCESSFULL");
        }
      },
      error: (error) => {
        console.error('error in initiate payment', error);
      },
      complete: () => {
        console.log('initiate payment completed');
      }
    });
  }


}

