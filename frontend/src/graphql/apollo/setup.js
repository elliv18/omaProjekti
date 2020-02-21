import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Cookies from 'js-cookie'
import { setContext } from "apollo-link-context";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000'
})
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

export const client = new ApolloClient({
    cache,
    link: authLink.concat(link)
})