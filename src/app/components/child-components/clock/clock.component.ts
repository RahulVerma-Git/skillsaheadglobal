import { Component, Input, OnInit } from '@angular/core';
import { Time } from '../../../model/Time';
import { SharedServiceService } from '../../../app-services/shared-service/shared-service.service';

declare var $:any;

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
  standalone:true,
})

export class ClockComponent implements OnInit {

  constructor(private sharedService:SharedServiceService){

    this.sharedService.eventEmitter.subscribe((data:any,error:any,complete:any)=>{
      if(data!=null){
        switch(data.eventName){
          case "CLOCK_TIME":
            let time = data.data as Time;
            $(".hourhand").css("transform","rotate("+(270+(time.hours*30))+"deg)");
            $(".minutehand").css("transform","rotate("+(270+(time.minutes*6))+"deg)");
            break;
        }
      }
    });

  }

  ngOnInit(): void {
  }

  updateClockTime(){

  }


}
