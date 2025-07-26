import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  public eventEmitter = new EventEmitter();

  constructor() { }

  setLocalStorage(key:string,value:any){
    localStorage.setItem(key,value);
  }

  getLocalStorage(key:string){
    let data:any = localStorage.getItem(key);
    return JSON.parse(data);
  }

}
