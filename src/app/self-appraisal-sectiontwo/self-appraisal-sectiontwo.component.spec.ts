import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppraisalSectiontwoComponent } from './self-appraisal-sectiontwo.component';

describe('SelfAppraisalSectiontwoComponent', () => {
  let component: SelfAppraisalSectiontwoComponent;
  let fixture: ComponentFixture<SelfAppraisalSectiontwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppraisalSectiontwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppraisalSectiontwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
