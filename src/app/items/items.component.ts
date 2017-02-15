import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemsService, UsersService, Item, User } from '../shared';

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

const itemsQuery = gql`
  query items {
    items {
      id
      name
      owner {
        id
      }
    }
  }
`;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items$: Observable<Item[]> = this.apollo.watchQuery({
    query: itemsQuery
  }).map((result :any) => result.data.items);
  users$: Observable<User[]> = this.apollo.watchQuery({
    query: usersQuery
  }).map((result :any) => result.data.users);
  shouldShowNewItem: boolean = false;
  newItem: Item = this.itemsService.initializeNewItem();

  constructor(
    private itemsService: ItemsService,
    private usersService: UsersService,
    private apollo: Apollo
  ) { }

  toggleNewItem(): void {
    this.shouldShowNewItem = !this.shouldShowNewItem;

    if (!this.shouldShowNewItem)
      this.newItem = this.itemsService.initializeNewItem();
  }

  addItem(): void {
    this.itemsService.addItem(this.newItem);
    this.newItem = this.itemsService.initializeNewItem();
  }

}
