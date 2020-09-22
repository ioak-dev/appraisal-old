import {Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UserType} from '../../../model/user-type';

@Component({
  selector: 'app-user-search-bar',
  templateUrl: './user-search-bar.component.html',
  styleUrls: ['./user-search-bar.component.scss']
})
export class UserSearchBarComponent implements OnInit {
  userSearchControl = new FormControl();
  users: UserType[];
  matchingUsers: UserType[];

  @Input() options: any;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() person = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.users = this.options;
    this.userSearchControl.valueChanges.subscribe(searchText => {
      this.matchingUsers = this.searchFilter(searchText);
    });
  }

  searchFilter(searchText: string) {
    if (searchText === '' || searchText === null || searchText === undefined || typeof searchText !== 'string') {
      return [];
    }

    if (searchText.endsWith('@westernacher.com')) {
      return searchText ? this.users.filter(user => user.email.toLowerCase() === searchText.toLowerCase()) : this.users;
    }

    return searchText ? this.users.filter(user => user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) : this.users;

  }

  addPerson(user) {
    this.person.emit(user);
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }


}
