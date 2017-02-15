import { ApolloClient } from 'apollo-client';
import { networkInterface } from './network-interface';

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: (object: any) => object.__typename + object.id,
});
export function getClient(): ApolloClient {
    return client;
}
