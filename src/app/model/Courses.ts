export class Courses{
    index:number=0;
    courseId:string | null =null;
    courseName:string | null =null;
    courseDurationInHrs:number=0;
    coursePrice:number=0;

    constructor(index:number,courseId:string | null,courseName:string | null,courseDurationInHrs:number=0,coursePrice:number){
        this.index = index;
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseDurationInHrs = courseDurationInHrs;
        this.coursePrice = coursePrice;
    }
}