import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdministrationDialogComponent } from './user-administration-dialog.component';

describe('UserAdministrationDialogComponent', () => {
  let component: UserAdministrationDialogComponent;
  let fixture: ComponentFixture<UserAdministrationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdministrationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdministrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
