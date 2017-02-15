import { User } from './user.model';

export interface Item {
  id: string,
  name: string,
  owner: User
}
