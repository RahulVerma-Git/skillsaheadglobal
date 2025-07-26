import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCustomizationComponent } from './course-customization.component';

describe('CourseCustomizationComponent', () => {
  let component: CourseCustomizationComponent;
  let fixture: ComponentFixture<CourseCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCustomizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
