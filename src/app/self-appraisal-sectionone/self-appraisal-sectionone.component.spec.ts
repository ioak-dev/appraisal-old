import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAppraisalSectiononeComponent } from './self-appraisal-sectionone.component';

describe('SelfAppraisalSectiononeComponent', () => {
  let component: SelfAppraisalSectiononeComponent;
  let fixture: ComponentFixture<SelfAppraisalSectiononeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAppraisalSectiononeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAppraisalSectiononeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
