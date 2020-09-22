import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppraisalDialogComponent } from './manage-appraisal-dialog.component';

describe('ManageAppraisalDialogComponent', () => {
  let component: ManageAppraisalDialogComponent;
  let fixture: ComponentFixture<ManageAppraisalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppraisalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppraisalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
