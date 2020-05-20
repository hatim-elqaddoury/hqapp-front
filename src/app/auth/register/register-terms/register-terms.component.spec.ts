import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTermsComponent } from './register-terms.component';

describe('RegisterTermsComponent', () => {
  let component: RegisterTermsComponent;
  let fixture: ComponentFixture<RegisterTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
