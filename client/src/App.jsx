import './App.css';
// creates root from which the children element components will be rendered 
import { Outlet } from 'react-router-dom';
// ApolloClient, sets up appollo client server for GraphQL to handle queries. InMemoryCache, stores user searches to reduce redundant requests on server and increases speed. ApolloProvider, wrapper allows access to Apollo client to all of the components within the wrapper. createHttpLink, Creates an endpoint "localhost:3001/graphql" for GraphQL to fetch from and query requests from the client side, then from the server there will be a response.
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint. Creates an endpoint "localhost:3001/graphql" for GraphQL to fetch from and query requests from the client side, then from the server there will be a response.
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
// setContext allows modification of the context of the request and contains all of the context of the request. It can attach headers, or token 
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up Apolloclient to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // AppoloProvider wrapper allows access to Apollo client to all of the components within the wrapper.
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
