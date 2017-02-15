import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserItems } from '../shared';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const usersItemsQuery = gql`
  query usersItems {
    users {
      id
      name
      items {
        id
        name
      }
    }
  }
`;

@Component({
  selector: 'app-users-items',
  templateUrl: './users-items.component.html',
  styleUrls: ['./users-items.component.css']
})
export class UsersItemsComponent {
  usersItems$: Observable<UserItems[]> = this.apollo.watchQuery({
    query: usersItemsQuery
  }).map((result :any) => result.data.users);

  constructor(private apollo: Apollo) { }

}
