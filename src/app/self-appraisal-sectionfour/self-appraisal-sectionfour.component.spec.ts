import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppraisalSectionfourComponent } from './self-appraisal-sectionfour.component';

describe('SelfAppraisalSectionfourComponent', () => {
  let component: SelfAppraisalSectionfourComponent;
  let fixture: ComponentFixture<SelfAppraisalSectionfourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppraisalSectionfourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppraisalSectionfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
