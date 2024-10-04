import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireNowComponent } from './enquire-now.component';

describe('EnquireNowComponent', () => {
  let component: EnquireNowComponent;
  let fixture: ComponentFixture<EnquireNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnquireNowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquireNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
