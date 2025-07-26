import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRegistrationComponent } from './qr-registration.component';

describe('QrRegistrationComponent', () => {
  let component: QrRegistrationComponent;
  let fixture: ComponentFixture<QrRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QrRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
