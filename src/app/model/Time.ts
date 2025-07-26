export class Time {
    hours:number=0;
    minutes:number=0;
    seconds:number=0;
    meridian:string="";

    constructor(hours:number,minutes:number,seconds:number,meridian:string){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.meridian = meridian;
    }
}