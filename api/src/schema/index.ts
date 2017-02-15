import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';

const mainDefs = [`
  # the model
  type User {
    id: String!
    name: String!
    items: [Item]
  }
  
  type Item {
    id: String!
    name: String!
    owner: User
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
`,
];

const users = [
  {id: '1', name: 'Victor Wooten'},
  {id: '2', name: 'Marcus Miller'},
  {id: '3', name: 'Jaco Pastorious'}
];

const items = [
  {id: '1', name: 'Item 1', userId: '3'},
  {id: '2', name: 'Item 2', userId: '2'},
  {id: '3', name: 'Item 3', userId: '1'}
];

const resolvers = {
  Query: {
    users: () => users,
    items: () => items,
  },
  User: {
    items: user => items.filter(item => item.userId === user.id),
  },
  Item: {
    owner: item => users.find(user => user.id === item.userId),
  }
};

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  resolvers: resolvers,
  typeDefs: mainDefs,
});
addMockFunctionsToSchema({
  mocks: {},
  preserveResolvers: true,
  schema: Schema,
});

export {Schema};
