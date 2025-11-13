import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, LOCALE_ID, OnInit,inject, model } from '@angular/core';
import { SharedServiceService } from '../../app-services/shared-service/shared-service.service';

import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
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
import { CommonModule, formatDate } from '@angular/common';
import { RegisterWebinarFormFields } from '../../model/RegisterWebinarFormFields';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../app-services/api-service/api-service.service';
import { ApiResponse } from '../../model/ApiResponse';
import { Payment } from '../../model/SuccessPayment';
import { LoaderComponent } from '../loader/loader.component';

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
    CommonModule,
    ClockComponent,
    LoaderComponent
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatNativeDateModule],
})
export class QrRegistrationComponent implements OnInit{

  private _formBuilder = inject(FormBuilder);
  firstFormGroup:any;
  secondFormGroup:any;
  qrRegistrationForm:FormGroup;
  qrRegistrationFormSubmitted:boolean = false;
  isLinear:boolean= false;
  calenderDate = model<Date | null>(null);
  selectedDate:string="";

  isMobileDevice:boolean = false;
  selectedTime:string = "";
  timeForClock:Time = new Time(0,0,0,'AM');
  localEventData:EventData = new EventData();
  userData:RegisterWebinarFormFields = new RegisterWebinarFormFields();
  qrData:any = {};
  showPanel:string = 'HOME';
  showLoader:boolean = false;
  showPaymentCompletedMessage:boolean = false;

  //http://localhost:4200/qr-registration?data={"courseId":"aa529bb9-9fac-44eb-a20d-849e2b8137d7","courseTitle":"Online Webinar","courseFee":"10","courseDurationInHrs":"20"}
  //http://localhost:4200/qr-registration?data={"courseId":"c2189baa-60f9-4962-b4df-c0e6ff49a9cb"}
  
  constructor(@Inject(LOCALE_ID) public locale:string,
              private sharedService:SharedServiceService,
              private apiService:ApiServiceService,
              private activateRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private cdr:ChangeDetectorRef){
    this.calenderDate.subscribe((data:any)=>{
      this.selectedDate = formatDate(data,'dd MMMM YYYY',this.locale);
    });

    this.qrRegistrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.min(10)]],
      location: [''],
      occupation: [''],
    });

  }

  ngOnInit(): void {
    this.qrRegistrationFormSubmitted = false;
    this.showLoader = false;
    this.showPaymentCompletedMessage = false;
    this.showPanel = 'HOME';

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
        this.fetchWebinarDetails(data.courseId);
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

  fetchWebinarDetails(webinarId:string){
    let request = {webinaruid:webinarId}
    this.apiService.fetchWebinarDetailsById(request).subscribe({
      next: (response:ApiResponse) => {
        console.log('fetch webinar successfull', response);
        if(response.responseCode == 200){
          this.qrData.courseId = response.data.id;
          this.qrData.courseTitle = response.data.title;
          this.qrData.courseFee = response.data.webinarPrice;
          this.qrData.courseDurationInMinutes = response.data.webinarDurationMinutes;
          this.qrData.courseDate = formatDate(response.data.webinarDate+" "+response.data.webinarTime,'dd MMMM YYYY hh:mm a',this.locale);
        }
        else if(response.responseCode == 204){

        }
        else{

        }
      },
      error: (error) => {
        console.error('error fetch webinar', error);
      },
      complete: () => {
        console.log('fetch webinar completed');
      }
    });
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

  changePanel(panelname:string){
    this.showPanel = panelname;
  }

  initiatePayment(){
    this.qrRegistrationFormSubmitted = true;
    if (!this.qrRegistrationForm.valid) {
      console.log("manadatory fields are missing");
    }
    else{
    //public :rzp_test_OuzWZwerLWicgC	
    //secret : 6L5XmmY7Q1q3kqPN4s0tmf6P

    this.userData.firstName = this.qrRegistrationForm.value.firstName;
    this.userData.middleName = this.qrRegistrationForm.value.middleName;
    this.userData.lastName = this.qrRegistrationForm.value.lastName;
    this.userData.email = this.qrRegistrationForm.value.email;
    this.userData.mobile = this.qrRegistrationForm.value.mobile;
    this.userData.location = this.qrRegistrationForm.value.location;
    this.userData.occupation = this.qrRegistrationForm.value.occupation;
    this.userData.initiatePayment.amount = this.qrData.courseFee;
    this.userData.initiatePayment.currency = "INR";
    this.userData.courseId = Number(this.qrData.courseId);
    this.userData.source = "QR_WEBAPP";
    
    this.showLoader = true;
    this.apiService.registerWebinarUser(this.userData).subscribe({
      next: (response:ApiResponse) => {
        console.log('initiate payment successfull', response);
        if(response.responseCode == 200){
          let options = {
              //"key": "rzp_test_OuzWZwerLWicgC", // Enter the Key ID generated from the Dashboard
              "key":"rzp_live_tbw7e8UfIr4UXX",
              "amount": this.qrData.courseFee * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Skills Ahead", //your business name
              "description": this.qrData.courseTitle,
              "image": "/assets/header/skills-ahead-logo2.png",
              "order_id": response.data.initiatePayment.transactionId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "handler":this.onPaymentSuccess.bind(this),
              // "handler": function (response:any){
              //     alert(response.razorpay_payment_id);
              //     alert(response.razorpay_order_id);
              //     alert(response.razorpay_signature);
              // },
              "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                  "name": this.userData.firstName, //your customer's name
                  "email": this.userData.email, 
                  "contact": this.userData.mobile  //Provide the customer's phone number for better conversion rates 
              },
              "notes": {
                  "source": "Skills Ahead QR Based Program"
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
        this.showLoader = false;
        console.log('initiate payment completed');
      }
    });
    }
  }

  onPaymentSuccess(obj:any){
    let payment:Payment = new Payment();
    payment.paymentId=obj.razorpay_payment_id;
    payment.transactionId = obj.razorpay_order_id;
    payment.razorpaySignature = obj.razorpay_signature;
    payment.source = "QR_WEBAPP";

    this.showLoader = true;
    this.cdr.detectChanges();
    this.apiService.onPaymentSuccess(payment).subscribe({
      next: (response:ApiResponse) => {
        console.log('initiate payment successfull', response);
        if(response.responseCode == 200){
          console.log("PAYMENT SUCCESSFULL");
          this.showPaymentCompletedMessage = true;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('error in initiate payment', error);
      },
      complete: () => {
        this.showLoader = false;
        console.log('initiate payment completed');
      }
    });
  }


}

