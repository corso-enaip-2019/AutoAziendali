import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryComponent } from './expiry.component';

describe('ExpiryComponent', () => {
  let component: ExpiryComponent;
  let fixture: ComponentFixture<ExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
