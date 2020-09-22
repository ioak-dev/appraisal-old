import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitErrorDialogComponent } from './submit-error-dialog.component';

describe('SubmitErrorDialogComponent', () => {
  let component: SubmitErrorDialogComponent;
  let fixture: ComponentFixture<SubmitErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitErrorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
