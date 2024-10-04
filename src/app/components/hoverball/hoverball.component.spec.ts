import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverballComponent } from './hoverball.component';

describe('HoverballComponent', () => {
  let component: HoverballComponent;
  let fixture: ComponentFixture<HoverballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoverballComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoverballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
