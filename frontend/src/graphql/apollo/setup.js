import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from "apollo-upload-client";
import { onError } from 'apollo-link-error';

import Cookies from 'js-cookie'
import { setContext } from "apollo-link-context";
import { NODE_ENV, PUBLIC_URL, BACKEND_PORT_DEV, BACKEND_PORT_PROD, PRODUCTION, } from '../../environments'

const cache = new InMemoryCache();
const URL = NODE_ENV === PRODUCTION ? 'http://elliv18.hopto.org:4000' : `http://localhost:${BACKEND_PORT_DEV}`
console.log('*** SETUP2 ***', URL, PUBLIC_URL, PRODUCTION, BACKEND_PORT_PROD, BACKEND_PORT_DEV)


const authLink = setContext((_) => {
    // get the authentication token from local storage if it exists
    const token = Cookies.get('jwt');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const uploadLink = new createUploadLink({ uri: URL })


//
export const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        authLink,
        uploadLink]),
    cache: cache
});

/*
const client = new ApolloClient({
   link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
         if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
if (networkError) {
             console.log(`[Network error]: ${networkError}`);
           }
       }),
new createUploadLink({uri: 'http://localhost:4000/graphql'})
]),
  cache: new InMemoryCache()
});*/