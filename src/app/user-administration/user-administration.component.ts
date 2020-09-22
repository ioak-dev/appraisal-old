import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {UserAdministrationService} from './user-administration.service';
import {UserService} from './../core/services/user.service';
import {UserAdministrationDialogComponent} from '../user-administration-dialog/user-administration-dialog.component';
import {PageHeaderService} from '../core/services/page-header.service';
import * as messageObject from '../message.json';
import {AuthService} from '../core/services/auth.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.scss']
})
export class UserAdministrationComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource: any;

  ROLE_TEMPLATE = [
    {'type': 'Administrator', 'state': false}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userAdministrationService: UserAdministrationService, private pageHeaderService: PageHeaderService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              public dialog: MatDialog) {
    pageHeaderService.setTitle('User Administration');
    pageHeaderService.hideCycle();
  }

  ngOnInit() {
    this.initialize();
    this.authService.init();
  }

  initialize() {
    this.RenderDataTable();
  }

  RenderDataTable() {
    this.userService.getUsers()
      .subscribe(
      res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('There was an error while retrieving Posts !!!' + error);
      });    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(element) {
    const dialogConfig = new MatDialogConfig();

    const roles = JSON.parse(JSON.stringify(this.ROLE_TEMPLATE));

    // Transformation from backend domain to UI representation
    if (element.roles != null) {
      element.roles.forEach((role => {

        const matchedRole = roles.find(obj => obj.type === role.type);

        if (matchedRole !== undefined) {
          matchedRole.state = true;
          if (role.options != null) {
            role.options.forEach((option => {
              const matchedOption = matchedRole.options.find(obj => obj.name === option);
              if (matchedOption !== undefined) {
                matchedOption.state = true;
              }
            }));
          }
        }
      }));
    }

    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.data = {
      userId: element.id,
      userName: element.name,
      userUnit: element.unit,
      roles: roles
    };

    const dialogRef = this.dialog.open(UserAdministrationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const newRoles = [];

        // Transformation from UI representation to backend domain
        result.roles.forEach((role => {
          if (role.state) {
            const newOptions = [];
            if (role.options !== undefined) {
              role.options.forEach((option => {
                if (option.state) {
                  newOptions.push(option.name);
                }
              }));
            }
            newRoles.push({'type': role.type, 'options': newOptions});
          }
        }));
        this.updateRoles(result.userId, newRoles);
      }
    });
  }

  private updateRoles(userId: string, roles: any[]) {
    this.userAdministrationService.updateRoles(userId, roles).subscribe(
      response => {
        this.initialize();
        this.snackBar.open(messageObject.UPDATE_ROLES.success, null, {
          duration: 3000,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.pageHeaderService.showCycle();
  }
}
