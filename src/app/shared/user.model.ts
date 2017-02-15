import { Item } from './item.model';

export interface User {
  id: string;
  name: string;
  items?: Array<Item>;
}
