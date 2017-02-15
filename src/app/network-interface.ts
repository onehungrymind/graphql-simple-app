import { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface(
  {
    uri: 'http://localhost:3000/graphql'
  });

export {
    networkInterface
}
