import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainServiceService } from '../main-service/main-service.service';
import { Observable } from 'rxjs';
import { ApiUrl } from '../../model/ApiUrl';
import { RegisterWebinarFormFields } from '../../model/RegisterWebinarFormFields';
import { Payment } from '../../model/SuccessPayment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private httpClient:HttpClient,
              private mainService:MainServiceService) { }
  
  public createPaymentTransaction(data:any):Observable<any>{
    const username = 'rzp_test_OuzWZwerLWicgC';
    const password = '6L5XmmY7Q1q3kqPN4s0tmf6P';

    // Encode credentials in base64
    const base64Credentials = btoa(`${username}:${password}`);

    // Set the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Basic ${base64Credentials}`
    });
    return this.httpClient.post("https://api.razorpay.com/v1/orders",data,{headers});
  }

  public initiatePayment(data:any):Observable<any>{
     return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.INITIATE_PAYMENT,data);
  }

  public onPaymentSuccess(data:Payment):Observable<any>{
     return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.PAYMENT_SUCCESS,data);
  }

  public onPaymentFailed(data:Payment):Observable<any>{
     return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.PAYMENT_FAILED,data);
  }

  public registerWebinarUser(data:RegisterWebinarFormFields):Observable<any>{
      return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.REGISTER_WEBINAR_USER,data);
  }

  public fetchWebinarDetailsById(data:any):Observable<any>{
      return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.FETCH_WEBINAR_BY_ID,data);
  }

}
