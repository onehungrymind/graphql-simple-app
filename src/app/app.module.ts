import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item/item.component';
import { UsersItemsComponent } from './users-items/users-items.component';
import { UserItemsComponent } from './users-items/user-items/user-items.component';

import { ApolloModule } from 'apollo-angular';
import { getClient } from './client';

import {
  UsersService,
  UsersItemsService,
  ItemsService,
  users,
  items
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    ItemsComponent,
    ItemComponent,
    UsersItemsComponent,
    UserItemsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    StoreModule.provideStore({users, items}),
    ApolloModule.forRoot(getClient)
  ],
  providers: [
    UsersService,
    UsersItemsService,
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
