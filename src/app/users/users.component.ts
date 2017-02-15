import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UsersService, User } from '../shared';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const usersQuery = gql`
  query users {
    users {
      id
      name
    }
  }
`;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$: Observable<User[]> = this.apollo.watchQuery({
    query: usersQuery
  }).map((result: any) => result.data.users);
  shouldShowNewUser = false;
  newUser: User = this.usersService.initializeNewUser();

  constructor(
      private usersService: UsersService,
      private apollo: Apollo) {}


  toggleNewUser(): void {
    this.shouldShowNewUser = !this.shouldShowNewUser;

    if (!this.shouldShowNewUser) {
      this.newUser = this.usersService.initializeNewUser();
    }
  }

  addUser(): void {
    this.usersService.addUser(this.newUser);
    this.newUser = this.usersService.initializeNewUser();
  }
}
