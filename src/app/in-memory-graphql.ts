import { makeExecutableSchema } from 'graphql-tools';
import { execute } from 'graphql';

import { Item } from './shared/item.model';
import { User } from './shared/user.model';

const typeDefinitions = `
# the model
type User {
  id: String!
  name: String!
}
type Item {
  id: String!
  name: String!
  userId: String
}
  
# The schema allows the following queries:
type Query {
  users: [User]
}
# Tell the server which types represent the root query and root mutation types.
# By convention, they are called RootQuery and RootMutation.
schema {
  query: Query
}
`;

let items: Item[] = [
  {id: '1', name: 'Item 1', userId: '3'},
  {id: '2', name: 'Item 2', userId: '2'},
  {id: '3', name: 'Item 3', userId: '1'}
];

let users: User[] = [
  {id: '1', name: 'Victor Wooten'},
  {id: '2', name: 'Marcus Miller'},
  {id: '3', name: 'Jaco Pastorious'}
];

const resolveFunctions = {
  Query: {
    users(obj: any, args: any) {
      return users;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolveFunctions,
});


class InBrowserNetworkInterface {
  schema: any = {};
  constructor(params: any) {
    this.schema = params.schema;
  }
  query(request: any) {
    return execute(
      this.schema,
      request.query,
      {},
      {},
      request.variables,
      request.operationName);
  }
}
const networkInterface = new InBrowserNetworkInterface({ schema });
export {
  networkInterface
}