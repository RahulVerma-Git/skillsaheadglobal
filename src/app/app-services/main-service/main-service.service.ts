import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  applicationContextPath = "skillsaheadglobal";
  applicationHostUrl = "http://localhost:8080/" + this.applicationContextPath;
  constructor() { }
}
