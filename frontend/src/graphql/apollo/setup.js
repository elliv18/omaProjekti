import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Cookies from 'js-cookie'
import { setContext } from "apollo-link-context";
import { NODE_ENV, PUBLIC_URL, BACKEND_PORT_DEV, BACKEND_PORT_PROD, PRODUCTION, } from '../../environments'

const cache = new InMemoryCache();
const URL = NODE_ENV === PRODUCTION ? 'http://elliv18.hopto.org:4000' : `http://localhost:${BACKEND_PORT_DEV}`
console.log('*** SETUP2 ***', URL, PUBLIC_URL, PRODUCTION, BACKEND_PORT_PROD, BACKEND_PORT_DEV)

const link = new HttpLink({
    uri: URL
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