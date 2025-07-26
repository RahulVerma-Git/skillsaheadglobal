import { Component, EventEmitter, OnInit } from '@angular/core';
import { Courses } from '../../model/Courses';

declare var $:any;

@Component({
  selector: 'app-course-customization',
  templateUrl: './course-customization.component.html',
  styleUrl: './course-customization.component.scss'
})
export class CourseCustomizationComponent implements OnInit{

  leftItems:Courses[] = [];
  rightItems:Courses[] = [];
  totalCourseDurationInHrs:number = 0;
  totalCoursePrice:number = 0;

  constructor(){
    
  }

  ngOnInit(): void {
    for (let i = 1; i < 8; i++) {
      this.leftItems.push(new Courses(i,"courseId"+i,"courseName"+i,2*i,1500*i));
    } 
  }

  // Move selected items from left to right
  moveToRight(item:Courses) {
    this.leftItems = this.leftItems.filter((obj:Courses)=>{
      return obj.courseId != item.courseId;
    });

    this.rightItems.push(item);
    this.totalCourseDurationInHrs = this.totalCourseDurationInHrs + item.courseDurationInHrs;
    this.totalCoursePrice = this.totalCoursePrice + item.coursePrice;
  }

  // Move selected items from right to left
  moveToLeft(item:Courses) {
    this.rightItems = this.rightItems.filter((obj:Courses)=>{
      return obj.courseId != item.courseId;
    });

    this.leftItems.push(item);
    this.totalCourseDurationInHrs = this.totalCourseDurationInHrs - item.courseDurationInHrs;
    this.totalCoursePrice = this.totalCoursePrice - item.coursePrice;

    this.leftItems.sort((obj1:Courses,obj2:Courses)=>{
      return obj1.index - obj2.index;
    });
  }

  showNegotiatePopUp(){
    $("#negotiatePopUp").modal("show");
  }
  
}
