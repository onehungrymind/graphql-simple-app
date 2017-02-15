import { Injectable } from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { AppStore } from '../app-store.model';
import { Item } from './item.model';

export const ADD_ITEM = 'ADD_ITEM';

@Injectable()
export class ItemsService {

  constructor(private store: Store<AppStore>) { }

  initializeNewItem(): Item {
    return {id: UUID.UUID(), name: '', owner: {id: undefined, name: undefined}};
  }

  addItem(item): void {
    this.store.dispatch({type: ADD_ITEM, payload: item});
  }
}

export const items: ActionReducer<Item[]> = (state: Item[] = [], action: Action) => {

  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
};
