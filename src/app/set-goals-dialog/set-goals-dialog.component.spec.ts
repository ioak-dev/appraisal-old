import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGoalsDialogComponent } from './set-goals-dialog.component';

describe('SetGoalsDialogComponent', () => {
  let component: SetGoalsDialogComponent;
  let fixture: ComponentFixture<SetGoalsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetGoalsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGoalsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
