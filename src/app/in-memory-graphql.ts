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
  items: [Item]
}
# Tell the server which types represent the root query and root mutation types.
# By convention, they are called RootQuery and RootMutation.
schema {
  query: Query
}
`;

const items: Item[] = [
  {id: '1', name: 'First Item', userId: '3'},
  {id: '2', name: 'Second Item', userId: '2'},
  {id: '3', name: 'Third Item', userId: '1'}
];

const users: User[] = [
  {id: '1', name: 'Lukas Ruebbelke'},
  {id: '2', name: 'Jon Garvey'},
  {id: '3', name: 'Micah Torres'}
];

const resolveFunctions = {
  Query: {
    users(obj: any, args: any) {
      return users;
    },
    items(obj: any, args: any) {
      return items;
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
const networkInterface = new InBrowserNetworkInterface({schema});
export {
  networkInterface
}
