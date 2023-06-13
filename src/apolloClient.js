import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';



const httpLink = createHttpLink({
    uri: `https://01.gritlab.ax/api/graphql-engine/v1/graphql`,
});

const getToken = () => {
    return localStorage.getItem('token');
  };
  

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;