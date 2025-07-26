import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSpeakingComponent } from './public-speaking.component';

describe('PublicSpeakingComponent', () => {
  let component: PublicSpeakingComponent;
  let fixture: ComponentFixture<PublicSpeakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicSpeakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSpeakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
