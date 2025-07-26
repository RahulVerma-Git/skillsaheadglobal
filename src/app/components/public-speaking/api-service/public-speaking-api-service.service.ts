import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterWebinarFormFields } from '../../../model/RegisterWebinarFormFields';
import { MainServiceService } from '../../../app-services/main-service/main-service.service';
import { ApiUrl } from '../../../model/ApiUrl';

@Injectable({
  providedIn: 'root'
})
export class PublicSpeakingApiServiceService {

  constructor(private httpClient:HttpClient,
              private mainService:MainServiceService) { }

  public registerWebinarUser(data:RegisterWebinarFormFields):Observable<any>{
    return this.httpClient.post(this.mainService.applicationHostUrl+ApiUrl.REGISTER_WEBINAR_USER,data);
  }
  
}
