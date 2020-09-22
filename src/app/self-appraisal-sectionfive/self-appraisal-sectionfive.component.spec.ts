import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppraisalSectionfiveComponent } from './self-appraisal-sectionfive.component';

describe('SelfAppraisalSectionfiveComponent', () => {
  let component: SelfAppraisalSectionfiveComponent;
  let fixture: ComponentFixture<SelfAppraisalSectionfiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppraisalSectionfiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppraisalSectionfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
